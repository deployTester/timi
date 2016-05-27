<?php

try {
// API access key from Google API's Console
define( 'API_ACCESS_KEY', 'AIzaSyCvPuqV871HMl1uZAzVlH84U_8GwZUMJyQ' );
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

if(isset($_GET['user_id'])){
  $user_id = $_GET['user_id'];
}else{
  $user_id = null;
}

if(isset($_GET['sender_name'])){
  $sender_name = $_GET['sender_name'];
}else{
  $sender_name = "";
}

if(isset($_GET['message_id'])){
  $message_id = $_GET['message_id'];
}else{
  $message_id = "";
}

if(isset($_GET['username'])){
  $username = $_GET['username'];
}else{
  $username = null;
}

if(isset($_GET['avatar'])){
  $avatar = $_GET['avatar'];
}else{
  $avatar = null;
}

if(isset($_GET['email'])){
  $email = $_GET['email'];
}else{
  $email = null;
}

if(isset($_GET['phone'])){
  $phone = $_GET['phone'];
}else{
  $phone = null;
}

if(isset($_GET['geolocation'])){
  $geolocation = $_GET['geolocation'];
}else{
  $geolocation = null;
}

if(isset($_GET['day'])){
  $day = $_GET['day'];
}else{
  $day = null;
}

if(isset($_GET['time'])){
  $time = $_GET['time'];
}else{
  $time = null;
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
if($sender_name){
  $message = $sender_name.": ".$title; 
} 
// prep the bundle
$msg = array
(
  'message'     => $message,
  'title'     => 'Timi',
  'subtitle'    => '',
  'tickerText'  => $message,
  'vibrate' => 1,
  'sound'   => 1,
  'type'  => $type,
  'user_id'=>$user_id,
  'username'=>$username,
  'avatar'=>$avatar,
  'email'=>$email,
  'phone'=>$phone,
  'geolocation'=>$geolocation,
  'day'=>$day,
  'time'=>$time,
  'sender_name'=>$sender_name,
  'message_id'=>$message_id
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
