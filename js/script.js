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


$("#nextVid").click(function() {
    if (playstate < (jsonData.videos.length - 1)) {
        playstate++;
        playVideo(jsonData.videos[playstate])
        console.log(playstate);
    }
})

$("#prevVid").click(function() {
    if (playstate > 0) {
        playstate--;
        playVideo(jsonData.videos[playstate])
        console.log(playstate);
    }
})



// ======== TEST =========

// $('#addVid').click(function () {
//     // $("#ytlink").val();
//     addVideo($("#ytlink").val())
// })


// function addVideo(vidURL) {
//     // showPreloader();

//     // GET VIDEO URL FROM API
//     $.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + vidURL, function (data, status, xhr) {
//         console.log(xhr.status);
//         // IF STATUS IS 200 (SUCCESS) 
//         if (xhr.status = 200) {
//             // JSON result in `data` variable
//             console.log(data);
//             if ("links" in data) {
//                 // API returned a usable link successfully
//                 console.log("URL: " + data.links[0]);
//                 //Load the player with new source
//                 $('body').append('<video controls><source id="main-video" src="' + data.links[0] + '" type="video/mp4"></video>')

//                 $("#video-player").append('<source id="main-video" src="' + data.links[0] + '" type="video/mp4">');
//                 $("body").append("<span style='color:green'> (SUCCESS)</span>");
//                 console.log("%c✔ SUCCESS", "color:green;", "\nURL: " + data.links[0]);
//                 hidePreloader();
//             } else {
//                 // API did not return usable link
//                 $("#heading").append("<span style='color:red'> (ERROR)</span>");
//                 console.log("%c ❌ ERROR", "color:red;");
//                 hidePreloader();
//             }
//         } else {
//             // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
//             console.log("%c ❌ ERROR", "color:red;");
//             $("#heading").append("<span style='color:red'> (ERROR)</span>");
//             hidePreloader();
//         }
//     }).fail(function () {
//         // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
//         console.log("%c ❌ ERROR", "color:red;");
//         $("#heading").append("<span style='color:red'> (ERROR)</span>")
//     });
// }