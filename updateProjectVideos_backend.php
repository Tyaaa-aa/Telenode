<?php
$rawVideo = $_POST['videos'];
$projectID = $_POST['projectID'];
// $video = strval($rawVideo);
session_start();
$userid = $_SESSION["userID"];

include "db_connect.php";

$stmt = $conn->prepare("UPDATE tb_videos SET vid_URLS=? WHERE vid_UID='$projectID'");
$stmt->bind_param("s", $rawVideo);
$stmt->execute();
$stmt->close();
$conn->close();

// echo json_encode(array($projectData));
echo $rawVideo;
// echo json_encode(array("Project Data" => $projectData,"projectID" => $projectID));
