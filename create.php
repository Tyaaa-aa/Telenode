<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->

    <section class="main_body">
        <input type="text" id="ytlink">
        <button id="addVid">Add Vid</button>
        <br>

        <!-- FOOTER CONTENT -->
        <img id="thumbnail" src="">
        <br>

        <?php include "footer.php" ?>
    </section>


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
</script>