<?php 
		
	header('Content-Type', 'application/json');
	
	require_once './core/init.php';

	$user = new User();

	$response = array("isLoggedIn" => false);

	if($user->isLoggedIn()){
		$response = array(
			"isLoggedIn" => true, 
			"type" => $user->type()
			);
	}

	echo json_encode($response);

 ?>