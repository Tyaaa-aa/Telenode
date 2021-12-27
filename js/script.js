// https://yt2htmlcors.herokuapp.com/video_info.php?url=https://www.youtube.com/watch?v=LXb3EKWsInQ
window.addEventListener('load', function () {
    // Everything has loaded!
    hidePreloader()
})


$(function () {
    // START OF DOCUMENT READY FUNCTION
    // setTimeout(() => {
    // }, 1000)

    // Remove this if video API being used
    loadingBarAnimation()

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


    // $(".video_cards").on("click", function (e) {
    //     // e.stopImmediatePropagation()
    //     // e.stopPropagation()
    // })

    // $(".edit_btn").on("click", function (e) {
    //     // e.stopImmediatePropagation()
    //     // console.log($(this).data("vid"))
    //     console.log("SCREAM")
    //     let url = $(this).data("vid")
    //     window.location.href = `edit.php?id=${url}`;
    //     e.stopPropagation()

    // })



    // ======== PROJECTS PAGE CONTENT RENDER ON PROJECTS.PHP =========

    // if ($(".projects_box").data("getvid_urls") != undefined) {
    //     let videoData = $(".projects_box").data("getvid_urls")
    //     let videoData = Object.keys(videoData)
    //     console.log(videoData)
    //     console.log(videoData[0])
    // }









}) // END OF DOCUMENT READY FUNCTION

// ======== FUNCTIONS ZONE =======
function hidePreloader() {
    $("#preloader").fadeOut(300)
}

function showPreloader() {
    $("#preloader").show()
}

function showLogin() {
    $(".login-box").show()
    $(".register-box").hide()
}

function showRegister() {
    $(".login-box").hide()
    $(".register-box").show()
}


// Login/Register toggle
showLogin()
$(".registerForm-btn").click(function () {
    showRegister()
})
$(".loginForm-btn").click(function () {
    showLogin()
})


// Login and register form code

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
        $(".account_form").submit()
    } else {
        $(".account_form .input_field").attr("readonly", false)
        $(".account_form .input_field").removeClass("readonly_field")
        $(".account_form .account_password").css({
            "max-height": "100px",
            "opacity": "1"
        })

        $(this).attr("type", "submit")
        $(this).text("Save")
    }
})








// HEADER CODE==========
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
        loadingBarAnimation()
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





function playVideo(vidURL) {
    // showPreloader()

    // GET VIDEO URL FROM API
    $.get("https://ytdirectvidapi.herokuapp.com/api/?url=" + vidURL, function (data, status, xhr) {
        // console.log(xhr.status)
        // IF STATUS IS 200 (SUCCESS) 
        if (xhr.status = 200) {
            // JSON result in `data` variable
            // console.log(data)
            if ("links" in data) {
                // API returned a usable link successfully
                console.log("%c✔ SUCCESS", "color:green;", "\nURL: " + data.links[0])
                //Load the player with new source
                $("#video-player").attr("src", data.links[0])
                hidePreloader()

            } else {
                // API did not return usable link
                console.log("%c ❌ ERROR", "color:red;")
                hidePreloader()
            }
        } else {
            // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
            console.log("%c ❌ ERROR", "color:red;")
            hidePreloader()
        }
    }).fail(function () {
        // IF ERROR RESUBMIT SEARCH TERM (DO THIS BECAUSE API IS UNSTABLE AND NEEDS TO SUBMIT SEARCH QUERY TWICE)
        console.log("%c ❌ ERROR", "color:red;")
    })
}

// $("#nextVid").click(function () {
//     if (playstate < (jsonData.videos.length - 1)) {
//         playstate++;
//         playVideo(jsonData.videos[playstate])
//         console.log(playstate)
//     }
// })

// $("#prevVid").click(function () {
//     if (playstate > 0) {
//         playstate--;
//         playVideo(jsonData.videos[playstate])
//         console.log(playstate)
//     }
// })

function ajaxVidData(scriptUrl) {
    showPreloader()
    return $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'text',
        success: function (data) {
            const videoURL_parsed = JSON.parse(data)
            videoURL = videoURL_parsed.links[0]
            videoData = {
                "video": videoURL,
            }
        }
    })
};

async function getVidData(videoID) {
    // Convert any valid youtube url to its video id
    videoID = extractVidId(videoID)
    // Get the video URL
    let scriptUrl = "https://ytdirectvidapi.herokuapp.com/api/?url=" + videoID;
    let result = await ajaxVidData(scriptUrl)
    // console.log(x)
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
                listHTML = `
                <a href="https://youtu.be/${videoID}" class="video_cards grabbing" target="_blank" onclick="openInNewTab()">
                    <div class="thumbnail-box">
                        <img class="thumbnail" src="${thumbnail}" alt="Thumbnail">
                    </div>
                    <h4>${title}</h4>
                </a>`;

                listMenu = `
                <div class="dropdown_option" data-title="${title}" data-videoid="${videoID}">${title}</div>`;
                $(listMenu).appendTo(".dropdown_content")
            } else {
                // Local project video card
                listHTML = `
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
    } else {
        alert("An Error Occured. Project has been removed or the link is invalid.")
        window.location.href = "home.php";
    }
}

function openInNewTab() {
    if (window.confirm("Do you really want to leave?")) {
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
$(".edit_projects").on("input click", ".question_field", async function (e) {
    // $(this).val(extractVidId($(this).val()))
    $(this).blur()
    console.log("BLURRING");
    // console.log(e.handleObj.type)
    const videoID = extractVidId($(this).val())
    if (videoID.length == 11) {
        $(this).val(videoID)
        // Pass video id to data generator generateData()
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
    } else {
        $(this).val("")
    }
    arrangeBlocks()
})

// Dropdown menu dismiss on click anywhere
$(document).on("click", function () {
    if ($(".dropdown_content").hasClass("dropped")) {
        $(".dropdown_content").removeClass("dropped")
        $(".dropbtn_container .material-icons").removeClass("droparrow")
    }
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





// ========= BLOCKS FUNCTIONALITY ===========

$(".edit_projects").on("input click", ".input_field", function () {
    // generateData()
    updateBlocks()
})

$(".jsondebug").click(generateData)
updateBlocks()
// Updates and creates/deletes blocks based on user provided data
async function updateBlocks() {
    console.log("\nUpdating Blocks:")




    // newBlock.appendTo(".edit_projects")
    // $(".edit_projects").append(newBlock)
    // console.log("Appending newBlock")

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
                console.log(`Found project_blocks_${i}`);
                $(`.project_blocks_${i}`).find("p").text(`${optionTitle}`)
                $(`.project_blocks_${i}`).find(".video_title").text(`${videoDataTitle}`)
                let thisThumbnail = $(`.project_blocks_${i} .block_video `).find(".thumbnail");
                if (optionVideoid != undefined) {
                    thisThumbnail.attr("src", `https://i.ytimg.com/vi/${optionVideoid}/hqdefault.jpg`)
                    console.log("updating thumbnail");
                }
                // $(`project_blocks_${i}`).css("transform","scale(0.5)")
            } else {
                // Create blocks with values if they dont exist yet
                console.log(`\nCreated instance of project_blocks_${i}`);
                $(".edit_projects").append(newBlock)
            }
            // console.log($.parseHTML(newBlock)[1].id);
            // $('.edit_projects .project_blocks').slice(1).remove();
            // $(".edit_projects").append(newBlock)

        }

    }


}

$(".edit_projects").on("focusout", ".input_field", function () {
    // setTimeout(() => {
    arrangeBlocks()
    // }, 50);
})

function arrangeBlocks() {
    console.log("Arranging Blocks");
    $(".edit_projects .project_blocks").sort(function (a, b) {
        return parseInt(a.id) - parseInt(b.id);
    }).each(function () {
        var elem = $(this);
        elem.remove();
        $(elem).appendTo(".edit_projects");
    });
}

// Creates JSON save based on user provided data
function generateData() {
    // Create main container array to store all project data
    let projectDataArray = []
    for (let i = 0; i < $(".project_blocks").length; i++) {
        // Create objects for each project block and store in main array
        let projectData = new Object()
        let projectBlock = $(".project_blocks").eq(i)

        // Get block question title and video ID
        let thisQuestionTitle = projectBlock.find(".question_title").val()
        let thisQuestionVideoid = projectBlock.find(".dropbtn").attr("data-videoid")

        // Store values into data object
        projectData.questionTitle = thisQuestionTitle
        projectData.videoID = thisQuestionVideoid

        // Create array to store options objects 
        let projectOptionsArray = []
        let projectOptions = $(".project_blocks").eq(i).find(".block_questions")
        for (let i = 0; i < projectOptions.length; i++) {
            // Get options title and video ID
            let thisOptionsVideoid = projectOptions.eq(i).find(".dropbtn").attr("data-videoid")
            let thisOptionsTitle = projectOptions.eq(i).find(".options_field").val()

            // console.log(thisOptionsVideoid,thisOptionsTitle);

            // Create objects for each option within project block
            let thisProjectOptionsData = new Object()
            // Store values into data object
            thisProjectOptionsData.title = thisOptionsTitle
            thisProjectOptionsData.videoID = thisOptionsVideoid
            // Store values into data object
            projectOptionsArray.push(thisProjectOptionsData)
        }

        // 
        projectData.options = projectOptionsArray
        projectDataArray.push(projectData)
    }

    console.log(projectDataArray)
    // console.log(projectDataArray[0].options)


    // Save the file ==== FOR DEBUGGING PURPOSES ONLY ====
    // saveJson('tn_savefile.json', projectDataArray);
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
};





// DEBUG GENERATE EXTRA BLOCKS FOR TESTING

for (let i = 1; i < 3; i++) {
    // $(".project_blocks_starter").eq(0).clone().appendTo(".edit_projects")
}
// PROJECTS PAGE RENDERING ============