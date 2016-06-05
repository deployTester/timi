<?php
if(isset($_GET['password']) && $_GET['password'] == 86626728){
	//
}else{
	exit();
}
if( ! ini_get('date.timezone') )
{
    date_default_timezone_set('UTC');
}

$total_users = Users::model()->count();
$new_users = Users::model()->findAll('create_time > unix_timestamp() - 86400');
$new_users_count = count($new_users);

$active_users = Users::model()->findAll('lastaction > unix_timestamp() - 86400');
$active_users_count = count($active_users);
$total_swipes = Requests::model()->count('create_time > unix_timestamp() - 86400');
$total_swipes_yes = Requests::model()->count('create_time > unix_timestamp() - 86400 AND (status = 0 OR status = 3)');
$matches = Requests::model()->findAll('create_time > unix_timestamp() - 86400 AND status = 1');
$total_match = count($matches);

?>

<div>
	<div><b>Total Users:</b> <?php echo $total_users; ?></div>
	
	<div><b>New Users(24hrs):</b> <?php echo $new_users_count; ?></div>
	<div style="margin-left:20px;">
		<?php foreach($new_users as $new_user): ?>
			<?php 
				$friends = Friends::model()->findAll("sender = :uid", array(":uid"=>$new_user->id));
				echo "<li>".$new_user->username."</li>";
				foreach ($friends as $friend_obj){
					$friend = Users::model()->findByPk($friend_obj->receiver);
					echo "(".$friend->username.")";
				}
			?>
		<?php endforeach; ?>
	</div>

	<div><b>Active Users(24hrs):</b> <?php echo $active_users_count; ?></div>
	<div style="margin-left:20px;">
		<?php foreach($active_users as $active_user): ?>
			<?php 
				echo "<li>".$active_user->username."</li>";
			?>
		<?php endforeach; ?>
	</div>

	<div><b>New Swipes(24hrs):</b> <?php echo $total_swipes; ?></div>
	<div><b>New YES swipes(24hrs):</b> <?php echo $total_swipes_yes; ?></div>

	<div><b>New Matches(24hrs):</b> <?php echo $total_match; ?></div>
	<div style="margin-left:20px;">
		<?php foreach($matches as $match): ?>
			<?php 
				$sender = Users::model()->findByPk($match->sender);
				$receiver = Users::model()->findByPk($match->receiver);
				echo "<li>".$sender->username . " + " . $receiver->username."</li>";
			?>
		<?php endforeach; ?>
	</div>

</div>

