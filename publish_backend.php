<?php
error_reporting(E_ALL & ~E_NOTICE);
include "db_connect.php";
$vid_id = $_POST['videoID'];
$vid_UID = $_POST['videoUUID'];
$vid_name = $_POST['project_name'];
$vid_description = $_POST['project_description'];

// $vid_thumbnail = $_POST['thumbnail_image'];

$vid_visibility = $_POST['visibility'];
$vid_status = 'published';

// echo $vid_id . "<br>" . $vid_UID . "<br>" . $vid_name . "<br>" .  $vid_description . "<br>" . $vid_visibility . "<br>" .  $vid_status;

// "UPDATE `tb_videos` SET `vid_visibility` = 'unlisted' WHERE `tb_videos`.`vid_id` = 25;";



$file = $_FILES['thumbnail_image'];

if (isset($file)) {
    $file = $_FILES['thumbnail_image'];
    $fileName = $_FILES['thumbnail_image']['name'];
    $fileTmpName = $_FILES['thumbnail_image']['tmp_name'];
    $fileSize = $_FILES['thumbnail_image']['size'];
    $fileError = $_FILES['thumbnail_image']['error'];
    $fileType = $_FILES['thumbnail_image']['type'];

    //define upload folder (relative to current path)
    $uploadFolder = 'thumbnail/';
    $maxFileSizeinBytes = 15000000;

    //extract file extension
    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));

    //define allowed extension
    $allowed = array('jpg', 'jpeg', 'png');

    /*echo "$fileName<br>$fileTmpName<br>$fileSize<br>$fileActualExt";*/

    if (in_array($fileActualExt, $allowed)) {

        if ($fileError === 0) {
            if ($fileSize < $maxFileSizeinBytes) {
                // UPDATE IMAGE
                $uuid = substr(base64_encode(md5(mt_rand())), 0, 6);
                $fileNameNew = 'IMG_' . time() . "$uuid" . "." . $fileActualExt;
                $fileDestination = $uploadFolder . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDestination);
                include "db_connect.php";
                $stmt = $conn->prepare("UPDATE tb_videos SET vid_thumbnail=? WHERE vid_id=$vid_id");
                $stmt->bind_param("s", $fileDestination);
                $stmt->execute();
                $stmt->close();
                $conn->close();

                include "db_connect.php";
                // UPDATE VIDEO INFO
                $stmt = $conn->prepare("UPDATE tb_videos set vid_name=?, vid_description=?, vid_visibility=?, vid_status=? where vid_id = $vid_id");
                $stmt->bind_param("ssss", $vid_name, $vid_description, $vid_visibility, $vid_status);
                $stmt->execute();
                $stmt->close();
                $conn->close();
                // header("Location: home.php");

                echo json_encode(array('message' => 'success'));
                // echo json_encode(array('message' => 'Thumbnail Saved!'));
            } else {
                // The file is too big
                echo json_encode(array('message' => 'File too big. Maximum file size is 10MB'));
            }
        } else {
            // There was an error uploading this file
            echo json_encode(array('message' => 'There was an error uploading this file'));
        }
    } else if (strval($file) == "Array") {
        // ONLY UPDATE VIDEO INFO NO IMAGE
        $stmt = $conn->prepare("UPDATE tb_videos set vid_name=?, vid_description=?, vid_visibility=?, vid_status=? where vid_id = $vid_id");
        $stmt->bind_param("ssss", $vid_name, $vid_description, $vid_visibility, $vid_status);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        echo json_encode(array('message' => 'success'));
    } else {
        // You cannot upload file of this type
        echo json_encode(array('message' => 'You cannot upload file of this type'));
    }
} 
// else {
//     // ONLY UPDATE VIDEO INFO NO IMAGE
//     $stmt = $conn->prepare("UPDATE tb_videos set vid_name=?, vid_description=?, vid_visibility=?, vid_status=? where vid_id = $vid_id");
//     $stmt->bind_param("ssss", $vid_name, $vid_description, $vid_visibility, $vid_status);
//     $stmt->execute();
//     $stmt->close();
//     $conn->close();
//     // header("Location: home.php");

//     echo json_encode(array('message' => 'Project has been Published!'));
// }
