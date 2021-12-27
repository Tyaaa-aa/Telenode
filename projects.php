<div class="loading_bar"></div>

<!-- <h2>My Projects</h2> -->
<div id="projects-container">
    <?php
    if (isset($userid)) {
        $sql = "SELECT * from tb_videos where vid_userID = $userid order by vid_id DESC";
        include "populate_list.php";
    } else {
    ?>
        <span>Please <a href="login.php">Login</a> first.</span>
    <?php
    }
    ?>
</div>