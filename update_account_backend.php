<?php
$userEmail = $_POST['email'];
$userName = $_POST['username'];
$userPassword = $_POST['password'];
$hashed_password = password_hash($userPassword, PASSWORD_DEFAULT);

// echo $userEmail, $userName, $userPassword, $hashed_password;
session_start();
$userid = $_SESSION['userID'];

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
?>
    <script type='text/javascript'>
        alert('Something went wrong, please try again');
        window.location = 'account.php';
    </script>
    <a href="account.php">Click here if you are not redirected automatically within 3 seconds</a>
<?php
} else {
    $_SESSION["userID"] = $newID;
    $_SESSION["userName"] = $newUsername;
    $_SESSION["userEmail"] = $newEmail;
    echo "Login Successful.<br> $newID <br> $newUsername";
    header("Location: account.php");
}
