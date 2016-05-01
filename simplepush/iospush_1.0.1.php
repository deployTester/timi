<?php
// echo json_encode("qwe");
if(isset($_GET['token'])){
	$deviceToken = $_GET['token'];
}else{
	exit();
}



if(isset($_GET['unread']) && $_GET['unread']){
	$num = intval($_GET['unread']);
}else{
	$num = 1;
}

$title = "";

if(isset($_GET['title']) && $_GET['title']){
	$title = $_GET['title'];
} else {
	$title = "Studypool <3 you :)";
}

if(isset($_GET['money']) && $_GET['money']){
	$money = $_GET['money'];
} else {
	$money = "10.00";
}




$popup_type = rand(0,2);
$popup_type = 2;
// Put your private key's passphrase here:
$passphrase = 'studypool';

// Put your alert message here:
$message = $title;

////////////////////////////////////////////////////////////////////////////////

$ctx = stream_context_create();
stream_context_set_option($ctx, 'ssl', 'local_cert', 'ck_production_091115.pem');
stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);

// Open a connection to the APNS server
$fp = stream_socket_client(
	'ssl://gateway.push.apple.com:2195', $err,
	$errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);



if (!$fp)
	exit("Failed to connect: $err $errstr" . PHP_EOL);

echo 'Connected to APNS' . PHP_EOL;


//default
$content = array("message"=>"Studypool <3 you :)");

if(isset($_GET['referrer'])){
	$referrer = $_GET['referrer'];
	$content = array("message"=>$message,"referrer"=>$_GET['referrer']);
	if (isset($_GET['money'])) {
		$content = array("message"=>$message,"referrer"=>$_GET['referrer'],"money"=>$_GET['money']);
	}
}



if(isset($_GET['qid'])){
	$qid = $_GET['qid'];
	// $questions = Questions::model()->findByPk($qid);
	if (isset($_GET['aid'])) {
	// 	$latestDiscuss = Yii::app()->db->createCommand('SELECT sender from tbl_discuss join tbl_talk where tbl_discuss.id = tbl_talk.discuss_id and tbl_discuss.questions_id = '. $qid .' order by tbl_talk.create_time DESC')->queryScalar();
	// 	if ($latestDiscuss) {
	// 		$lastToTalk = Profile::model()->findByAttributes(array("user_id"=>$latestDiscuss))->avatar;
	// 		if($lastToTalk){
	// 			$unread = Unread::model()->findByAttributes(array("answers_id"=>$_GET['aid']));
	// 			if ($unread) {
	// 				$unread->unread_messages++;
	// 				$unread->save(false);
	// 			} else{
	// 				$unread = new Unread;
	// 				$unread->user_id = $questions->owner_id;
	// 				$unread->questions_id = $questions->id;
	// 				$unread->answers_id = $_GET['aid'];
	// 				$unread->last_read_messages = 0;
	// 				$unread->unread_messages = 1;
	// 				$unread->save(false);
	// 			}
	// 			$content = array("message"=>$message,"question_id"=>$qid,"unread"=>$unread->unread_messages,'lastToTalk'=>$lastToTalk);
	// 		} else {
	// 			$content = array("message"=>$message,"question_id"=>$qid,"unread"=>$unread->unread_messages);
	// 		}
	// 	}
		if (isset($_GET['unread']) && isset($_GET['lastToTalk'])) {
			$content = array("message"=>$message,"question_id"=>$qid,"unread"=>$_GET['unread'],'lastToTalk'=>$_GET['lastToTalk']);
		} elseif (isset($_GET['unread'])) {
			$content = array("message"=>$message,"question_id"=>$qid,"unread"=>$_GET['unread']);
		}
	}else{	
		$content = array("message"=>$message,"question_id"=>$qid);
	}
}

if (isset($_GET['bid'])) {
	$content = array("message"=>$message,"question_id"=>$qid,"bid"=>$_GET['bid']);
}

if (isset($_GET['reso'])) {
	$content = array("message"=>$message,"question_id"=>$qid,"reso"=>$_GET['reso']);
}


// Create the payload body
$body['aps'] = array(
	'alert' => $message,
	'content' => $content, 
	'badge' => $num,
    'sound' => 'chime.aiff'
	);

// Encode the payload as JSON
$payload = json_encode($body);
echo $payload;
// Build the binary notification
$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;

// Send it to the server
$result = fwrite($fp, $msg, strlen($msg));

if (!$result){
	echo 'Message not delivered' . PHP_EOL;
}
else{
	echo 'Message successfully delivered' . PHP_EOL;
	// echo $_GET['token'];
	// echo $_GET['title'];
	// echo $_GET['unread'];
	// echo $result;
	// echo $msg;
}

// Close the connection to the server
fclose($fp);
