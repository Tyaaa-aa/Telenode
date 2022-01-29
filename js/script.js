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
        // console.log("Show Password")
    })

    $(window).resize(function () {
        if (window.matchMedia("only screen and (max-width: 1000px)").matches) {
            // $("#sidebar").show()

            collapseSidebar()

            let sidebar = $("#sidebar").detach()

            $("nav").append(sidebar)
        }
    })
    $(window).resize()

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
$(".registerForm-btn").click(function () {
    showRegister()
})
$(".loginForm-btn").click(function () {
    showLogin()
})
showLogin()

function showLogin() {
    $("#login-container .login-box").show()
    $("#login-container .register-box").hide()
}

function showRegister() {
    $("#login-container .login-box").hide()
    $("#login-container .register-box").show()
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
$('#password_msg').text('Enter a Password').css('color', 'transparent')
$('#userPassword_reg, #userPasswordCnfm_reg').on('keyup', regPasswordVerify)

function regPasswordVerify() {
    if ($('#userPassword_reg').val().length >= 8) {
        if ($('#userPassword_reg').val() == $('#userPasswordCnfm_reg').val()) {
            $('#password_msg').text('Passwords Match').css('color', 'green')
            $("#register_btn").css("pointer-events", "auto")
            $("#register_btn").css("cursor", "pointer")
        } else {
            $('#password_msg').text('Passwords do not match!').css('color', 'red')
            $("#register_btn").css("pointer-events", "none")
            $("#register_btn").css("cursor", "not-allowed")
        }
    } else {
        $('#password_msg').text('Passwords must be at least 8 characters!').css('color', 'red')
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
            "max-height": "120px",
            "opacity": "1"
        })
        setTimeout(() => {
            $(this).attr("type", "submit")
            $(this).text("Save")
        }, 10)
    }
})

$("#toggleAll").click(function () {
    if ($("#toggleAll").is(":checked")) {
        // console.log("dark")
        updateTheme("dark")
    } else {
        // console.log("light")
        updateTheme("light")
    }
})

$("#upload-img").change(function () {
    $(".account_pic").submit()
})

$(".font_slider").on("input", function () {
    let input = $(this).val()
    let style

    if (input == 1) {
        fontSize = "smaller"
        style = 0.6
    } else if (input == 2) {
        fontSize = "small"
        style = 0.8
    } else if (input == 3) {
        fontSize = "normal"
        style = 1
    } else if (input == 4) {
        fontSize = "big"
        style = 1.2
    } else if (input == 5) {
        fontSize = "bigger"
        style = 1.4
    } else {
        fontSize = "normal"
        style = 1
    }

    $("head").find("#fontsize").remove()
    $("head").append(`<style id="fontsize">html{font-size:${style}em !important;}</style>`)
    $(".font_size_status").text(fontSize)

    $.ajax({
        type: "POST",
        data: 'fontsize=' + fontSize,
        url: "update_fontsize_backend.php",
        success: function (response) {
            let fontsize = JSON.parse(response).fontsize
            // console.log(fontsize)
        }
    })
})


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
        "width": "85%",
        "margin-left": "15%"
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
// ======= PROJECTS PAGE ========
$(document).on("click", ".edit_btn", function () {
    setTimeout(() => {
        let parent = $(this).parent()
        parent.find(".more_options_container").addClass("more_options_container_expanded")
        // console.log(parent)
        // console.log("CLICKED!")
    }, 10)
})

$(document).on("click", ".projectoptions_delete", function (e) {
    // populateProjectData()
    let userid = $(this).data("userid")
    let authorid = $(this).data("vidauthor")
    let vidid = $(this).data("vid")
    if (userid === authorid) {
        if (window.confirm("Are you sure you want to permanently delete this project? \nThis action cannot be undone!")) {
            $.ajax({
                type: "POST",
                url: "deleteProject_backend.php",
                data: {
                    "projectID": vidid,
                    "userID": userid
                },
                success: function (response) {
                    let result = JSON.parse(response).message
                    // alert(result)
                    // let result = response
                    // console.log(result)
                    if (result == "success") {
                        // If successfully deleted
                        // alert("Project has been deleted!")
                        window.location = 'home.php#projects';
                    } else {
                        // If error received alert error message
                        alert(result)
                    }
                }
            })
        }
    } else {
        alert("Something went wrong. Log out and log back in to try again!")
    }

})

$(document).on("click", ".projectoptions_download", function (e) {
    let projectID = $(this).data("vid")
    let projectData = $(this).data("projectdata")
    let videoData = $(this).data("projectvideos")

    let downloadData = new Object()
    downloadData.videoList = videoData
    downloadData.videoData = projectData
    saveJson('tn_' + projectID + '.json', downloadData)
})
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
function validateYouTubeUrl() {
    var url = $('#youTubeUrl').val()
    if (url != undefined || url != '') {
        var regExp = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i

        var match = url.match(regExp)
        if (match && match[2].length == 11) {
            // If Valid
            return true
        } else {
            // Do anything for not being valid
            return false
        }
    }
}
// Validate at least first video before being able to create project 
// 🟨 (Could be improved)

$(document).on("keyup input change", ".upload_input_field", function () {
    return
    let lastInput = $(".upload_input_field").last()
    let firstInput = $(".field_text").first().find("img").attr("src")
    let url = $(this).val()
    // console.log(url)
    url = extractVidId(url)
    if (url != undefined || url != '') {
        if (url.length == 11) {
            let createVidList = []
            for (let i = 0; i < $(".field_text").length; i++) {
                createVidList.push(extractVidId($(".field_text").eq(i).find(".upload_input_field").val()))
                // thisVid.val(extractVidId(thisVid.val()))
                // if (s) return
            }
            console.log(extractVidId($(this).val()))
            console.log(createVidList)
            // Do anything for being valid
            // if need to change the url to embed url then use below line
            // $('#ytplayerSide').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0')
            // console.log("VALID URL")
            $(".submit_btn").fadeIn()
            // console.log(firstInput)
            try {
                let thumbnail = extractVidId($(this).val())
                $(this).parent().find(".thumbnailPreview").attr("src", `https://i.ytimg.com/vi/${thumbnail}/mqdefault.jpg`)
                if (lastInput.val() != "") {
                    // Add Fields
                    // console.log("Adding field")
                    let vidNum = $(".upload_input_field").length
                    $("#videoLength").val(vidNum)
                    $(".submit_btn").before( /* HTML */ `
                    <div class="field_text">
                        <input type="text" placeholder="Add video" class="input_field upload_input_field" name="video_${vidNum}">
                        <div class="thumbnailPreview-box">
                            <img src="" class="thumbnailPreview" alt="">
                        </div>
                    </div>`)
                } else if (lastInput.parent().prev().find(".upload_input_field").val() == "") {
                    // Delete empty field
                    // console.log("Deleting field")
                    $(".field_text").last().fadeOut(300, function () {
                        $(".field_text").last().remove()
                    })
                    if ($(".upload_input_field").val() == "") {
                        $(".submit_btn").fadeOut()
                    }
                }
            } catch (error) {
                console.log(error)
                $(".submit_btn").fadeOut()
                $(this).attr('readonly', true)
                $(this).parent().find(".thumbnailPreview").attr("src", ``)
                $(this).val("Invalid Link!")
                setTimeout(() => {
                    $(this).attr('readonly', false)
                    $(this).val("")
                }, 1000)
            }
            // console.log(($(".upload_input_field").length))
        } else {
            // Do anything for not being valid
            // console.log("WRONG WRONG WRONG URL")
            $(".submit_btn").fadeOut()
            // $(".field_text").slice(1).remove()
            let firstUploadInput = $(".field_text").first().find(".input_field ")
            firstUploadInput.attr('readonly', true)
            firstUploadInput.parent().find(".thumbnailPreview").attr("src", ``)
            firstUploadInput.val("Invalid Link!")
            setTimeout(() => {
                firstUploadInput.attr('readonly', false)
                firstUploadInput.val("")
            }, 1000)
        }
    }
})

$(".submit_btn").hide()

async function validVideoId(id) {
    try {
        let img = new Image();
        img.src = "http://img.youtube.com/vi/" + extractVidId(id) + "/mqdefault.jpg";


        let test = await $(img).on("load", async function () {

        })[0].width

        console.log(test);
        return test

    } catch (error) {
        return false
    }

}

const loadImage = src =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

// CHECK IF THERE ALREADY EXISTS THE SAME VIDEO ID 
$(document).on("input", ".upload_input_field", async function () {
    // console.log("____________________________")
    let thisParent = $(this).parents(".field_text")
    $(this).css("border-color", "red")
    $(".submit_btn").hide()
    thisParent.find(".thumbnailPreview").attr("src", `img/empty_thumbnail.png`)
    // let isVideoValid = await validVideoId($(this).val())

    let isVideoValid = await loadImage(`https://img.youtube.com/vi/${extractVidId($(this).val())}/mqdefault.jpg`)

    // console.log(isVideoValid.width)


    if (!$(this).hasClass("first_upload_input_field") && $(this).val() == '') {
        $(".submit_btn").show()
    }
    if (isVideoValid.width == 120) return
    // if (!isVideoValid) return
    $(this).css("border-color", "green")
    $(".submit_btn").show()
    thisParent.find(".thumbnailPreview").attr("src", `https://i.ytimg.com/vi/${extractVidId($(this).val())}/mqdefault.jpg`)
    // console.log(extractVidId($(this).val()))

    if (($(this).val() == '' || extractVidId($(this).val()) == false) && !$(this).hasClass("first_upload_input_field")) {
        if (thisParent.next().find(".upload_input_field").val() == '') {
            thisParent.remove()
        }
        return
    } else if ($(".first_upload_input_field").val() == '') {
        for (let i = 0; i < $(".field_text").length; i++) {
            $(".field_text").eq(i + 1).remove()
        }
        $(".submit_btn").hide()
        return
    }

    // console.log(extractVidId($(this).val()))
    if (!extractVidId($(this).val()) || $(".upload_input_field").last().val() == '') return
    let vidNum = $(".upload_input_field").length
    $(".submit_btn").before( /* HTML */ `
    <div class="field_text">
        <input type="text" placeholder="Add video" class="input_field upload_input_field" name="video_${vidNum}">
        <div class="thumbnailPreview-box">
            <img src="" class="thumbnailPreview" alt="">
        </div>
    </div>`)
})

// Auto paste valid user copied link
$(document).on("click", ".upload_input_field", async function () {
    // return
    const userClipboard = await navigator.clipboard.readText()
    if ($(this).val() == '' && extractVidId(userClipboard)) {
        $(this).val(extractVidId(userClipboard))
        $(".upload_input_field").trigger("input")
    }
})

$(".upload_field_box").submit(function (e) {
    e.preventDefault()
    for (let i = 0; i < $(".field_text").length; i++) {
        let thisInput = $(".field_text").eq(i).find(".upload_input_field")
        thisInput.val(extractVidId(thisInput.val()))
        console.log(thisInput.css("border-color"))

        if (thisInput.css("border-color") == "rgb(255, 0, 0)" || thisInput.css("border-color") == "rgba(0, 0, 0, 0)") {
            thisInput.parents(".field_text").addClass("removeInputs")
        }

    }

    $(".removeInputs").remove()

    var values = $(".upload_input_field").map(function () {
        if ($(this).val().length >= 11) return $(this).val()
    }).get()

    console.log(values)

    let uniq = [...new Set(values)]

    console.log(uniq)


    $("#videoThumbnail").val("https://i.ytimg.com/vi/" + extractVidId($(".upload_input_field").first().val()) + "/hqdefault.jpg")
    $(".field_text").remove()
    // $(".upload_input_field").last().removeAttr("name")
    for (let i = 0; i < uniq.length; i++) {
        $(".upload_field_box").append(`<input type="text" placeholder="Add video" class="input_field upload_input_field" name="video_${i}" value="${uniq[i]}"></input>`)
    }
    // $(this).submit()
    e.currentTarget.submit();
})

// Get Video Info Without MP4 URL
async function getVidInfo(videoID) {
    hidePreloader()
    return $.ajax({
        url: "https://www.youtube.com/oembed?url=youtube.com/watch?v=" + extractVidId(videoID) + "&format=json",
        type: 'get',
        dataType: 'text'
    })
}

function extractVidId(url) {
    try {
        let re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i
        if (url.length >= 11) {
            let id = url.match(re)[7]
            return id
        } else {
            return false
        }
    } catch (error) {
        // console.log(error);
        if (url.length == 11) {
            return url
        } else {
            return false
        }
    }
}

// List Populating function 
// container = container to be populated with data provided
// isYT = is this a youtube link or local project link, true = youtube & false = local
let vidBin
async function listVideos(vidURLS) {
    try {
        if (vidURLS != undefined) {
            $(".projects_box .video_cards").remove()
            vidBin = vidURLS
            // loadingText()
            // Get video list from data "data-getVid_URLS"
            const videoData = Object.values(vidURLS)
            // console.log(videoData)
            for (let i = 0; i < videoData.length; i++) {
                const videoID = extractVidId(videoData[i]) // Strip videoID from rawArray
                // let videoID = VideoDataArray[i];
                let result = await getVidInfo(videoID) // call function to get returned Promise (calls async function sequentially)
                const thumbnail = "https://i.ytimg.com/vi/" + videoID + "/hqdefault.jpg";
                const title = JSON.parse(result).title;
                // console.log(JSON.parse(result).title)
                let listHTML = /* HTML */ `
                    <div class="video_cards">
                        <a href="https://youtu.be/${videoID}" class="grabbing" target="_blank" onclick="openInNewTab()" data-videoid="${videoID}">
                            <div class="thumbnail-box">
                                <img class="thumbnail" src="${thumbnail}" alt="Thumbnail">
                            </div>
                            <h4>${title}</h4>
                        </a>
                        <span class="material-icons repo_vid_icons repo_vid_icons_hidden delete_vid" title="Remove video">
                            clear
                        </span>
                        <span class="material-icons repo_vid_icons repo_vid_icons_hidden replace_vid" title="Replace Video">
                            restart_alt
                        </span>
                    </div>`

                $(listHTML).appendTo($(".projects_box"))
            }
            // updateListMenu(vidBin) // Fix Listing error bug
        } else {
            alert("An Error Occured. Project has been removed or the link is invalid.")
            window.location.href = "home.php";
        }
    } catch (error) {
        let projectID = $('.projects_box').attr("data-getVid_UID")
        // Reset vidlist if unsupported video id in vid list
        let resetvidBin = `{}`
        // console.log(resetvidBin)
        $.ajax({
            type: "POST",
            data: {
                'videos': resetvidBin,
                'projectID': projectID
            },
            url: "updateProjectVideos_backend.php",
            cache: false,
            success: function (response) {
                console.log("Auto Corrupted Video Reset!")
                resetvidBin = JSON.parse(response)
                // console.log(vidBin)
                // updateListMenu(resetvidBin)
            }
        })
        alert("One of the videos used is protected by YouTube or your project has been deleted or corrupted! Attempting to fix by  resetting project!")
        location.reload()
        // history.back()
        // window.location.replace('home.php#projects')
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
    // console.log("BLURRING")
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
    let parentOption = $(this).closest(".block_box")
    if (videoid == "" && title == "") {
        deleteOption(parentOption)
    } else {
        // Update value inside dropdown menu
        // console.log("Updatng option")
        let dropbtn = parentOption.find(".dropbtn")
        dropbtn.val(title)
        dropbtn.attr("data-videoid", videoid)

        // Update thumbnail and title using input eventlistener function $(".edit_projects") defined above 
        let question_field = parentOption.find(".question_field")
        question_field.val(videoid).trigger('input')
    }
})

function deleteOption(option) {
    // console.log("deleting option")
    option.find(".dropbtn").val("")
    option.find(".dropbtn").attr("data-videoid", "")
    option.find(".video_title").text("")
    option.find(".thumbnail").attr("src", "img/empty_thumbnail.png")

    // let blockid = option.find(".options_field").val()
    // console.log(blockid)

    option.find(".options_field").val("")
    updateBlocks()

    // $(".input_field").change()
}

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
    // console.log(input)
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
$(".edit_repo_btn").click(function (e) {
    // $(".toolbar_btns").removeClass("toolbar_btns_active")
    if ($(this).hasClass("edit_mode")) {
        // HIDE EDIT MODE
        $(this).removeClass("edit_mode")
        $(this).css("color", "var(--secondaryColor)")
        $(".edit_projects").removeClass("edit_projects_collapsed")
        $(".projects_box").removeClass("projects_box_expanded")
        $(".repo_vid_icons").addClass("repo_vid_icons_hidden")
        $(".add_videos_btn").addClass("add_videos_btn_hidden")
    } else {
        // SHOW EDIT MODE
        $(this).css("color", "#d3773a")
        $(this).addClass("edit_mode")
        $(".edit_projects").addClass("edit_projects_collapsed")
        $(".projects_box").addClass("projects_box_expanded")
        $(".repo_vid_icons").removeClass("repo_vid_icons_hidden")
        $(".add_videos_btn").removeClass("add_videos_btn_hidden")
    }
})

// Delete video from project repository
// let vidBin
try {
    if ($(".projects_box").attr("data-getvid_urls") != undefined) {
        vidBin = $(".projects_box").attr("data-getvid_urls")
        if (typeof vidBin === 'string') {
            if (!(vidBin == "")) {
                vidBin = JSON.parse($(".projects_box").attr("data-getvid_urls"))
            }
        }
    }
} catch (error) {
    alert("Project is deleted or corrupted!")
    history.back()
    window.location.replace('home.php#projects')
}

$(".projects_box").on("click", ".delete_vid, .replace_vid", function () {
    if ($(this).hasClass("delete_vid")) {
        // if (!confirm('Removing video will delete them from your projects as well!')) return
        // Delete video from repo list
        console.log("Delete Video")
        console.log(vidBin)
        // Code to delete video from repo
        // console.log($(this).parent().index()-2)
        let thisVid = $(this).parent()
        let selectedIndex = thisVid.index() - 2
        // console.log(selectedIndex)
        delete vidBin[Object.keys(vidBin)[selectedIndex]]
        $(thisVid).remove()
        updateRepo()
    } else if ($(this).hasClass("replace_vid")) {
        // Replace a video from repo list
        console.log("Replace Video")
        let replaceVidHTML = /* HTML */ `
            <div class="replace_video_container">
                <input type="text" placeholder="Add Videos" class="replace_video_input input_field">
                <button type="button" value="Submit" class="search_btn replace_btn_submit">
                    <i class="material-icons">add</i>
                </button>
            </div>
        `
        if ($(this).hasClass("replace_vid_expanded")) {
            $(this).removeClass("replace_vid_expanded")
            $(this).parents(".video_cards").find(".replace_video_container").remove()
            $(this).parents(".video_cards").find(".replace_btn_submit").unbind()
        } else {
            $(this).addClass("replace_vid_expanded")
            $(this).parents(".video_cards").append(replaceVidHTML)
            $(this).parents(".video_cards").find(".replace_btn_submit").on("click", async function () {
                let inputAdd = $(this).parents(".video_cards").find(".replace_video_input").val()
                inputAdd = extractVidId(inputAdd)
                if (inputAdd.length == 11) {
                    let oldVideo = extractVidId($(this).parents(".video_cards").find("a").attr("href"))
                    // Execute replace video code if valid link provided
                    let selectedIndex = $(this).parents(".video_cards").index() - 2
                    vidBin[Object.keys(vidBin)[selectedIndex]] = inputAdd
                    console.log(`Replaced Video: ${vidBin[Object.keys(vidBin)[selectedIndex]]}`)

                    // delete vidBin[Object.keys(vidBin)[selectedIndex]]
                    // vidBin[`video_${thisIndex}`] = inputAdd
                    // // console.log(vidBin)

                    let result = await getVidInfo(inputAdd) // Get new video title
                    let title = JSON.parse(result).title
                    $(this).parents(".video_cards").find("h4").text(title)
                    $(this).parents(".video_cards").find(".thumbnail").attr("src", `https://i.ytimg.com/vi/${inputAdd}/hqdefault.jpg`)
                    $(this).parents(".video_cards").find("a").attr("href", `https://youtu.be/${inputAdd}`)
                    // $(this).parents(".video_cards").find(".thumbnail").
                    // $(this).parents(".video_cards").find(".thumbnail").

                    let projectDataArray = getProjectData()

                    // console.log(projectDataArray, oldVideo, inputAdd);

                    // populateProjectData(projectDataArray)
                    // console.log(oldVideo);
                    // projectDataArray.find(v => v.videoID == oldVideo).videoID = inputAdd

                    for (let i = 0; i < projectDataArray.length; i++) {
                        if (projectDataArray[i].videoID == oldVideo) {
                            console.log("Main BLock" + projectDataArray[i].videoID)
                            projectDataArray[i].videoID = inputAdd
                        }
                        for (let x = 0; x < projectDataArray[i].options.length; x++) {
                            if (projectDataArray[i].options[x].videoID == oldVideo) {
                                console.log("Option Block" + projectDataArray[i].options[x].videoID)
                                projectDataArray[i].options[x].videoID = inputAdd
                            }
                        }
                    }
                    // console.log(projectDataArray, oldVideo, inputAdd);
                    populateProjectData(projectDataArray)
                    $(this).parents(".video_cards").find(".replace_video_container").remove()
                    updateRepo()
                } else {
                    alert("Please enter a valid link!")
                }
            })
        }
    }


    // console.log(vidBin)

    function updateRepo() {
        // return // FOR DEVELOPMENT
        console.log("UPDATE REPO")
        let projectID = $('.projects_box').attr("data-getVid_UID")
        vidBin = JSON.stringify(vidBin)

        $.ajax({
            type: "POST",
            data: {
                'videos': vidBin,
                'projectID': projectID
            },
            url: "updateProjectVideos_backend.php",
            cache: false,
            success: function (response) {
                // console.log("Video Deleted! ✅")
                // vidBin = JSON.parse(response)
                vidBin = JSON.parse(response)
                // console.log(vidBin)
                updateListMenu(vidBin)
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
        $(".add_video_input ").focus()
        // Show add input
        $(this).css("color", "#d3773a")
    }
})

$(".add_video_container").click(function (e) {
    e.stopPropagation()
})

$(".add_btn_submit").click(async function () {
    // console.log(vidBin)
    let inputAdd = $(".add_video_input").val()
    inputAdd = extractVidId(inputAdd)
    if (inputAdd.length == 11) {
        // console.log(inputAdd)
        console.log(vidBin)
        // Check if video already exists
        for (let i = 0; i < Object.keys(vidBin).length; i++) {
            console.log(Object.values(vidBin)[i]);
            if (Object.values(vidBin)[i] == inputAdd) {
                alert("Video already added!")
                return
            }
        }
        let thisIndex = $(".projects_box").find(".video_cards").length + 1
        // console.log(thisIndex)
        vidBin[`video_${thisIndex}`] = inputAdd
        // console.log(vidBin)

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
            <span class="material-icons repo_vid_icons delete_vid" title="Remove video">
                clear
            </span>
            <span class="material-icons repo_vid_icons replace_vid" title="Replace Video">
                restart_alt
            </span>
        </div>`;
        $(".projects_box").append(listHTML)

        let projectID = $('.projects_box').attr("data-getVid_UID")
        vidBin = JSON.stringify(vidBin)
        // console.log(vidBin)
        $.ajax({
            type: "POST",
            data: {
                'videos': vidBin,
                'projectID': projectID
            },
            url: "updateProjectVideos_backend.php",
            cache: false,
            success: function (response) {
                // console.log("Video Added! ✅")
                vidBin = JSON.parse(response)
                $(".add_video_input").val('')
                // console.log(vidBin)
                updateListMenu(vidBin)
            }
        })



    } else {
        alert("Please enter a valid link!")
    }
    // $(".projects_box").find(".video_cards").remove()
    // listYTVideos($(".projects_box"), true)
})

// Updates list menus dropdowns with available imported videos
async function updateListMenu(array) {
    // console.log(array)
    // console.log(Object.keys(vidBin).length)
    $(".dropdown_content ").html('')
    // listMenu = /* HTML */ `    <div class="dropdown_option" data-title="" data-videoid="">--Select an option--</div>`;
    // $(listMenu).appendTo(".dropdown_content")
    $(".dropdown_content").append(`<div class="dropdown_option" data-title="" data-videoid="">--Select an option--</div>`)
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
        $(".projects_box").find(".vid_counter").text(" \n(" + videoData.length + " Videos)")
    }
}

// ========= BLOCKS FUNCTIONALITY ===========
let autoSave = 60000; // Autosave every 60 seconds by default
loadingText() // Show loading text on load
// updateBlocks() // Update blocks on load

let timer
// Update and arrange blocks after user finish typing or clicking on input fields
$(".edit_projects").on("input click change", ".input_field, .question_field, .dropdown_option", function () {
    if (!$(this).hasClass("dropbtn")) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            arrangeBlocks()
            updateBlocks()
        }, 500)
    }
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
    }, 2000)
}

// Event for loading data
function loadingText() {
    $(".save_msg").text("Loading...")
    $(".save_msg").append(`<img class="project_loader" src="img/loader.png" alt="loading">`)
    $(".save_msg").removeClass("save_msg_closed")
}

// Event for successful data loaded
function loadedText() {
    // console.log("Done Loading!✅")
    updateBlocks()
    $(".save_msg").text("Done!")
    $(".save_msg .project_loader").fadeOut()
    setTimeout(() => {
        $(".save_msg").addClass("save_msg_closed")
    }, 1000)

    // Set after loading data so doesnt save over existing data before data fully loaded
    // AutoSave every 1 minute 
    setInterval(() => {
        // console.log("Auto saving...")
        saveProjectData()
    }, autoSave)

    // Ctrl + S to save data
    $(document).bind("keydown", function (e) {
        if (e.ctrlKey && e.which == 83) {
            e.preventDefault()
            clearTimeout(timer)
            timer = setTimeout(() => {
                saveProjectData()
            }, 100)
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
    // console.log(scrollPos)
    if (scrollPos == 0) {
        // $(".create_container").css("padding-top", "20px")
        $(".edit_page .steps_bar").removeClass("collapse_bar")
        // setTimeout(() => {

        // }, 4000)
    } else {
        $(".edit_page .steps_bar").addClass("collapse_bar")
        // $(".create_container").css("padding-top", "120px")
    }
    // if (scrollPos <= 35) {
    //     $(".create_container").css("padding-top", `calc(20px+${scrollPos})`)
    // }

})
// if($(window).scrollTop() == 0){

// }
// Updates and creates/deletes blocks based on user provided data
async function updateBlocks() {
    let starterBlockTitle = 'STARTING BLOCK'
    let updateBlockArray = [starterBlockTitle]
    let allBlocksArray = []
    $(".project_blocks").each(function () {
        let decodedBlockUID = decodeURI($(this).attr("data-blockuid")).replace("TN-", "")

        allBlocksArray.push(decodedBlockUID)
    })
    // console.log(allBlocksArray)


    let elOptions = $(".block_questions").find(".options_field")
    for (let i = 0; i < elOptions.length; i++) {
        let thisBlock = $(".project_blocks .block_questions").eq(i)
        let optionTitle = thisBlock.find(".options_field").val()

        // ====== Prevent code injection ======
        // Test code injection with something like this:
        // <img src="img/logo.png" onload="alert('CODE INJECTED')">
        optionTitle = optionTitle.replace('<', ' ⟨ ')
        optionTitle = optionTitle.replace('>', ' ⟩ ')
        // optionTitle = optionTitle.replace('<', '&lt; ')

        // console.log(updateBlockArray.includes(optionTitle));
        let optionVideoid = thisBlock.find(".dropbtn").attr("data-videoid")
        // Update option placeholder numbering
        elOptions.eq(i).attr(`placeholder`, `Option ${i+1}`)

        if ((optionTitle || optionVideoid) && (!updateBlockArray.includes(optionTitle.toUpperCase()))) {
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
            let blockUniqueId = "TN-" + encodeURI(optionTitle.toUpperCase())

            // ===== CREATE NEW BLOCK =====
            let newBlock = /* HTML */ `
            <div class="project_blocks project_blocks_${i}" id="${i}" data-blockuid="${blockUniqueId}">
                <span class="parent_indicator">
                    <div class="pi_dot ">
                        <p>${optionTitle.toString()}</p>
                    </div>
                </span>
    
                <div class="block_video block_box">
                    <div class="video_cards_container">
                        <!-- <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field"> -->
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
                            <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly data-videoid="${optionVideoid}" style="display:none">
                        </div>
                    </div>
                </div>
    
                <div class="block_questions_container">
                    <div class="block_questions block_box">
                        <input type="text" placeholder="Option 1" class="input_field options_field">
                        <div class="dropbtn_container">
                            <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly>
                            <span class="material-icons">
                                expand_more
                            </span>
                            <div class="dropdown_content">
                                <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                            </div>
                        </div>
    
                        <div class="video_cards_container">
                            <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field">
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
                            <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly>
                            <span class="material-icons">
                                expand_more
                            </span>
                            <div class="dropdown_content">
                                <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                            </div>
                        </div>
    
                        <div class="video_cards_container">
                            <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field">
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
                            <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly>
                            <span class="material-icons">
                                expand_more
                            </span>
                            <div class="dropdown_content">
                                <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                            </div>
                        </div>
    
                        <div class="video_cards_container">
                            <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field">
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
                $(`.project_blocks_${i}`).attr("data-blockuid", blockUniqueId)
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

            // console.log("UOIWGOILASBDFK" + updateBlockArray.indexOf(optionTitle.toUpperCase()));

            elOptions.eq(i).parents(".block_box").find(".dropbtn_container").show()
            elOptions.eq(i).parents(".block_box").find(".question_field").show()
            // elOptions.eq(i).parents(".block_box").find(".video_title").text('')
            // elOptions.eq(i).parents(".block_box").find(".dropbtn").attr("data-videoid", '')
            // elOptions.eq(i).parents(".block_box").find(".thumbnail").attr("src", '')
            // elOptions.eq(i).parents(".block_box").find(".video_cards_container").attr("onclick", '')


            updateBlockArray.push(optionTitle.toUpperCase())
        } else {
            // Remove block if no data selected
            $(`.project_blocks_${i}`).remove()

            // Auto set identical option names to first instance block data
            if ((optionTitle) && updateBlockArray.includes(optionTitle.toUpperCase())) {
                let blockIndex = updateBlockArray.indexOf(optionTitle.toUpperCase())
                let blockVideoID = $(`.project_blocks`).eq(blockIndex).find(".block_video").find(".dropbtn").attr("data-videoid")
                // console.log(blockVideoID)

                videoData = await getVidInfo(blockVideoID)
                videoDataTitle = JSON.parse(videoData).title

                // console.log(videoDataTitle)
                // elOptions.eq(i).parents(".block_box").css("border", `2px solid red`)

                elOptions.eq(i).parents(".block_box").find(".dropbtn_container").hide()
                elOptions.eq(i).parents(".block_box").find(".question_field").hide()

                elOptions.eq(i).parents(".block_box").find(".video_title").text(videoDataTitle)
                elOptions.eq(i).parents(".block_box").find(".dropbtn").attr("data-videoid", blockVideoID)
                elOptions.eq(i).parents(".block_box").find(".thumbnail").attr("src", `https://i.ytimg.com/vi/${blockVideoID}/hqdefault.jpg`)
                elOptions.eq(i).parents(".block_box").find(".video_cards_container").attr("onclick", `window.location.hash = ''; window.location.hash = '#${blockIndex -1}'`)


                // console.log(elOptions.eq(i).val());
            }
        }
        // If this option is starter block automatically set this option to starter block video
        // console.log(optionTitle)
        let decodedBlockUID = decodeURI(thisBlock.parents(".project_blocks").attr("data-blockuid")).replace("TN-", "")
        // console.log(optionTitle.toUpperCase(), decodedBlockUID)
        // console.log(decodedBlockUID)
        // console.log([optionTitle.toUpperCase(),updateBlockArray,updateBlockArray.indexOf(optionTitle.toUpperCase())])

        // console.log(optionTitle.toUpperCase())
        // console.log(allBlocksArray.indexOf(optionTitle.toUpperCase()))
        // console.log(updateBlockArray)
    }
    // console.log(updateBlockArray)
    updateListMenu(vidBin)
    // Show publish form again if blocks updated
    if ($(".publish_form").has("success_form")) {
        $(".publish_form").removeClass("success_form") //FOR DEVELOPMENT ONLY
    }
}

$(window).on('hashchange', function (e) {
    if (window.location.href.indexOf("edit?id=") > -1) {
        window.scrollBy(0, -100)
    }
});

function arrangeBlocks() {
    // console.log("Arranging Blocks")
    let currentFocused = $(document.activeElement)
    $(".edit_projects .project_blocks").sort(function (a, b) {
        return parseInt(a.id) - parseInt(b.id)
    }).each(function () {
        var elem = $(this)
        elem.remove()
        $(elem).appendTo(".edit_projects")
    })
    currentFocused.focus()
}

// Creates JSON save based on user provided data
function saveProjectData(download) {
    // console.log("Saving Data...")
    savingData()
    // Create main container array to store all project data
    let projectDataArray = getProjectData()

    // console.table(projectDataArray)
    // console.log(projectDataArray)
    // console.log(projectDataArray[0].options)

    let projectID = $('.projects_box').attr("data-getVid_UID")
    let processedData = JSON.stringify(projectDataArray)
    processedData = processedData.replace(/[']+/g, '&#39;')
    // processedData = processedData.replace(/["]+/g, '&#34;')
    $.ajax({
        type: "POST",
        data: {
            'projectData': processedData,
            'projectID': projectID
        },
        url: "updateProjectData_backend.php",
        cache: false,
        success: function (response) {
            console.log("Data Saved! ✅")
            console.log("Returned DATA:")
            console.log(JSON.parse(response))
            dataSaved()
            if (download == true) {
                let downloadData = new Object()
                downloadData.videoList = vidBin
                downloadData.videoData = projectDataArray
                // console.log(downloadData)
                // console.log(projectDataArray)
                // saveJson('tn_' + projectID + "_" + Date.now() + '.json', downloadData)
                saveJson('tn_' + projectID + '.json', downloadData)
            }
        }
    })
}

// Gets current project data at moment of called
function getProjectData() {
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
    return projectDataArray
}

// Populate data on load 
async function populateProjectData(projectData) {
    if (!projectData) {
        loadedText()
        return
    }
    // console.log("Loading Data...")
    // loadingText()
    if (typeof projectData === 'string') {
        projectData = JSON.parse(projectData)
    }
    // console.log(projectData)
    // Delete all other blocks first
    $(document).find(".project_blocks").slice(1).remove()
    $(".project_blocks_starter").find("input").val("")
    $(".project_blocks_starter").find("input").attr("data-videoid", "")
    $(".project_blocks_starter").find(".video_title").text("")
    $(".project_blocks_starter").find(".thumbnail").attr("src", "img/empty_thumbnail.png")

    // Update starter block
    let starterBlockData = projectData[0]
    let starterTitle = starterBlockData.questionTitle

    let starterVideo = starterBlockData.videoID

    if (starterVideo && starterVideo.length !== 0) {
        // Populate Starter Block Data
        videoData = await getVidInfo(starterVideo)
        videoDataTitle = JSON.parse(videoData).title
        // console.log(starterTitle)
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
            try {
                // console.log(projectData[i])
                let thisBlockData = projectData[i]

                let thisTitle = thisBlockData.questionTitle
                // Prevent code injection
                thisTitle = thisTitle.replace('<', ' ⟨ ')
                thisTitle = thisTitle.replace('>', ' ⟩ ')

                let thisBlockID = thisBlockData.blockID
                // Prevent code injection
                thisBlockID = thisBlockID.replace('<', ' ⟨ ')
                thisBlockID = thisBlockID.replace('>', ' ⟩ ')

                let thisVideo = thisBlockData.videoID
                // Prevent code injection
                thisVideo = thisVideo.replace('<', ' ⟨ ')
                thisVideo = thisVideo.replace('>', ' ⟩ ')

                videoData = await getVidInfo(thisVideo)
                videoDataTitle = JSON.parse(videoData).title
                let blockUniqueId = "TN-" + encodeURI(thisBlockID.toUpperCase())

                // ===== CREATE NEW BLOCK =====
                let newBlock = /* HTML */ `
                        <div class="project_blocks project_blocks_${i-1}" id="${i-1}" data-blockuid="${blockUniqueId}">
                            <span class="parent_indicator">
                                <div class="pi_dot ">
                                    <p>${thisBlockID}</p>
                                </div>
                            </span>

                            <div class="block_video block_box">
                                <div class="video_cards_container">
                                    <!-- <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field"> -->
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
                                        <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly data-videoid="${thisVideo}" style="display:none">
                                    </div>
                                </div>
                            </div>

                            <div class="block_questions_container">
                                <div class="block_questions block_box">
                                    <input type="text" placeholder="Option 1" class="input_field options_field">
                                    <div class="dropbtn_container">
                                        <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly>
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field">
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
                                        <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly>
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field">
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
                                        <input type="text"  class="input_field dropbtn" tabindex="-1"placeholder="Choose a video" onkeypress="return false;" readonly>
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                        <div class="dropdown_content">
                                            <!-- <div class="dropdown_option" data-title="" data-videoid="">-- Select an option --</div> -->
                                        </div>
                                    </div>

                                    <div class="video_cards_container">
                                        <input type="text" placeholder="Choose a video (drag and drop)" tabindex="-1" class="input_field question_field">
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

                    if (optionVideo && optionVideo.length !== 0 && optionVideo !== undefined) {
                        videoData = await getVidInfo(optionVideo)
                        videoDataTitle = JSON.parse(videoData).title
                        blockEL = $(`.project_blocks_${i-1} .block_questions`).eq(x)
                        // console.log(blockEL.find("p").text())
                        blockEL.find(".options_field").val(optionTitle)
                        blockEL.find(".dropbtn").val(videoDataTitle)
                        blockEL.find(".dropbtn").attr("data-videoid", optionVideo)
                        blockEL.find(".video_title").text(videoDataTitle)
                        blockEL.find(".thumbnail").attr("src", `https://i.ytimg.com/vi/${optionVideo}/hqdefault.jpg`)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    loadedText()
}

// Save the file 
const saveJson = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], {
        type: "text/json"
    })
    const link = document.createElement("a")

    link.download = filename;
    link.href = window.URL.createObjectURL(blob)
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":")

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    })

    link.dispatchEvent(evt)
    link.remove()
}

// ======= PUBLISH SECTION ==========
function activatePublishBtn() {
    $(".settings_btn, .more_options, #importJSON, .publish_btn").unbind()
    let publishScrollPos
    $(".publish_btn").click(function () {
        if ($(".main_content").hasClass("view_form")) {
            // HIDE PULISH FORM 
            $(this).find(".publish_btn_label").text("Publish")
            $(this).removeClass("publish_btn_active")
            $(".main_content").removeClass("view_form")
            $(".steps_three").removeClass("steps_number_active")
            $(window).scrollTop(publishScrollPos)
        } else {
            // SHOW PULISH FORM 
            $(this).addClass("publish_btn_active")
            $(".main_content").addClass("view_form")
            $(".steps_three").addClass("steps_number_active")
            $(this).find(".publish_btn_label").text("Go Back")
            publishScrollPos = $(window).scrollTop()
            $(window).scrollTop(0)
        }
    })
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
    // Prompt user to import data
    $(document).on("click", ".options_import", function (e) {
        if (!confirm("Importing will delete all current project data. Continue?")) e.preventDefault()
        // console.log("Import Project")
    })
    // Get JSON uploaded by user and call populate function to parse the data
    $("#importJSON").change(function (evt) {
        try {
            let files = evt.target.files;
            if (!files.length) return
            let file = files[0];
            let reader = new FileReader()
            const self = this;
            reader.onload = (event) => {
                loadingText()
                let data = JSON.parse(event.target.result)
                let projectData = data.videoData
                let videoURLS = data.videoList
                let projectID = $('.projects_box').attr("data-getVid_UID")

                // console.log('FILE CONTENT\n', data)
                populateProjectData(projectData)

                // console.log(vidBin)
                $.ajax({
                    type: "POST",
                    data: {
                        'videos': JSON.stringify(videoURLS),
                        'projectID': projectID
                    },
                    url: "updateProjectVideos_backend.php",
                    cache: false,
                    success: function (response) {
                        // console.log("Video Added! ✅")
                        let vidBin = JSON.parse(response)
                        // console.log(vidBin)
                        listVideos(vidBin)
                        // updateListMenu(updatedVideoURLS)
                    }
                })
            };
            reader.readAsText(file)
        } catch (err) {
            console.error(err)
            loadedText()
        }
    })

    // Delete project
    $(".options_delete").click(function () {
        if (window.confirm("Are you sure you want to permanently delete this project? \nThis action cannot be undone!")) {
            let projectID = $('.projects_box').attr("data-getVid_UID")
            let userID = $('.projects_box').attr("data-getVid_userID")
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
                    // console.log(result)
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
            // console.log(result)
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

// UPDATE THUMBNAIL IMAGE FOR PUBLISHING
$("#upload-img").change(function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader()

        reader.onload = function (e) {
            var filepath = e.target.result
            //Change Target Image
            $(".thumbnail_upload_image").attr("src", filepath)
        }

        reader.readAsDataURL(this.files[0]) // convert to base64 string
    }
})

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
    // console.log("Copied!")
})