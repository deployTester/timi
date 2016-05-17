<?php

class CrontabController extends Controller
{

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
			$request = Requests::model()->findAll('(request_day = 3 OR request_day = 4 OR request_day = 5) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 1){
			$request = Requests::model()->findAll('(request_day = 4 OR request_day = 5 OR request_day = 6) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 2){
			$request = Requests::model()->findAll('(request_day = 5 OR request_day = 6 OR request_day = 0) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 3){
			$request = Requests::model()->findAll('(request_day = 6 OR request_day = 0) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 4){
			$request = Requests::model()->findAll('(request_day = 0 OR request_day = 1) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 5){
			$request = Requests::model()->findAll('(request_day = 0 OR request_day = 1 OR request_day = 2) AND trash = 0');
			foreach($request as $rq){
				$rq->trash = 1;
				$rq->save(false);
			}	
		}
		if($day == 6){
			$request = Requests::model()->findAll('(request_day = 1 OR request_day = 2 OR request_day = 3) AND trash = 0');	
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