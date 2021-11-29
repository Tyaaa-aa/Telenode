<img src="img/loader.png" id="preloader">
<header>
    <nav>
        <?php
        if (isset($_SESSION["userID"])) {
            // ================= If Logged In ==================
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
            <form action="search.php" method="GET" id="search-form">
                <input type="text" placeholder="Search" name="q" class="search_input input_field">
                <button type="submit" form="search-form" value="Submit" class="search_btn">
                    <i class='material-icons'>search</i>
                </button>
            </form>

            <a href="create.php" class="create_btn btn">
                <i class='material-icons'>video_call</i>
            </a>

            <div class="profile_container">
                <div class="profile_popup profile_popup_hidden">
                    <a href="account.php" class="profile_link">
                        <i class='material-icons'>person</i>
                        <span>Account</span>
                        <!-- <a href="account.php">Account</a> -->
                    </a>
                    <a href="logout.php" class="profile_link">
                        <i class='material-icons'>logout</i>
                        <span>Logout</span>
                        <!-- <a href="logout.php">Logout</a> -->
                    </a>
                </div>
                <div class="profile_box">
                    <img class="profile_pic" width="50px" src="<?= $getProfileImg ?>" alt="<?= $getUserName ?>'s Profile Picture">
                    <h3 class="profile_name"><?= $getUserName ?></h3>
                    <i class='material-icons down_arrow'>keyboard_arrow_down</i>
                </div>
            </div>

            <section id="sidebar">
                <a href="home.php" class="header_logo">
                    <img src="img/logo.png" alt="Header Logo">
                </a>
                <i class='material-icons close_siderbar'>menu_open</i>
                <ul class="sidebar_menu">
                    <a href="home.php#dashboard" class="sidebar_items" rel="no-refresh">
                        <i class='material-icons sidebar_icons'>dashboard</i>
                        <span>Dashboard</span>
                    </a>
                    <a href="home.php#projects" class="sidebar_items" rel="no-refresh">
                        <i class='material-icons sidebar_icons'>ondemand_video</i>
                        <span>My Projects</span>
                    </a>
                    <a href="home.php#community" class="sidebar_items" rel="no-refresh">
                        <i class='material-icons sidebar_icons'>people</i>
                        <span>Community</span>
                    </a>
                    <a href="home.php#help" class="sidebar_items" rel="no-refresh">
                        <i class='material-icons sidebar_icons'>help</i>
                        <span>Help</span>
                    </a>
                    <!-- <div class="login_box">
                        <a href="create.php" class="signup_btn btn">Start Creating</a>
                    </div> -->
                </ul>
            </section>
        <?php
        } else {
            // ============== If not logged in =================
            $hasVid = false;
        ?>
            <!-- IF USER IS NOT LOGGED IN -->
            <a href="home.php" class="header_logo">
                <img src="img/logo.png" alt="Header Logo">
            </a>
            <form action="search.php" method="GET" id="search-form">
                <input type="text" placeholder="Search" name="q" class="search_input input_field">
                <button type="submit" form="search-form" value="Submit" class="search_btn">
                    <i class='material-icons'>search</i>
                </button>
            </form>

            <div class="login_box">
                <a href="login.php" class="login_btn">Login</a>
                <a href="login.php#signup" class="signup_btn btn">Sign Up</a>
            </div>

            <section id="sidebar">
                <a href="home.php" class="header_logo">
                    <img src="img/logo.png" alt="Header Logo">
                </a>
                <i class='material-icons close_siderbar'>menu_open</i>
                <ul class="sidebar_menu">
                    <a href="home.php#dashboard" class="sidebar_items" rel="no-refresh">
                        <i class='material-icons sidebar_icons'>dashboard</i>
                        <span>Dashboard</span>
                    </a>
                    <a href="home.php#community" class="sidebar_items" rel="no-refresh">
                        <i class='material-icons sidebar_icons'>people</i>
                        <span>Community</span>
                    </a>
                    <a href="home.php#help" class="sidebar_items" rel="no-refresh">
                        <i class='material-icons sidebar_icons'>help</i>
                        <span>Help</span>
                    </a>
                    <div class="login_box">
                        <a href="login.php#signup" class="signup_btn btn">Start Creating</a>
                    </div>
                </ul>
            </section>
        <?php
        }
        ?>
    </nav>
</header>