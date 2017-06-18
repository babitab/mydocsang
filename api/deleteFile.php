<?php 
		
	header("Content-type", "application/json");
	
	$respose = array("fileDeleted"=>false);

	require_once './core/init.php';
	
	$user = new User();	

	if($user->isLoggedIn()){
		$data = json_decode(file_get_contents("php://input"));
	 	if(isset($data) and  !empty($data) and isset($data->fileName) and !empty($data->fileName)){
	 		if($user->type() == 'admin'){
	 			if(isset($data->userId) and !empty($data->userId)){
	 				$user = new User($data->userId);
	 			}
	 		}
			$fileName = $data->fileName;
			$user_data = $user->data();
			$folderName = $user_data['id'];
			if($fileName != ''){
				$file = new File($folderName, $fileName);
				if($file->delete()){
					$where = array("tmpName", "=", $fileName);
					try {
						$user->deleteFile($where);
						$respose = array("fileDeleted"=>true);
					} catch (Exception $e) {
						$respose["errors"] = array("server"=>"Unable to delete your file.");
					}
				}else{
					$respose["errors"] = array("file"=>"File not found.");
				}
			}
		}
	}

	echo json_encode($respose);

 ?>