<?php
$rawProjectData = $_POST['projectData'];
$projectID = $_POST['projectID'];
$projectData = $rawProjectData;
// $projectData = json_encode($projectData, JSON_HEX_QUOT);
$projectData = strval($projectData);
session_start();
$userid = $_SESSION["userID"];

include "db_connect.php";

$stmt = $conn->prepare("UPDATE tb_videos SET vid_projectData=? WHERE vid_UID='$projectID'");
$stmt->bind_param("s", $projectData);
$stmt->execute();
$stmt->close();
$conn->close();

// echo json_encode(array($projectData));
echo $projectData;
// echo json_encode(array("Project Data" => $projectData,"projectID" => $projectID));
