// 🟩 SHOW AUTHOR ON VIDEO CARDS
// 🟩 NEED TO IMPLEMENT END OF VIDEO CATCHING
// 🟩 UPGRADE API TO GRAB HD VERSION OF VIDEOS
// 🟩 ADD VIEW COUNT
// 🟩 SEPARATE PUBLISHED AND UNPUBLISHED PROJECTS IN MY PROJECTS TAB
// 🟩 NEED TO IMPLEMENT ERROR CATCHING FOR BLANK PROJECTS
// 🟩 NEED TO IMPLEMENT BACK BUTTON
// 🟩 IMPLEMENT TAGS FOR VIDEO VISIBILITY STATUS
// 🟩 PROVIDE VIEW BUTTON IN EDIT PAGE (EITHER POP UP IFRAME OR JUST SIMPLE REDIRECT)
// 🟩 WHEN ON BLOCK TAB KEY SHOULD GO TO NEXT FIELD (TABINDEX = "-1" MAYBE)
// 🟩 NEED TO IMPLEMENT KEYBOARD SHORTCUTS FOR VIDEO PLAYER
// 🟩 ADD ANIMATIONS FOR MODALS (INTERACTIVE CARDS)
// 🟩 ADD ABILITY TO IMPORT PROJECTS
// 🟩 NEED TO IMPLEMENT LOCAL STORAGE SAVE AUDIO LEVEL
// 🟩 IMPLEMENT META TAGS FOR SOCIAL SHARING
// 🟩 HOME UI LOOK LIKE DOG NOW (SIDEBAR AND PROJECTS)
// 🟩 PADDING ON THE TIMELINE/SEEKER
// 🟩 FIX CREATE PAGE BUTTON
// 🟩 HYPERLINK TO YOUTUBE ON CREATE PAGE
// 🟩 CHANGE UPLOAD THUMBNAIL ICON COLOR (MAKE IT MORE OBVIOUS THAT IT CAN BE CHANGED)
// 🟩 UNPUBLISHED SHOULD BE VIEWABLE BY CREATOR
// 🟩 CHANGE EDIT BUTTON TO 3 DOTS WITH MENU FOR DELETE/EDIT/SHARE/DOWNLOAD
// 🟩 CHANGE WATCH GUIDE WHEN COMPLETE
// 🟩 EDIT PAGE FIX SCROLL ANIMATION
// 🟩 ADD SHARE BUTTON BELOW VIDEO
// 🟩 MOVE PLAY BUTTON TO THE LEFT
// 🟩 UNPUBLISHED CLICK TO GO TO EDIT PAGE
// 🟩 IMPLEMENT SEARCH PAGE **
// 🟩 FIX MENU LISTING OF VIDEOS (".dropbtn")
// 🟩 ABILITY TO REPLACE VIDEO LINKS EASILY *****
// 🟩 CREATE PROJECT ALL VIDEOS ARE UNIQUE VALIDATED
// 🟩 CREATE SHOWCASE PROJECT ********
// 🟩 NEED TO IMPLEMENT USER SCALE PREFERENCE **
// 🟩 EDIT ACCOUNT IMPLEMENT CONFIRM PASSWORD
// 🟩 Hide community and help page for now
// 🟩 NEED TO IMPLEMENT FIRST TIMER USER ONBOARDING *******
// 🟩 NEED TO FIX POPULATE PROJECTS (SHOWS NO PROJECTS YET EVEN WHEN THERE ARE PROJECTS BUT JUST UNPUBLISHED)
// 🟩 MAYBE DONT SHOW DUPLICATE BLOCKS FOR UNIQUE BLOCK NAME IDENTIFICATION SYSTEM?! **
// 🟩 IDENTICAL BLOCKS WILL AUTO SET DATA TO FIRST INSTANCE BLOCK DATA
// 🟩 IDENTICAL BLOCKS WILL HYPER LINK TO FIRST INSTANCE BLOCK DATA FOR EASE OF NAVIGATION
// 🟩 FIX HTTPS CREATE PROJECT BUG
// 🟥 ADD OPTION TO DOWNLOAD EITHER JUST VIDEOS OR ALL PROJECT DATA
// 🟥 NEED TO IMPLEMENT IDENTIFICATION COLOURED DOTS *****
// 🟥 IMPLEMENT 360 VIDEOS (MAKE HYBRID SWITCH BETWEEN 360 VIDEOS AND 2D VIDEOS)
// IMPLEMENT USER ROLES (STUDENTS CANNOT CREATE, USER GROUPS ONLY ACCESS TO CERTAIN CREATORS/GROUP CONTENT)
// ADD LIKES AND COMMENTS
// 🟨 (OBSCURE VIDEOS BUG) API APPEARS TO NOT WORK FOR SOME VIDEOS MARKED FOR KIDS AND UNLISTED VIDEOS. NEEDS     FURTHER TESTING!!!!!! **** /* BROKEN YOUTUBE LINKS: https://youtu.be/xkBzOuawCws, https://www.youtube.com/watch?v=oZoUoF1Vg7g */


// ===== VIDEO PLAYER SETTINGS =====

// Store user adjusted volume into localstorage and use that next time
// Default volume of player (Value range from: 0 - 1)
let defaultVolume = 0.5
// Load video on page load. Leave on by default. Mostly used for development
let vidOnLoad = true
// Autoplay video
let autoPlay = true
// If watched at least 30 seconds or 15% of the video add to view count
let minWatchTimeSec = 30 // Minimum time in seconds
let minWatchTimePercent = 15 // Minimum time as a percentage

// Initialize video player
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
videojs('my-video').ready(function () {
    this.hotkeys({
        volumeStep: 0.05,
        seekStep: 5,
        enableModifiersForNumbers: false
    })
})

$(".share_btn").click(function () {
    if ($(".share_social_container").hasClass("share_social_container_expanded")) {
        $(".share_social_container").removeClass("share_social_container_expanded")
    } else {
        setTimeout(() => {
            $(".share_social_container").addClass("share_social_container_expanded")
        }, 10);
    }
})

$(document).click(function () {
    $(".share_social_container").removeClass("share_social_container_expanded")
})









// ====== LOGIC FOR PLAYING PROJECT DATA ======
// Get project data
let projectData = $(".project_data").attr("data-getVid_ProjectData")
if (typeof projectData === 'string') {
    if (!(projectData == "")) {
        projectData = JSON.parse(projectData)
    }
}
let projectName = $(".project_data").attr("data-getVid_Name")
let maxOptionCount = 3; // Maximum amount of options
// console.log();
let firstVid = Object.values(projectData)
let optionsBlocks // Global to be accessible and set anywhere
let firstBlock = projectData[0] // First block of the project (Starting Block)
let hash = document.location.hash // Current hash in url (can start project from any point)

// Catch undone projects (If question title or video is not set)
try {
    if (!(firstBlock.questionTitle == "") && !(firstBlock.questionTitle == undefined) && !(firstBlock.videoID == "") && !(firstBlock.videoID == undefined)) {
        setTimeout(() => {
            if (vidOnLoad) {
                playCurrentBlock()
                viewCount()
            }
        }, 10);
    } else {
        alert("Project is undone! Make sure to include at least one video and title first!")
        history.back()
        window.location.replace('home.php#dashboard')
    }
} catch (err) {
    alert("Project is undone! Make sure to include at least one video and title first!")
    history.back()
    window.location.replace('home.php#dashboard')
}

function playCurrentBlock() {
    if (hash != "") {
        playFromHash()
    } else {
        playBlock(firstBlock)
    }
}

$(window).on('hashchange', function (e) {
    resetFallback()
    playFromHash()
    // console.log(hashBlock)
})

function playFromHash() {
    hash = document.location.hash.replace("#", "")
    hash = decodeURI(hash)
    // console.log(hash)
    modal.close()
    let hashBlock = filter(projectData, hash, 'blockID')[0]
    playBlock(hashBlock)
}

function playBlock(block) {
    // console.log(hash)
    // console.log(block)
    let currentVideoid = extractVidId(block.videoID)
    // console.log(currentVideoid);
    let currentVideoOptions = block.options
    let currentVideoTitle = block.questionTitle

    // Prevent code injection
    currentVideoTitle = currentVideoTitle.replace('<', ' ⟨ ')
    currentVideoTitle = currentVideoTitle.replace('>', ' ⟩ ')
    optionsBlocks = $("<div class='modal'></div>")
    let counter = 0
    let lastBlock = false
    for (let i = 0; i < currentVideoOptions.length; i++) {
        // console.log(currentVideoOptions[i].title);
        let thisTitle = currentVideoOptions[i].title
        // Prevent code injection
        if (thisTitle) {
            thisTitle = thisTitle.replace('<', ' ⟨ ')
            thisTitle = thisTitle.replace('>', ' ⟩ ')
        }
        let thisVideoID = currentVideoOptions[i].videoID
        // Prevent code injection
        if (thisVideoID) {
            thisVideoID = thisVideoID.replace('<', ' ⟨ ')
            thisVideoID = thisVideoID.replace('>', ' ⟩ ')
        }
        let optionVideoBlock = thisTitle
        if (thisTitle != "" && thisTitle != undefined && thisVideoID != "" && thisVideoID != undefined) {
            optionsBlocks.append(`
                <a href="#${encodeURI(optionVideoBlock)}" class="video_options" data-blockid="${optionVideoBlock}" data-title="${thisTitle}">
                    ${thisTitle}
                </a>`)
        } else {
            counter++
            // console.log("COUNTER: " + counter);
            if (counter == maxOptionCount) { // No options left
                lastBlock = true
            }
        }
    }
    if (!lastBlock) {
        optionsBlocks = /* HTML */ `
        <div class='modal'>
            <div class="modal_content">
                <h1>${currentVideoTitle}</h1>
                <div class="video_options_container">
                    ${optionsBlocks.html()}
                </div>
            </div>
        </div>`
    } else { // Show end of video card

        optionsBlocks = /* HTML */ `
        <div class='modal'>
            <div class="video_end">
            <h3 class="success_message_text">${projectName}</h3>
            <div class="copy_link_container">
                <span>Share: </span>
                <input type="text" class="input_field view_project" value=${window.location.href} readonly="">
                <span class="copy_link_btn material-icons" title="Click to copy link">
                    content_copy
                </span>
                <span class="copy_msg">Copied</span>
            </div>

            <div class="share_social_container">
                <a href="https://api.whatsapp.com/send/?phone&amp;text=Watch%20${projectName}%0D%0A${window.location.href}" class="share_btns share_whatsapp " target="_blank" title="Share to Whatsapp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"></path>
                    </svg>
                </a>
                <a href="https://twitter.com/intent/tweet?url=${window.location.href}&amp;text=Watch%20${projectName}%0D%0A" class="share_btns share_twitter" target="_blank" title="Share to Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"></path>
                    </svg>
                </a>
                <a href="mailto:?body=Watch%20${projectName}%0D%0A${window.location.href}" class="share_btns share_email" target="_blank" title="Share E-Mail">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z"></path>
                    </svg>
                </a>
            </div>
            </div>
        </div>`
    }
    // console.log(currentVideoOptions.length)
    // Play first video (Add false 2nd parameter to disable autoplay)
    // DISABLED FOR DEVELOPMENT PURPOSES
    changeVid(currentVideoid, autoPlay)
}


// ========= API FUNCTIONS =========
function ajaxVidData(scriptUrl) {
    showPreloader()

}

// Default API grabs 720p quality video
let scriptUrl = "https://telenode-yt-api.herokuapp.com/api?url="

function getVidData(videoID) {
    // Convert any valid youtube url to its video id
    videoID = extractVidId(videoID)
    // Get the video URL
    return $.ajax({
        url: scriptUrl + videoID,
        type: 'get',
        dataType: 'JSON',
        success: function (data) {
            // videoData = {
            //     "video": data.links
            // }
        }
    })
}

// If error (might be bad get video link) just retry current block to grab a new link
let errorCounter = 0
let fallback = false
myPlayer.on("error", function () {
    // console.log(myPlayer.error().code)
    if (myPlayer.error().code > 0) {
        // USE FALLBACK API (LIMITED TO 480p)
        console.log("Using Fallback API");
        fallback = true
        // Fallback API grabs 480p quality video
        scriptUrl = "https://ytdirectvidapi.herokuapp.com/api/?url="
        playCurrentBlock()
    }
    // else {
    errorCounter++
    if (errorCounter >= 3) { // Redirect user to home if error more than 3 times 
        alert("Something went wrong! Please check that your video does not use any copyrighted music!")
        window.location = 'home.php#dashboard' // DISABLED FOR DEVELOPMENT PURPOSES
    }
    // }
})
// myPlayer.on('play', () => {
//     console.log("Playing Successful")
//     errorCounter = 0
// })

// Main video playing function Add true 2nd parameter to disable autoplay
async function changeVid(videoid, disableautoplay) {
    let vidUrl = await getVidData(videoid)
    // console.log(videoid)
    let vidLink
    if (!fallback) {
        vidLink = vidUrl.links
    } else {
        vidLink = vidUrl.links[0]
    }

    // console.log(vidLink)
    myPlayer.src({
        type: 'video/mp4',
        src: vidLink
    })

    if (!disableautoplay) return
    myPlayer.ready(function () {
        myPlayer.play()
    })
}

// Initialize end of video modal pop ups
var ModalDialog = videojs.getComponent('ModalDialog');
var modal = new ModalDialog(myPlayer, {
    temporary: false
})
// Attach modal to video player
myPlayer.addChild(modal);
// Show modal when video ends
myPlayer.on('ended', function () {
    // console.log("Video Ended")
    resetFallback()
    modal.open()
})

function resetFallback() {
    if (fallback) { // Reset fallback after video end if fallback was used
        console.log("Resetting fallback");
        errorCounter = 0
        // Default API grabs 720p quality video
        scriptUrl = "https://telenode-yt-api.herokuapp.com/api?url="
        fallback = false
    }
}
// Set content of modal to show available options or end of video card
modal.on('modalopen', function () {
    // console.log('modalopen')
    // modal.contentEl().style.opacity = 0
    modal.contentEl().style.transition = "none"
    modal.contentEl().style.transform = "scale(0) "
    modal.contentEl().style.overflow = "hidden "
    modal.contentEl().innerHTML = optionsBlocks // Set content of modal
    setTimeout(() => {
        modal.contentEl().style.transition = "all 0.5s"
        modal.contentEl().style.transform = "scale(1) "
    }, 10);
})

// Click on options
$("#watch_body").on("click", ".video_options", function () {
    let selectedOptionTitle = $(this).data("title")
    let selectedOptionBlockID = $(this).data("blockid")
    // console.log(selectedOptionTitle, selectedOptionBlockID);

    let nextBlock = filter(projectData, selectedOptionBlockID, 'blockID')[0]
    // console.log(nextBlock)
    modal.close()
    playBlock(nextBlock)
})
// Find block id
const filter = (array, value, key) => {
    return array.filter(
        key ?
        (a) => a[key].toLowerCase().includes(value.toLowerCase()) :
        (a) =>
        Object.keys(a).some((k) =>
            a[k].toLowerCase().includes(value.toLowerCase())
        )
    )
}

// ===== VIEW COUNTER =====
// Add timeout before view count is updated. Maybe 10% || 30 seconds of first video
function viewCount() {
    let projectViews = $(".project_data").attr("data-getVid_Views")
    let projectUID = $(".project_data").attr("data-getVid_UID")
    // console.log(projectViews)
    let viewcounter = 0
    let viewTimer = setInterval(() => {
        viewcounter++
        // console.log("Iteration: " + viewcounter)
        let currentTime = Math.floor(myPlayer.currentTime())
        let durationTime = Math.floor(myPlayer.duration())
        if (durationTime != undefined && !isNaN(durationTime)) {
            // console.log(currentTime + "/" + durationTime)
            let vidPercent = ((currentTime / durationTime) * 100).toFixed(2)
            // console.log(vidPercent + `% / ${minWatchTimePercent}%`)
            if (currentTime >= minWatchTimeSec || vidPercent >= minWatchTimePercent) {
                // console.log(`Adding View Count to ${projectUID}!`);
                clearInterval(viewTimer)
                $.ajax({
                    type: "POST",
                    data: {
                        'projectUID': projectUID
                    },
                    url: "update_viewcount.php",
                    cache: false,
                    success: function (response) {
                        if (response == 1) $(".video_info .view_count").text(response + " View")
                        else $(".video_info .view_count").text(response + " Views")

                        // console.log("Added View! 🟩")
                        // console.log("New view count: "+response)
                    }
                })
            }
        }
    }, 1000);
}