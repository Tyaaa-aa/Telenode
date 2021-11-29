<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->
    <section class="main_body">
        <div class="main_content">
        </div>
        <?php include "footer.php" ?>
    </section>
    <script>
        let hash = document.location.hash;
        renderPage(hash);

        $(window).on('hashchange', function(e) {
            hash = document.location.hash;
            renderPage(hash);
        });

        function renderPage(hash) {
            if (hash == "") {
                $(".sidebar_items").removeClass("sidebar_items_selected")
                $(".sidebar_items").eq(0).addClass("sidebar_items_selected");
            } else {
                $(".sidebar_items").removeClass("sidebar_items_selected")
                $(".sidebar_items").each(function() {
                    if ($(this).attr("href").includes(hash)) {
                        $(this).addClass("sidebar_items_selected");
                        console.log(hash);
                    }
                })
            }

            // $('.sidebar_items').addClass("sidebar_items_selected");
            // console.log(hash);
            if (hash == '#projects') {
                // ===== IF PROJECTS TAB =====
                // console.log('projects');
                $(".main_content").html(`<?php include "projects.php" ?>`)
            } else
            if (hash == '#community') {
                // ===== IF COMMUNITY TAB =====
                // console.log('community');
                $(".main_content").html(`<?php include "community.php"; ?>`)
            } else
            if (hash == '#help') {
                // ===== IF HELP TAB =====
                // console.log('help');
                $(".main_content").html(`<?php include "help.php"; ?>`)
            } else {
                // Show Dashboard if none of other menu options
                // console.log('dashboard');
                $(".main_content").html(`<?php include "dashboard.php"; ?>`)
            }
        }
    </script>

    <!-- <h2 id="heading">API TEST DEMO</h2>
    <video autoplay muted controls id="video-player" height="300px">
        <source id="main-video" src="" type="video/mp4">
    </video> -->

    <!-- <input type="text" id="ytlink">
    <button id="addVid">Add Vid</button> -->

    <!-- <button class="btn" id="prevVid">Prev Vid</button>
    <button class="btn" id="nextVid">Next Vid</button> -->


    <!-- FOOTER CONTENT -->


</body>

</html>

<!-- Testing Script -->
<script>
    // =========================================
    // LOCAL JSON FOR TESTING PURPOSES
    // fetch("./js/sample.json")
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => console.log(data));
    // =========================================

    // Get JSON from database
    const jsonData = <?php
                        if (isset($_SESSION["userID"]) && $hasVid) {
                            echo $getVid_URLS;
                        } else {
                            echo "{videos:['huVVKz8P3vU']}";
                        }
                        ?>;
    // console.log(jsonData);
    // console.log(jsonData.videos[0]);
    // console.log(jsonData.videos.length);

    let playstate = 0;

    // const sample = ;
    // getVidData(jsonData.videos[playstate])


    // defaultTest();
    // function defaultTest() {
    //     // YOUTUBE URL
    //     const url = "www.youtu.be/huVVKz8P3vU"; // DEFAULT TEST VIDEO (Big Buck Bunny)

    //     let videoOne = getVidData(url);

    //     console.log("Video Url: " + videoOne.video);
    //     console.log("Title: " + videoOne.title);
    //     console.log("Thumbnail: " + videoOne.thumbnail);

    //     $("#video-player").attr("src", videoOne.video)
    // }
</script>