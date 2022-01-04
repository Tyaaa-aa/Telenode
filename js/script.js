// https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ
window.addEventListener('load', function () {
    // Everything has loaded!
    hidePreloader()
})


$(function () {
    // START OF DOCUMENT READY FUNCTION
    // Remove this if video API being used
    // loadingBarAnimation()

    $(".showPassword").click(function () {
        showpassword()
        console.log("Show Password")
    })



    $("#zoomer").click(function (evt) {
        $(this).zoomTo({
            targetsize: 0.75,
            duration: 600
        })

        evt.stopPropagation()
    })

}) // END OF DOCUMENT READY FUNCTION

// ======== Preloader animations =======
let usePreloader = false

function hidePreloader() {
    if (!usePreloader) return
    $("#preloader").fadeOut(300)
}

function showPreloader() {
    if (!usePreloader) return
    $("#preloader").show()
}

// ======== login/signup =======
showLogin()
$(".registerForm-btn").click(function () {
    showRegister()
})
$(".loginForm-btn").click(function () {
    showLogin()
})

function showLogin() {
    $(".login-box").show()
    $(".register-box").hide()
}

function showRegister() {
    $(".login-box").hide()
    $(".register-box").show()
}

// Show password
function showpassword() {
    const x = document.getElementById("userPassword")
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// Check if password is at least 8 Characters and matches confirm password field
$('#password_msg').html('Enter a Password').css('color', 'transparent')
$('#userPassword_reg, #userPasswordCnfm_reg').on('keyup', regPasswordVerify)

function regPasswordVerify() {
    if ($('#userPassword_reg').val().length >= 8) {
        if ($('#userPassword_reg').val() == $('#userPasswordCnfm_reg').val()) {
            $('#password_msg').html('Passwords Match').css('color', 'green')
            $("#register_btn").css("pointer-events", "auto")
            $("#register_btn").css("cursor", "pointer")
        } else {
            $('#password_msg').html('Passwords do not match!').css('color', 'red')
            $("#register_btn").css("pointer-events", "none")
            $("#register_btn").css("cursor", "not-allowed")
        }
    } else {
        $('#password_msg').html('Passwords must be at least 8 characters!').css('color', 'red')
        $("#register_btn").css("pointer-events", "none")
        $("#register_btn").css("cursor", "not-allowed")
    }
}

// ======== ACCOUNT PAGE ========

$(".edit_account_btn").click(function () {
    if ($(this).attr("type") == "submit") {
        // $(".account_form").submit()
    } else {
        $(".account_form .input_field").attr("readonly", false)
        $(".account_form .input_field").removeClass("readonly_field")
        $(".account_form .account_password").css({
            "max-height": "100px",
            "opacity": "1"
        })
        setTimeout(() => {
            $(this).attr("type", "submit")
            $(this).text("Save")
        }, 10);
    }
})

$("#toggleAll").click(function () {
    if ($("#toggleAll").is(":checked")) {
        // console.log("dark");
        updateTheme("dark")
    } else {
        // console.log("light");
        updateTheme("light")
    }
})

$("#upload-img").change(function () {
    $(".account_pic").submit()
});

// ========= HEADER CODE ==========
$(".profile_box").click(function () {
    if ($(".profile_popup").hasClass("profile_popup_hidden")) {
        // Show pop up
        setTimeout(() => {
            showPopup()
        }, 10)
    } else {
        // Hide pop up
        hidePopup()
    }
})

$('html').click(function (e) {
    if ($(e.target).hasClass('profile_popup')) {
        e.preventDefault()
        return;
    }
    if ($(e.target).is('a')) {
        return;
    }
    hidePopup()
})


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
    e.preventDefault() // prevent default anchor behavior
    let goTo = this.getAttribute("href") // store anchor href
    if (window.location.href.indexOf("home") > -1) {
        let hash = goTo.substring(goTo.indexOf("#") + 1)
        document.location.hash = hash;
        // loadingBarAnimation()
    } else {
        window.location.href = goTo;
    }
})

let collapsedSidebarWidth = 70;

function collapseSidebar() {
    // Expand body content
    $(".main_body").css({
        "width": "calc(100% - " + collapsedSidebarWidth + "px)",
        "margin-left": "calc(0% + " + collapsedSidebarWidth + "px)"
    })
    // Collapse Sidebar
    $("#sidebar").addClass("sidebar_collapsed")
    // Icon Animation
    $(".header_logo img").attr("src", "img/logo_small.png")
}

function expandSidebar() {
    // Collapse body content
    $(".main_body").css({
        "width": "80%",
        "margin-left": "20%"
    })
    // Expand Sidebar
    $("#sidebar").removeClass("sidebar_collapsed")
    // Icon Animation
    $(".header_logo img").attr("src", "img/logo.png")
}

$(".close_siderbar").click(function () {
    if ($("#sidebar").hasClass("sidebar_collapsed")) {
        expandSidebar()
    } else {
        collapseSidebar()
    }
})

//REALLY JANKY FAKE LOADING ANIMATION SO IT DOESNT LOOK LIKE THE BROWSER HANGED LOL
function loadingBarAnimation() {
    setTimeout(() => {
        $(".loading_bar").css("width", "<?= Rand(40, 60) ?>%")
    }, 10)

    setTimeout(() => {
        // videos()
        $(".loading_bar").css("width", "100%")
    }, 100)

    setTimeout(() => {
        $(".loading_bar").css("margin-top", "-5px")
        $(".loading_bar").css("opacity", "0%")
    }, 200)
}

// function playVideo(vidURL) {
//     // showPreloader()

//     // GET VIDEO URL FROM API
//     $.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + vidURL, function (data, status, xhr) {
//         // console.log(xhr.status)
//         // IF STATUS IS 200 (SUCCESS) 
//         if (xhr.status = 200) {
//             // JSON result in `data` variable
//             // console.log(data)
//             if ("links" in data) {
//                 // API returned a usable link successfully
//                 console.log("%c✔ SUCCESS", "color:green;", "\nURL: " + data.links[0])
//                 //Load the player with new source
//                 $("#video-player").attr("src", data.links[0])
//                 hidePreloader()

//             } else {
//                 // API did not return usable link
//                 console.log("%c ❌ ERROR", "color:red;")
//                 hidePreloader()
//             }
//         } else {
//             // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
//             console.log("%c ❌ ERROR", "color:red;")
//             hidePreloader()
//         }
//     }).fail(function () {
//         // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
//         console.log("%c ❌ ERROR", "color:red;")
//     })
// }

// ======= CREATE PAGE ========
$(document).on("keyup input change", ".upload_input_field", function () {
    // console.log("ASDASD");
    let lastInput = $(".upload_input_field").last();
    let thumbnail = extractVidId($(this).val());
    $(this).parent().find(".thumbnailPreview").attr("src", `https://i.ytimg.com/vi/${thumbnail}/mqdefault.jpg`);
    if (lastInput.val() != "") {
        // Add Fields
        console.log("Adding field");
        let vidNum = $(".upload_input_field").length;
        $("#videoLength").val(vidNum)
        $(".upload_field_box").append(`
        <div class="field_text">
            <input type="text" placeholder="Add video" class="input_field upload_input_field" name="video_${vidNum}">
            <div class="thumbnailPreview-box">
                <img src="" class="thumbnailPreview" alt="">
            </div>
        </div>`);
        $(".submit_btn").fadeIn();
    } else if (lastInput.parent().prev().find(".upload_input_field").val() == "") {
        // Delete empty field
        console.log("Deleting field");
        $(".field_text").last().fadeOut(300, function () {
            $(".field_text").last().remove()
        });
    }
    console.log(($(".upload_input_field").length));
})

$(".upload_field_box").submit(function (e) {
    let thisVidID = extractVidId($(".upload_input_field").first().val())
    $("#videoThumbnail").val("https://i.ytimg.com/vi/" + thisVidID + "/hqdefault.jpg")
    $(".upload_input_field").last().removeAttr("name")
    for (let i = 0; i < $(".upload_input_field").length; i++) {
        let thisVid = $(".upload_input_field").eq(i)
        thisVid.val(extractVidId(thisVid.val()))
    }
})


// ========= API FUNCTIONS =========

function ajaxVidData(scriptUrl) {
    showPreloader()
    return $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'text',
        success: function (data) {
            const videoURL_parsed = JSON.parse(JSON.stringify(data))
            videoURL = videoURL_parsed.links
            videoData = {
                "video": videoURL,
            }
        }
    })
}

async function getVidData(videoID) {
    // Convert any valid youtube url to its video id
    videoID = extractVidId(videoID)
    // Get the video URL
    // OLD LOW QUALITY API
    // let scriptUrl = "https://ytdirectvidapi.herokuapp.com/api/?url=" + videoID;
    // 720p VIDEO API
    let scriptUrl = "https://telenode-yt-api.herokuapp.com/api?url=" + videoID;
    let result = await ajaxVidData(scriptUrl)
    // console.log(result)
    result = JSON.parse(result)
    hidePreloader()
    return result;
}

function ajaxVidInfo(scriptUrlData) {
    return $.ajax({
        url: scriptUrlData,
        type: 'get',
        dataType: 'text',
        success: function (data) {
            const videoData_parsed = JSON.parse(data)
            videoData = {
                "title": videoData_parsed.title,
                "thumbnail": videoData_parsed.thumbnail_url
            }
        }
    })
}

// Get Video Info Without MP4 URL
async function getVidInfo(videoID) {
    // Convert any valid youtube url to its video id
    videoID = extractVidId(videoID)
    let videoData = null;
    let scriptUrlData = "https://www.youtube.com/oembed?url=youtube.com/watch?v=" + videoID + "&format=json";

    let result = await ajaxVidInfo(scriptUrlData)
    // console.log(x)
    hidePreloader()
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

// List Populating function 
// container = container to be populated with data provided
// isYT = is this a youtube link or local project link, true = youtube & false = local
async function listYTVideos(container, isYT) {
    if (container.data("getvid_urls") != undefined) {
        // loadingText()
        // Get video list from data "data-getVid_URLS"
        const videoData = Object.values(container.data("getvid_urls"))
        // console.log(videoData)
        for (let i = 0; i < videoData.length; i++) {
            const videoID = extractVidId(videoData[i]) // Strip videoID from rawArray
            // let videoID = VideoDataArray[i];
            let result = await getVidInfo(videoID) // call function to get returned Promise (calls async function sequentially)
            const thumbnail = "https://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg";
            const title = JSON.parse(result).title;
            // console.log(JSON.parse(result).title)
            let listHTML;
            if (isYT) {
                // Youtube video card
                listHTML = /* HTML */ `
                <div class="video_cards">
                    <a href="https://youtu.be/${videoID}" class="grabbing" target="_blank" onclick="openInNewTab()" data-videoid="${videoID}">
                        <div class="thumbnail-box">
                            <img class="thumbnail" src="${thumbnail}" alt="Thumbnail">
                        </div>
                        <h4>${title}</h4>
                    </a>
                    <span class="material-icons delete_vid delete_vid_hidden" title="Remove video">
                        clear
                    </span>
                </div>`;
                // listMenu = /* HTML */ `
                // <div class="dropdown_option" data-title="${title}" data-videoid="${videoID}">${title}</div>`;
                // $(listMenu).appendTo(".dropdown_content")
                // $(container).find(".vid_counter").text(" (" + videoData.length + " Videos)")
            } else {
                // Local project video card
                listHTML = /* HTML */ `
                <div class="video_cards" onclick="playThisVid('${videoID}')">
                    <div class="thumbnail-box">
                        <img class="thumbnail" src="${thumbnail}" alt="Thumbnail">
                    </div>
                    <h4>
                        ${title}
                    </h4>
                </div>`
            }
            $(listHTML).appendTo(container)
        }
        if (isYT) {
            updateListMenu(container.data("getvid_urls"))
        }

    } else {
        alert("An Error Occured. Project has been removed or the link is invalid.")
        window.location.href = "home.php";
    }
}

function openInNewTab(e) {
    if (window.confirm("Opening in a new tab")) {
        return true;
    } else {
        event.stopPropagation()
        event.preventDefault()
    }
}

hidePreloader()

// ======== EDIT PAGE =========

// Get user inputs
// MAKE MORE ROBUST AND PREVENT MANUAL USER INPUT FROM KEYBOARD
// ===================
$(".edit_projects").on("input click ", ".question_field", async function (e) {
    // $(this).val(extractVidId($(this).val()))
    $(this).blur()
    console.log("BLURRING");
    // console.log(e.handleObj.type)
    const videoID = extractVidId($(this).val())
    if (videoID.length == 11) {
        $(this).val(videoID)
        // Pass video id to data generator saveProjectData()
        $(this).closest(".block_box").find(".dropbtn").attr("data-videoid", videoID)
        // console.log(videoID)
        // Change THumbnail
        $(this).closest(".block_box").find(".thumbnail").attr("src", "https://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg")
        const result = await getVidInfo(videoID)
        const title = JSON.parse(result).title
        // Change Titles
        $(this).closest(".block_box").find(".video_title").text(title)
        $(this).closest(".block_box").find(".dropbtn").val(title)
        // console.log(title)
        updateBlocks()
    } else {
        $(this).val("")
    }
})

// $(".edit_projects").on("keyup", ".question_title, .options_field", function (event) {
//     console.log("TEST");
//     $(this).val($(this).val().replace(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g, ''));
// })

// function isValid(str) {
//     return !/[`#\^&=\-;,/\\:\?]/g.test(str);
// }

// Dropdown menu dismiss on click anywhere
$(document).on("click", function () {
    if ($(".dropdown_content").hasClass("dropped")) {
        $(".dropdown_content").removeClass("dropped")
        $(".dropbtn_container .material-icons").removeClass("droparrow")
    }
    $(".more_options_container").removeClass("more_options_container_expanded")
})

// Dropdown menu
$(".edit_projects").on("click", ".dropbtn", function () {
    setTimeout(() => {
        let dropMenu = $(this).siblings(".dropdown_content")
        let icon = $(this).siblings(".material-icons")
        if (dropMenu.hasClass("dropped")) {
            dropMenu.removeClass("dropped")
            icon.removeClass("droparrow")
        } else {
            dropMenu.addClass("dropped")
            icon.addClass("droparrow")
        }
    }, 0)
})

$(".edit_projects").on("click", ".dropdown_option", function () {
    let title = $(this).data("title")
    let videoid = $(this).data("videoid")
    // console.log(videoid)
    // console.log(title)

    // Update value inside dropdown menu
    let dropbtn = $(this).closest(".block_box").find(".dropbtn")
    dropbtn.val(title)
    dropbtn.attr("data-videoid", videoid)

    // Update thumbnail and title using input eventlistener function $(".edit_projects") defined above 
    let question_field = $(this).closest(".block_box").find(".question_field")
    question_field.val(videoid).trigger('input')
})

// Change video repository view to list view
$(".list_view_btn").click(function () {
    $(".card_view_btn").removeClass("toolbar_btns_active")
    $(this).addClass("toolbar_btns_active")
    $(".projects_box").addClass("list_style")
})

// Change video repository view to card view
$(".card_view_btn").click(function () {
    $(".list_view_btn").removeClass("toolbar_btns_active")
    $(this).addClass("toolbar_btns_active")
    $(".projects_box").removeClass("list_style")
})

// Search projects video repository function
$(".edit_container .search_input").keyup(function () {
    let input = $(this).val().toUpperCase()
    let vids = $(".projects_box .video_cards")
    console.log(input);
    for (i = 0; i < vids.length; i++) {
        let thisVidTitle = vids.eq(i).find("h4").text().toUpperCase()
        // console.log(thisVidTitle)
        if (thisVidTitle.includes(input)) {
            vids.eq(i).show()
        } else {
            vids.eq(i).hide()
        }
    }
})

// Edit video repository function
$(".edit_videos_btn").click(function (e) {
    // $(".toolbar_btns").removeClass("toolbar_btns_active")
    if ($(this).hasClass("edit_mode")) {
        // HIDE EDIT MODE
        $(this).removeClass("edit_mode")
        $(this).css("color", "var(--secondaryColor)")
        $(".edit_projects").removeClass("edit_projects_collapsed")
        $(".projects_box").removeClass("projects_box_expanded")
        $(".delete_vid").addClass("delete_vid_hidden")
        $(".add_videos_btn").addClass("add_videos_btn_hidden")
    } else {
        // SHOW EDIT MODE
        $(this).css("color", "#d3773a")
        $(this).addClass("edit_mode")
        $(".edit_projects").addClass("edit_projects_collapsed")
        $(".projects_box").addClass("projects_box_expanded")
        $(".delete_vid").removeClass("delete_vid_hidden")
        $(".add_videos_btn").removeClass("add_videos_btn_hidden")
    }
})

// Delete video from project repository
let vidArray
if ($(".projects_box").attr("data-getvid_urls") != undefined) {
    vidArray = JSON.parse($(".projects_box").attr("data-getvid_urls"))
}
$(".projects_box").on("click", ".delete_vid", function () {
    if (window.confirm("Delete Video?")) {

        // console.log("Delete Video");
        // console.log(vidArray);
        // console.log($(this).parent().index()-2);
        let thisVid = $(this).parent()
        let selectedIndex = thisVid.index() - 2
        // console.log(selectedIndex);
        delete vidArray[Object.keys(vidArray)[selectedIndex]]
        $(thisVid).remove()

        let projectID = $('.projects_box').attr("data-getVid_UID");
        vidArray = JSON.stringify(vidArray)
        // console.log(vidArray);
        $.ajax({
            type: "POST",
            data: {
                'videos': vidArray,
                'projectID': projectID
            },
            url: "updateProjectVideos_backend.php",
            cache: false,
            success: function (response) {
                console.log("Video Deleted! ✅")
                vidArray = JSON.parse(response)
                // console.log(vidArray)
                updateListMenu(vidArray)
            }
        })
    }
})

// Add video button
$(".add_videos_btn").click(function () {
    if ($(".add_videos_btn").hasClass("add_video_container_expanded")) {
        // Hide add input
        $(".add_videos_btn").removeClass("add_video_container_expanded")
        $(this).css("color", "var(--secondaryColor)")
    } else {
        $(".add_videos_btn").addClass("add_video_container_expanded")
        // Show add input
        $(this).css("color", "#d3773a")
    }
})

$(".add_video_container").click(function (e) {
    e.stopPropagation()
})

$(".add_btn_submit").click(async function () {
    // console.log(vidArray)
    let inputAdd = $(".add_video_input").val()
    inputAdd = extractVidId(inputAdd)
    if (inputAdd.length == 11) {
        // console.log(inputAdd)
        let thisIndex = $(".projects_box").find(".video_cards").length + 1
        // console.log(thisIndex)
        vidArray[`video_${thisIndex}`] = inputAdd
        // console.log(vidArray)

        let result = await getVidInfo(inputAdd) // call function to get returned Promise (calls async function sequentially)
        let title = JSON.parse(result).title;

        let listHTML = /* HTML */ `
        <div class="video_cards">
            <a href="https://youtu.be/${inputAdd}" class="grabbing" target="_blank" onclick="openInNewTab()" data-videoid="${inputAdd}">
                <div class="thumbnail-box">
                    <img class="thumbnail" src="https://i.ytimg.com/vi/${inputAdd}/hqdefault.jpg" alt="Thumbnail">
                </div>
                <h4>${title}</h4>
            </a>
            <span class="material-icons delete_vid" title="Remove video">
                clear
            </span>
        </div>`;
        $(".projects_box").append(listHTML)

        let projectID = $('.projects_box').attr("data-getVid_UID");
        vidArray = JSON.stringify(vidArray)
        // console.log(vidArray);
        $.ajax({
            type: "POST",
            data: {
                'videos': vidArray,
                'projectID': projectID
            },
            url: "updateProjectVideos_backend.php",
            cache: false,
            success: function (response) {
                console.log("Video Added! ✅")
                vidArray = JSON.parse(response)
                $(".add_video_input").val('')
                // console.log(vidArray)
                updateListMenu(vidArray)
            }
        })



    } else {
        alert("Please enter a valid link!")
    }
    // $(".projects_box").find(".video_cards").remove()
    // listYTVideos($(".projects_box"), true)
})

// Updates list menus with available imported videos
async function updateListMenu(array) {
    // console.log(array)
    // console.log(Object.keys(vidArray).length);
    $(".dropdown_content ").html('')
    const videoData = Object.values(array)
    for (let i = 0; i < Object.keys(array).length; i++) {
        const videoID = extractVidId(videoData[i]) // Strip videoID from rawArray
        // let videoID = VideoDataArray[i];
        let result = await getVidInfo(videoID) // call function to get returned Promise (calls async function sequentially)
        const thumbnail = "https://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg";
        const title = JSON.parse(result).title;

        listMenu = /* HTML */ `
        <div class="dropdown_option" data-title="${title}" data-videoid="${videoID}">${title}</div>`;
        $(listMenu).appendTo(".dropdown_content")
        $(".projects_box").find(".vid_counter").text(" (" + videoData.length + " Videos)")
    }
}

// ========= BLOCKS FUNCTIONALITY ===========
let autoSave = 60000; // Autosave every 60 seconds by default
loadingText() // Show loading text on load
// updateBlocks() // Update blocks on load

let timer;
// Update and arrange blocks after user finish typing or clicking on input fields
$(".edit_projects").on("input click change", ".input_field, .question_field, .dropbtn, .dropdown_option", function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
        arrangeBlocks()
        updateBlocks()
    }, 500);
})

// $(".edit_projects").on("change input", ".thumbnail", function () {
//     updateBlocks()
// })


// Event for while saving data
function savingData() {
    $(".save_msg").text("Saving...")
    $(".save_msg").append(`<img class="project_loader" src="img/loader.png" alt="loading">`)
    $(".save_msg").removeClass("save_msg_closed")
}

// Event for successful data saved
function dataSaved() {
    $(".save_msg").text("Project saved!")
    $(".save_msg .project_loader").fadeOut()
    setTimeout(() => {
        $(".save_msg").addClass("save_msg_closed")
    }, 2000);
}

// Event for loading data
function loadingText() {
    $(".save_msg").text("Loading...")
    $(".save_msg").append(`<img class="project_loader" src="img/loader.png" alt="loading">`)
    $(".save_msg").removeClass("save_msg_closed")
}

// Event for successful data loaded
function loadedText() {
    console.log("Done Loading!✅")
    updateBlocks()
    $(".save_msg").text("Done!")
    $(".save_msg .project_loader").fadeOut()
    setTimeout(() => {
        $(".save_msg").addClass("save_msg_closed")
    }, 1000);

    // Set after loading data so doesnt save over existing data before data fully loaded
    // AutoSave every 1 minute 
    setInterval(() => {
        console.log("Auto saving...");
        saveProjectData()
    }, autoSave);

    // Ctrl + S to save data
    $(document).bind("keydown", function (e) {
        if (e.ctrlKey && e.which == 83) {
            e.preventDefault()
            clearTimeout(timer)
            timer = setTimeout(() => {
                saveProjectData()
            }, 100);
        }
    })
    // Click save button to save data
    $(".save_btn").click(saveProjectData)

    // Enables publish button only after project loaded
    activatePublishBtn()
}
$(document).bind("keydown", function (e) {
    if (e.ctrlKey && e.which == 83) {
        e.preventDefault()
    }
})

$(window).scroll(function () {
    let scrollPos = $(window).scrollTop()
    // console.log(scrollPos);
    if (scrollPos == 0) {
        $(".edit_page .steps_bar").removeClass("collapse_bar")
    } else {
        $(".edit_page .steps_bar").addClass("collapse_bar")
    }
})
// if($(window).scrollTop() == 0){

// }
// Updates and creates/deletes blocks based on user provided data
async function updateBlocks() {
    let elOptions = $(".block_questions").find(".options_field")
    for (let i = 0; i < elOptions.length; i++) {
        let thisBlock = $(".project_blocks .block_questions").eq(i)
        let optionTitle = thisBlock.find(".options_field").val()
        let optionVideoid = thisBlock.find(".dropbtn").attr("data-videoid")
        // Update option placeholder numbering
        elOptions.eq(i).attr(`placeholder`, `Option ${i+1}`)

        if (optionTitle || optionVideoid) {
            // console.log(optionTitle, optionVideoid)
            let videoData
            let videoDataTitle = "Video Not Selected"
            if (optionVideoid) {
                videoData = await getVidInfo(optionVideoid)
                videoDataTitle = JSON.parse(videoData).title
            } else {
                videoDataTitle = "Video not selected"
            }
            // console.log(videoDataTitle)

            // ===== CREATE NEW BLOCK =====
            let newBlock = /* HTML */ `
            <div class="project_blocks project_blocks_${i}" id="${i}">
                <span class="parent_indicator">
                    <div class="pi_dot ">
                        <p>${optionTitle}</p>
                    </div>
                </span>
    
                <div class="block_video block_box">
                    <div class="video_cards_container">
                        <!-- <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field"> -->
                        <div class="video_cards">
                            <div class="thumbnail-box">
                                <img class="thumbnail" src="https://i.ytimg.com/vi/${optionVideoid}/hqdefault.jpg" alt="Thumbnail">
                            </div>
                            <h4 class="video_title">${videoDataTitle}</h4>
                        </div>
                    </div>
                    <div class="input_container">
                        <input type="text" placeholder="Question/Prompt" class="input_field question_title">
                        <div class="dropbtn_container">
                            <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly data-videoid="${optionVideoid}" style="display:none">
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
            </div>`
            if ($(`.edit_projects .project_blocks`).hasClass(`project_blocks_${i}`)) {
                // Update blocks' values if they already exist
                // console.log(`Found project_blocks_${i}`)
                $(`.project_blocks_${i}`).find("p").text(`${optionTitle}`)
                $(`.project_blocks_${i} .block_video`).find(".video_title").text(`${videoDataTitle}`)
                let thisThumbnail = $(`.project_blocks_${i} .block_video`).find(".thumbnail")
                if (optionVideoid != undefined) {
                    thisThumbnail.attr("src", `https://i.ytimg.com/vi/${optionVideoid}/hqdefault.jpg`)
                    $(`.project_blocks_${i} .block_video`).find(".dropbtn").attr("data-videoid", optionVideoid)
                    // console.log("updating thumbnail")
                }
                // $(`project_blocks_${i}`).css("transform","scale(0.5)")
            } else {
                // Create blocks with values if they dont exist yet
                // console.log(`\nCreated instance of project_blocks_${i}`)
                $(".edit_projects").append(newBlock)
            }
        }

    }
    console.log("Updating blocks")
    // Autosave after action feature
    // saveProjectData()

    if ($(".publish_form").has("success_form")) {
        $(".publish_form").removeClass("success_form") //FOR DEVELOPMENT ONLY
    }
}


function arrangeBlocks() {
    console.log("Arranging Blocks");
    let currentFocused = $(document.activeElement)
    $(".edit_projects .project_blocks").sort(function (a, b) {
        return parseInt(a.id) - parseInt(b.id);
    }).each(function () {
        var elem = $(this);
        elem.remove();
        $(elem).appendTo(".edit_projects");
    });
    currentFocused.focus()
}

// Creates JSON save based on user provided data
function saveProjectData(download) {
    console.log("Saving Data...");
    savingData()
    // Create main container array to store all project data
    let projectDataArray = []
    for (let i = 0; i < $(".project_blocks").length; i++) {
        // Create objects for each project block and store in main array
        let projectData = new Object()
        let projectBlock = $(".project_blocks").eq(i)
        // Get block question title and video ID
        let thisBlockID = projectBlock.find("p").text()
        let thisQuestionTitle = projectBlock.find(".question_title").val()
        let thisQuestionVideoid = projectBlock.find(".dropbtn").attr("data-videoid")
        // Store values into data object
        projectData.blockID = thisBlockID
        projectData.questionTitle = thisQuestionTitle
        projectData.videoID = thisQuestionVideoid
        // Create array to store options objects 
        let projectOptionsArray = []
        let projectOptions = $(".project_blocks").eq(i).find(".block_questions")
        for (let i = 0; i < projectOptions.length; i++) {
            // Get options title and video ID
            let thisOptionsVideoid = projectOptions.eq(i).find(".dropbtn").attr("data-videoid")
            let thisOptionsTitle = projectOptions.eq(i).find(".options_field").val()
            // Create objects for each option within project block
            let thisProjectOptionsData = new Object()
            // Store values into data object
            thisProjectOptionsData.title = thisOptionsTitle
            thisProjectOptionsData.videoID = thisOptionsVideoid
            // Store values into data object
            projectOptionsArray.push(thisProjectOptionsData)
        }
        projectData.options = projectOptionsArray
        projectDataArray.push(projectData)
    }

    // console.table(projectDataArray)
    // console.log(projectDataArray)
    // console.log(projectDataArray[0].options)

    let projectID = $('.projects_box').attr("data-getVid_UID");
    let processedData = JSON.stringify(projectDataArray)
    $.ajax({
        type: "POST",
        data: {
            'projectData': processedData,
            'projectID': projectID
        },
        url: "updateProjectData_backend.php",
        cache: false,
        success: function (response) {
            console.log("Data Saved! ✅");
            // console.log("Returned DATA:");
            // console.log(JSON.parse(response));
            dataSaved()
            if (download == true) {
                let downloadData = new Object()
                downloadData.videoList = vidArray
                downloadData.videoData = projectDataArray
                // console.log(downloadData)
                // console.log(projectDataArray)
                // saveJson('tn_' + projectID + "_" + Date.now() + '.json', downloadData)
                saveJson('tn_' + projectID + '.json', downloadData)
            }
        }
    })
}


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
}

// Populate data on load 
async function populateProjectData(container) {
    if (!container.attr("data-getVid_ProjectData")) {
        loadedText()
        return
    }
    console.log("Loading Data...");
    // loadingText()
    let projectData = JSON.parse(container.attr("data-getVid_ProjectData"))
    // console.log(projectData);
    // Update starter block
    let starterBlockData = projectData[0]
    let starterTitle = starterBlockData.questionTitle
    let starterVideo = starterBlockData.videoID

    if (starterVideo && starterVideo.length !== 0) {
        // Populate Starter Block Data
        videoData = await getVidInfo(starterVideo)
        videoDataTitle = JSON.parse(videoData).title
        // console.log(starterTitle);
        let startBlockEL = $(".project_blocks_starter .block_video")
        startBlockEL.find(".question_title").val(starterTitle)
        startBlockEL.find(".dropbtn").val(videoDataTitle)
        startBlockEL.find(".dropbtn").attr("data-videoid", starterVideo)
        startBlockEL.find(".video_title").text(videoDataTitle)
        startBlockEL.find(".thumbnail").attr("src", `https://i.ytimg.com/vi/${starterVideo}/hqdefault.jpg`)

        for (let i = 0; i < 3; i++) {
            starterBlockData = projectData[0].options[i]
            starterTitle = starterBlockData.title
            starterVideo = starterBlockData.videoID

            if (starterVideo && starterVideo.length !== 0) {
                videoData = await getVidInfo(starterVideo)
                videoDataTitle = JSON.parse(videoData).title

                startBlockEL = $(".project_blocks_starter .block_questions").eq(i)

                startBlockEL.find(".options_field").val(starterTitle)
                startBlockEL.find(".dropbtn").val(videoDataTitle)
                startBlockEL.find(".dropbtn").attr("data-videoid", starterVideo)
                startBlockEL.find(".video_title").text(videoDataTitle)
                startBlockEL.find(".thumbnail").attr("src", `https://i.ytimg.com/vi/${starterVideo}/hqdefault.jpg`)
            }

        }
        // Populate other data

        for (let i = 1; i < projectData.length; i++) {
            // console.log(projectData[i]);
            let thisBlockData = projectData[i]
            let thisTitle = thisBlockData.questionTitle
            let thisBlockID = thisBlockData.blockID
            let thisVideo = thisBlockData.videoID
            videoData = await getVidInfo(thisVideo)
            videoDataTitle = JSON.parse(videoData).title

            // ===== CREATE NEW BLOCK =====
            let newBlock = /* HTML */ `
                        <div class="project_blocks project_blocks_${i-1}" id="${i-1}">
                            <span class="parent_indicator">
                                <div class="pi_dot ">
                                    <p>${thisBlockID}</p>
                                </div>
                            </span>

                            <div class="block_video block_box">
                                <div class="video_cards_container">
                                    <!-- <input type="text" placeholder="Choose a video (drag and drop)" class="input_field question_field"> -->
                                    <div class="video_cards">
                                        <div class="thumbnail-box">
                                            <img class="thumbnail" src="https://i.ytimg.com/vi/${thisVideo}/hqdefault.jpg" alt="Thumbnail">
                                        </div>
                                        <h4 class="video_title">${videoDataTitle}</h4>
                                    </div>
                                </div>
                                <div class="input_container">
                                    <input type="text" placeholder="Question/Prompt" class="input_field question_title" value="${thisTitle}">
                                    <div class="dropbtn_container">
                                        <input type="text" class="input_field dropbtn" placeholder="Choose a video" onkeypress="return false;" readonly data-videoid="${thisVideo}" style="display:none">
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
                        </div>`
            $(".edit_projects").append(newBlock)
            for (let x = 0; x < 3; x++) {
                blockData = projectData[i].options[x]
                optionTitle = blockData.title
                optionVideo = blockData.videoID

                if (optionVideo && optionVideo.length !== 0) {
                    videoData = await getVidInfo(optionVideo)
                    videoDataTitle = JSON.parse(videoData).title
                    blockEL = $(`.project_blocks_${i-1} .block_questions`).eq(x)
                    // console.log(blockEL.find("p").text());
                    blockEL.find(".options_field").val(optionTitle)
                    blockEL.find(".dropbtn").val(videoDataTitle)
                    blockEL.find(".dropbtn").attr("data-videoid", optionVideo)
                    blockEL.find(".video_title").text(videoDataTitle)
                    blockEL.find(".thumbnail").attr("src", `https://i.ytimg.com/vi/${optionVideo}/hqdefault.jpg`)
                }

            }
        }
    }
    loadedText()
}

// Save the file ==== FOR DEBUGGING PURPOSES ONLY ====
const saveJson = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], {
        type: "text/json"
    });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove()
}

// ======= PUBLISH SECTION ==========
function activatePublishBtn() {
    let publishScrollPos
    $(".publish_btn").click(function () {
        // $(".main_content")
        if ($(".main_content").hasClass("view_form")) {
            // HIDE PULISH FORM 
            $(this).find(".publish_btn_label").text("Publish")
            $(this).removeClass("publish_btn_active")
            $(".main_content").removeClass("view_form")
            $(".steps_three").removeClass("steps_number_active")
            $(window).scrollTop(publishScrollPos)

            // $(this).find(".material-icons").text("publish")
            // $(".edit_page .steps_bar").addClass("collapse_bar")
            // $('html').css({
            //     'overflow-y': 'auto'
            // })
        } else {
            // SHOW PULISH FORM 
            $(this).addClass("publish_btn_active")
            $(".main_content").addClass("view_form")
            $(".steps_three").addClass("steps_number_active")
            $(this).find(".publish_btn_label").text("Go Back")
            publishScrollPos = $(window).scrollTop()
            $(window).scrollTop(0)

            // $(this).find(".material-icons").text("arrow_upward")
            // $(".edit_page .steps_bar").removeClass("collapse_bar")
            // saveProjectData()
            // $('html').css({
            //     'overflow-y': 'hidden'
            // })
        }
    })
    // $(".publish_btn").click()


    // ====== Project Settings Section ======
    $(".settings_btn").click(function () {
        setTimeout(() => {
            $(".more_options_container").addClass("more_options_container_expanded")
        }, 0)
    })

    // Save and download data
    $(".options_download").click(function () {
        saveProjectData(true)
    })

    // Delete project
    $(".options_delete").click(function () {
        if (window.confirm("Are you sure you want to permanently delete this project? \nThis action cannot be undone!")) {
            let projectID = $('.projects_box').attr("data-getVid_UID");
            let userID = $('.projects_box').attr("data-getVid_userID");
            $.ajax({
                type: "POST",
                url: "deleteProject_backend.php",
                data: {
                    "projectID": projectID,
                    "userID": userID
                },
                success: function (response) {
                    let result = JSON.parse(response).message
                    // alert(result)
                    // let result = response
                    console.log(result)
                    if (result == "success") {
                        // If successfully deleted
                        alert("Project has been deleted!")
                        window.location = 'home.php#projects';
                    } else {
                        // If error received alert error message
                        alert(result)
                    }
                }
            })
        }
    })

}

$(".publish_form").submit(function (e) {
    e.preventDefault() // avoid to execute the actual submit of the form.
    saveProjectData() // Save data before publishing project
    var form = $(this)
    var formData = new FormData(form[0])
    var url = form.attr('action')
    // console.log(url)
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (response) {
            let result = JSON.parse(response).message
            // alert(result)
            console.log(result)
            if (result == "success") {
                // If successfully updated
                $(".publish_form").addClass("success_form")

                // Update project name in share links
                let projectName = $("#project_name").val()
                let projectURL = $(".view_project").val()
                $(".share_whatsapp").attr("href", `https://api.whatsapp.com/send/?phone&text=Watch%20${projectName}%0D%0A${projectURL}`)
                $(".share_twitter").attr("href", `https://twitter.com/intent/tweet?url=${projectURL}&text=Watch%20${projectName}%0D%0A`)
                $(".share_email").attr("href", `mailto:?body=Watch%20${projectName}%0D%0A${projectURL}`)
            } else {
                // If error received alert error message
                alert(result)
            }
        }
    })
})

// UPDATE THUMBNAIL IMAGE FOR PUBLISHING (NOT DONE YET)
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = function (e) {
            var filepath = e.target.result
            //Change Target Image
            $(".thumbnail_upload_image").attr("src", filepath)
        }

        reader.readAsDataURL(input.files[0]) // convert to base64 string
    }
}

// Image Trigger
$("#upload-img").change(function () {
    readURL(this)
});

// Copy to clipboard 
$("body").on("click", ".copy_link_btn", function () {
    const copyLink = $(".view_project").val()
    navigator.clipboard.writeText(copyLink).then(
        function () {
            /* clipboard successfully set */
            $(".copy_msg").addClass("copy_msg_expanded")
            setTimeout(() => {
                $(".copy_msg").removeClass("copy_msg_expanded")
            }, 2000)
        },
        function () {
            /* clipboard write failed */
            alert('Opps! Your browser does not support the Clipboard API')
        }
    )
    console.log("Copied!");
})