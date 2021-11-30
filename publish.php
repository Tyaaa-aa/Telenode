<?php
include "db_connect.php";
$vid_id = $_POST['videoUUID'];
$vid_name = $_POST['project_name'];
$vid_description = $_POST['project_description'];
$vid_visibility = $_POST['visibility'];
$vid_status = 'published';

echo $vid_id . "<br>" . $vid_name . "<br>" .  $vid_description . "<br>" . $vid_visibility . "<br>" .  $vid_status;

// "UPDATE `tb_videos` SET `vid_visibility` = 'unlisted' WHERE `tb_videos`.`vid_id` = 25;";


$stmt = $conn->prepare("UPDATE tb_videos set vid_name=?, vid_description=?, vid_visibility=?, vid_status=? where vid_id = $vid_id");
$stmt->bind_param("ssss", $vid_name, $vid_description, $vid_visibility, $vid_status);
$stmt->execute();
$stmt->close();
$conn->close();
header("Location: home.php");
