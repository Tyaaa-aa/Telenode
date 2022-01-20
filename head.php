<?php
header('Access-Control-Allow-Origin: *');
include "db_connect.php";
session_start();

if (isset($_SESSION["userID"])) {
    // If Logged In
    // header("Location: home.php");
    // echo $_SESSION["userID"], $_SESSION["userName"], $_SESSION["userEmail"];

    $userid = $_SESSION["userID"];

    $result = $conn->query("SELECT * from tb_users where userID = $userid");
    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            // Assign all user table content to variables for use later
            // echo $row['profileImg'];
            $getUserID = $row['userID'];
            $getUserEmail = $row['userEmail'];
            $getUserName = $row['userName'];
            $getProfileImg = $row['profileImg'];
            $getUserTheme = $row['theme'];
            $userFontSize = $row['fontsize'];
            if ($row['fontsize'] == 'smaller') {
                $getUserFontsize = '0.6';
            } else if ($row['fontsize'] == 'small') {
                $getUserFontsize = '0.8';
            } else if ($row['fontsize'] == 'normal') {
                $getUserFontsize = '1';
            } else if ($row['fontsize'] == 'big') {
                $getUserFontsize = '1.2';
            } else if ($row['fontsize'] == 'bigger') {
                $getUserFontsize = '1.4';
            } else {
                $getUserFontsize = '1';
            }
?>

<?php
        }
    }
} else {
    $getUserID = false;
    $getUserEmail = false;
    $getUserName = false;
    $getProfileImg = false;
    $getUserFontsize = false;
}

?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="css/style.css?v=<?= time() ?>">
    <style id="fontsize">
        html {
            font-size: <?= $getUserFontsize ?>em !important;
        }

        .modal {
            font-size: <?= $getUserFontsize ?>em !important;
        }
    </style>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="icon" type="image/png" href="favicon.png?v=5">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>

<?php
if ($getUserTheme == "dark") {
    // DARK THEME
    include "themes/theme_dark.php";
} else {
    // DEFAULT THEME
    include "themes/theme_default.php";
}
?>