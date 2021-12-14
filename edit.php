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
                <!-- <h2>Create New Project</h2> -->
                <div class="steps_container">
                    <div class="steps steps_one steps_number_active">
                        <h3 class="steps_number">1</h3>
                        <span>Videos</span>
                    </div>
                    <div class="steps steps_two steps_number_active">
                        <h3 class="steps_number">2</h3>
                        <span>Create</span>
                    </div>
                    <div class="steps steps_three">
                        <h3 class="steps_number">3</h3>
                        <span>Publish</span>
                    </div>
                </div>
                <button class="publish_btn btn">
                    <span class="material-icons">
                        publish
                    </span>
                    <span>Publish</span>
                </button>
            </div>
            <div class="create_container">
                <?php
                include "db_connect.php";
                $uuid = $_GET["id"];

                $result = $conn->query("SELECT * from tb_videos where vid_UID = '$uuid'");
                if ($result->num_rows > 0) {
                    // output data of each row
                    while ($row = $result->fetch_assoc()) {
                        // Assign all user table content to variables for use later
                        $hasVid = true;
                        $getVid_id = $row['vid_id'];
                        $getVid_userID = $row['vid_userID'];
                        $getVid_URLS = $row['vid_URLS'];
                        $getVid_Name = $row['vid_name'];
                        $getVid_Description = $row['vid_description'];
                        $getVid_Thumbnail = $row['vid_thumbnail'];
                        $getVid_Visibility = $row['vid_visibility'];
                        $getVid_Status = $row['vid_status'];
                        $getVid_UploadTime = $row['vid_uploadTime'];
                    }
                ?>

                    <div class="edit_container">
                        <div class="projects_box" data-getVid_id='<?= $getVid_id ?>' data-getVid_userID='<?= $getVid_userID ?>' data-getVid_URLS='<?= $getVid_URLS ?>' data-getVid_Name='<?= $getVid_Name ?>' data-getVid_Description='<?= $getVid_Description ?>' data-getVid_Thumbnail='<?= $getVid_Thumbnail ?>' data-getVid_Visibility='<?= $getVid_Visibility ?>' data-getVid_Status='<?= $getVid_Status ?>' data-getVid_UploadTime='<?= $getVid_UploadTime ?>'>
                            <h3>Video Repository</h3>
                        </div>
                        <div class="edit_projects">
                            <div class="project_blocks project_blocks_starter">
                                <!-- <div class=""><?= $getVid_URLS ?></div> -->
                                <input type="text" placeholder="Question" class="input_field">
                            </div>
                        </div>
                    </div>
                <?php
                }
                ?>
                <!-- <img src="img/create_placeholder.png" alt="Placeholder" style=" position: absolute;top: 15%;left: 30%;width: 50%;"> -->
            </div>
        </div>
        <?php include "footer.php" ?>

    </section>
    <script>
        collapseSidebar();

        // Can we change this to pure php later? There is really no point in using javascript to populate this list at all. The data in the parent div can stay but the populating should remain in pure PHP.....
        // ============================================================
        // Find a way to make the data only on parent div and not repeat on listed items
        listYTVideos($(".projects_box"))

        // console.log($(".projects_box").data("getvid_urls"));

        // for(){
        //     getVidInfo(videoID)
        // }

        $(".publish_btn").click(function() {
            $(".create_container").html(`<form action="publish.php" method="POST" class="publish_form">
            <input type="text" placeholder="Project Name" class="input_field upload_input_field" name="project_name" required>
            <input type="text" placeholder="Project Description" class="input_field upload_input_field" name="project_description" required>
            <div>
                <input type="radio" id="public" name="visibility" value="public">
                <label for="public">Public</label><br>
                <input type="radio" id="unlisted" name="visibility" value="unlisted">
                <label for="unlisted">Unlisted</label><br>
                <input type="radio" id="private" name="visibility" value="private">
                <label for="private">Private</label>
            </div>

            <input type="hidden" value="<?= $getVid_id ?>" name="videoUUID">
            <input type="submit" value="Submit" class="btn">
            </form>`)

            $(".steps_three").addClass("steps_number_active");
            $(".publish_btn").remove();
        })
    </script>
</body>

</html>