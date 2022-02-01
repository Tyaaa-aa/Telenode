<?php
$newuserstatus = "false";

session_start();
$userid = $_SESSION["userID"];

include "db_connect.php";

$stmt = $conn->prepare("UPDATE tb_users SET newuser=? WHERE userID=$userid");
$stmt->bind_param("s", $newuserstatus);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(array("newuserstatus" => $newuserstatus));
