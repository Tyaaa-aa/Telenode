<?php
include "db_connect.php";
$projectUID = $_POST['projectUID'];

$result = $conn->query("SELECT vid_views from tb_videos where vid_UID = '$projectUID'");
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        $currentViews = $row['vid_views'];
    }
}

// echo $currentViews + 1;

$newViewCount = $currentViews + 1;



include "db_connect.php";

$stmt = $conn->prepare("UPDATE tb_videos SET vid_views=? WHERE vid_UID='$projectUID'");
$stmt->bind_param("i", $newViewCount);
$stmt->execute();
$stmt->close();
$conn->close();

// // echo json_encode(array($projectData));
echo $newViewCount;
// echo json_encode(array("Project Data" => $projectData,"projectUID" => $projectUID));
