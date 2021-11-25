<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->


    <h2 id="heading">API TEST DEMO</h2>
    <video autoplay muted controls id="video-player" height="300px">
        <!-- Effective Placeholder -->
        <source id="main-video" src="" type="video/mp4">
    </video>

    <!-- <input type="text" id="ytlink">
    <button id="addVid">Add Vid</button> -->
    <br>

    <button class="btn" id="prevVid">Prev Vid</button>
    <button class="btn" id="nextVid">Next Vid</button>


    <!-- FOOTER CONTENT -->

    
    <?php include "footer.php" ?>
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
                    if (isset($_SESSION["userID"])) {
                        echo $getVid_URLS;
                    } else {
                        echo "{videos:['YE7VzlLtp-4']}";
                    }
                    ?>;
    console.log(jsonData);
    console.log(jsonData.videos[0]);
    console.log(jsonData.videos.length);

    let playstate = 0;

    // const sample = ;
    playVideo(jsonData.videos[playstate])


    // defaultTest();
    function defaultTest() {
        // YOUTUBE URL
        const url = "watch?v=YE7VzlLtp-4"; // DEFAULT TEST VIDEO (Big Buck Bunny)

        // GET VIDEO URL FROM API
        $.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + url, function(data, status, xhr) {
            console.log(xhr.status);
            // IF STATUS IS 200 (SUCCESS) 
            if (xhr.status = 200) {
                // JSON result in `data` variable
                console.log(data);
                if ("links" in data) {
                    // API returned a usable link successfully
                    console.log("URL: " + data.links[0]);
                    //Load the player with new source
                    $("#video-player").attr("src", data.links[0]);
                    $("#heading").append("<span style='color:green'> (SUCCESS)</span>");
                    hidePreloader();
                } else {
                    // API did not return usable link
                    $("#heading").append("<span style='color:red'> (ERROR)</span>");
                    hidePreloader();
                }
            } else {
                // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
                console.log("ERROR");
                $("#heading").append("<span style='color:red'> (ERROR)</span>");
                hidePreloader();
            }
        }).fail(function() {
            // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
            console.log("ERROR");
            $("#heading").append("<span style='color:red'> (ERROR)</span>")
        });
    }
</script>