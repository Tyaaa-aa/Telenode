<?php
include "head.php";
?>
<?php

// session_start();
unset($_SESSION["userID"]);
unset($_SESSION["userName"]);
unset($_SESSION["userEmail"]);
session_unset();
session_destroy();
echo "You Have Logged Out<br>";
header("Location: index.php");
?>
<a href="index.php">Click here if you are not automatically redirected</a>
