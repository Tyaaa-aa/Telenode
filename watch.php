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

    if (isset($_GET["status"])) {
        // $status = $_GET["status"];
        if (($getVid_Status == "unpublished") && ($getVid_userID == $_SESSION["userID"])) {
            // echo "<script type='text/javascript'>alert('Project is unpublished! You are the owner!');</script>";
?>
            <script>
                $(document).ready(function() {
                    $(".video_info h2").append(`<span class="material-icons visibility_icon" style="right:15px;" title="Project is unpublished">unpublished</span>`)
                });
            </script>
    <?php
        } else {
            // Redirect if user is not author
            $URL = "home.php#projects";
            echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
            echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
        }
    }

    if ($getVid_Visibility == "private" && $getVid_userID != $getUserID) {
        $URL = "home.php#dashboard";
        echo "<script type='text/javascript'>document.location.href='{$URL}';</script>";
        echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
    }
    // else if ($getVid_Status == "unpublished") {
    //     $URL = "home.php#projects";
    //     echo "<script type='text/javascript'>alert('Project is unpublished! If you are the owner of this project please publish it first!');document.location.href='{$URL}';</script>";
    //     echo '<META HTTP-EQUIV="refresh" content="0;URL=' . $URL . '">';
    // }
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
                        <div class="share_container">
                            <span class="material-icons share_btn" title="Share this project">
                                share
                            </span>
                            <div class="share_social_container ">
                                <a href="https://api.whatsapp.com/send/?phone&text=Watch%20<?= $getVid_Name ?>%0D%0A<?= $absolute_url ?>" class="share_btns share_whatsapp " target="_blank" title="Share to Whatsapp">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com/intent/tweet?url=<?= $absolute_url ?>&text=Watch%20<?= $getVid_Name ?>%0D%0A" class="share_btns share_twitter" target="_blank" title="Share to Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                                    </svg>
                                </a>
                                <a href="mailto:?body=Watch%20<?= $getVid_Name ?>%0D%0A<?= $absolute_url ?>" class="share_btns share_email" target="_blank" title="Share E-Mail">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
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