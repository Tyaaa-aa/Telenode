<?php
include "db_connect.php";

$URL = "../login.php";
if (!isset($_SESSION["userID"])) {
    echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
    echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
}