// https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ
window.addEventListener('load', function () {
    // Everything has loaded!
    hidePreloader();
});


$(function () {
    // START OF DOCUMENT READY FUNCTION
    // setTimeout(() => {
    // }, 1000);

    // Remove this if video API being used
    loadingBarAnimation()

    $(".showPassword").click(function () {
        showpassword();
        console.log("Show Password");
    });



    $("#zoomer").click(function (evt) {
        $(this).zoomTo({
            targetsize: 0.75,
            duration: 600
        });

        evt.stopPropagation();
    });


    // $(".video_cards").on("click", function (e) {
    //     // e.stopImmediatePropagation();
    //     // e.stopPropagation();
    // })

    // $(".edit_btn").on("click", function (e) {
    //     // e.stopImmediatePropagation();
    //     // console.log($(this).data("vid"));
    //     console.log("SCREAM");
    //     let url = $(this).data("vid");
    //     window.location.href = `edit.php?id=${url}`;
    //     e.stopPropagation();

    // })



    // ======== PROJECTS PAGE CONTENT RENDER ON PROJECTS.PHP =========

    // if ($(".projects_box").data("getvid_urls") != undefined) {
    //     let videoData = $(".projects_box").data("getvid_urls")
    //     let videoData = Object.keys(videoData);
    //     console.log(videoData);
    //     console.log(videoData[0]);
    // }















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
        loadingBarAnimation()
    } else {
        window.location.href = goTo;
    }
});
// function collapseSidebar() {
//     // Expand body content
//     $(".main_body").css({
//         "width": "100%",
//         "margin-left": "0%"
//     })
//     // Collapse Sidebar
//     $("#sidebar").css({
//         "width": "70px",
//         "padding-left": "10px"
//     })
//     $(".sidebar_items").css({
//         "padding-left": "10px"
//     })
//     // $(".sidebar_items_selected").css({
//     //     "border-radius": "50px",
//     //     "border": "0px"
//     // })
//     $(".sidebar_items span").fadeOut(300);

//     // Icon Animation
// }

// function expandSidebar() {
//     // Collapse body content
//     $(".main_body").css({
//         "width": "80%",
//         "margin-left": "20%"
//     })
//     // Expand Sidebar

//     // Icon Animation
// }

let collapsedSidebarWidth = 70;

function collapseSidebar() {
    // Expand body content
    $(".main_body").css({
        "width": "calc(100% - " + collapsedSidebarWidth + "px)",
        "margin-left": "calc(0% + " + collapsedSidebarWidth + "px)"
    });
    // Collapse Sidebar
    $("#sidebar").addClass("sidebar_collapsed");

    // Icon Animation
    // $(".close_siderbar").text("menu_open");
    // $(".close_siderbar").css("transform", "scale(1.3) rotate(-360deg)");

    // $(".header_logo img").fadeOut(100);
    $(".header_logo img").attr("src", "img/logo_small.png");


}

function expandSidebar() {
    // Collapse body content
    $(".main_body").css({
        "width": "80%",
        "margin-left": "20%"
    })
    // Expand Sidebar
    $("#sidebar").removeClass("sidebar_collapsed");

    // Icon Animation
    // $(".close_siderbar").text("unfold_less");
    // $(".close_siderbar").css("transform", "scale(1.3) rotate(-180deg)");
    $(".header_logo img").attr("src", "img/logo.png");
}


$(".close_siderbar").click(function () {
    if ($("#sidebar").hasClass("sidebar_collapsed")) {
        expandSidebar();
    } else {
        collapseSidebar()
    }
})

//REALLY JANKY FAKE LOADING ANIMATION SO IT DOESNT LOOK LIKE THE BROWSER HANGED LOL
function loadingBarAnimation() {
    setTimeout(() => {
        $(".loading_bar").css("width", "<?= Rand(40, 60) ?>%")
    }, 10);

    setTimeout(() => {
        // videos()
        $(".loading_bar").css("width", "100%")
    }, 100);

    setTimeout(() => {
        $(".loading_bar").css("margin-top", "-5px")
        $(".loading_bar").css("opacity", "0%")
    }, 200);
}





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



function ajaxVidData(scriptUrl) {
    showPreloader()
    return $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'text',
        success: function (data) {
            const videoURL_parsed = JSON.parse(data);
            videoURL = videoURL_parsed.links[0]
            videoData = {
                "video": videoURL,
            }
        }
    });
};

async function getVidData(videoID) {
    // Convert any valid youtube url to its video id
    videoID = extractVidId(videoID)
    // Get the video URL
    let scriptUrl = "https://ytdirectvidapi.herokuapp.com/api/?url=" + videoID;
    let result = await ajaxVidData(scriptUrl)
    // console.log(x)
    hidePreloader();
    return result;
}

// getVidData("https://www.youtube.com/watch?v=T936lqHuKVg")






function ajaxVidInfo(scriptUrlData) {
    return $.ajax({
        url: scriptUrlData,
        type: 'get',
        dataType: 'text',
        success: function (data) {
            const videoData_parsed = JSON.parse(data);
            videoData = {
                "title": videoData_parsed.title,
                "thumbnail": videoData_parsed.thumbnail_url
            }
        }
    });
}


// Get Video Info Without MP4 URL
async function getVidInfo(videoID) {
    // Convert any valid youtube url to its video id
    videoID = extractVidId(videoID)
    let videoData = null;
    let scriptUrlData = "https://www.youtube.com/oembed?url=youtube.com/watch?v=" + videoID + "&format=json";

    let result = await ajaxVidInfo(scriptUrlData)
    // console.log(x)
    hidePreloader();
    return await result;
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
hidePreloader();

// List Populating functions
async function listYTVideos(container) {

    if (container.data("getvid_urls") != undefined) {
        // Get video list from data "data-getVid_URLS"
        const videoData = Object.values(container.data("getvid_urls"));
        // console.log(videoData);
        
        for (let i = 0; i < videoData.length; i++) {
            const videoID = extractVidId(videoData[i]); // Strip videoID from rawArray
            // let videoID = VideoDataArray[i];
            let result = await getVidInfo(videoID); // call function to get returned Promise (calls async function sequentially)

            const thumbnail = "https://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg";
            const title = JSON.parse(result).title;
            console.log(JSON.parse(result).title);
            const listHTML = `
            <a href="https://youtu.be/${videoID}" class="video_cards" target="_blank">
                <div class="thumbnail-box">
                    <img class="thumbnail" src="${thumbnail}" alt="Thumbnail">
                </div>
                <h4>${title}</h4>
            </a>`;

            
            $(listHTML).appendTo(container);
        }
        


    } else {
        alert("An Error Occured. Project has been removed or the link is invalid.")
        window.location.href = "home.php";
    }
}

function openInNewTab(url) {
    window.open(url, '_blank');
}

// HOME PAGE RENDERING ============

// ======== HOME PAGE CONTENT RENDER ON HOME.PHP =========














// PROJECTS PAGE RENDERING ============