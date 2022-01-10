<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<?php
include "db_connect.php";
$uuid = $_GET["id"];

$result = $conn->query("SELECT v.*, u.userName,u.profileImg from tb_videos v inner join tb_users u on v.vid_userID=u.userID where v.vid_UID = '$uuid'");
if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        // Assign all user table content to variables for use later
        $hasVid = true;
        $getVid_id = $row['vid_id'];
        $getVid_UID = $row['vid_UID'];
        $getVid_userID = $row['vid_userID'];
        $getVid_URLS = $row['vid_URLS'];
        $getVid_ProjectData = $row['vid_projectData'];
        $getVid_Name = $row['vid_name'];
        $getVid_Description = $row['vid_description'];
        $getVid_Thumbnail = $row['vid_thumbnail'];
        $getVid_Status = $row['vid_status'];
        $getVid_UploadTime = $row['vid_uploadTime'];
        $getVid_Views = $row['vid_views'];
        $getVid_Visibility = $row['vid_visibility'];

        if ($getVid_Visibility == "private") {
            $visibility_icon = "<span class='material-icons visibility_icon' title='Private Video'>lock</span>";
        } else if ($getVid_Visibility == "unlisted") {
            $visibility_icon = '<span class="material-icons visibility_icon" title="Unlisted Video">link</span>';
        } else if ($getVid_Visibility == "public") {
            $visibility_icon = '';
        }
        if ($getVid_Views == 0) {
            $views = "No Views";
        } else if ($getVid_Views == 1) {
            $views = number_format($getVid_Views) . " View";
        } else {
            $views = number_format($getVid_Views) . " Views";
        }

        $profileImg = $row['profileImg'];
        $getUsernames = $row['userName'];
    }

    if ($getVid_Visibility == "private" && $getVid_userID != $getUserID) {
        $URL = "home.php#dashboard";
        echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
        echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
    } else if ($getVid_Status == "unpublished") {
        $URL = "home.php#projects";
        echo "<script type='text/javascript'>alert('Project is unpublished! If you are the owner of this project please publish it first!');document.location.href='{$URL}';</script>";
        echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
    }
    function url_origin($s, $use_forwarded_host = false)
    {
        $ssl      = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on');
        $sp       = strtolower($s['SERVER_PROTOCOL']);
        $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
        $port     = $s['SERVER_PORT'];
        $port     = ((!$ssl && $port == '80') || ($ssl && $port == '443')) ? '' : ':' . $port;
        $host     = ($use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST'])) ? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
        $host     = isset($host) ? $host : $s['SERVER_NAME'] . $port;
        return $protocol . '://' . $host;
    }

    function full_url($s, $use_forwarded_host = false)
    {
        return url_origin($s, $use_forwarded_host) . $s['REQUEST_URI'];
    }

    $absolute_url = full_url($_SERVER);
    // $absolute_url = str_replace("edit", "watch", $absolute_url);

    $metaThumbnail;
    if (strpos($getVid_Thumbnail, 'ytimg.com') !== false) {
        $metaThumbnail = $getVid_Thumbnail;
    } else {
        $baseURL = str_replace("/watch?id=$getVid_UID", "", $absolute_url);
        $metaThumbnail = $baseURL . "/" . $getVid_Thumbnail;
    }
?>
    <link href="https://vjs.zencdn.net/7.17.0/video-js.css" rel="stylesheet" />
    <!-- Video.js base CSS -->
    <link href="https://unpkg.com/video.js@7/dist/video-js.min.css" rel="stylesheet" />
    <!-- City -->
    <link href="https://unpkg.com/@videojs/themes@1/dist/city/index.css" rel="stylesheet" />

    <!--  Essential META Tags -->
    <title><?= $getVid_Name ?></title>
    <meta property="og:title" content="<?= $getVid_Name ?>">
    <meta property="og:type" content="video.movie" />

    <meta property="og:image" content="<?= $metaThumbnail ?>">
    <meta property="og:url" content="<?= $absolute_url ?>">

    <!--  Non-Essential, But Recommended -->
    <meta property="og:description" content="<?= $getVid_Description ?>">
    <meta name="description" content="<?= $getVid_Description ?>">
    <meta property="og:site_name" content="<?= $getVid_Name ?>">
    <meta name="twitter:image:alt" content="<?= $getVid_Name ?>">

    <!-- Twitter META Tags -->
    <meta name="twitter:title" content="<?= $getVid_Name ?>">
    <meta name="twitter:description" content="<?= $getVid_Description ?>">
    <meta name="twitter:image" content=" <?= $metaThumbnail ?>">
    <meta name="twitter:card" content="summary_large_image">

    <body id="watch_body">
        <!-- HEADER CONTENT -->
        <?php include "header.php" ?>
        <!-- BODY CONTENT BELOW -->
        <section class="main_body">
            <!-- ===== TeleNode Content Dynamically Updated ===== -->
            <div class="main_content">
                <div class="project_data" data-getVid_id='<?= $getVid_id ?>' data-getVid_UID='<?= $getVid_UID ?>' data-getVid_userID='<?= $getVid_userID ?>' data-getVid_URLS='<?= $getVid_URLS ?>' data-getVid_ProjectData='<?= $getVid_ProjectData ?>' data-getVid_Name='<?= $getVid_Name ?>' data-getVid_Description='<?= $getVid_Description ?>' data-getVid_Thumbnail='<?= $getVid_Thumbnail ?>' data-getVid_Visibility='<?= $getVid_Visibility ?>' data-getVid_Status='<?= $getVid_Status ?>' data-getVid_Views='<?= $getVid_Views ?>' data-getVid_UploadTime='<?= $getVid_UploadTime ?>'>
                </div>
            <?php
        } else {
            $URL = "home.php#dashboard";

            echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
            echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
        }
            ?>
            <!-- <video autoplay muted controls id="video_player" onerror="alert('Error Playing Video')"></video> -->

            <!-- poster="img/empty_thumbnail.png"  -->
            <div class="video_container">
                <video id="my-video" class="video-js vjs-theme-city vjs-16-9" controls preload="auto" data-setup="{}">
                    <!-- <!-- <source src="MY_VIDEO.mp4" type="video/mp4" /> -->
                    <!-- <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/webm" /> -->
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                    </p>
                </video>
                <div class="video_info">
                    <h2><?= $getVid_Name ?><?= $visibility_icon ?></h2>
                    <div class="video_details">
                        <p class="upload_day"><?= date("M jS, Y", strtotime($getVid_UploadTime)); ?></p>
                        <p class="view_count"><?= $views ?></p>
                    </div>

                    <a href="user?id=<?= $getUsernames ?>" class="video_author" title="Visit <?= $getUsernames ?>'s profile">
                        <img src="<?= $profileImg ?>" alt="profile picture" class="author_image">
                        <p class="author_username"><?= $getUsernames ?></p>
                    </a>
                    <p class="main_vid_description"><?= $getVid_Description ?></p>
                </div>
            </div>
            <!-- <button class="btn video_debug_btn" style="z-index: 999999999999;">DEBUG</button> -->
            <div id="dashboard-container">
                <?php
                // $sql = "SELECT * from tb_videos where vid_visibility = 'public' ORDER BY RAND ()";
                $uuid = $_GET["id"];

                $sql = "SELECT v.*, u.userName,u.profileImg from tb_videos v inner join tb_users u on v.vid_userID=u.userID where v.vid_visibility = 'public' AND v.vid_UID != '$uuid' AND v.vid_status = 'published' ORDER BY RAND ()";

                include "populate_list.php";
                ?>

            </div>
            </div>
            <?php include "footer.php" ?>
        </section>
        <script src="https://vjs.zencdn.net/7.17.0/video.min.js"></script>
        <script src="//cdn.sc.gl/videojs-hotkeys/latest/videojs.hotkeys.min.js"></script>
        <script src="js/tn-player.js?v=<?= time() ?>"></script>
        <script>
            collapseSidebar()
        </script>
    </body>

</html>