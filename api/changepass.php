<?php 
	
	header('Content-type', 'application/json');

	require_once './core/init.php';

	$response = array("passChangeStatus"=>false);

	$user = new User();

	if($user->isLoggedIn()){

		$user_data = $user->data();

		$data = json_decode(file_get_contents("php://input"));

		$response["tmp"] = $data;

		if(isset($data) and !empty($data)){
			$validate = new Validate();
			$validate->validate($data,array(
				'currpassword'=>array('label'=>'Current Password', 'required'=>true),
				'password'=>array('label'=>'New Password', 'required'=>true, 'minlength'=>6),
				'repassword'=>array('label'=>'Re-Password', 'required'=>true, 'match'=>'password')
				)
			);
			if($validate->isValid()){
				if(md5($data->currpassword) === $user_data['password'] ){
					$updateData = array(
						'password'=> md5($data->password)
						);
					$where = array('id', '=', $user_data['id']);
					try {
						$user->update($updateData, $where);
						$response['passChangeStatus'] = true;
					} catch (Exception $e) {
						$response['errors'] = array("server"=>"Problem while uploading file. Please try after some time.");
					}
				}else{
					$response['errors'] = array("name"=>"currpassword", "match"=>"Current password don't match");
				}
			}else{
				$response['errors'] = $validate->errors();
			}
		}

		echo json_encode($response);
	}


	
 ?>
	