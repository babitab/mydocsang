<?php 

	header('Content-type', 'application/json');

	require_once './core/init.php';

	$response = array("registered"=>false);

	$data = json_decode(file_get_contents("php://input"));

	if(isset($data) and  !empty($data)){
		$validate = new Validate();
		$validate->validate($data,array(
			'firstName'=>array('label'=>'First Name', 'required'=>true, 'minlength'=>3, 'maxlength'=>20),
			'lastName'=>array('label'=>'Last Name', 'maxlength'=>20),
			'email'=>array('label'=>'Email','unique'=>'users', 'required'=>true),
			'password'=>array('label'=>'Password', 'required'=>true, 'minlength'=>6),
			'repassword'=>array('label'=>'Re-Password', 'required'=>true, 'match'=>'password')
			)
		);
		if($validate->isValid()){
			$user = new User();
			$userData = array(
				'firstName'=> $data->firstName,
				'lastName'=> $data->lastName,
				'email'=> $data->email,
				'password'=> md5($data->password)
				);
			try {
				$user->create($userData);
				$response['registered'] = true;
			} catch (Exception $e) {
				$response['errors'] = array("server"=>"Problem while uploading file. Please try after some time.");
			}
		}else{
			$response["errors"] = $validate->errors();
		}
	}
	echo json_encode($response);
 ?>
