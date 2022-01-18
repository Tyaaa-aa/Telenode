<?php
include "head.php";
?>
<?php

session_start();
unset($_SESSION["userID"]);
unset($_SESSION["userName"]);
unset($_SESSION["userEmail"]);
session_destroy();
session_unset();
echo "You Have Logged Out<br>";
header("Location: home.php");
?>
<a href="home.php">Click here if you are not automatically redirected</a>
