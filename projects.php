<div class="loading_bar"></div>

<!-- <h2>My Projects</h2> -->
<div id="projects-container">
    <?php
    if (isset($userid)) {
        $sql = "SELECT * from tb_videos where vid_userID = $userid AND vid_status = 'unpublished' order by vid_id DESC";


        include "db_connect.php";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
    ?>
            <h3>Unpublished Projects</h3>
            <div class="published_projects_container unpublished_projects_container">
                <?php include "populate_list.php"; ?>

            </div>
        <?php
        }
    } else {
        ?>
        <span>Please <a href="login.php">Login</a> first.</span>
    <?php
    }
    if (isset($userid)) {
        $sql = "SELECT * from tb_videos where vid_userID = $userid AND vid_status = 'published' order by vid_id DESC";

        include "db_connect.php";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
    ?>
            <h3>Published Projects</h3>
            <div class="published_projects_container">
                <?php include "populate_list.php"; ?>
            </div>

        <?php
        }else{
            include "populate_list.php";

        }

    } else {
        ?>
        <span>Please <a href="login.php">Login</a> first.</span>
    <?php
    }
    ?>
</div>