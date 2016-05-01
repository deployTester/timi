<?php

try {
// API access key from Google API's Console
define( 'API_ACCESS_KEY', 'AIzaSyCG6h26FVre33C4dOokBSjd4atzvUA1epg' );
//define('API_ACCESS_KEY', 'AIzaSyB9j6PvfMtoIODRopOJvP81J4YzxMRmZ54');

$user = "";

if(isset($_GET['user']) && $_GET['user']){
	$user = $_GET['user'];
}

if($user == '1055590000'){
	throw new Exception('You hit the right ID');
}

if(isset($_GET['token'])){
	$registrationId = $_GET['token'];
}else{
	exit();
}

$title = "";

if(isset($_GET['title']) && $_GET['title']){
	$title = $_GET['title'];
}
 
// prep the bundle
$msg = array
(
    'message'     => "You've received a new answer to your question: ".$title,
  'title'     => 'Studypool',
  'subtitle'    => '',
  'tickerText'  => "You've received a new answer to your question: ".$title,
  'vibrate' => 1,
  'sound'   => 1
);
 
$fields = array
(
  'registration_ids'  => array($registrationId),
  'data'        => $msg
);
 
$headers = array
(
  'Authorization: key=' . API_ACCESS_KEY,
  'Content-Type: application/json'
);
 
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );

file_put_contents($file, $current);
 
echo $result;

}catch (Exception $e) {
	echo('<strong>'.$e->getMessage().'</strong>');
}
