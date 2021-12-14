<?php
// if(isset($_POST["userEmail_reg"])){
//     $userEmail_reg = $_POST["userEmail_reg"];
//     echo $userEmail_reg;
// }else{
//     echo "FAILUREEEREREE";
// }
$videoLength = $_POST["videoLength"];
$videoThumbnail = $_POST["videoThumbnail"];

// for ($i = 0; $i <= ($videoLength - 1); $i++) {
//     // echo $i . "<br>";
//     // echo $_POST["video_".$i] . "<br>";
//     ${"video_$i"} = $_POST["video_" . $i];
//     // echo ${"video_$i"} . "<br>";
//     // $video_.$i = $_POST["video_".$i];
//     // echo $video_.$i;
// }

// ====== JSON ========

// Raw JSON from POST data
$rawJSON = json_encode($_POST);
var_dump($_POST);
// Processed and removed videoLength data (only store video URL data)
$decodedJSON = json_decode($rawJSON, true);
unset($decodedJSON["videoLength"], $decodedJSON["videoThumbnail"]);
$processedJSON = json_encode($decodedJSON);
// echo $processedJSON;

// $uuid = uniqid("tn_");
// Generate unique video id (E.g. tn_5116190861a62c20d189b)
$uuid = substr(base64_encode(md5( mt_rand() )), 0, 11);


session_start();
$_SESSION["userID"];

include "db_connect.php";
$stmt = $conn->prepare("INSERT into tb_videos (vid_userID, vid_UID, vid_URLS, vid_thumbnail) values (?,?,?,?)");
$stmt->bind_param("ssss", $_SESSION["userID"], $uuid, $processedJSON, $videoThumbnail);
$stmt->execute();
$stmt->close();
$conn->close();

header("Location: edit.php?id=$uuid");
?>
<a href="edit.php?id=<?= $uuid ?>">Click here if you are not automatically redirected to the forums page</a>


<?php
// include "db_connect.php";

// $stmt = $conn->prepare("SELECT userID, userName from tb_users where userEmail=?");
// $stmt->bind_param("s", $userEmail);
// $stmt->execute();

// $stmt->store_result();
// $row = $stmt->num_rows();
// $stmt->bind_result($id, $s_userName);
// $stmt->fetch();
// $stmt->close();
// // echo $id, $s_userName, $userEmail;
