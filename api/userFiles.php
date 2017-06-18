<?php 

	header('Content-type', 'application/json');

	require_once './core/init.php';

	$response = array('status'=>false);

	$user = new User();

	if($user->isLoggedIn()){
		if($user->type() == 'admin'){
			$data = json_decode(file_get_contents("php://input"));
			if(isset($data) and !empty($data)){
				$response["get"] = $data->userId;
				if(isset($data->userId) and !empty($data->userId)){
					$user = new User($data->userId);
				}
			}
		}
		$response['status'] = true;
		$files = $user->files();
		$response['files'] = $files == null ? array() : $files;
	}

	echo json_encode($response);
