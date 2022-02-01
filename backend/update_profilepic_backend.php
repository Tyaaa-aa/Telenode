<?php
session_start();
$userid = $_SESSION["userID"];
//get the details of the uploaded file
$file = $_FILES['fileUpload'];
$fileName = $_FILES['fileUpload']['name'];
$fileTmpName = $_FILES['fileUpload']['tmp_name'];
$fileSize = $_FILES['fileUpload']['size'];
$fileError = $_FILES['fileUpload']['error'];
$fileType = $_FILES['fileUpload']['type'];

//define upload folder (relative to current path)
$uploadFolder = 'userimg/';
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

            $uuid = substr(base64_encode(md5(mt_rand())), 0, 6);
            $fileNameNew = 'IMG_' . time() . "$uuid" . "." . $fileActualExt;
            $fileDestination = $uploadFolder . $fileNameNew;
            move_uploaded_file($fileTmpName, "../" . $fileDestination);
            include "db_connect.php";
            $result = $conn->query("SELECT * FROM tb_users WHERE userID=$userid");

            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    // echo "/" . $row["profileImg"];
                    // unlink("/" . $row["profileImg"]);
                }
            } else {
                echo "0 results";
            }
            $conn->close();

            include "db_connect.php";
            $stmt = $conn->prepare("UPDATE tb_users SET profileImg=? WHERE userID=$userid");

            $stmt->bind_param("s", $fileDestination);

            $stmt->execute();
            $stmt->close();
            $conn->close();
?>
            <script>
                window.location = "../account.php";
            </script>
        <?php
        } else {
        ?>

            The file is too big
            <script type='text/javascript'>
                alert('The file is too big. Maximum file size is 10 MB');
                window.location = '../account.php';
            </script>
        <?php
        }
    } else {
        ?>
        There was an error uploading this file
        <script type='text/javascript'>
            alert('There was an error uploading this file');
            window.location = '../account.php';
        </script>
    <?php
    }
} else {
    ?>
    You cannot upload file of this type
    <script type='text/javascript'>
        alert('You cannot upload file of this type');
        window.location = '../account.php';
    </script>
<?php
}
?>
<a href="../account.php">Click here if you are not automatically redirected to the account page</a>