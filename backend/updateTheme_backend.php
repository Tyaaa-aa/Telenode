<?php
$theme = $_POST['theme'];

session_start();
$userid = $_SESSION["userID"];

include "db_connect.php";

$stmt = $conn->prepare("UPDATE tb_users SET theme=? WHERE userID=$userid");
$stmt->bind_param("s", $theme);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(array("theme" => $theme));
