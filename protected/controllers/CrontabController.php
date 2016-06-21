<?php

class CrontabController extends Controller
{


	//Call this every 30 minutes? 1 hour?
	public function actionPushNotificationQueue(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '104.41.148.236' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '104.41.148.236')) {
            throw new CHttpException(404, "The requested link does not exist.");
        }
		$requests = Requests::model()->findAll('trash = 0 AND pushed = 0 AND status = 0 AND super = 0');

        $lists = Yii::app()->db->createCommand('select id, sender, receiver, count(*) as count, request_day, request_time from tbl_requests where trash = 0 AND pushed = 0 AND status = 0 AND super = 0 group by receiver')->queryAll();

        foreach($lists as $entry):
			//super likes have been pushed alerady, we only push regular likes here...
				$count = $entry['count'];
				if(!$count){
					$count = 1;	//just in case
				}
				$time_word = "now";

				if($entry['request_time'] == 0){
					$time_word = "this noon";
				}else if($entry['request_time'] == 1){
					$time_word = "this evening";
				}else if($entry['request_time'] == 2){
					$time_word = "tonight";
				}
				$user = Users::model()->findByPk($entry['sender']);	//the real sender
				$type = 2;
				$friend_word = "friend wants";
				if($count > 1){
					$friend_word = "friends want";
				}
				$title = $count." ".$friend_word." to hang out with you ".$time_word."! Open Timi and swipe right to see who!";
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

        exit();	//paused for now

		$notifs = DeviceToken::model()->findAll();
		foreach($notifs as $notif){
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
			$request = Requests::model()->findAll('(request_day = 2 OR request_day = 3 OR request_day = 4 OR request_day = 5) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 1){
			$request = Requests::model()->findAll('(request_day = 3 OR request_day = 4 OR request_day = 5 OR request_day = 6) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 2){
			$request = Requests::model()->findAll('(request_day = 4 OR request_day = 5 OR request_day = 6 OR request_day = 0) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 3){
			$request = Requests::model()->findAll('(request_day = 6 OR request_day = 0 OR request_day = 1) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 4){
			$request = Requests::model()->findAll('(request_day = 0 OR request_day = 1 OR request_day = 6) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 5){
			$request = Requests::model()->findAll('(request_day = 0 OR request_day = 1 OR request_day = 2 OR request_day = 3) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 6){
			$request = Requests::model()->findAll('(request_day = 1 OR request_day = 2 OR request_day = 3 OR request_day = 4) AND trash = 0');	
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}		
		}
		echo 200;
	}


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