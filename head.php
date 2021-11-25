<?php
header('Access-Control-Allow-Origin: *');
include "db_connect.php";
session_start();

if (isset($_SESSION["userID"])) {
    // If Logged In
    // header("Location: index.php");
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
?>

<?php
        }
    }
}

?>
<?php
// Determine user theme from database (default should be light)
if (isset($styleTheme) && $getUserTheme == "dark") {
    $styleTheme = "style_dark";
} else {
    $styleTheme = "style";
}
?>

<head>
    <title>TeleNode</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="css/<?= $styleTheme ?>.css?v=<?= time() ?>">

    <link rel="icon" type="image/png" href="favicon.png?v=5">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>