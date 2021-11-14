<?php
header('Access-Control-Allow-Origin: *');
?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>




<h2 id="heading">API TEST DEMO</h2>
<video autoplay muted controls id="video-player" width="60%">
    <!-- Effective Placeholder -->
    <source id="main-video" src="" type="video/mp4">
</video>

<script>
    // https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ

    // YOUTUBE URL
    var url = "https://www.youtube.com/watch?v=YE7VzlLtp-4";

    // GET VIDEO URL FROM API
    $.get("https://yt2htmlcors.herokuapp.com/api/?url=" + url, function(data, status, xhr) {
        console.log(xhr.status);
        // IF STATUS IS 200 (SUCCESS) 
        if (xhr.status = 200) {
            // JSON result in `data` variable
            console.log(data);
            if ("links" in data) {
                // API returned a usable link successfully
                console.log("URL: " + data.links[0]);
            } else {
                // API did not return usable link
                $("#heading").append("<span style='color:red'> (ERROR)</span>")
            }
            //Load the player with new source
            $("#video-player").append('<source id="main-video" src="' + data.links[0] + '" type="video/mp4">');
            $("#heading").append("<span style='color:green'> (SUCCESS)</span>")
        } else {
            // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
            console.log("ERROR");
            $("#heading").append("<span style='color:red'> (ERROR)</span>")
        }
    }).fail(function() {
        // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
        console.log("ERROR");
        $("#heading").append("<span style='color:red'> (ERROR)</span>")
    });

    // $.get('https://yt2htmlcors.herokuapp.com/api/?url=' + url, function(data) {
    //     // JSON result in `data` variable
    //     console.log(data.links[0]);
    //     // $("#main-video").attr("src", data.links[0]);
    //     // $("#video-player").load();
    //     $("#video-player").append('<source id="main-video" src="' + data.links[0] + '" type="video/mp4">')
    // });
</script>