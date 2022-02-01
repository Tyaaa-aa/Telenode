<!DOCTYPE html>
<html>
<!-- HEAD CONTENT -->
<?php
include "head.php";
include "backend/verifyuser.php";

if ($isNewUser == 'true') {
    // Show onboarding sequence
    include "onboarding.php";
    $newUser = "newuser";
} else {
    $newUser = "";
}
?>

<body id="<?= $newUser ?>">
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

                <button class="settings_btn btn" title="More Options">
                    <span class="material-icons">
                        settings
                    </span>
                    <!-- <span>Save</span> -->
                </button>

                <div class="more_options_container">
                    <a href="watch.php?id=<?= $getVid_UID ?>" class="more_options options_watch" target="_blank">
                        <span class="material-icons">
                            play_circle_outline
                        </span>
                        Watch Video
                    </a>
                    <span class="more_options options_download">
                        <span class="material-icons">
                            save_alt
                        </span>
                        Download Data
                    </span>
                    <span class="more_options options_import">
                        <span class="material-icons">
                            import_export
                        </span>
                        Import
                        <input id="importJSON" type="file" accept="application/json" title="" />
                    </span>
                    <span class="more_options options_delete">
                        <span class="material-icons">
                            delete_forever
                        </span>
                        Delete Project
                    </span>
                </div>
                <button class="save_btn btn" title="Save Project">
                    <span class="material-icons">
                        save
                    </span>
                    <!-- <span>Save</span> -->
                </button>
                <span class="save_msg save_msg_closed">Project saved!</span>

                <button class="publish_btn btn" title="Publish Project">
                    <span class="material-icons">
                        publish
                    </span>
                    <span class="publish_btn_label">Publish</span>
                </button>
                <!-- <button class="jsondebug btn" style="position:fixed;bottom:5%;right:2%;z-index:99999;">(Download Current Data)</button> -->
            </div>
            <div class="create_container">
                <div class="edit_container">
                    <div class="projects_box list_style" data-getVid_id='<?= $getVid_id ?>' data-getVid_UID='<?= $getVid_UID ?>' data-getVid_userID='<?= $getVid_userID ?>' data-getVid_URLS='<?= $getVid_URLS ?>' data-getVid_ProjectData='<?= $getVid_ProjectData ?>' data-getVid_Name='<?= $getVid_Name ?>' data-getVid_Description='<?= $getVid_Description ?>' data-getVid_Thumbnail='<?= $getVid_Thumbnail ?>' data-getVid_Visibility='<?= $getVid_Visibility ?>' data-getVid_Status='<?= $getVid_Status ?>' data-getVid_UploadTime='<?= $getVid_UploadTime ?>'>
                        <h3 id="projects_box_title">
                            <?= $getVid_Name ?>
                            <br>
                            <span class="vid_counter"></span>
                        </h3>
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
                                <span class="material-icons edit_repo_btn toolbar_btns" title="Edit Videos">
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
                        <div class="project_blocks project_blocks_starter" data-blockuid="TN-STARTING%20BLOCK">
                            <span class="parent_indicator">
                                <div class="pi_dot starter_dot">
                                    <span class="material-icons">
                                        play_arrow
                                    </span>
                                    <p>Starting Block</p>
                                </div>
                            </span>

                            <div class="block_video block_box">
                                <div class="video_cards_container">
                                    <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field" tabindex="-1">
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
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly data-videoid="" tabindex="-1">
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
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly tabindex="-1">
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field" tabindex="-1">
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
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly tabindex="-1">
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field" tabindex="-1">
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
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly tabindex="-1">
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field" tabindex="-1">
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

            <form class="publish_form" action="backend/publish_backend.php" method="POST" enctype="multipart/form-data">
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
                <div class="success_message_container">
                    <?php
                    function url_origin($s, $use_forwarded_host = false)
                    {
                        $ssl      = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on');
                        $sp       = strtolower($s['SERVER_PROTOCOL']);
                        $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
                        $port     = $s['SERVER_PORT'];
                        $port     = ((!$ssl && $port == '80') || ($ssl && $port == '443')) ? '' : ':' . $port;
                        $host     = ($use_forwarded_host && isset($s['HTTP_X_FORWARDED_HOST'])) ? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
                        $host     = isset($host) ? $host : $s['SERVER_NAME'] . $port;
                        return $protocol . '://' . $host;
                    }

                    function full_url($s, $use_forwarded_host = false)
                    {
                        return url_origin($s, $use_forwarded_host) . $s['REQUEST_URI'];
                    }

                    $absolute_url = full_url($_SERVER);
                    $absolute_url = str_replace("edit", "watch", $absolute_url);
                    // echo $absolute_url;
                    ?>
                    <span class="success_icon material-icons">
                        task_alt
                    </span>
                    <h3 class="success_message_text">Project Published!</h3>
                    <br>
                    <a href="<?= $absolute_url ?>">Watch Video</a>
                    <div class="copy_link_container">
                        <span>Share: </span>
                        <input type="text" class="input_field view_project" value="<?= $absolute_url ?>" readonly>
                        <span class="copy_link_btn material-icons" title="Click to copy link">
                            content_copy
                        </span>
                        <span class="copy_msg">Copied</span>
                    </div>

                    <div class="share_social_container">
                        <a href="#" class="share_btns share_whatsapp " target="_blank" title="Share to Whatsapp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                            </svg>
                        </a>
                        <a href="#" class="share_btns share_twitter" target="_blank" title="Share to Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                            </svg>
                        </a>
                        <a href="#" class="share_btns share_email" target="_blank" title="Share E-Mail">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </form>
        </div>
        <?php include "footer.php" ?>

    </section>
    <script>
        collapseSidebar()

        listVideos($(".projects_box").data("getvid_urls"), true)
        populateProjectData($(".projects_box").attr("data-getVid_ProjectData"))

        // $(".publish_btn").click()
    </script>
</body>

</html>