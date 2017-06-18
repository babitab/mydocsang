<?php 

	header('Content-type', 'application/json');
	
	require_once './core/init.php';

	$response = array("profileUpdated"=>false);

	$user = new User();

	if($user->isLoggedIn()){

		$user_data = $user->data();

		$data = json_decode(file_get_contents("php://input"));

		if(isset($data) and !empty($data)){
			$validate = new Validate();
			$validate->validate($data, array(
				'firstName'=>array('label'=>'First Name', 'required'=>true, 'minlength'=>3, 'maxlength'=>20),
				'lastName'=>array('label'=>'Last Name', 'maxlength'=>20),	
				)
			);
			if($validate->isValid()){
				try {
					$updateData = array(
						'firstName' => $data->firstName,
						'lastName' => $data->lastName
						);
					$user->update($updateData, array("id", "=", $user_data['id']));
					$user = new User();
					$userData = $user->data();
					$response['profileUpdated'] = true;	
				} catch (Exception $e) {
					$response['errors'] = array("server"=>"Problem while uploading file. Please try after some time.");
				}
			}else{
				$response["errors"] = $validate->errors();
			}
		}
	}

	echo json_encode($response);

 ?>