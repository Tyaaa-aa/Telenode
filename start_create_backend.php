<?php
ini_set('error_reporting', E_ALL);
include "head.php";
// $conn = new mysqli("localhost", "root", "", "thebigtest");

// if ($conn->connect_error) {
// 	die("Failed to connect to MySQL:.$conn > connect_error");
// 	exit();
// }

$videoLength = $_POST["videoLength"];
$videoThumbnail = $_POST["videoThumbnail"];

$projectData = "";
// ====== JSON ========

// Raw JSON from POST data
$rawJSON = json_encode($_POST);
var_dump($_POST);
// Processed and removed videoLength data (only store video URL data)
$decodedJSON = json_decode($rawJSON, true);
unset($decodedJSON["videoLength"], $decodedJSON["videoThumbnail"]);
$processedJSON = json_encode($decodedJSON);

// Generate unique video id (E.g. ODU2NTVkN2Q)
$uuid = substr(base64_encode(md5(mt_rand())), 0, 11);


$id = $_SESSION["userID"];
echo $_SESSION["userID"] . "<br><br><br>" .  $uuid . "<br><br><br>" .  $processedJSON . "<br><br><br>" .  $videoThumbnail . "<br><br><br>";
include "db_connect.php";
$stmt = $conn->prepare("INSERT into tb_videos (vid_userID, vid_UID, vid_URLS, vid_thumbnail,vid_projectData) values (?,?,?,?,?)");
$stmt->bind_param("sssss", $_SESSION["userID"], $uuid, $processedJSON, $videoThumbnail,$projectData);
$stmt->execute();
// if (!$stmt->execute()) {
//     echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
// }else{
//     echo"Success?";
// }
$stmt->close();
$conn->close();



header("Location: edit.php?id=$uuid");
?>
<a href="edit.php?id=<?= $uuid ?>">Click here if you are not automatically</a>