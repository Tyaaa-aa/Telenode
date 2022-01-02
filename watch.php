<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>
<link href="https://vjs.zencdn.net/7.17.0/video-js.css" rel="stylesheet" />
<!-- Video.js base CSS -->
<link href="https://unpkg.com/video.js@7/dist/video-js.min.css" rel="stylesheet" />

<!-- City -->
<link href="https://unpkg.com/@videojs/themes@1/dist/city/index.css" rel="stylesheet" />

<body id="watch_body">
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
                    $getVid_UID = $row['vid_UID'];
                    $getVid_userID = $row['vid_userID'];
                    $getVid_URLS = $row['vid_URLS'];
                    $getVid_ProjectData = $row['vid_projectData'];
                    $getVid_Name = $row['vid_name'];
                    $getVid_Description = $row['vid_description'];
                    $getVid_Thumbnail = $row['vid_thumbnail'];
                    $getVid_Visibility = $row['vid_visibility'];
                    $getVid_Status = $row['vid_status'];
                    $getVid_UploadTime = $row['vid_uploadTime'];
                }
            ?>
                <div class="project_data" data-getVid_id='<?= $getVid_id ?>' data-getVid_UID='<?= $getVid_UID ?>' data-getVid_userID='<?= $getVid_userID ?>' data-getVid_URLS='<?= $getVid_URLS ?>' data-getVid_ProjectData='<?= $getVid_ProjectData ?>' data-getVid_Name='<?= $getVid_Name ?>' data-getVid_Description='<?= $getVid_Description ?>' data-getVid_Thumbnail='<?= $getVid_Thumbnail ?>' data-getVid_Visibility='<?= $getVid_Visibility ?>' data-getVid_Status='<?= $getVid_Status ?>' data-getVid_UploadTime='<?= $getVid_UploadTime ?>'></div>
            <?php
            }
            ?>
            <!-- <video autoplay muted controls id="video_player" onerror="alert('Error Playing Video')"></video> -->

            <!-- poster="img/empty_thumbnail.png"  -->
            <video id="my-video" class="video-js vjs-theme-city vjs-16-9" controls preload="auto" data-setup="{}" autoplay>
                <!-- <!-- <source src="MY_VIDEO.mp4" type="video/mp4" /> -->
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/webm" /> -->
                <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
                    <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                </p>
            </video>

            <button class="btn video_debug_btn" style="z-index: 999999999999;">DEBUG</button>
        </div>
        <?php include "footer.php" ?>
    </section>
    view
    <br>
    <script src="https://vjs.zencdn.net/7.17.0/video.min.js"></script>
    <script>
        collapseSidebar()

        // container = container to be populated with data provided
        // isYT = is this a youtube link or local project link, true = youtube & false = local
        // listYTVideos($(".projects_box"), false)

        let container = $(".project_data")
        let videoData = container.attr("data-getVid_ProjectData")
        videoData = JSON.parse(videoData)
        // console.log();
        let firstVid = Object.values(videoData)


        $(".video_debug_btn").click(function() {
            // playThisVid(firstVid[0].videoID)
            // $('#my-video').attr('src', "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4")
            changeVid(firstVid[0].videoID)
        })

        const myPlayer = videojs('my-video', {
            // aspectRatio: '16:9',
            responsive: true,
            controlBar: {
                'pictureInPictureToggle': false
            }
        })

        myPlayer.on("fullscreenchange", function(e) {
            e.preventDefault()
            // myPlayer.exitFullscreen()

            console.log("FULLSCREEN");
        })

        function changeVid(videoid) {
            let videoLinks = extractVidId(videoid)
            let firstVidURL = getVidData(videoLinks)
            // await async function
            firstVidURL.then(function(result) {
                let vidLink = JSON.parse(result).links
                myPlayer.src({
                    type: 'video/mp4',
                    src: vidLink[0]
                })
                myPlayer.ready(function() {
                    myPlayer.play()
                })
            })
        }

        // myPlayer.on("ended", function() {
        //     // Do this when video ends
        //     console.log("Video Ended");
        // })


        var ModalDialog = videojs.getComponent('ModalDialog');

        var modal = new ModalDialog(myPlayer, {
            //  content:'test content',
            temporary: false,
            description: 'description',
            label: "test"
            //closeable:true
        });

        myPlayer.addChild(modal);

        myPlayer.on('ended', function() {
            console.log("Video Ended");
            // modal.open();
        });

        myPlayer.on("play", function() {
            modal.open();

        })


        modal.on('modalopen', function() {
            console.log('modalopen')
            modal.contentEl().innerHTML = /* HTML */ `
                <div class='modal'>
                    <h1>Hola  mundo</h1>
                </div>
            `;
        });

        // $("#watch_body").on("click", ".modal h1", function() {
        //     console.log("Clicked h1");
        // })




        function startVideo() {
            console.log(videoData)
            console.log(firstVid[0].questionTitle)
            console.log(firstVid[0].videoID)
            // console.log(firstVid.length)
            // firstVid = firstVid[0]
            // playThisVid(firstVid)
            // console.log(firstVid)
        }

        startVideo()

        // function playThisVid(videolinks) {
        //     let firstVidURL = getVidData(videolinks)
        //     // await async function
        //     firstVidURL.then(function(result) {
        //         console.log("Found Video: \n" + JSON.parse(result).links)
        //         let vidLink = JSON.parse(result).links
        //         $('#video_player').attr('src', vidLink)
        //         $('#video_player').focus()
        //     })
        // }
    </script>
</body>

</html>