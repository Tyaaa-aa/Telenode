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
            <video id="my-video" class="video-js vjs-theme-city vjs-16-9" controls preload="auto" data-setup="{}">
                <!-- <!-- <source src="MY_VIDEO.mp4" type="video/mp4" /> -->
                <!-- <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/webm" /> --> -->
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


        $(".video_debug_btn").click(function() {
            // playThisVid(firstVid[0].videoID)
            // $('#my-video').attr('src', "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4")
            changeVid(firstVid[0].videoID)
        })

        // Initialize video player
        const myPlayer = videojs('my-video', {
            // aspectRatio: '16:9',
            muted: true,
            autoplay: true,
            responsive: true,
            controlBar: {
                'pictureInPictureToggle': false
            }
        })

        // Get project data
        let projectData = $(".project_data").attr("data-getVid_ProjectData")
        projectData = JSON.parse(projectData)
        // console.log();
        let firstVid = Object.values(projectData)


        let optionsBlocks

        let firstBlock = projectData[0]
        console.log(firstBlock);

        playBlock(firstBlock)
        function playBlock(block) {
            console.log(projectData)

            let currentVideoid = extractVidId(block.videoID)
            let currentVideoOptions = block.options
            let currentVideoTitle = block.questionTitle
            let currentVideoBlock = block.blockID
            optionsBlocks = $("<div class='modal'></div>")
            for (let i = 0; i < currentVideoOptions.length; i++) {
                console.log(currentVideoOptions[i].title);
                let thisTitle = currentVideoOptions[i].title
                let optionVideoBlock = thisTitle
                if (!thisTitle == "" || !thisTitle == undefined) {
                    optionsBlocks.append(`
                    <div class="video_options" data-blockid="${optionVideoBlock}" data-title="${thisTitle}">
                        ${thisTitle}
                    </div>`)
                }
            }
            optionsBlocks = /* HTML */
                `<div class='modal'>
                    <div class="modal_content">
                        <h1>${currentVideoTitle}</h1>
                        <div class="video_options_container">
                            ${optionsBlocks.html()}
                        </div>
                    </div>
                </div>`
            console.log(optionsBlocks)
            // Play first video (Add true 2nd parameter to disable autoplay)
            changeVid(currentVideoid)
        }



        // Main video playing function Add true 2nd parameter to disable autoplay
        function changeVid(videoid, noautoplay) {
            let videoLinks = extractVidId(videoid)
            let vidUrl = getVidData(videoLinks)
            // await async function
            vidUrl.then(function(result) {
                let vidLink = JSON.parse(result).links
                myPlayer.src({
                    type: 'video/mp4',
                    src: vidLink[0]
                })
                if (noautoplay) return
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
            modal.open();
        });

        modal.on('modalopen', function() {
            console.log('modalopen')
            modal.contentEl().innerHTML = optionsBlocks
        });

        // Click on options
        $("#watch_body").on("click", ".video_options", function() {
            let selectedOptionTitle = $(this).data("title")
            let selectedOptionBlockID = $(this).data("blockid")
            console.log(selectedOptionTitle, selectedOptionBlockID);

            let nextBlock = filter(projectData, selectedOptionBlockID, 'blockID')[0]
            console.log(nextBlock)
            modal.close();
            playBlock(nextBlock)
        })

        const filter = (array, value, key) => {
            return array.filter(
                key ?
                (a) => a[key].toLowerCase().includes(value.toLowerCase()) :
                (a) =>
                Object.keys(a).some((k) =>
                    a[k].toLowerCase().includes(value.toLowerCase())
                )
            )
        }

        const data = [{
                "foo": "bar",
                "bar": "sit"
            },
            {
                "foo": "lorem",
                "bar": "ipsum"
            },
            {
                "foo": "dolor blor",
                "bar": "amet blo"
            }
        ];

        filter(data, 'o', 'foo')

        // function findBlockid(blockid){
        //     return fruit.blockID === blockid;

        // }

        // const inventory = [{
        //         name: 'apples',
        //         quantity: 2
        //     },
        //     {
        //         name: 'bananas',
        //         quantity: 0
        //     },
        //     {
        //         name: 'cherries',
        //         quantity: 5
        //     }
        // ];

        // function isCherries(fruit) {
        //     return fruit.name === 'cherries';
        // }

        // console.log(inventory.find(isCherries));
        // // { name: 'cherries', quantity: 5 }


        myPlayer.on("play", function() {
            // modal.open();

        })


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