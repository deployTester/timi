<?php

try {
// API access key from Google API's Console
define( 'API_ACCESS_KEY', 'AIzaSyCG6h26FVre33C4dOokBSjd4atzvUA1epg' );
//define('API_ACCESS_KEY', 'AIzaSyB9j6PvfMtoIODRopOJvP81J4YzxMRmZ54');

if(isset($_GET['token'])){
  $deviceToken = $_GET['token'];
}else{
  exit();
}

if(isset($_GET['type'])){
  $type = $_GET['type'];
}else{
  $type = 1;
}

if(isset($_GET['unread']) && $_GET['unread']){
  $num = intval($_GET['unread']);
}else{
  $num = 1;
}

$title = "";

if(isset($_GET['title']) && $_GET['title']){
  $title = strip_tags($_GET['title']);
} else {
  $title = "Timi";
}

$message = $title;
 
// prep the bundle
$msg = array
(
  'message'     => $message,
  'title'     => 'Timi',
  'subtitle'    => '',
  'tickerText'  => $message,
  'vibrate' => 1,
  'sound'   => 1
);
 
$fields = array
(
  'registration_ids'  => array($deviceToken),
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
