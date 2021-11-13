<?php
header('Access-Control-Allow-Origin: *');
?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>




<h2>API TEST DEMO</h2>
<div id="images"></div>

<script>
    // https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ

    var url = "https://www.youtube.com/watch?v=LXb3EKWsInQ";

    // $.get("https://yt2htmlcors.herokuapp.com/video_info.php?url=" + url, function(data, status, xhr) {
    //     console.log(xhr.status);
    //     // IF STATUS IS 200(SUCCESS) SET MAP VIEW TO SEARCHED LOCATION
    //     if (xhr.status = 200) {
    //         console.log(data);
    //     } else {
    //         // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
    //         console.log("ERROR");

    //     }
    // }).fail(function() {
    //     // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
    //     console.log("ERROR");
    // });

    $.getJSON('https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ', function(data) {
        // JSON result in `data` variable
        console.log(data);
    });
</script>