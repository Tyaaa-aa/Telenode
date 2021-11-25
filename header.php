<img src="img/loader.png" id="preloader">
<header>
    <?php
    if (isset($_SESSION["userID"])) {
        // If Logged In
        $userid = $_SESSION["userID"];

        $result = $conn->query("SELECT * from tb_videos where vid_userID = $userid");
        if ($result->num_rows > 0) {
            // output data of each row
            while ($row = $result->fetch_assoc()) {
                // Assign all user table content to variables for use later
                $hasVid = true;
                $getVid_id = $row['vid_id'];
                $getVid_userID = $row['vid_userID'];
                $getVid_URLS = $row['vid_URLS'];
            }
        } else {
            $hasVid = false;
        }

    ?>
        <!-- IF USER IS LOGGED IN -->
        <br>
        <img width="50px" src="<?= $getProfileImg ?>">
        <?= "Welcome, " . $getUserName ?>
        <a href="logout.php">Logout</a>
    <?php
    } else {
        // If not logged in
        $hasVid = false;
    ?>
        <!-- IF USER IS NOT LOGGED IN -->
        <a href="login.php">Login</a>
    <?php
    }
    ?>


    <?php
    ?>
</header>