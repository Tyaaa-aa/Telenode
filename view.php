<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->
    <section class="main_body">
        <!-- ===== TeleNode Content Dynamically Updated ===== -->
        <div class="main_content">


            <?php
            include "db_connect.php";
            $uuid = $_GET["id"];

            $result = $conn->query("SELECT * from tb_videos where vid_UID = '$uuid'");
            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    // Assign all user table content to variables for use later
                    $hasVid = true;
                    $getVid_id = $row['vid_id'];
                    $getVid_userID = $row['vid_userID'];
                    $getVid_URLS = $row['vid_URLS'];
                    $getVid_Name = $row['vid_name'];
                    $getVid_Description = $row['vid_description'];
                    $getVid_Thumbnail = $row['vid_thumbnail'];
                    $getVid_Visibility = $row['vid_visibility'];
                    $getVid_Status = $row['vid_status'];
                    $getVid_UploadTime = $row['vid_uploadTime'];
                }
            ?>

                <div class="projects_box" data-getVid_id='<?= $getVid_id ?>' data-getVid_userID='<?= $getVid_userID ?>' data-getVid_URLS='<?= $getVid_URLS ?>' data-getVid_Name='<?= $getVid_Name ?>' data-getVid_Description='<?= $getVid_Description ?>' data-getVid_Thumbnail='<?= $getVid_Thumbnail ?>' data-getVid_Visibility='<?= $getVid_Visibility ?>' data-getVid_Status='<?= $getVid_Status ?>' data-getVid_UploadTime='<?= $getVid_UploadTime ?>'>
                </div>
            <?php
            }
            ?>
            <video autoplay muted controls class="vid_preview">

            </video>
        </div>
        <?php include "footer.php" ?>
    </section>
    view
    <br>

    <script>
        collapseSidebar();

        let container = $(".projects_box");
        let videoData = container.data("getvid_urls")
        let videoDataArray = Object.keys(videoData);
        console.log(videoData);
        console.log(videoDataArray[0]);
        for (const [key, value] of Object.entries(videoData)) {
            // console.log(`${key}: ${value}`);
            let videoNum = key;
            let videoID = extractVidId(value);
            let videoInfo = getVidInfo(videoID)
            let thumbnail = "https://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg";
            let title = videoInfo.title;
            console.log(videoID, title, thumbnail);

            container.append(`
        <div class="video_cards video_cards_${videoNum}" onclick="playThisVid('${videoID}')" >
            <div class="thumbnail-box">
                <img class="thumbnail" src="${thumbnail}" alt="Thumbnail">
            </div>
            <h4>
                ${title}
            </h4>
        </div>`)
        }
        let firstVid = Object.values(videoData)[0];
        console.log(firstVid);

        playThisVid(firstVid);
        function playThisVid(videolinks) {
            let firstVidURL = getVidData(videolinks);
            console.log(firstVidURL.video);
            $('.vid_preview').attr('src', firstVidURL.video);
            // $('.vid_preview').load();
            // $('.vid_preview').play();
        }

        // getVidData(videoID)
    </script>
    <style>
        .main_content {
            display: flex;
            justify-content: space-around;
        }
    </style>
</body>

</html>