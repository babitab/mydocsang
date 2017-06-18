<?php 

	header('Content-Type', 'application/json');

	require_once './core/init.php';

	$user = new User();

	$response = array();
	$response["loginStatus"] = false;

	if($user->isLoggedIn()){
		$response = array(
			'loginStatus'=>true, 
			'type'=> $user->type()
			);
	}

	$data = json_decode(file_get_contents("php://input"));

	if(isset($data) and  !empty($data)) {
		$validate = new Validate();
		$validate->validate($data, array(
			'email'=> array('label'=>'Email', 'required'=>true),
			'password'=> array( 'label'=>'Password', 'required'=>true)
			));

		if($validate->isValid()){
			$login = $user->login($data->email, $data->password);
			if($login['success'] == true){
				$response["loginStatus"] = true;
				$response["type"] = $user->type();
			}else{
				$response["message"] = array($login['message']);
			}
		}else{
			$response["errors"]  = $validate->errors();
		}
	}

	echo json_encode($response);

 ?>
