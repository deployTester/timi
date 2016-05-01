<?php
class chatNotification{
  $sender=""
  $message=""
  function _construct($someSend, $someMess){
    $this->sender = $someSend
    $this->message=$someMess

  }
  public function getSender(){
    return $this->sender
  }
  public function getMessage(){
    return $this->message
  }
  public function getNotification(){
    return $this->sender + " " + "says" " " +$this->message
   }



}
