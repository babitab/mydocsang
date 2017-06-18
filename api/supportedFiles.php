<?php 

	header('Content-type','application/json');
	require_once './core/init.php';

	$response = array();

	$response = Config::get('supportedFileTypes');

	echo json_encode($response);

 ?>