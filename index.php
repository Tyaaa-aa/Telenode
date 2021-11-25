<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->


    <h2 id="heading">API TEST DEMO</h2>
    <video autoplay muted controls id="video-player" width="300px">
        <!-- Effective Placeholder -->
        <source id="main-video" src="" type="video/mp4">
    </video>

    <input type="text" id="ytlink">
    <button id="addVid">Add Vid</button>
    <br>

    <button id="nextVid">Next Vid</button>
    <button id="prevVid">Prev Vid</button>


    <!-- FOOTER CONTENT -->
    <?php include "footer.php" ?>
</body>

</html>

<?php
if (isset($_SESSION["userID"])) {
    $userid = $_SESSION["userID"];

    $result = $conn->query("SELECT * from tb_videos where vid_userID = $userid");
    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            // Assign all user table content to variables for use later
            // echo $row['profileImg'];
            $getVid_id = $row['vid_id'];
            $getVid_userID = $row['vid_userID'];
            $getVid_URLS = $row['vid_URLS'];
?>

<?php
        }
    }
}
?>
<!-- Testing Script -->
<script>
    // defaultTest();
    // Static Import
    // import * as data from './js/sample.json';
    // const {name} = data;
    // console.log(name); // output 'testing'

    // var json = require('./js/sample.json');
    // console.log(json); // output 'testing'

    // fetch("./js/sample.json")
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => console.log(data));

    var jsondData = <?= $getVid_URLS ?>;
    console.log(jsondData);
    console.log(jsondData.videos[0]);

    var playstate = 0;

    // const sample = ;
    playVideo(jsondData.videos[playstate])


    function playVideo(vidURL) {
        // showPreloader();

        // GET VIDEO URL FROM API
        $.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + vidURL, function(data, status, xhr) {
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
                    hidePreloader();
                    console.log("📗: SUCCESS");
                } else {
                    // API did not return usable link
                    console.log("📕: ERROR");
                    hidePreloader();
                }
            } else {
                // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
                console.log("📕: ERROR");
                hidePreloader();
            }
        }).fail(function() {
            // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
            console.log("📕: ERROR");
        });
    }

    $("#nextVid").click(function() {
        playstate++;
        playVideo(jsondData.videos[playstate])
    })
    $("#prevVid").click(function() {
        playstate--;
        playVideo(jsondData.videos[playstate])
    })








































    function defaultTest() {
        // YOUTUBE URL
        var url = "watch?v=YE7VzlLtp-4"; // DEFAULT TEST VIDEO (Big Buck Bunny)

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