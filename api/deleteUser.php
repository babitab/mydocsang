<?php 
		
	header("Content-type", "application/json");
	
	$respose = array();

	require_once './core/init.php';
	
	$user = new User();	

	if($user->isLoggedIn() and $user->type() == 'admin'){
		$respose = array("userDeleted"=>false, "dirDeleted"=>false);
		$data = json_decode(file_get_contents("php://input"));
	 	if(isset($data) and !empty($data) and isset($data->userId) and !empty($data->userId)){
	 		try {
	 			$where = array("id", "=", "{$data->userId}");
	 			$user->deleteUser($where);
	 			$respose['userDeleted'] = true;
	 			$file = new File($data->userId, null);
	 			if($file->delete()){
	 				$respose['dirDeleted'] = true;
	 			}else{
	 				$respose['errors'] = array("file"=>"Error while deleting files");
	 			}
	 		} catch (Exception $e) {
	 			$respose["errors"] = array("user"=>"Error while deleting user");
	 		}
		}
	}	

	echo json_encode($respose);

 ?>