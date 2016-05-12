<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}


	public function sendJSONResponse($arr) {
		if (!isset($_GET['callback'])) {
			echo "no callback from jsonp";
			exit();
		}
		header('content-type: application/json; charset=utf-8');
		echo $_GET['callback'] . '(' . json_encode($arr) . ')';
	}



	public function sendJSONPost($arr) {
		header('content-type: application/json; charset=utf-8');
		echo json_encode($arr);
	}


	/*
	*	Handles regular sign up
	*/
	public function actionSignup(){
		if(!isset($_GET['name']) || !isset($_GET['email']) || !isset($_GET['password'])){
			$this->sendJSONResponse(array(
				'error'=>'no name or email or password'
			));
			exit();
		}
		$user = Users::model()->findByAttributes(array('email'=>$_GET['email']));
		if($user){
			$this->sendJSONResponse(array(
				'error'=>'user with the same email exists'
			));
			exit();		
		}else{
			$user = new Users;
			$user->username = $_GET['name'];
			$user->email = $_GET['email'];
			$user->password = hash('sha256', $user->password);
			$user->user_token = md5(time() . $user->password);
			$user->social_token_type = 0;	//regular
			$user->create_time = time();
			$user->status = 1;
			$user->avatar = $avatar;
			$user->save();
		}
		$user->userActed();
		if($user->phone){
			$this->sendJSONResponse(array(
				'user_token' => $user->user_token,
				'phone'=>$user->phone,
			));
		}else{
			$this->sendJSONResponse(array(
				'user_token' => $user->user_token,
				'phone'=>false,
			));
		}
	}


	/*
	*	Handles regular login
	*/
	public function actionLogin(){

		if(isset($_GET['email']) && isset($_GET['password'])){
			$user=Users::model()->findByAttributes(array('email'=>$_GET['email']));
			if($user){
				if(hash('sha256', $_GET['password']) === $user->password){
					
					$user->userActed();

					if($user->phone){
						$this->sendJSONResponse(array(
							'user_token' => $user->user_token,
							'phone'=>$user->phone,
						));
					}else{
						$this->sendJSONResponse(array(
							'user_token' => $user->user_token,
							'phone'=>false,
						));
					}
				}else{
					$this->sendJSONResponse(array(
						'error'=>'incorrect password',
					));
				}
			}else{
				$this->sendJSONResponse(array(
					'error'=>'incorrect email address',
				));
			}
		}else{
			$this->sendJSONResponse(array(
				'error'=>'no email or password',
			));
		}

	}


	/*
	*	Handles facebook login + sign up
	*/
	public function actionFacebookLogin(){
		if(!isset($_GET['selfData'])){
			$this->sendJSONResponse(array(
				'error'=>'no selfData'
			));
			exit();
		}

		$json = $_GET['selfData'];
		$array = json_decode($json, true);

		$fbID = $array['userId'];
		$social_token = $array['accessToken'];
		$email = $array['email'];
		$name = $array['name'];
		$friends = $array['friends']['data'];	//friends array
		$avatar = "https://graph.facebook.com/".$fbID."/picture?type=large";

		$user = Users::model()->findByAttributes(array('social_id'=>$fbID));
		if(!$user){
			$user = new Users;
			$user->username = $name;
			$user->social_id = $fbID;
			$user->social_token = $social_token;
			$user->user_token = md5(time() . $social_token);
			$user->social_token_type = 1;	//facebook
			$user->email = $email;
			$user->create_time = time();
			$user->status = 1;
			$user->avatar = $avatar;
			$user->save();
		}else{
			$user->social_token = $social_token;
			$user->save();
		}

		if($friends){
			$user->updateFriendsViaFB($friends);
		}
		$user->userActed();


		if($user->phone){
			$this->sendJSONResponse(array(
				'user_token' => $user->user_token,
				'phone'=>$user->phone,
			));
		}else{
			$this->sendJSONResponse(array(
				'user_token' => $user->user_token,
				'phone'=>false,
			));
		}
	}


	public function actionAddfriends(){

		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		if(isset($_GET['number'])){
			$number = $this->cleanPhoneNumber($_GET['number']);
			$friend = Users::model()->findByAttributes(array('phone'=>$number));
			if($friend){
				$friends = Friends::model()->find('(sender = :uid AND receiver = :myid) OR (sender = :myid AND receiver = :uid)',array(':uid'=>$friend->id, ':myid'=>$user->id));
					if(!$friends){
						$friends = new Friends;
						$friends->sender = $user->id;
						$friends->receiver = $friend->id;
						$friends->create_time = time();
						$friends->save(false);
						$this->sendJSONResponse(array(
							'success'=>'Added!'
						));
					}else{
						$this->sendJSONResponse(array(
							'error'=>'You guys are friends already!'
						));
						exit();						
					}
			}else{
				$this->sendJSONResponse(array(
					'error'=>'Sorry, we can not find the user you are looking for.'
				));
				exit();	
			}
		}else{
			$this->sendJSONResponse(array(
				'error'=>'No number'
			));
			exit();	
		}

	}



	public function actionTakeDeviceToken(){
		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}
		DeviceToken::model()->addNewToken($user->id);
		$this->sendJSONResponse(array(
			'success' => 'success',
		));		

	}

	/*
	*	Save contact list friends
	*/
	public function actionTakePhoneContact(){

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: POST');
		header('Access-Control-Max-Age: 1000');

		if(!isset($_POST['user_token'])){
			$this->sendJSONPost(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_POST['user_token']));
			if(!$user){
				$this->sendJSONPost(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}	

		$user->lastaction = time();
		$user->save(false);

		if(!isset($_POST['list'])){
			$this->sendJSONPost(array(
				'error'=>'no list'
			));
			exit();
		}
		$array = json_decode($_POST['list'], true);

		if($array):
			foreach($array as $arr):
				if(!$arr['name']){
					continue;
				}
				$contact = PhoneContacts::model()->findByAttributes(array('user_id'=>$user->id, 'name'=>$arr['name']));
				$exist = null;
				if(!$contact){
					$contact = new PhoneContacts;
					$contact->user_id = $user->id;
					$contact->name = $arr['name'];
					if(isset($arr['email'])){
						if(isset($arr['email'][0])){
							$contact->email = $arr['email'][0];
						}
					}
					if(isset($arr['number'][0])){
						$contact->number1 = $this->cleanPhoneNumber($arr['number'][0]);
						$exist = Users::model()->findByAttributes(array('phone'=>$contact->number1));
					}else{
						continue;
					}

					if(isset($arr['number'][1])){
						$contact->number2 = $this->cleanPhoneNumber($arr['number'][1]);
						if(!$exist){
							$exist = Users::model()->findByAttributes(array('phone'=>$contact->number2));
						}
					}
					if(isset($arr['number'][2])){
						$contact->number3 = $this->cleanPhoneNumber($arr['number'][2]);
						if(!$exist){
							$exist = Users::model()->findByAttributes(array('phone'=>$contact->number3));
						}
					}
					if($exist && !$contact->signed_up){
						$friends = Friends::model()->find('(sender = :uid AND receiver = :myid) OR (sender = :myid AND receiver = :uid)',array(':uid'=>$exist->id, ':myid'=>$user->id));
						if(!$friends){
							$friends = new Friends;
							$friends->sender = $user->id;
							$friends->receiver = $exist->id;
							$friends->create_time = time();
							$friends->save(false);
						}
						$contact->signed_up = 1;	//means your friend signed up already and you added him

						//send notification to the your friend and tell them you just signed up.
						$data = array(
							'title'=>'Your friend '.$user->username.' just signed up on Timi!',
							'type'=>1,
							'user_id'=>$exist->id,
						);
						$user->sendiOSNotification($data);

					}
					$contact->create_time = time();
					$contact->save();
				}
			endforeach;
		endif;

		$this->sendJSONPost(array(
			'success'=>'updated'
		));

	}


	/*
	*	Pass a number, this will invite your friend to join Timi.
	*/
	public function actionInvitefriends(){
		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		if(!isset($_GET['number'])){
			$this->sendJSONResponse(array(
				'error'=>'no number'
			));
			exit();
		}

		$newNumber = $this->cleanPhoneNumber($_GET['number']);

        spl_autoload_unregister(array('YiiBase', 'autoload'));
        require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
        spl_autoload_register(array('YiiBase', 'autoload'));

        $sid = "AC0c903dd4a822025fe1ea9e9d069c5ee8"; // Your Account SID from www.twilio.com/user/account
        $token = "31b5c426f5a0570b3d53ef8f368c6703"; // Your Auth Token from www.twilio.com/user/account

        $client = new Services_Twilio($sid, $token);
        $message = $client->account->messages->sendMessage(
                 '+16282226190', // From a valid Twilio number
                  '+'.$newNumber, // Text this number
                  "Hi, ".$user->username." wants you to go out together! Join Timi at :gettimi.com and respond!"	//message
        );

		$contact = PhoneContacts::model()->find('number1 = :number OR number2 = :number OR number3 = :number', array(':number'=>$newNumber));
		if($contact){
			$contact->invited = 1;
			$contact->save(false);
		}

		$this->sendJSONResponse(array(
			'success'=>"sent",
		));

	}

	/*
	*	return signed up or friends that already got invited (list of friends)
	*/
	public function actionReturnInvitedSignedup(){
		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		$user->lastaction = time();
		$user->save(false);

		$contacts = PhoneContacts::model()->findAll("user_id = :uid AND (invited > 0 OR signed_up > 0)", array(":uid"=>$user->id));
		$result = array();
		foreach($contacts as $contact):
			$result[$contact->name] = array($contact->invited, $contact->signed_up);
		endforeach;
		$result = json_encode($result);

		$this->sendJSONResponse(array(
			'result'=>$result
		));
	}

	/*
	*	This function calculats the distance of 2 GEO location addresses
	*/

	protected function getDistance($lat1, $lon1, $lat2, $lon2, $unit) {

	  if($lat1 == $lat2 && $lon1 == $lon2){
	  	return 0;
	  }

	  $theta = $lon1 - $lon2;
	  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
	  $dist = acos($dist);
	  $dist = rad2deg($dist);
	  $miles = $dist * 60 * 1.1515;
	  $unit = strtoupper($unit);

	  if ($unit == "K") {
	      return ($miles * 1.609344);
	  } else if ($unit == "N") {
	      return ($miles * 0.8684);
	  } else {
	      return $miles;
	  }
	}


	/*
	*	This function gets rid of all special char and append 1 when necessary(10 digits) as country code for US
	*/
	protected function cleanPhoneNumber($string) {
	   $string = preg_replace('/[^A-Za-z0-9]/', '', $string);
	   if(strlen($string) == 10){
	   	   $string = "1".$string;
	   }
	   return preg_replace('/[^A-Za-z0-9]/', '', $string); // Removes special chars.
	}

	/*
	*	Returns all your friends free slots on the SAME day within certain range....
	*/
	public function actionGetFriendsFreeSlots(){

		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		if(!isset($_GET['day']) || !$_GET['day']){
			$this->sendJSONResponse(array(
				'error'=>'no specific days'
			));
			exit();	
		}

		$user->lastaction = time();
		$user->save(false);

		$day = $_GET['day']; 

		$slots = Yii::app()->db->createCommand('select s.id as sid, f.sender as sender, f.receiver as receiver from tbl_friends f, tbl_free_time_slot s, tbl_users u 
				where s.matched = 0 and (f.sender = '.$user->id.' OR f.receiver = '.$user->id.') and (s.user_id = f.sender OR s.user_id = f.receiver) AND s.user_id != '.$user->id.' and s.day = '.$day.' group by sid')->queryAll();

		$final = array();

		foreach($slots as $entry):

			if($user->id == $entry['sender']){
				$friend = $entry['receiver'];
			}else{
				$friend = $entry['sender'];
			}

			$friendObj = Users::model()->findByPk($friend);
			$range = 20;
			if($friendObj){
				//get the minimum of either u or ur friend's range, in miles (geo location)
				$range = min($user->range, $friendObj->range);
			}

			$userLocation = array();
			$friendLocation = array();

			if($user->geolocation && $friendObj->geolocation){
				$userLocation = explode(",", $user->geolocation);
				$friendLocation = explode(",", $friendObj->geolocation);
			}

			if(isset($userLocation[0]) && isset($userLocation[1]) && isset($friendLocation[0]) && isset($friendLocation[1])){
				//$lat1, $lon1, $lat2, $lon2, $unit, return in miles, "K" return in Kilometers.
				$distance = $this->getDistance($userLocation[0], $userLocation[1], $friendLocation[0], $friendLocation[1], "M");
				if($distance > $range){
					continue;		//have to ignore this long distance friend :(
				}
			}

			if(!isset($final[$friend])){
				$final[$friend] = array(0, 0, 0);
			}

			$slot = FreeTimeSlot::model()->findByPk($entry['sid']);
			if($slot){

				$check_if_busy = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND (sender = :uid OR receiver = :uid) AND status = 1', 
					array(":uid"=>$friend, ":request_day"=>$day, "request_time"=>$slot->slot));

				$check_if_reject = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND ((sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid)) AND status = 2', 
					array(":me"=>$user->id, ":uid"=>$friend, ":request_day"=>$day, "request_time"=>$slot->slot));

				$check_if_sent = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND sender = :me AND receiver = :uid AND status = 0', 
					array(":me"=>$user->id, ":uid"=>$friend, ":request_day"=>$day, "request_time"=>$slot->slot));

				$check_if_matched = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND ((sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid)) AND status = 1', 
					array(":me"=>$user->id, ":uid"=>$friend, ":request_day"=>$day, "request_time"=>$slot->slot));

				if($check_if_busy){
					$final[$friend][$slot->slot] = "matched others";	//she matched someone else.
				}
				else if($check_if_reject){
					$final[$friend][$slot->slot] = "one rejected";	//either you rejected her, or vice versa.
				}
				else if($check_if_sent){
					$final[$friend][$slot->slot] = "request sent";	//you sent the request already
				}
				else if($check_if_matched){
					$final[$friend][$slot->slot] = "matched";	//you guys have been matched.
				}else{
					$final[$friend][$slot->slot] = $slot->free;	//see if they are actually free
				}
			}
		endforeach;

		$result = array();

		foreach($final as $key=>$value):

			if(!$value[0] && !$value[1] && !$value[2]){
				continue; //busy ->0, 0, 0
			}

			$friend = Users::model()->findByPk($key);	//get friend details
			$result[] = array(
				'user_id'=>$key,
				'username'=>$friend->username,
				'avatar'=>$friend->avatar,
				'availability'=>$value,
				'favorites'=>$friend->favorites,
				'whatsup'=>$friend->whatsup,
				'geolocation'=>$friend->geolocation,
				'phone'=>$friend->phone,
			);

		endforeach;

		$result = json_encode($result);

		$this->sendJSONResponse(array(
			'result'=>$result
		));
	}


	/*
	*	Load your own free time slot
	*/
	public function actionFreetime(){
		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		$user->lastaction = time();
		$user->save(false);

		$json = $_GET['free_time'];
		$array = json_decode($json);

		foreach($array as $key=>$subs):
			$day = $key;	//'monday', etc.
				$slot1 = FreeTimeSlot::model()->findByAttributes(array('user_id'=>$user->id, 'day'=>$day, 'slot'=>0));	//0 stands for noon
				if(!$slot1){
					$slot1 = new FreeTimeSlot;
					$slot1->day = $day;
					$slot1->slot = 0;
					$slot1->user_id = $user->id;
				}
				$slot1->free = $subs[0];
				$slot1->save(false);

				$slot2 = FreeTimeSlot::model()->findByAttributes(array('user_id'=>$user->id, 'day'=>$day, 'slot'=>1));	//0 stands for noon
				if(!$slot2){
					$slot2 = new FreeTimeSlot;
					$slot2->day = $day;
					$slot2->slot = 1;
					$slot2->user_id = $user->id;
				}
				$slot2->free = $subs[1];
				$slot2->save(false);

				$slot3 = FreeTimeSlot::model()->findByAttributes(array('user_id'=>$user->id, 'day'=>$day, 'slot'=>2));	//0 stands for noon
				if(!$slot3){
					$slot3 = new FreeTimeSlot;
					$slot3->day = $day;
					$slot3->slot = 2;
					$slot3->user_id = $user->id;
				}
				$slot3->free = $subs[2];
				$slot3->save(false);
		endforeach;

		$this->sendJSONResponse(array(
			'success'=>'success'
		));
		
	}


	/*
	*	Update / create your own free time slot
	*/
	public function actionUpdateFreeTime(){
		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		$user->lastaction = time();
		$user->save(false);

		$slots = FreeTimeSlot::model()->findAllByAttributes(array('user_id'=>$user->id), array('order'=>'day ASC'));
		$result = array();
		foreach($slots as $slot){
			if(!isset($result[$slot->day])){
				$result[$slot->day] = array(0, 0, 0);
			}
			$result[$slot->day][$slot->slot] = $slot->free;
		}
		$result = json_encode($result);
		$this->sendJSONResponse(array(
			'result'=>$result
		));
	}


	/*
	*	This function returns your own schedule today.
	*/
	public function actionGetMySchedule(){
		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		$user->lastaction = time();
		$user->save(false);

		if(!isset($_GET['day']) || !$_GET['day']){
			$this->sendJSONResponse(array(
				'error'=>'no specific days'
			));
			exit();	
		}
		$day = $_GET['day'];

		$slots = FreeTimeSlot::model()->findAllByAttributes(array('user_id'=>$user->id, 'day'=>$day), array('order'=>'slot ASC'));
		$result = array(0, 0, 0);
		foreach($slots as $slot){
			$check_if_matched = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND (receiver = :me OR sender = :me) AND status = 1', 
					array(":me"=>$user->id, ":request_day"=>$day, "request_time"=>$slot->slot));
			if($check_if_matched){
				if($user->id == $check_if_matched->receiver){	//if i am receiver, the other guy is sender. 
					$other = Users::model()->findByPk($check_if_matched->sender);
				}else{
					$other = Users::model()->findByPk($check_if_matched->receiver);
				}
				$result[$slot->slot] = array(
					'user_id'=>$other->id, //friend’s id 
					'username'=>$other->username, //friend’s usnerame
					'avatar'=>$other->avatar, //friend’s profile pic
					'whatsup'=>$other->whatsup, //friend’s status
					'favorites'=>$other->favorites,
					'geolocation'=>$other->geolocation,
					'phone'=>$other->phone, //friend’s phone
				);
			}else{
				$result[$slot->slot] = $slot->free;
			}
		}
		$result = json_encode($result);
		$this->sendJSONResponse(array(
			'result'=>$result
		));
	}


	/*
	*	take phone number, output verification code
	*/
	public function actionInputPhone(){

		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		if(!isset($_GET['number'])){
			$this->sendJSONResponse(array(
				'error'=>'no number'
			));
			exit();
		}

        spl_autoload_unregister(array('YiiBase', 'autoload'));
        require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
        spl_autoload_register(array('YiiBase', 'autoload'));

        $sid = "AC0c903dd4a822025fe1ea9e9d069c5ee8"; // Your Account SID from www.twilio.com/user/account
        $token = "31b5c426f5a0570b3d53ef8f368c6703"; // Your Auth Token from www.twilio.com/user/account

        $newNumber = $_GET['number'];

        $valid_code = rand(1000, 9999);

        $client = new Services_Twilio($sid, $token);
        $message = $client->account->messages->sendMessage(
                 '+16282226190', // From a valid Twilio number
                  $newNumber, // Text this number
                  "Verification code: ".$valid_code//message
        );

        $verify = Verify::model()->findByAttributes(array('user_id'=>$user->id));
        if(!$verify){
	        $verify = new Verify;
	        $verify->user_id = $user->id;
        }
	    $verify->code = $valid_code;
	    $verify->number = $newNumber;
	    $verify->create_time = time();
	    $verify->save(false);

		$this->sendJSONResponse(array(
			'success'=>"sent",
		));

	}

	/*
	*	take verification code, after verification, save it into phone column in tbl_users
	*/
	public function actionInputCode(){

		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		if(!isset($_GET['code'])){
			$this->sendJSONResponse(array(
				'error'=>'no code'
			));
			exit();
		}

        $verify = Verify::model()->findByAttributes(array('user_id'=>$user->id, 'code'=>$_GET['code']));
        if(!$verify){
			$this->sendJSONResponse(array(
				'error'=>"wrong code",
			));
        }else{
        	$user->phone = $verify->number;
        	$user->save(false);
        }

		$this->sendJSONResponse(array(
			'success'=>"verified",
		));

	}

	/*
	*	Request event (from friend 1-> friend 2), need receiver, request_day, request_time
	*	if you send the request and the other party did not send it, just send request
	*   if both party has the request, match it!
	*   need: user_token, request_day(0 for sunday, 1 for monday....etc.), request_time(0 for noon, 1 for evening, 2 for night), receiver, decision
	*/
	public function actionSendRequest(){

		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		$user->lastaction = time();
		$user->save(false);

		if(!isset($_GET['receiver'])){
			$this->sendJSONResponse(array(
				'error'=>'no receiver id'
			));
			exit();
		}

		if(!isset($_GET['request_day']) || !isset($_GET['request_time'])){
			$this->sendJSONResponse(array(
				'error'=>'no request day or time'
			));
			exit();
		}

		if(!isset($_GET['decision'])){
			$this->sendJSONResponse(array(
				'error'=>'no decision'
			));
			exit();
		}		

		$friends = Friends::model()->find('(sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid)', array(":me"=>$user->id, ":uid"=>$_GET['receiver']));
		if(!$friends){
			$this->sendJSONResponse(array(
				'error'=>'no friendship exists'
			));
			exit();
		}

		$status = "sent";
		$decision = $_GET['decision'];	//1 for approve, 2 for reject


		$time_word = "today";

		if($_GET['request_time'] == 0){
			$time_word = "this noon";
		}else if($_GET['request_time'] == 1){
			$time_word = "this evening";
		}else if($_GET['request_time'] == 0){
			$time_word = "tonight";
		}

		//you are always the receiver, since you are ACCEPTING the request
		//this request means someone else requested to meet with you already. so they are the sender.
		$request = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND sender = :uid AND receiver = :me', 
					array(':me'=>$user->id, ":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], "request_time"=>$_GET['request_time']));

		//check the other party to make sure they are not booked already!
		$check_if_busy = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND (sender = :uid OR receiver = :uid) AND status = 1', 
					array(":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], "request_time"=>$_GET['request_time']));

		if($check_if_busy){
			$this->sendJSONResponse(array(
				'error'=>'the other party is busy!'
			));
			exit();
		}

		if($request && $decision == 1){	//i approve a request

			$request->status = 1;	//approve, since it's mutual!
			$request->save(false);

			//if approve, deny all other requests during the same time
			if($request->status == 1){
				$requests = Requests::model()->findAll('id != :rid AND status = 0 AND request_day = :request_day AND request_time = :request_time AND receiver = :me', 
						array(':rid'=>$request->id,':me'=>$user->id, ":request_day"=>$_GET['request_day'], "request_time"=>$_GET['request_time']));
				if($requests){
					foreach($requests as $req){
						$req->status = 3;
						$req->save(false);
					}
				}
			}

			$status = "matched";
			$friend = Users::model()->findByPk($request->sender);

			//send notification to the other party and tell them they are matched with you.
			$data = array(
				'title'=>'You have been matched with '.$user->username.' for '.$time_word.'!',
				'type'=>3,						//3 for match
				'user_id'=>$friend->id,
				'username'=>$user->username,
				'avatar'=>$user->avatar,
				'email'=>$user->email,
				'phone'=>$user->phone,
				'country'=>$user->country,
				'city'=>$user->city,
				'geolocation'=>$user->geolocation,
				'favorites'=>$user->favorites,
				'whatsup'=>$user->whatsup,
				'range'=>$user->range,
				'day'=>$_GET['request_day'],
				'time'=>$_GET['request_time'],
			);
			$user->sendiOSNotification($data);

		}else if($decision == 1){	//no request sent to me, i sent out request

			$old = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND receiver = :uid AND sender = :me', 
					array(':me'=>$user->id, ":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], "request_time"=>$_GET['request_time']));
			if(!$old){
				$request = new Requests;
				$request->create_time = time();
				$request->sender = $user->id;
				$request->request_day = $_GET['request_day'];	//0 for sunday, 1 for monday...
				$request->request_time = $_GET['request_time'];	//0 for noon, 1 for evening, 2 for night
				$request->receiver = $_GET['receiver'];
				$request->status = 0;
				$request->save(false);
			}else{
				$request = $old;
			}

			$status = "sent";

			//double check if the other party has been matched with someone else (check_if_busy)
			$check_if_busy = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND (sender = :uid OR receiver = :uid) AND status = 1', 
					array(":uid"=>$request->receiver, ":request_day"=>$_GET['request_day'], "request_time"=>$_GET['request_time']));
			if(!$check_if_busy){
				//if not busy, send notification to your FRIEND(the one you requested) and tell him someone liked him!
				$data = array(
					'title'=>'Your friend wants to go out with you '.$time_word.'!',
					'type'=>2,
					'user_id'=>$request->receiver,	//send to your friend
				);
				$user->sendiOSNotification($data);
			}
		}else if($request && $decision == 2){	//request sent to me, i turned it down
			$request->status = 2;
			$request->save(false);

			$status = "rejected";

		}else if($decision == 2){	//no request sent to me, i just clicked dislike

			$old = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND receiver = :uid AND sender = :me', 
					array(':me'=>$user->id, ":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], "request_time"=>$_GET['request_time']));
			if(!$old){
				$request = new Requests;
				$request->create_time = time();
				$request->sender = $user->id;
				$request->request_day = $_GET['request_day'];	//0 for sunday, 1 for monday...
				$request->request_time = $_GET['request_time'];	//0 for noon, 1 for evening, 2 for night
				$request->receiver = $_GET['receiver'];
				$request->status = 2;	//save as rejection
				$request->save(false);
			}
			$status = "disliked";
		}

		$this->sendJSONResponse(array(
			'status'=>$status,
		));		

	}

	/*
	*	This function returns your personal information (edit if passed param)
	*/
	public function actionReturnInfo(){

		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		if(isset($_GET['email'])){
			$user->email = $_GET['email'];
		}
		if(isset($_GET['phone'])){
			$user->phone = $_GET['phone'];
		}
		if(isset($_GET['country'])){
			$user->city = $_GET['country'];
		}
		if(isset($_GET['city'])){
			$user->city = $_GET['city'];
		}
		if(isset($_GET['geolocation'])){
			$user->geolocation = $_GET['geolocation'];
		}
		if(isset($_GET['favorites'])){
			$user->favorites = $_GET['favorites'];
		}
		if(isset($_GET['whatsup'])){
			$user->whatsup = strip_tags($_GET['whatsup']);
		}
		if(isset($_GET['range'])){
			$user->range = strip_tags($_GET['range']);
		}
		
		$user->lastaction = time();
		$user->save(false);

		$this->sendJSONResponse(array(
			'username'=>$user->username,
			'avatar'=>$user->avatar,
			'email'=>$user->email,
			'phone'=>$user->phone,
			'country'=>$user->country,
			'city'=>$user->city,
			'geolocation'=>$user->geolocation,
			'favorites'=>$user->favorites,
			'whatsup'=>$user->whatsup,
			'range'=>$user->range,
		));

	}


	/*
	*	Cancel a match
	*/
	public function actionCancelMatch(){
		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}
		if(!isset($_GET['request_id'])){
			$this->sendJSONResponse(array(
				'error'=>'no request id'
			));
			exit();
			$request = Requests::model()->findByPk($_GET['request_id']);
			if(!$request){
				$this->sendJSONResponse(array(
					'error'=>'no request found'
				));
				exit();
			}
		}
		
		$total_cancel = Cancel::count('owner_id = :uid AND unix_timestamp() - create_time < 86400 * 30', array(":uid"=>$user->id));
		if($total_cancel > 3){
			$this->sendJSONResponse(array(
				'error'=>'more than 3 in a month'
			));
			exit();		
		}

		$cancel = new Cancel;
		$cancel->request_id = $request->id;
		$cancel->owner_id = $user->id;
		$cancel->create_time = time();
		$cancel->save();

		$request->delete();

		$time_word = "today";

		if($request->request_time == 0){
			$time_word = "this noon";
		}else if($request->request_time == 1){
			$time_word = "this evening";
		}else if($request->request_time == 2){
			$time_word = "tonight";
		}

		if($user->id == $request->receiver){	//if i am receiver, the other guy is sender. 
			$friend = Users::model()->findByPk($request->sender);
		}else{
			$friend = Users::model()->findByPk($request->receiver);
		}

			//send notification to the other party and tell them they are matched with you.
			$data = array(
				'title'=>'Sorry! Your match with '.$user->username.' for '.$time_word.' has been cancelled.',
				'type'=>4,						//4 for cancel
				'user_id'=>$friend->id,
				'username'=>$user->username,
				'avatar'=>$user->avatar,
				'email'=>$user->email,
				'phone'=>$user->phone,
				'country'=>$user->country,
				'city'=>$user->city,
				'geolocation'=>$user->geolocation,
				'favorites'=>$user->favorites,
				'whatsup'=>$user->whatsup,
				'range'=>$user->range,
				'day'=>$request->request_day,
				'time'=>$request->request_time,
			);
			$user->sendiOSNotification($data);

		$this->sendJSONResponse(array(
			'success'=>'cancelled',
		));	
	}


	/*
	*	Returns the # of cancels you request in the last 30 days
	*/
	public function actionGetCancelCount(){

		if(!isset($_GET['user_token'])){
			$this->sendJSONResponse(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_GET['user_token']));
			if(!$user){
				$this->sendJSONResponse(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}

		$total_cancel = Cancel::count('owner_id = :uid AND unix_timestamp() - create_time < 86400 * 30', array(":uid"=>$user->id));

		$this->sendJSONResponse(array(
			'total'=>$total_cancel,
		));	

	}




	/*
	*	This function handles change avatar for students.
	*   And update whatsup (optional)
	*/
	public function actionChangeAvatar(){

		if(!isset($_POST['user_token'])){
			$this->sendJSONPost(array(
				'error'=>'no user token'
			));
			exit();
		}else{
			$user = Users::model()->findByAttributes(array('user_token'=>$_POST['user_token']));
			if(!$user){
				$this->sendJSONPost(array(
					'error'=>'invalid user token'
				));
				exit();	
			}
		}


		if(isset($_FILES['file']))
		{

			if(isset($_FILES['file'])){
						$filename = "avatar" . time() . rand(1, 999) . ".jpg";

						if (!isset($_FILES["file"]["tmp_name"]) || !$_FILES["file"]["tmp_name"]) {
							$this->sendJSONPost(array(
								'error' => 'No picture posted.'
							));
							exit();
						}

						$new_image_name = $filename; //strtolower($_FILES['file']['name']);

						$fileSavePath = "uploads/avatar/" . $user->id . "/";
						if (!file_exists($fileSavePath)) {
							mkdir($fileSavePath, 0777, true);
						}
						move_uploaded_file($_FILES["file"]["tmp_name"], $fileSavePath.$new_image_name);

						$user->avatar = Yii::app()->params['globalURL']."/".$fileSavePath.$new_image_name;

			}

			$user->save();

			$this->sendJSONPost(array(
				'avatar' => $user->avatar,
			));

		}else{
			$this->sendJSONPost(array(
				'error' => 'No post file or status',
			));
		}
	}



	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->layout = false;
		$this->render('app');
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-Type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}



	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}
}