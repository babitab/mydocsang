<?php 

	header('Content-Type', 'application/json');

	require_once './core/init.php';

	$user = new User();

	$response = array();
	$response["users"] = array();

	if($user->isLoggedIn() and $user->type() == 'admin'){
		$allUsers = $user->allUsers();
		if($allUsers){
			$response["users"]  = $allUsers;
		}
	}


	echo json_encode($response);

 ?>
