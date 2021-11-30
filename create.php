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
                <form class="upload_field_box" action="start_create_backend.php" method="POST">
                    <input type="submit" class="btn submit_btn" value="Next">
                    <input type="hidden" value="0" id="videoLength" name="videoLength">
                    <input type="hidden" value="img/placeholder_thumbnail.png" id="videoThumbnail" name="videoThumbnail">
                    <input type="text" placeholder="Add video" class="input_field upload_input_field" name="video_0">
                </form>
            </div>
        </div>
        <?php include "footer.php" ?>
    </section>


</body>

</html>

<!-- Testing Script -->
<script>
    // THIS DOESNT WORK SO PLEASE FIX IT OK THANKS BYE 
    $(document).on("keyup", ".upload_input_field", function() {
        // console.log("ASDASD");
        if ($(".upload_input_field").last().val() != "") {
            // Add Fields
            console.log("Adding field");
            let vidNum = $(".upload_input_field").length;
            $("#videoLength").val(vidNum)
            $(".upload_field_box").append('<input type="text" placeholder="Add video" class="input_field upload_input_field" name="video_' + vidNum + '">');
            $(".submit_btn").fadeIn();
        } else if ($(".upload_input_field").last().prev().val() == "") {
            // Delete empty field
            console.log("Deleting field");
            $(".upload_input_field").last().fadeOut(300, function() {
                $(".upload_input_field").last().remove()
            });
        }
        console.log(($(".upload_input_field").length));
    });

    $(".upload_field_box").submit(function(e) {
        let thisVidID = extractVidId($(".upload_input_field").first().val())
        $("#videoThumbnail").val("https://i.ytimg.com/vi/" + thisVidID + "/hqdefault.jpg");
        $(".upload_input_field").last().removeAttr("name");
    });


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