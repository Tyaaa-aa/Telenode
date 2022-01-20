<?php
session_start();
$userid = $_SESSION['userID'];

$userEmail = $_POST['email'];
$userName = $_POST['username'];
$currentUserPassword = $_POST['current_password'];
$newPassword = $_POST['password'];



include "db_connect.php";
$stmt = $conn->prepare("SELECT userPassword from tb_users where userID=?");
$stmt->bind_param("s", $userid);
$stmt->execute();

$stmt->store_result();
$row = $stmt->num_rows();
$stmt->bind_result($currentPassword);
$stmt->fetch();
$stmt->close();

if (password_verify($currentUserPassword, $currentPassword)) {
    $hashed_password = password_hash($newPassword, PASSWORD_DEFAULT);

    include "db_connect.php";
    $stmt = $conn->prepare("UPDATE tb_users set userEmail=?, userName=?, userPassword=? where userID = $userid");
    $stmt->bind_param("sss", $userEmail, $userName, $hashed_password);
    $stmt->execute();
    $stmt->close();
    $conn->close();

    include "db_connect.php";
    $stmt = $conn->prepare("SELECT userID, userName, userEmail from tb_users where userID=?");
    $stmt->bind_param("s", $userid);
    $stmt->execute();

    $stmt->store_result();
    $row = $stmt->num_rows();
    $stmt->bind_result($newID, $newUsername, $newEmail);
    $stmt->fetch();
    $stmt->close();
    // echo $newID, $newUsername, $newEmail
    if ($row == 0) {
        echo json_encode(array("status" => "error"));
?>

        <!-- <script type='text/javascript'>
            alert('Something went wrong, please try again');
            window.location = 'account.php';
        </script>
        <a href="account.php">Click here if you are not redirected automatically within 3 seconds</a> -->
<?php
    } else {
        $_SESSION["userID"] = $newID;
        $_SESSION["userName"] = $newUsername;
        $_SESSION["userEmail"] = $newEmail;
        // header("Location: account.php");
        echo json_encode(array("status" => "success", "username" => "$newUsername", "email" => "$newEmail"));
    }
} else {
    echo json_encode(array("status" => "wrong_password"));
}
