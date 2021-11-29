<div class="loading_bar"></div>
<div>
    Hello <?= $getUserName ?>. This is the
    <br><br>
    <h2>Dashboard</h2>
    <br><br>
    <img id="thumbnail1" src="">
    <img id="thumbnail2" src="">
    <img id="thumbnail3" src="">
    <img id="thumbnail4" src="">
    <img id="thumbnail5" src="">
</div>
<script>
    //REALLY JANKY FAKE LOADING ANIMATION SO IT DOESNT LOOK LIKE THE BROWSER HANGED LOL
    setTimeout(() => {
        $(".loading_bar").css("width", "<?= Rand(40, 60) ?>%")
    }, 10);

    setTimeout(() => {
        videos()
        $(".loading_bar").css("width", "100%")
    }, 500);

    setTimeout(() => {
        $(".loading_bar").css("opacity", "0%")
    }, 700);

    function videos() {
        let videoOne = getVidData("https://www.youtube.com/watch?v=DQsS3sPstAY");
        $("#thumbnail1").attr("src", videoOne.thumbnail)

        let videoTwo = getVidData("https://www.youtube.com/watch?v=qHoQ8bxEL-s");
        $("#thumbnail2").attr("src", videoTwo.thumbnail)

        let videoThree = getVidData("https://www.youtube.com/watch?v=gx50o5OndoE");
        $("#thumbnail3").attr("src", videoThree.thumbnail)

        let videoFour = getVidData("https://www.youtube.com/watch?v=SIv1rmGZKrw");
        $("#thumbnail4").attr("src", videoFour.thumbnail)

        let videoFive = getVidData("https://www.youtube.com/watch?v=hmaBHltr43w");
        $("#thumbnail5").attr("src", videoFive.thumbnail)
        // console.log(videoOne);
        console.log("Video Url: " + videoOne.video);
        console.log("Title: " + videoOne.title);
        console.log("Thumbnail: " + videoOne.thumbnail);
    }