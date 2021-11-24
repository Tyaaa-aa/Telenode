// https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ



$(function () {
    // START OF DOCUMENT READY FUNCTION
    // setTimeout(() => {
    // }, 1000);

    // Remove this if video API being used
    // hidePreloader();

    $(".showPassword").click(function () {
        showpassword();
        console.log("Show Password");
    });














}); // END OF DOCUMENT READY FUNCTION









// Login and register form code

function showpassword() {
    var x = document.getElementById("userPassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

$('#password_msg').html('Enter a Password').css('color', 'transparent');
$('#userPassword-reg, #userPasswordCnfm-reg').on('keyup', function () {
    if ($('#userPassword-reg').val().length >= 8) {
        if ($('#userPassword-reg').val() == $('#userPasswordCnfm-reg').val()) {
            $('#password_msg').html('Passwords Match').css('color', 'green');
            $("#register_btn").css("pointer-events", "auto");
            $("#register_btn").css("cursor", "auto");
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
});


$(".register-box").hide();
$(".registerForm-btn").click(function(){
    $(".login-box").hide();
    $(".register-box").show();
    console.log("tests");
});
$(".loginForm-btn").click(function(){
    $(".login-box").show();
    $(".register-box").hide();
    console.log("tests");
});



// ======== FUNCTIONS ZONE =======


function hidePreloader() {
    $("#preloader").fadeOut(300);
}




















// YOUTUBE URL
var url = "watch?v=YE7VzlLtp-4"; // DEFAULT TEST VIDEO (Big Buck Bunny)

// GET VIDEO URL FROM API
$.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + url, function (data, status, xhr) {
    console.log(xhr.status);
    // IF STATUS IS 200 (SUCCESS) 
    if (xhr.status = 200) {
        // JSON result in `data` variable
        console.log(data);
        if ("links" in data) {
            // API returned a usable link successfully
            console.log("URL: " + data.links[0]);
            //Load the player with new source
            $("#video-player").append('<source id="main-video" src="' + data.links[0] + '" type="video/mp4">');
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
}).fail(function () {
    // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
    console.log("ERROR");
    $("#heading").append("<span style='color:red'> (ERROR)</span>")
});