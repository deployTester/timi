<?php

class CrontabController extends Controller
{

/*
	public function actionUpdateFB(){
		$users = Users::model()->findAll();
		foreach($users as $user):
			$user->saveFacebookProfilePicture();
		endforeach;
	}
*/

	//Call this every 30 minutes? 1 hour?
	public function actionPushNotificationQueue(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
            //throw new CHttpException(404, "The requested link does not exist.");
        }
		$requests = Requests::model()->findAll('trash = 0 AND pushed = 0 AND status = 0 AND super = 0');

        $lists = Yii::app()->db->createCommand('select id, sender, receiver, count(*) as count, request_day, request_time, activity, time_word from tbl_requests where trash = 0 AND pushed = 0 AND status = 0 AND super = 0 group by receiver')->queryAll();

        foreach($lists as $entry):
			//super likes have been pushed alerady, we only push regular likes here...
				$count = $entry['count'];
				if(!$count){
					$count = 1;	//just in case
				}

				$time_word = "Now";

				if($entry['time_word']){
					$time_word = $entry['time_word'];
				}

				$user = Users::model()->findByPk($entry['sender']);	//the real sender
				$type = 2;
				$friend_word = "friend wants";
				if($count > 1){
					$friend_word = "friends want";
				}

				$activity = strtolower($entry['activity']);
				if(!$activity){
					$activity = "hang out";
				}

				$title = $count." ".$friend_word." to ".$activity." with you ".$time_word."! Open Timi and swipe right to see who!";
				$data = array(
					'title'=>$title,
					'type'=>$type,
					'user_id'=>$entry['receiver'],	//the receiver of the notification + request
					'username'=>$user->username,
					'avatar'=>$user->avatar,
					'email'=>$user->email,
					'phone'=>$user->phone,
					'day'=>$entry['request_day'],
					'time'=>$entry['request_time'],
				);
				$user->sendNotification($data);

				$request = Requests::model()->findByPk($entry['id']);
				$request->pushed = 1;
				$request->save(false);

		endforeach;
		echo 200;
	}




	public function actionDailyPush(){

        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
            throw new CHttpException(404, "The requested link does not exist.");
        }

		$notifs = DeviceToken::model()->findAll();
		foreach($notifs as $notif){

			$user = Users::model()->findByPk($notif->user_id);
			if($user && $user->lastaction > time() - 86400 * 2){	//active in the last 2 days, do not push
				continue;
			}

			if ($notif && $notif->token) {
				$data["user_id"] = $notif->user_id;
				$array = array(
					"Lunch time, dinner time, this time, that time, Timi time!",
					"Summer is the best. Waking up late & more time to chill with friends on Timi!",
					"I love summer, I love music, I love food & I love Timi!",
					"A true friend is someone who swipes right for you on Timi!",
					"God made us best friends because I swiped right for you on Timi",
					"My dinner stomach is full, but my dessert stomach still has room.",
					"You don't really truly know someone until you get ridiculously drunk with them.",
					"Food is my favorite. If I ever share it with you, then you're pretty damn special.",
					"Need Love...? Let's get on Timi and find some!",
				);
				$random = rand(0, 9);
				$result = $array[$random];
				$data["title"] = $result;
				$data["token"] = $notif->token;
				$data["unread"] = 1;
				$data["type"] = 5;				// is to homepage

				if($notif->device == "iOS"){
			 		$url = Yii::app()->params['globalURL'].'/simplepush/iospush.php?'.http_build_query($data);
			 	}else{	//android
			 		$url = Yii::app()->params['globalURL'].'/simplepush/androidpush.php?'.http_build_query($data);
			 	}

				$ch  = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //this prevent printing the 200json code
				curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1); //timeout 1s
				curl_setopt($ch, CURLOPT_TIMEOUT, 1); //timeout 1s
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				$result = curl_exec($ch);
				curl_close($ch);
			}
		}
		echo 200;
	}


	//trash request after an hour -> for NOW request (2 hours trash)
	public function actionTrashNowRequest(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
            throw new CHttpException(404, "The requested link does not exist.");
        }
        $requests = Requests::model()->findAll('UNIX_TIMESTAMP() - create_time > 3600 * 2 AND request_time = 3 AND trash = 0');
        foreach($requests as $request):
        	$request->trash = 1;
        	$request->save(false);
        endforeach;
        echo 200;
	}


	//trash the request from 3-4 days ago.  THIS IS SUPER IMPORTANT.	
	public function actionTrashRequest(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
            throw new CHttpException(404, "The requested link does not exist.");
        }

		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
		$timestamp = time();
		$jd_day = cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
		$day = (jddayofweek($jd_day,0));
		if($day == 0){
			$request = Requests::model()->findAll('(request_day = 4 OR request_day = 5) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 1){
			$request = Requests::model()->findAll('(request_day = 5 OR request_day = 6) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 2){
			$request = Requests::model()->findAll('(request_day = 6 OR request_day = 0) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 3){
			$request = Requests::model()->findAll('(request_day = 0 OR request_day = 1) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 4){
			$request = Requests::model()->findAll('(request_day = 1 OR request_day = 2) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 5){
			$request = Requests::model()->findAll('(request_day = 2 OR request_day = 3) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 6){
			$request = Requests::model()->findAll('(request_day = 3 OR request_day = 4) AND trash = 0');	
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}		
		}
		echo 200;
	}

/*
	public function actionRemindComeback(){

		set_time_limit(0);
       	spl_autoload_unregister(array('YiiBase', 'autoload'));
        require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
        spl_autoload_register(array('YiiBase', 'autoload'));

        $sid = "AC619e2e0259cedfa2be0cce4aef50bd57"; // Your Account SID from www.twilio.com/user/account
        $token = "b8eeb3138dbde40f096c47d62eb36a14"; // Your Auth Token from www.twilio.com/user/account

        $lists = Yii::app()->db->createCommand("select id from tbl_users where lastaction < unix_timestamp() - 86400 * 7 and phone != ''")->queryAll();
        $count = 0;

        foreach($lists as $entry){
        	$user = Users::model()->findByPk($entry['id']);

        	$friends = Friends::model()->findAll('sender = :uid OR receiver = :uid', array(":uid"=>$user->id));

        	if(!$friends){
        		continue;
        	}

        	$friends_count = count($friends) + 10;

        	$friend_array = array();
			$friend_string = "";

        	foreach($friends as $friend){
        		if($friend->sender == $user->id){
        			$other = $friend->receiver;
        		}else{
        			$other = $friend->sender;
        		}
				if (!in_array($other, $friend_array)){
					array_push($friend_array, $other);
				}
        	}

			//only output max to 3 examples...
			if(count($friend_array) > 3){
				$friend_array = array_slice($friend_array, 0, 3, true); 
			}


			foreach($friend_array as $fa){
				$friend_obj = Users::model()->findByPk($fa);
				$friend_string .= $friend_obj->username.", ";
			}
			$friend_string = substr($friend_string, 0, -2);
			//$friend_string .= ".";

			try{
			        $client = new Services_Twilio($sid, $token);
			        $message = $client->account->messages->sendMessage(
			                 '+13472208626', // From a valid Twilio number
			                  '+'.$user->phone, // Text this number
			                  "Hi! 🍻🍻".$friends_count." friends of yours(e.g., ".$friend_string.") are using 🍙Timi! Use Timi to hang out with your friends and their friends NOW! No more texting around or feeling awkward to initiate/reject an invitation! 🍙Timi: Gettimi.com <http://gettimi.com>. You will ❤️ it!"
			        );

			        $count++;

			}catch (Exception $e) {

			}

        }
        echo $count."sent";
	}
*/

/*
	public function actionTestDisplay(){

		set_time_limit(0);

        spl_autoload_unregister(array('YiiBase', 'autoload'));
        require_once '/var/www/html/webapp/protected/extensions/twilio/Services/Twilio.php';
        spl_autoload_register(array('YiiBase', 'autoload'));

        $sid = "AC619e2e0259cedfa2be0cce4aef50bd57"; // Your Account SID from www.twilio.com/user/account
        $token = "b8eeb3138dbde40f096c47d62eb36a14"; // Your Auth Token from www.twilio.com/user/account

		$lists = Yii::app()->db->createCommand("select name, number1, count(*) as count from tbl_phone_contacts where number1 not like '%861%' and number1 not like '10%' and number1 not like '150%' and number1 not like '135%' and number1 not like '1860%' and number1 not like '151%' and name not like '%taxi%' and name not like '%apple%' and name not like '%colum%' and number1 not like '0%' and name not like '%class%' and name not like '%police%' and name not like '%service%' and name not like '%campus%' and name not like '%school%' and name not like '%dad%' and name not like '%mom%' and name not like '%US%' and name not like '%ETS%' and name not like '%mergency%' and name not like '%hospital%' and name not like '%NYC%' and name not like '%chase%' and name not like '%bank%' and name not like '%NYC%' and name not like '%prof%' and name not like '%customer%' and name not like '%at&t%' and name not like '%att%' and name not like '%office%' and name not like '%PD%' and name not like '%cab%' and name not like '%rest%' and name not like '%help%' and name not like '%one%' and CHAR_LENGTH(number1) = 11 and CHAR_LENGTH(name) > 2 and name regexp '^[A-Za-z]' group by number1 having count >= 2 order by count desc")->queryAll();
		$count = 0;

		$lists = array_slice($lists, 966); 

		foreach($lists as $entry):
			$user = Users::model()->findByAttributes(array('phone'=>$entry['number1']));
			if($user){
				continue;
			}else{
				$friends = PhoneContacts::model()->findAllByAttributes(array('number1'=>$entry['number1']));
				$friend_array = array();
				$friend_string = "";

				foreach($friends as $friend){
					if (!in_array($friend->user_id, $friend_array)){
						array_push($friend_array, $friend->user_id);
					}
				}

				//only output max to 3 examples...
				if(count($friend_array) > 3){
					$friend_array = array_slice($friend_array, 0, 3, true); 
				}

				//give you a random number....
				$count_friend = rand(12,29);

				foreach($friend_array as $fa){
					$user = Users::model()->findByPk($fa);
					if($user){
						$friend_string .= $user->username.", ";
					}
				}
				$friend_string = substr($friend_string, 0, -2);
				//$friend_string .= ".";

				//put this back for test...
				//$entry['number1'] = "12126410987";

				try{

			        $client = new Services_Twilio($sid, $token);
			        $message = $client->account->messages->sendMessage(
			                 '+13472208626', // From a valid Twilio number
			                  '+'.$entry['number1'], // Text this number
			                  "Hi! 🍻🍻".$count_friend." friends of yours(e.g., ".$friend_string.") just joined 🍙Timi! At Timi, you can easily hang out with friends and their friends. No more texting around or feeling awkward to initiate/reject an invitation! Try out 🍙Timi at: Gettimi.com <http://gettimi.com>. You will ❤️ it!"
			        );
					$count++;

				}catch (Exception $e) {

				}

				//put this back for test..
				//exit();
			}
		endforeach;
		echo $count." sent";
	}
*/

	//do not use this function for now we curertly pass all free slots

	/*
	public function actionUpdateTimeSlot(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
            throw new CHttpException(404, "The requested link does not exist.");
        }

		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
		$timestamp = time();
		$noon_expire = strtotime('3pm', $timestamp);
		$evening_expire = strtotime('9pm', $timestamp);
		$night_expire = strtotime('11pm', $timestamp) + 4 * 3600;

		$jd_day = cal_to_jd(CAL_GREGORIAN,date("m"),date("d"),date("Y"));
		$day = (jddayofweek($jd_day,0)); 

		if(time() > $night_expire){	//update night slots
			$slots = Yii::app()->db->createCommand("select * from tbl_free_time_slot 
where matched = 0 AND slot = 2 AND day = ".$day)->queryAll();
		}else if(time() > $evening_expire){	//update evening slots
			$slots = Yii::app()->db->createCommand("select * from tbl_free_time_slot 
where matched = 0 AND slot = 1 AND day = ".$day)->queryAll();
		}else if(time() > $noon_expire){	//update noon slots
			$slots = Yii::app()->db->createCommand("select * from tbl_free_time_slot 
where matched = 0 AND slot = 0 AND day = ".$day)->queryAll();
		}else{
			echo 200;
			exit();	//not a time to call
		}

        foreach($slots as $entry):
        	$slot = FreeTimeSlot::model()->findByPk($entry['id']);
        	$slot->matched = 2;	//2 stands for an overdue, 1 for a success match
        	$slot->save(false);
		endforeach;

		echo 200;
	}

	//do not use this function for now
	public function actionResetTimeSlot(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
           throw new CHttpException(404, "The requested link does not exist.");
        }

		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
		$timestamp = time();
		$night_expire = strtotime('11pm', $timestamp) + 4 * 3600;
		if(time() > $night_expire){	//reset 
			$rows_affected = Yii::app()->db->createCommand("update tbl_free_time_slot set matched = 0")->execute();
		}

		echo 200;
	}
	*/


 
	// Uncomment the following methods and override them if needed
	/*
	public function filters()
	{
		// return the filter configuration for this controller, e.g.:
		return array(
			'inlineFilterName',
			array(
				'class'=>'path.to.FilterClass',
				'propertyName'=>'propertyValue',
			),
		);
	}

	public function actions()
	{
		// return external action classes, e.g.:
		return array(
			'action1'=>'path.to.ActionClass',
			'action2'=>array(
				'class'=>'path.to.AnotherActionClass',
				'propertyName'=>'propertyValue',
			),
		);
	}
	*/
}