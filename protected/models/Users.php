<?php

/**
 * This is the model class for table "tbl_users".
 *
 * The followings are the available columns in table 'tbl_users':
 * @property integer $id
 * @property string $username
 * @property string $password
 * @property string $social_id
 * @property string $social_token
 * @property string $user_token
 * @property integer $social_token_type
 * @property string $email
 * @property string $phone
 * @property integer $create_time
 * @property integer $lastaction
 * @property integer $status
 * @property string $city
 * @property string $country
 * @property integer $gender
 */
class Users extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_users';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('social_id, user_token, create_time, username', 'required'),
			array('social_token_type, create_time, lastaction, status, gender', 'numerical', 'integerOnly'=>true),
			array('username, user_token', 'length', 'max'=>200),
			array('password, social_token, email', 'length', 'max'=>300),
			array('avatar', 'length', 'max'=>500),
			array('social_id, ip', 'length', 'max'=>100),
			array('whatsup', 'length', 'max'=>200),
			array('phone', 'length', 'max'=>30),
			array('city, country', 'length', 'max'=>50),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, username, password, social_id, social_token, user_token, social_token_type, email, phone, create_time, lastaction, status, city, country, gender', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'username' => 'Username',
			'password' => 'Password',
			'social_id' => 'Social',
			'social_token' => 'Social Token',
			'user_token' => 'User Token',
			'social_token_type' => 'Social Token Type',
			'email' => 'Email',
			'phone' => 'Phone',
			'create_time' => 'Create Time',
			'lastaction' => 'Lastaction',
			'status' => 'Status',
			'city' => 'City',
			'country' => 'Country',
			'gender' => 'Gender',
		);
	}


	/**
	* This function updates the friend list of a user - INPUT array of cell phone numbers
	*/	
	public function updateFriendsViaPhone($array){
		foreach($array as $key=>$value){
			$user = Users::model()->findByAttributes(array('phone'=>$value));
			if($user){	//should be able to find him since FB only returns friends that use this app already.
				$friends = Friends::model()->find('(sender = :uid AND receiver = :myid) OR (sender = :myid AND receiver = :uid)',array(':uid'=>$user->id, ':myid'=>$this->id));
				if(!$friends){
					$friends = new Friends;
					$friends->sender = $this->id;
					$friends->receiver = $user->id;
					$friends->create_time = time();
					$friends->save(false);
				}
			}
		}
		return;
	}



	/**
	* This function updates the friend list of a user - INPUT array of facebook IDs
	*/	
	public function updateFriendsViaFB($array){
		foreach($array as $arr){
			$user = Users::model()->findByAttributes(array('social_id'=>$arr['id']));
			if($user){	//should be able to find him since FB only returns friends that use this app already.
				$friends = Friends::model()->find('(sender = :uid AND receiver = :myid) OR (sender = :myid AND receiver = :uid)',array(':uid'=>$user->id, ':myid'=>$this->id));
				if(!$friends){
					$friends = new Friends;
					$friends->sender = $this->id;
					$friends->receiver = $user->id;
					$friends->create_time = time();
					$friends->save(false);
				}
			}
		}
		return;
	}

	/**
	 * This function updates the lastaction time in the user model, and also sets
	 * the location city.
	 *
	 * @return null
     */
	public function userActed() {

		$this->lastaction = time();

		if(isset($_SERVER['HTTP_CF_CONNECTING_IP'])){

			$location = @Yii::app()->citygeoip->lookupLocation($_SERVER['HTTP_CF_CONNECTING_IP']);
			if ($location) {
				$this->city = $location->city;
			}

			$location = Yii::app()->geoip->lookupCountryCode($_SERVER['HTTP_CF_CONNECTING_IP']);
			if ($location) {
				$this->country = $location;
			}
			$this->ip = $_SERVER['HTTP_CF_CONNECTING_IP'];

		} else {

			$location = @Yii::app()->citygeoip->lookupLocation($_SERVER['REMOTE_ADDR']);
			if ($location) {
				$this->city = $location->city;
			}

			$location = Yii::app()->geoip->lookupCountryCode($_SERVER['REMOTE_ADDR']);
			if ($location) {
				$this->country = $location;
			}
			$this->ip = $_SERVER['REMOTE_ADDR'];
		}

		$this->save(false);
	}



	public function sendiOSNotification($data){	//pass in ['title'], ['user_id'], ['type']
		$notifs = DeviceToken::model()->findAllByAttributes(array("user_id"=>$data['user_id'], "device"=>"iOS"));
		foreach($notifs as $notif){
			if ($notif && $notif->token) {
				$data["token"] = $notif->token;
				$data["unread"] = 1;	//1 for now
			 	$url = Yii::app()->params['globalURL'].'/simplepush/iospush.php?'.http_build_query($data);
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
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('username',$this->username,true);
		$criteria->compare('password',$this->password,true);
		$criteria->compare('social_id',$this->social_id,true);
		$criteria->compare('social_token',$this->social_token,true);
		$criteria->compare('user_token',$this->user_token,true);
		$criteria->compare('social_token_type',$this->social_token_type);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('create_time',$this->create_time);
		$criteria->compare('lastaction',$this->lastaction);
		$criteria->compare('status',$this->status);
		$criteria->compare('city',$this->city,true);
		$criteria->compare('country',$this->country,true);
		$criteria->compare('gender',$this->gender);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Users the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
