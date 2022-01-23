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
        // $getVid_Name = $row['vid_name'];
        // $getVid_Description = $row['vid_description'];
        // $getVid_Thumbnail = $row['vid_thumbnail'];
        // $getVid_Visibility = $row['vid_visibility'];
        // $getVid_UploadTime = $row['vid_uploadTime'];


        $getVid_id = $row['vid_id'];
        $getVid_UID = $row['vid_UID'];
        $getVid_userID = $row['vid_userID'];
        $getVid_URLS = $row['vid_URLS'];
        $getVid_ProjectData = $row['vid_projectData'];
        $getVid_Name = $row['vid_name'];
        $getVid_Thumbnail = $row['vid_thumbnail'];
        $getVid_UploadTime = $row['vid_uploadTime'];
        $getVid_Views = $row['vid_views'];
        $getVid_Visibility = $row['vid_visibility'];
        $getVid_Status = $row['vid_status'];
        if ($getVid_Status == "unpublished") {
            $statusLink = "&status=unpublished";
            $videoCardURL = "edit";
        } else {
            $statusLink = "";
            $videoCardURL = "watch";
        }

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
            <a href="<?= $videoCardURL ?>.php?id=<?= $getVid_UID ?><?= $statusLink ?>" class="video_link">
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
            // if (isset($_SESSION["userID"])) {
            //     if ($getVid_userID == $_SESSION["userID"]) {
            ?>
            <div class="edit_btn" data-vid="<?= $getVid_UID ?>">
                <span class="material-icons">
                    more_horiz
                </span>
            </div>
            <div class="more_options_container ">
                <?php
                if ($getVid_Status == "unpublished") {
                ?>
                    <a href="watch.php?id=<?= $getVid_UID ?>" class="more_options projectoptions_edit options_watch">
                        <span class="material-icons">
                            play_circle_outline
                        </span>
                        Watch Video
                    </a>
                    <?php
                } else {
                    if (isset($_SESSION["userID"])) {
                        if ($getVid_userID == $_SESSION["userID"]) {
                    ?>

                            <a href="edit.php?id=<?= $getVid_UID ?>" class="more_options projectoptions_edit">
                                <span class="material-icons">
                                    edit
                                </span>
                                Edit Video
                            </a>
                        <?php
                        }
                    }
                }
                if (isset($_SESSION["userID"])) {
                    if ($getVid_userID == $_SESSION["userID"]) {
                        ?>
                        <span class="more_options projectoptions_download" data-vid="<?= $getVid_UID ?>" data-projectdata='<?= $getVid_ProjectData ?>' data-projectvideos='<?= $getVid_URLS ?>'>
                            <span class="material-icons">
                                save_alt
                            </span>
                            Download Data
                        </span>
                <?php
                    }
                }
                ?>



                <?php
                if ($getVid_Status == "published") {
                    // Only show share button if project is published
                ?>
                    <span class="more_options projectoptions_share share_btn" data-vid="<?= $getVid_UID ?>">
                        <span class="material-icons">
                            share
                        </span>
                        Share Project
                        <div class="share_social_container ">
                            <a href="https://api.whatsapp.com/send/?phone&text=Watch%20<?= $getVid_Name ?>%0D%0A<?= $rootURL ?>watch?id=<?= $getVid_UID ?>" class="share_btns share_whatsapp " target="_blank" title="Share to Whatsapp">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/intent/tweet?url=<?= $rootURL ?>watch?id=<?= $getVid_UID ?>&text=Watch%20<?= $getVid_Name ?>%0D%0A" class="share_btns share_twitter" target="_blank" title="Share to Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                                </svg>
                            </a>
                            <a href="mailto:?body=Watch%20<?= $getVid_Name ?>%0D%0A<?= $rootURL ?>watch?id=<?= $getVid_UID ?>" class="share_btns share_email" target="_blank" title="Share E-Mail">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
                                </svg>
                            </a>
                        </div>
                    </span>
                    <?php
                }
                if (isset($_SESSION["userID"])) {
                    if ($getVid_userID == $_SESSION["userID"]) {
                    ?>
                        <span class="more_options projectoptions_delete" data-vid="<?= $getVid_UID ?>" data-userid="<?= $_SESSION["userID"] ?>" data-vidauthor="<?= $getVid_userID ?>">
                            <span class="material-icons">
                                delete_forever
                            </span>
                            Delete Project
                        </span>
                <?php
                    }
                }
                ?>

            </div>
            <?php
            //     }
            // }
            ?>
        </div>
    <?php
    }
} else {
    if (isset($_GET['q'])) {
    ?>
        <div class="no_projects_container">
            <h3>No results for "<?= $_GET['q'] ?>"</h3>
            <p>Try searching for something else or creating your own project</p>
            <a href="create.php" class="signup_btn btn">Create</a>
        </div>
    <?php
    } else {
    ?>
        <div class="no_projects_container">
            <h3>You have no published projects yet :(</h3>
            <p>Create your first interactive video now!</p>
            <a href="create.php" class="signup_btn btn">Start Now</a>
        </div>
<?php
    }
}
$conn->close();
?>