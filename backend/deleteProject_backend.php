<?php
error_reporting(E_ALL & ~E_NOTICE);
include "db_connect.php";
$vid_UID = $_POST['projectID'];
$userID = $_POST['userID'];


session_start();
$currentid = $_SESSION['userID'];

if ($currentid == $userID) {
    $stmt = $conn->prepare("DELETE FROM tb_videos where vid_UID=?");
    $stmt->bind_param('s', $vid_UID);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    echo json_encode(array('message' => 'success'));
} else {
    echo json_encode(array('message' => 'Error. Something went wrong. Try again later.'));
}
