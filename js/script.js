// https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ



$(function () {
    // START OF DOCUMENT READY FUNCTION
    // setTimeout(() => {
    // }, 1000);

    // Remove this if video API being used
    hidePreloader();

    $(".showPassword").click(function () {
        showpassword();
        console.log("Show Password");
    });












}); // END OF DOCUMENT READY FUNCTION



// ======== FUNCTIONS ZONE =======


function hidePreloader() {
    $("#preloader").fadeOut(300);
}

function showPreloader() {
    $("#preloader").show();
}

function showLogin() {
    $(".login-box").show();
    $(".register-box").hide();
    // console.log("tests");
}

function showRegister() {
    $(".login-box").hide();
    $(".register-box").show();
    // console.log("tests");
}


// Login/Register toggle
showLogin();

$(".registerForm-btn").click(function () {
    showRegister();
});


$(".loginForm-btn").click(function () {
    showLogin();
});


// Login and register form code

// Show password
function showpassword() {
    const x = document.getElementById("userPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// Check if password is at least 8 Characters and matches confirm password field
$('#password_msg').html('Enter a Password').css('color', 'transparent');
$('#userPassword_reg, #userPasswordCnfm_reg').on('keyup', regPasswordVerify);

function regPasswordVerify() {
    if ($('#userPassword_reg').val().length >= 8) {
        if ($('#userPassword_reg').val() == $('#userPasswordCnfm_reg').val()) {
            $('#password_msg').html('Passwords Match').css('color', 'green');
            $("#register_btn").css("pointer-events", "auto");
            $("#register_btn").css("cursor", "pointer");
        } else {
            $('#password_msg').html('Passwords do not match!').css('color', 'red');
            $("#register_btn").css("pointer-events", "none");
            $("#register_btn").css("cursor", "not-allowed");
        }
    } else {
        $('#password_msg').html('Passwords must be at least 8 characters!').css('color', 'red');
        $("#register_btn").css("pointer-events", "none");
        $("#register_btn").css("cursor", "not-allowed");
    }
}

// HEADER CODE==========


$(".profile_box").click(function () {
    if ($(".profile_popup").hasClass("profile_popup_hidden")) {
        // Show pop up
        setTimeout(() => {
            showPopup()

        }, 10);
    } else {
        // Hide pop up
        hidePopup()
    }
})

$('html').click(function (e) {

    /* exept elements with class someClass */
    if ($(e.target).hasClass('profile_popup')) {
        e.preventDefault();
        return;
    }

    /* but be carefull the contained links! to be clickable */
    if ($(e.target).is('a')) {
        return;
    }

    /* here you can code what to do when click on html */
    hidePopup()
});


function showPopup() {
    $(".profile_popup").removeClass("profile_popup_hidden")
    $(".down_arrow").css("transform", "rotate(180deg)")
    $(".profile_box").css("box-shadow", "0px 5px 10px -5px rgba(0, 0, 0, 0.2)")
}

function hidePopup() {
    $(".profile_popup").addClass("profile_popup_hidden")
    $(".down_arrow").css("transform", "rotate(0deg)")
    $(".profile_box").css("box-shadow", "")
}

// ========= SIDE BAR =========

$('.sidebar_items').click(function (e) {
    e.preventDefault(); // prevent default anchor behavior
    let goTo = this.getAttribute("href"); // store anchor href

    if (window.location.href.indexOf("home") > -1) {
        let hash = goTo.substring(goTo.indexOf("#") + 1);
        document.location.hash = hash;
    } else {
        window.location.href = goTo;
    }
});














function playVideo(vidURL) {
    // showPreloader();

    // GET VIDEO URL FROM API
    $.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + vidURL, function (data, status, xhr) {
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
    }).fail(function () {
        // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
        console.log("%c ❌ ERROR", "color:red;");
    });
}


$("#nextVid").click(function () {
    if (playstate < (jsonData.videos.length - 1)) {
        playstate++;
        playVideo(jsonData.videos[playstate])
        console.log(playstate);
    }
})

$("#prevVid").click(function () {
    if (playstate > 0) {
        playstate--;
        playVideo(jsonData.videos[playstate])
        console.log(playstate);
    }
})

function getVidData(videoID) {
    // Convert any valid youtube url to its video id
    videoID = extractVidId(videoID)
    // Get the video URL
    let videoURL = null;
    let scriptUrl = "https://ytdirectvidapi.herokuapp.com/api/?url=" + videoID;
    $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'text',
        async: false,
        success: function (data) {
            const videoURL_parsed = JSON.parse(data);
            videoURL = videoURL_parsed.links[0]
        }
    });

    let videoData = null;
    let scriptUrlData = "https://www.youtube.com/oembed?url=youtube.com/watch?v=" + videoID + "&format=json";
    $.ajax({
        url: scriptUrlData,
        type: 'get',
        dataType: 'text',
        async: false,
        success: function (data) {
            const videoData_parsed = JSON.parse(data);
            // videoData = [videoData_parsed.title,videoData_parsed.thumbnail_url]

            videoData = {
                "video": videoURL,
                "title": videoData_parsed.title,
                "thumbnail": videoData_parsed.thumbnail_url
            }
        }
    });
    hidePreloader()
    return videoData;
}

function extractVidId(url) {
    let re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
    if (url.length > 11) {
        let id = url.match(re)[7];
        return id;
    } else {
        return url;
    }
}

// HOME PAGE RENDERING ============

// ======== HOME PAGE CONTENT RENDER ON HOME.PHP =========
