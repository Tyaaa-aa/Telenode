<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php include "head.php" ?>
<?php include "verifyuser.php"; ?>

<body>
    <!-- HEADER CONTENT -->
    <?php include "header.php" ?>
    <!-- BODY CONTENT BELOW -->
    <section class="main_body edit_page">
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
                <button class="publish_btn btn" title="Publish Project">
                    <span class="material-icons">
                        publish
                    </span>
                    <span class="publish_btn_label">Publish</span>
                </button>
                <button class="save_btn btn" title="Save Project">
                    <span class="material-icons">
                        save
                    </span>
                    <!-- <span>Save</span> -->
                </button>
                <span class="save_msg save_msg_closed">Project saved!</span>
                <!-- <button class="jsondebug btn" style="position:fixed;bottom:5%;right:2%;z-index:99999;">(Download Current Data)</button> -->
            </div>
            <div class="create_container">
                <div class="edit_container">
                    <div class="projects_box list_style" data-getVid_id='<?= $getVid_id ?>' data-getVid_UID='<?= $getVid_UID ?>' data-getVid_userID='<?= $getVid_userID ?>' data-getVid_URLS='<?= $getVid_URLS ?>' data-getVid_ProjectData='<?= $getVid_ProjectData ?>' data-getVid_Name='<?= $getVid_Name ?>' data-getVid_Description='<?= $getVid_Description ?>' data-getVid_Thumbnail='<?= $getVid_Thumbnail ?>' data-getVid_Visibility='<?= $getVid_Visibility ?>' data-getVid_Status='<?= $getVid_Status ?>' data-getVid_UploadTime='<?= $getVid_UploadTime ?>'>
                        <h3 id="projects_box_title"><?= $getVid_Name ?><span class="vid_counter"></span></h3>
                        <div class="projects_box_toolbar">
                            <div class="toolbar_btns_container">
                                <span class="material-icons list_view_btn toolbar_btns toolbar_btns_active" title="List View">
                                    format_list_bulleted
                                </span>
                                <span class="material-icons card_view_btn toolbar_btns" title="Card View">
                                    view_agenda
                                </span>
                                <div class="add_videos_btn add_videos_btn_hidden toolbar_btns" title="Add Videos">
                                    <i class="material-icons add_video_icon">add</i>
                                    <div class="add_video_container">
                                        <input type="text" placeholder="Add Videos" class="add_video_input input_field">
                                        <button type="button" value="Submit" class="search_btn add_btn_submit">
                                            <i class="material-icons">add</i>
                                        </button>
                                    </div>
                                </div>
                                <span class="material-icons edit_videos_btn toolbar_btns" title="Edit Videos">
                                    edit
                                </span>
                            </div>
                            <div class="toolbar_search">
                                <input type="text" placeholder="Search" class="search_input input_field">
                                <!-- <button type="button" value="Submit" class="search_btn">
                                        <i class="material-icons">search</i>
                                    </button> -->
                            </div>
                        </div>
                    </div>

                    <div class="edit_projects">
                        <div class="project_blocks project_blocks_starter">
                            <span class="parent_indicator">
                                <div class="pi_dot starter_dot">
                                    <span class="material-icons">
                                        play_arrow
                                    </span>
                                    <p>Starting question</p>
                                </div>
                            </span>

                            <div class="block_video block_box">
                                <div class="video_cards_container">
                                    <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field">
                                    <div class="video_cards">
                                        <div class="thumbnail-box">
                                            <img class="thumbnail" src="img/empty_thumbnail.png" alt="Thumbnail">
                                        </div>
                                        <h4 class="video_title"> </h4>
                                    </div>
                                </div>
                                <div class="input_container">
                                    <input type="text" placeholder="Question/Prompt" class="input_field question_title">
                                    <div class="dropbtn_container">
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly data-videoid="">
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="block_questions_container">
                                <div class="block_questions block_box">
                                    <input type="text" placeholder="Option 1" class="input_field options_field">
                                    <div class="dropbtn_container">
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly>
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field">
                                        <div class="video_cards">
                                            <div class="thumbnail-box">
                                                <img class="thumbnail" src="img/empty_thumbnail.png" alt="Thumbnail">
                                            </div>
                                            <h4 class="video_title"> </h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="block_questions block_box">
                                    <input type="text" placeholder="Option 1" class="input_field options_field">
                                    <div class="dropbtn_container">
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly>
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field">
                                        <div class="video_cards">
                                            <div class="thumbnail-box">
                                                <img class="thumbnail" src="img/empty_thumbnail.png" alt="Thumbnail">
                                            </div>
                                            <h4 class="video_title"> </h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="block_questions block_box">
                                    <input type="text" placeholder="Option 1" class="input_field options_field">
                                    <div class="dropbtn_container">
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly>
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field">
                                        <div class="video_cards">
                                            <div class="thumbnail-box">
                                                <img class="thumbnail" src="img/empty_thumbnail.png" alt="Thumbnail">
                                            </div>
                                            <h4 class="video_title"> </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <img src="img/create_placeholder.png" alt="Placeholder" style=" position: absolute;top: 15%;left: 30%;width: 50%;"> -->
            </div>

            <form class="publish_form" action="publish_backend.php" method="POST" enctype="multipart/form-data">
                <div class="publish_form_row">
                    <div class="input_fields_container">
                        <label for="project_name">Project Name</label>
                        <input type="text" placeholder="Project Name" class="input_field upload_input_field" name="project_name" required value="<?= $getVid_Name ?>" id="project_name">
                        <label for="project_description">Project Description</label>
                        <textarea type="text" placeholder="Project Description" class="input_field upload_input_field" name="project_description" required id="project_description"><?= $getVid_Description ?></textarea>
                    </div>
                    <div class="thumbnail_upload thumbnail-box">
                        <input type="file" class="thumbnail_input" name="thumbnail_image" id="upload-img" title="Upload Thumbnail" accept="image/png, image/jpeg">
                        <img class="thumbnail_upload_image thumbnail" src="<?= $getVid_Thumbnail ?>" alt="Thumbnail">
                        <i class="material-icons">
                            photo_library
                        </i>
                    </div>
                </div>
                <?php
                $public = "";
                $unlisted = "";
                $private = "";

                if ($getVid_Visibility == "public") {
                    $public = "checked";
                } else if ($getVid_Visibility == "unlisted") {
                    $unlisted = "checked";
                } else if ($getVid_Visibility == "private") {
                    $private = "checked";
                }
                ?>
                <div>
                    <label class="control control-radio">
                        Public
                        <input type="radio" id="public" name="visibility" value="public" required <?= $public ?> />
                        <div class="control_indicator"></div>
                    </label>
                    <label class="control control-radio">
                        Unlisted
                        <input type="radio" id="unlisted" name="visibility" value="unlisted" required <?= $unlisted ?> />
                        <div class="control_indicator"></div>
                    </label>
                    <label class="control control-radio">
                        Private
                        <input type="radio" id="private" name="visibility" value="private" required <?= $private ?> />
                        <div class="control_indicator"></div>
                    </label>
                </div>

                <input type="hidden" value="<?= $getVid_UID ?>" name="videoUUID">
                <input type="hidden" value="<?= $getVid_id ?>" name="videoID">
                <input type="submit" value="Publish" class="publish_form_btn btn">
            </form>
        </div>
        <?php include "footer.php" ?>

    </section>
    <script>
        collapseSidebar()

        listYTVideos($(".projects_box"), true)
        populateProjectData($(".projects_box"))

        $(".publish_btn").click()
    </script>
</body>

</html>