<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->



    <input type="text" id="ytlink">
    <button id="addVid">Add Vid</button>
    <br>

    <!-- FOOTER CONTENT -->
    <img id="thumbnail" src="">

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


    // const imgurl = "https://www.youtube.com/watch?v=liMkmUXdxCc";

    function extractVidId(url) {
        let re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
        if (url.length > 11) {
            let id = url.match(re)[7];
            return id;
        } else {
            return url;
        }
    }

    let imgurl = extractVidId("https://youtu.be/liMkmUXdxCc")
    
    const img = "https://i.ytimg.com/vi/" + imgurl + "/mqdefault.jpg";


    $("#thumbnail").attr("src", img)


    playVideo(jsonData.videos[playstate])

    function playVideo(vidURL) {
        // showPreloader();

        // GET VIDEO URL FROM API
        $.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + vidURL, function(data, status, xhr) {
            // console.log(xhr.status);
            // IF STATUS IS 200 (SUCCESS) 
            if (xhr.status = 200) {
                // JSON result in `data` variable
                // console.log(data);
                if ("links" in data) {
                    // API returned a usable link successfully
                    console.log("%c✔ SUCCESS", "color:green;", "\nURL: " + data.links[0]);
                    //Load the player with new source
                    $("#video-player").attr("src", data.links[0]);
                    hidePreloader();

                } else {
                    // API did not return usable link
                    console.log("%c ❌ ERROR", "color:red;");
                    hidePreloader();
                }
            } else {
                // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
                console.log("%c ❌ ERROR", "color:red;");
                hidePreloader();
            }
        }).fail(function() {
            // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
            console.log("%c ❌ ERROR", "color:red;");
        });
    }
</script>