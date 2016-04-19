<?php

class CrontabController extends Controller
{

	public function actionUpdateTimeSlot(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '52.9.2.200' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '52.9.2.200')) {
            throw new CHttpException(404, "The requested link does not exist.");
        }

		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
		$timestamp = time();
		$noon_expire = strtotime('4pm', $timestamp);
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
		}

        foreach($slots as $entry):
        	$slot = FreeTimeSlot::model()->findByPk($entry['id']);
        	$slot->matched = 2;	//2 stands for an overdue, 1 for a success match
        	$slot->save(false);
		endforeach;

		return 200;
	}


	public function actionResetTimeSlot(){
        //prevent anyone else from using our cron
        if ($_SERVER['REMOTE_ADDR'] !== '52.9.2.200' && (!isset($_SERVER['HTTP_CF_CONNECTING_IP']) || $_SERVER['HTTP_CF_CONNECTING_IP'] != '52.9.2.200')) {
           throw new CHttpException(404, "The requested link does not exist.");
        }

		date_default_timezone_set("America/New_York");	//set it to NEW YORK FOR NOW
		$timestamp = time();
		$night_expire = strtotime('11pm', $timestamp) + 4 * 3600;
		if(time() > $night_expire){	//reset 
			$rows_affected = Yii::app()->db->createCommand("update tbl_free_time_slot set matched = 0")->execute();
		}

		return 200;
	}



 
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