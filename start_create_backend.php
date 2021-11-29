<?php
// if(isset($_POST["userEmail_reg"])){
//     $userEmail_reg = $_POST["userEmail_reg"];
//     echo $userEmail_reg;
// }else{
//     echo "FAILUREEEREREE";
// }
$videoLength = $_POST["videoLength"];


// for ($i = 0; $i <= $videoLength; $i++) {
//     echo "The number is: $i <br>";
// }
$qty = $_POST['qty'];
if (is_array($qty)) {
    for ($i = 0; $i < size($qty); $i++) {
        print($qty[$i]);
    }
}
// include "db_connect.php";
// $stmt = $conn->prepare("INSERT into tb_users (userEmail, userName, userPassword, profileImg) values (?,?,?,?)");
// $stmt->bind_param("ssss", $userEmail, $userName, $hashed_password, $avatar);
// $stmt->execute();
// $stmt->close();
// $conn->close();
// 
?>
<!-- <a href="login.php">Click here if you are not automatically redirected to the forums page</a> -->


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
