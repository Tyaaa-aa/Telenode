<?php
include "db_connect.php";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        // Assign all user table content to variables for use later
        $hasVid = true;
        // $getVid_id = $row['vid_id'];
        // $getVid_UID = $row['vid_UID'];
        // $getVid_userID = $row['vid_userID'];
        // $getVid_URLS = $row['vid_URLS'];
        // $getVid_Name = $row['vid_name'];
        // $getVid_Description = $row['vid_description'];
        // $getVid_Thumbnail = $row['vid_thumbnail'];
        // $getVid_Visibility = $row['vid_visibility'];
        // $getVid_UploadTime = $row['vid_uploadTime'];


        $getVid_id = $row['vid_id'];
        $getVid_UID = $row['vid_UID'];
        $getVid_userID = $row['vid_userID'];
        $getVid_Name = $row['vid_name'];
        $getVid_Thumbnail = $row['vid_thumbnail'];
        $getVid_UploadTime = $row['vid_uploadTime'];
        $getVid_Views = $row['vid_views'];
        $getVid_Visibility = $row['vid_visibility'];

        if ($getVid_Visibility == "private") {
            $visibility_icon = "<span class='material-icons visibility_icon' title='Private Video'>lock</span>";
        } else if ($getVid_Visibility == "unlisted") {
            $visibility_icon = '<span class="material-icons visibility_icon" title="Unlisted Video">link</span>';
        } else if ($getVid_Visibility == "public") {
            $visibility_icon = '<span class="material-icons visibility_icon" title="Public Video">public</span>';
        }

        if ($getVid_Views == 0) {
            $views = "No Views";
        } else {
            $views = number_format($getVid_Views) . " Views";
        }

        if (isset($row['userName'])) {
            $profileImg = $row['profileImg'];
            $getUsernames = $row['userName'];
        }

        $time = "invalid";

        $time_ago = strtotime($getVid_UploadTime);
        // Calculate difference between current 
        // time and given timestamp in seconds 
        $diff = time() - $time_ago;
        // Time difference in seconds 
        $sec = $diff;
        // Convert time difference in minutes 
        $min = round($diff / 60);
        // Convert time difference in hours 
        $hrs = round($diff / 3600);
        // Convert time difference in days 
        $days = round($diff / 86400);
        // Convert time difference in weeks 
        $weeks = round($diff / 604800);
        // Convert time difference in months 
        $mnths = round($diff / 2600640);
        // Convert time difference in years 
        $yrs = round($diff / 31207680);
        // Check for seconds 
        if ($sec <= 60) {
            $time = "$sec seconds ago";
        }
        // Check for minutes 
        else if ($min <= 60) {
            if ($min == 1) {
                $time = "one minute ago";
            } else {
                $time = "$min minutes ago";
            }
        }
        // Check for hours 
        else if ($hrs <= 24) {
            if ($hrs == 1) {
                $time = "an hour ago";
            } else {
                $time = "$hrs hours ago";
            }
        }
        // Check for days 
        else if ($days <= 7) {
            if ($days == 1) {
                $time = "Yesterday";
            } else {
                $time = "$days days ago";
            }
        }
        // Check for weeks 
        else if ($weeks <= 4.3) {
            if ($weeks == 1) {
                $time = "a week ago";
            } else {
                $time = "$weeks weeks ago";
            }
        }
        // Check for months 
        else if ($mnths <= 12) {
            if ($mnths == 1) {
                $time = "a month ago";
            } else {
                $time = "$mnths months ago";
            }
        }
        // Check for years 
        else {
            if ($yrs == 1) {
                $time = "one year ago";
            } else {
                $time = "$yrs years ago";
            }
        }
?>
        <div class="video_cards">
            <a href="watch.php?id=<?= $getVid_UID ?>" class="video_link">
                <div class="thumbnail-box">
                    <img class="thumbnail" src="<?= $getVid_Thumbnail ?>" alt="Thumbnail">
                </div>
                <h4>
                    <?= $getVid_Name ?>
                </h4>

                <?php
                // Only show username and profile image for dashboard
                // SQL from projects does not need inner join
                if (isset($row['userName'])) {
                ?>
                    <a class="video_info_container" href="user?id=<?= $getUsernames ?>">
                        <div class="video_author">
                            <img src="<?= $profileImg ?>" alt="profile picture" class="author_image">
                            <div>
                                <p class="author_username"><?= $getUsernames ?></p>
                                <div class="video_details">
                                    <p class="upload_day"><?= $time ?></p>
                                    <p class="view_count"><?= $views ?></p>
                                    <?= $visibility_icon ?>
                                </div>
                            </div>
                        </div>
                    </a>
                <?php
                } else {
                ?>
                    <div class="video_details">
                        <p class="upload_day"><?= $time ?></p>
                        <p class="view_count"><?= $views ?></p>
                        <?= $visibility_icon ?>
                    </div>
                <?php
                }
                ?>
            </a>



            <?php
            if (isset($_SESSION["userID"])) {
                if ($getVid_userID == $_SESSION["userID"]) {
            ?>
                    <a href="edit.php?id=<?= $getVid_UID ?>" class="edit_btn" data-vid="<?= $getVid_UID ?>">
                        <span class="material-icons">
                            edit
                        </span>
                    </a>
            <?php
                }
            }
            ?>
        </div>
    <?php
    }
} else {
    ?>
    <div class="no_projects_container">
        <h3>You have no projects yet :(</h3>
        <p>Create your first interactive video now!</p>
        <a href="create.php" class="signup_btn btn">Start Now</a>
    </div>
<?php
}
$conn->close();
?>