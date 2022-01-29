<?php
include "db_connect.php";
$uuid = $_GET["id"];

$result = $conn->query("SELECT * from tb_videos where vid_UID = '$uuid'");
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        // Assign all user table content to variables for use later
        $hasVid = true;
        $getVid_id = $row['vid_id'];
        $getVid_UID = $row['vid_UID'];
        $getVid_userID = $row['vid_userID'];
        $getVid_URLS = $row['vid_URLS'];
        $getVid_URLS = htmlspecialchars($getVid_URLS, ENT_QUOTES);

        $getVid_ProjectData = $row['vid_projectData'];
        $getVid_ProjectData = htmlspecialchars($getVid_ProjectData, ENT_QUOTES);

        $getVid_Name = $row['vid_name'];
        $getVid_Name = htmlspecialchars($getVid_Name, ENT_QUOTES);

        $getVid_Description = $row['vid_description'];
        $getVid_Description = htmlspecialchars($getVid_Description, ENT_QUOTES);
        $getVid_Thumbnail = $row['vid_thumbnail'];
        $getVid_Visibility = $row['vid_visibility'];
        $getVid_Status = $row['vid_status'];
        $getVid_UploadTime = $row['vid_uploadTime'];

        
    }

    $URL = "home.php#dashboard";
    if (!isset($_SESSION["userID"])) {
        echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
        echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
    } else if ($_SESSION["userID"] != $getVid_userID) {
        echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
        echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
    }
}
