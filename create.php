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
            <div class="steps_bar">
                <h2>Create New Project</h2>
                <br>
                <div class="steps_container">
                    <div class="steps steps_one steps_number_active">
                        <h3 class="steps_number">1</h3>
                        <span>Videos</span>
                    </div>
                    <div class="steps steps_two">
                        <h3 class="steps_number">2</h3>
                        <span>Create</span>
                    </div>
                    <div class="steps steps_three">
                        <h3 class="steps_number">3</h3>
                        <span>Publish</span>
                    </div>
                </div>
            </div>

            <div class="upload_container">
                <div class="upload_splash_box">
                    <img src="img/create_splash.png" alt="Upload a video to start a new project!">
                    <p>
                        To get started you can watch the <a href="#">guide</a> on how to use TeleNode before starting your own project.
                        <br><br>
                        <strong>Step 1:</strong> Upload your videos onto <a href="#">YouTube</a>
                        <br>
                        <strong>Step 2:</strong> Name the videos accordingly (The video names from YouTube will be used as the title)
                        <br>
                        <strong>Step 3:</strong> Copy the video URL or press the share button and get the shareable link. You can also use just the video id (e.g. "aqz-KE-bpKQ")
                        <br>
                        <strong>Step 4:</strong> Paste the links and click next to start creating your project
                    </p>
                </div>
                <div class="upload_field_box">
                    <input type="text" placeholder="Add video" name="video1" class="input_field upload_input_field">

                </div>
            </div>
        </div>
        <?php include "footer.php" ?>
    </section>


</body>

</html>

<!-- Testing Script -->
<script>

    // THIS DOESNT WORK SO PLEASE FIX IT OK THANKS BYE 
    $(".upload_input_field").on("keyup", function() {
        console.log("ASDASD");

        if ($(".upload_input_field:last-child").val() != "") {
            console.log("ERRR");
            $(".upload_field_box").append(`<input type="text" placeholder="Add video" name="video1" class="input_field upload_input_field">`)
        }
    })

    console.log(($(".upload_input_field").length));
    // setTimeout(() => {
    //     $(".steps_two").addClass("steps_number_active")
    // }, 1000);

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
                            echo "{videos:['YE7VzlLtp-4']}";
                        }
                        ?>;
    // console.log(jsonData);
    // console.log(jsonData.videos[0]);
    // console.log(jsonData.videos.length);

    // videoOne()
    function videoOne() {
        let videoOne = getVidData("https://www.youtube.com/watch?v=dNCWe_6HAM8");

        $("#thumbnail").attr("src", videoOne.thumbnail)
        // console.log(videoOne);
        console.log("Video Url: " + videoOne.video);
        console.log("Title: " + videoOne.title);
        console.log("Thumbnail: " + videoOne.thumbnail);

        document.write("<br><br><br>Video Url: <br>" + videoOne.video)
        document.write("<br><br>Title: <br>" + videoOne.title);
        document.write("<br><br>Thumbnail: <br>" + videoOne.thumbnail);
    }
    collapseSidebar()
</script>