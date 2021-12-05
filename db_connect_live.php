<?php
date_default_timezone_set('Asia/Singapore');
// echo date_default_timezone_get();
$now = new DateTime();
$now->setTimezone(new DateTimeZone('Asia/Singapore'));
// $conn = new mysqli("localhost", "root", "", "db_telenode");
$conn = new mysqli("localhost", "telenodeAdmin", "Telenode1!", "ixdnypsg_telenode");

if ($conn->connect_error) {
	die("Failed to connect to MySQL:.$conn > connect_error");
	exit();
}
?>