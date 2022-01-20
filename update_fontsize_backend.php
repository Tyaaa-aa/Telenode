<?php
$fontsize = $_POST['fontsize'];

session_start();
$userid = $_SESSION["userID"];

include "db_connect.php";

$stmt = $conn->prepare("UPDATE tb_users SET fontsize=? WHERE userID=$userid");
$stmt->bind_param("s", $fontsize);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(array("fontsize" => $fontsize));
