<div class="onboarding_container onboarding_content">
    <div class="onboarding_video_container">
        <video id="my-video" class="video-js vjs-theme-city vjs-16-9" autoplay muted controls loop autofocus preload="auto" data-setup="{}">
            <source src="img/onboarding_<?= $getUserTheme ?>.mp4" type="video/mp4">
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that supports JavaScript.
            </p>
        </video>

        <h2>Welcome to your first TeleNode Project!</h2>
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

        <button class="btn skip_onboarding">Start</button>
    </div>
</div>

<link class="onboarding_content" href="https://vjs.zencdn.net/7.17.0/video-js.css" rel="stylesheet" />
<!-- Video.js base CSS -->
<link class="onboarding_content" href="https://unpkg.com/video.js@7/dist/video-js.min.css" rel="stylesheet" />
<!-- City -->
<link class="onboarding_content" href="https://unpkg.com/@videojs/themes@1/dist/city/index.css" rel="stylesheet" />
<script class="onboarding_content" src="https://vjs.zencdn.net/7.17.0/video.min.js"></script>
<script class="onboarding_content" src="//cdn.sc.gl/videojs-hotkeys/latest/videojs.hotkeys.min.js"></script>

<style class="onboarding_content">
    #newuser {
        overflow: hidden;
    }

    .onboarding_container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(2px);
        z-index: 9999999;
    }

    .skip_onboarding {
        background-color: #FF8F44;
        margin: 0;
        margin-top: 20px;
        position: absolute;
        right: 20px;
        top: 70%;
    }

    .skip_onboarding:hover {
        background-color: #d3773a;
    }

    .onboarding_video_container {
        width: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        /* padding-bottom: 50px; */
        overflow: hidden;
        background-color: var(--mainColor);
        border-radius: var(--globalRadius);
        position: fixed;
        overflow-y: auto;
        max-height: 80%;
    }

    .onboarding_video_container p,
    .onboarding_video_container h3 {
        width: 70%;
    }

    #my-video {
        height: 100%;
        margin-bottom: 20px;
        border-radius: var(--globalRadius);
    }

    .vjs-volume-panel {
        display: none !important;
    }
</style>

<script class="onboarding_content">
    let defaultVolume = 0.5
    const myPlayer = videojs('my-video', {
        // aspectRatio: '16:9',
        // muted: true,
        autoplay: true,
        responsive: true,
        controlBar: {
            'pictureInPictureToggle': false
        }
    })

    myPlayer.on('volumechange', () => { // Store volume to save user preference
        let currentVolume = parseFloat(myPlayer.volume().toFixed(2))
        localStorage.setItem('userVolume', currentVolume)
    })

    // Set volume to previous user selected volume on load
    const userVolume = localStorage.getItem('userVolume')
    if (userVolume == null || userVolume == undefined || userVolume == "") {
        myPlayer.volume(defaultVolume) // Set volume to predefined default volume
    } else {
        myPlayer.volume(userVolume) // Set volume to user last set volume
    }

    // Attach hotkeys to video player
    videojs('my-video').ready(function() {
        this.hotkeys({
            volumeStep: 0.05,
            seekStep: 5,
            enableModifiersForNumbers: false
        })
    })

    $(document).ready(function() {
        $(".onboarding_video_container").css("transition", "all 1s")
    })

    $(".skip_onboarding").click(function() {
        $("#newuser").css("overflow", "auto")
        $(".onboarding_video_container").css({
            "width": "50% ",
            "left": "2%",
            "top": "27%",
            "transform": "translate(-50% , -50% ) scale(0.05)"
        })
        setTimeout(() => {
            $(".onboarding_video_container").css("opacity", "0")
        }, 100)

        setTimeout(() => {
            $(".sidebar_help").css("color", "#598DC5")
            let animationIteration = 0

            let animinterval = setInterval(() => {
                animationIteration++
                $(".sidebar_help").css("color", "#598DC5")
                setTimeout(() => {
                    $(".sidebar_help").attr("style", "")
                }, 500)
                if (animationIteration > 2) {
                    clearInterval(animinterval)
                }
            }, 1000)
            $(".onboarding_content").fadeOut(1000)
        }, 100)

        // return
        $.ajax({
            type: "POST",
            url: "backend/update_newuser_backend.php",
            data: {},
            success: function(response) {
                let result = JSON.parse(response).newuserstatus
                // alert(result)
                // let result = response
                console.log(result)
            }
        })
    })
</script>