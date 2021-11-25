<img src="img/loader.png" id="preloader">
<header>
    <?php
    if (isset($_SESSION["userID"])) {
        // If Logged In
        // header("Location: index.php");
    ?>
        <!-- IF USER IS LOGGED IN -->
        <?= "Welcome, " . $getUserName ?>
        <a href="logout.php">Logout</a>
        <br>
        <img width="50px" src="<?= $getProfileImg ?>">
    <?php
    } else {
    ?>
        <!-- IF USER IS NOT LOGGED IN -->
        <a href="login.php">Login</a>
    <?php
    }
    ?>
</header>