<?php 

	header('Content-type', 'application/json');

	require_once './core/init.php';

	$response = array('status'=>false);

	$user = new User();

	if($user->isLoggedIn()){
		if($user->type() == 'admin'){
			$data = json_decode(file_get_contents("php://input"));
			if(isset($data) and !empty($data)){
				if(isset($data->userId) and !empty($data->userId)){
					$user = new User($data->useId);
				}
			}
		}
		
		$response['status'] = true;
		$data = $user->data();
		unset($data["password"]);
		$response['userData'] = $data;
		$response['type'] = $user->type();
		
	}

	echo json_encode($response);

 ?>