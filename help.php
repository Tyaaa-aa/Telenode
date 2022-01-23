<link class="onboarding_content" href="https://vjs.zencdn.net/7.17.0/video-js.css" rel="stylesheet" />
<!-- Video.js base CSS -->
<link class="onboarding_content" href="https://unpkg.com/video.js@7/dist/video-js.min.css" rel="stylesheet" />
<!-- City -->
<link class="onboarding_content" href="https://unpkg.com/@videojs/themes@1/dist/city/index.css" rel="stylesheet" />
<style>
    .vjs-volume-panel {
        display: none !important;
    }
</style>
<section class="help_container">
    <?php
    if (isset($_SESSION["username"])) {
        $name = $_SESSION["username"];
    } else {
        $name = "Guest";
    }

    ?>
    <h1>Welcome to TeleNode, <?= $name ?>!</h1>
    <h3>TeleNode is an open-source and free interactive video platform.&nbsp;</h3>
    <p><br></p>
    <p><strong>1)</strong> To be able to create a TeleNode project you will first need to have a YouTube account to <a href="https://www.youtube.com/upload" rel="noopener noreferrer" target="_blank">upload</a> your videos to. You can sign up for an account <a href="https://www.youtube.com/upload" rel="noopener noreferrer" target="_blank">here</a> if you don&apos;t have one already.&nbsp;</p>
    <p><br></p>
    <p><strong>2)</strong> TeleNode does not host any videos but rather grabs them directly from YouTube. This allows TeleNode to operate at a minimal cost and therefore allows it to be free and host an unlimited amount of interactive projects. However, this comes at the cost of having to follow YouTube&apos;s copyright rules and thus, copyrighted materials such as music and other copyrighted materials will not be allowed on the platform. *Do note that some videos are not supported in HD as well and will be defaulted to 480p resolution as a result. This will however be fixed in future versions of TeleNode</p>
    <p><br></p>
    <p><strong>3)</strong> Alternatively, you could use videos that are already publicly available but be sure to follow copyright rules and do not use content that isn&apos;t free or not yours.</p>
    <p><br></p>
    <p><strong>4)</strong> Once you have uploaded your videos onto YouTube, you can copy the video links and paste them in the <a href="create.php">create</a> page and follow the instructions to start a new TeleNode project.&nbsp;</p>
    <p><br></p>
    <p><strong>5)</strong> After creating a project you may refer to the video tutorial below to start your first project</p>
    <br>
    <br>
    <div class="help_video">
        <video id="my-video" class="video-js vjs-theme-city vjs-16-9" autoplay muted controls loop preload="auto" data-setup="{}">
            <source src="img/onboarding_<?= $getUserTheme ?>.mp4" type="video/mp4">
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that supports JavaScript.
            </p>
        </video>
    </div>
    <br>
    <br>
    <h3>How Does TeleNode&apos;s "Unique Blocks" Work?</h3>
    <br>
    <p>TeleNode uses a unique block naming system as a way to create and traverse your interactive projects</p>
    <br>
    <p>Every option provided will create a new block with 3 more possible options from there. Be sure to use unique names for each unique block. Using the same name will bring you back to the first instance of a block with that name.</p>
    <br>
    <p>For example if you want to bring the user back to the start of the project you could have a block titled "Starting Block" and when clicked the user will be brought back to the first video in the project as all projects have a default first block named "Starting Block".
    </p>
    <br>
    <p>Click <a href="watch?id=example" rel="noopener noreferrer" target="_blank">here</a> for a live demo of how that would work.</p>
</section>