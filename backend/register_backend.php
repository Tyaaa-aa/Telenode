<?php
// if(isset($_POST["userEmail_reg"])){
//     $userEmail_reg = $_POST["userEmail_reg"];
//     echo $userEmail_reg;
// }else{
//     echo "FAILUREEEREREE";
// }

if (isset($_POST["userEmail_reg"]) && isset($_POST["userName_reg"]) && isset($_POST["userPassword_reg"])) {
    $userEmail = $_POST["userEmail_reg"];
    $userName = $_POST["userName_reg"];
    $userPassword_reg = $_POST["userPassword_reg"];

    $hashed_password = password_hash($userPassword_reg, PASSWORD_DEFAULT);
} else {
?>
    <script type='text/javascript'>
        alert('Something went wrong, please try again');
        window.location = '../login.php';
    </script>
    <a href="../login.php">Click here if you are not redirected automatically within 3 seconds</a>
<?php
}

// Random Avatar url
$avatar = "https://telenode-avatar-api.herokuapp.com/api/jdenticon/telenode-".$userName.time().".svg?background=%232a2a2a";

include "db_connect.php";
$stmt = $conn->prepare("INSERT into tb_users (userEmail, userName, userPassword, profileImg) values (?,?,?,?)");
$stmt->bind_param("ssss", $userEmail, $userName, $hashed_password, $avatar);
$stmt->execute();
$stmt->close();
$conn->close();
?>
<a href="../login.php">Click here if you are not automatically redirected to the forums page</a>


<?php
include "db_connect.php";

$stmt = $conn->prepare("SELECT userID, userName from tb_users where userEmail=?");
$stmt->bind_param("s", $userEmail);
$stmt->execute();

$stmt->store_result();
$row = $stmt->num_rows();
$stmt->bind_result($id, $s_userName);
$stmt->fetch();
$stmt->close();
// echo $id, $s_userName, $userEmail;
if ($row == 0) {
?>
    <script type='text/javascript'>
        alert('Something went wrong, please try again');
        window.location = '../home.php';
    </script>
    <a href="../home.php">Click here if you are not redirected automatically within 3 seconds</a>
<?php
} else {
    session_start();
    $_SESSION["userID"] = $id;
    $_SESSION["userName"] = $s_userName;
    $_SESSION["userEmail"] = $userEmail;
    // echo "Login Successful.<br> $id <br> $s_userName <br> $userEmail";
    header("Location: ../home.php");
}

?>