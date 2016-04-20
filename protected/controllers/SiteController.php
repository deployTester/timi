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
			$user->save();
		}else{
			$user->social_token = $social_token;
			$user->save();
		}

		$user->updateFriendsViaFB($friends);
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
	*	Returns all your friends free slots on the SAME day in the SAME city
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

		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
		$jd_day = cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
		$day = (jddayofweek($jd_day,0)); 


		$slots = Yii::app()->db->createCommand('select s.id as sid, f.sender as sender, f.receiver as receiver from tbl_friends f, tbl_free_time_slot s, tbl_users u 
				where s.matched = 0 and (f.sender = '.$user->id.' OR f.receiver = '.$user->id.') and (s.user_id = f.sender OR s.user_id = f.receiver) AND s.user_id != '.$user->id.' and s.day = '.$day.' and u.city = "'.$user->city.'" group by sid')->queryAll();

		$final = array();

		//好友？？如何parent array

		foreach($slots as $entry):

			if($user->id == $entry['sender']){
				$friend = $entry['receiver'];
			}else{
				$friend = $entry['sender'];
			}

			if(!isset($final[$friend])){
				$final[$friend] = array(0, 0, 0);
			}

			$slot = FreeTimeSlot::model()->findByPk($entry['sid']);
			if($slot){
				$final[$friend][$slot->slot] = $slot->free;
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
				'availability'=>$value
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
	*   need: user_token, request_day(0 for sunday, 1 for monday....etc.), request_time(0 for noon, 1 for evening, 2 for night), receiver
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


		$friends = Friends::model()->find('(sender = :uid AND receiver = :me) OR (sender = :me AND receiver = :uid)', array(":me"=>$user->id, ":uid"=>$_GET['receiver']));
		if(!$friends){
			$this->sendJSONResponse(array(
				'error'=>'no friendship exists'
			));
			exit();
		}

		$status = "sent";

		//you are always the receiver, since you are ACCEPTING the request
		$request = Requests::model()->find('request_day = :request_day AND request_time = :request_time AND sender = :uid AND receiver = :me', 
					array(':me'=>$user->id, ":uid"=>$_GET['receiver'], ":request_day"=>$_GET['request_day'], "request_time"=>$_GET['request_time']));

		if($request){

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

		}else{

			$request = new Requests;
			$request->create_time = time();
			$request->sender = $user->id;
			$request->request_day = $_GET['request_day'];	//0 for sunday, 1 for monday...
			$request->request_time = $_GET['request_time'];	//0 for noon, 1 for evening, 2 for night
			$request->receiver = $_GET['receiver'];
			$request->status = 0;
			$request->save(false);

		}

		$this->sendJSONResponse(array(
			'status'=>$status,
		));		

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
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				$this->redirect(Yii::app()->user->returnUrl);
		}
		// display the login form
		$this->render('login',array('model'=>$model));
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