<?php
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = "localhost";
$config['db']['user']   = "root";
$config['db']['pass']   = "root";
$config['db']['dbname'] = "word_on_the_street";

function connect_db() {
	$server = '127.0.0.1'; // this may be an ip address instead
	$user = 'root';
	$pass = '';
	$db = 'word_on_the_street';
	$connection = new mysqli($server, $user, $pass, $db);

	return $connection;
}
?>
