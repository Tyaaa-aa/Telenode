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

// SHOW AUTHOR ON VIDEO CARDS✅
// NEED TO IMPLEMENT END OF VIDEO CATCHING✅
// UPGRADE API TO GRAB HD VERSION OF VIDEOS✅
// NEED TO IMPLEMENT ERROR CATCHING FOR BLANK PROJECTS (AND PREVENT PUBLISHING OF BLANK PROJECT TITLES)
// SEPARATE PUBLISHED AND UNPUBLISHED PROJECTS IN MY PROJECTS TAB
// NEED TO IMPLEMENT BACK BUTTON
// NEED TO IMPLEMENT KEYBOARD SHORTCUTS FOR VIDEO PLAYER
// NEED TO IMPLEMENT LOCAL STORAGE SAVE AUDIO LEVEL AND ETC
// NEED TO IMPLEMENT FIRST TIMER USER ONBOARDING
// ADD ANIMATIONS FOR MODALS (INTERACTIVE CARDS)
// ADD LIKES AND COMMENTS AND VIEW COUNT
// IMPLEMENT 360 VIDEOS
// IMPLEMENT META TAGS FOR SOCIAL SHARING

// Get project data
let projectData = $(".project_data").attr("data-getVid_ProjectData")
projectData = JSON.parse(projectData)
let projectName = $(".project_data").attr("data-getVid_Name")
let maxOptionCount = 3; // Maximum amount of options
// console.log();
let firstVid = Object.values(projectData)


let optionsBlocks

let firstBlock = projectData[0]

let currentBlock = firstBlock

// console.log(currentBlock)
if (!(firstBlock.questionTitle == "") && !(firstBlock.questionTitle == undefined)) {
    setTimeout(() => {
        playBlock(currentBlock)

    }, 10);
} else {
    alert("Project is unpublished or undone")
}

myPlayer.on("error", function () {
    playBlock(currentBlock)

})

function playBlock(block) {
    // console.log(projectData)

    let currentVideoid = extractVidId(block.videoID)
    let currentVideoOptions = block.options
    let currentVideoTitle = block.questionTitle
    optionsBlocks = $("<div class='modal'></div>")
    let counter = 0
    let lastBlock = false
    for (let i = 0; i < currentVideoOptions.length; i++) {
        // console.log(currentVideoOptions[i].title);
        let thisTitle = currentVideoOptions[i].title
        let optionVideoBlock = thisTitle
        if (!thisTitle == "" || !thisTitle == undefined) {
            optionsBlocks.append(`
                    <div class="video_options" data-blockid="${optionVideoBlock}" data-title="${thisTitle}">
                        ${thisTitle}
                    </div>`)
        } else {
            counter++
            // console.log("COUNTER: " + counter);
            if (counter == maxOptionCount) {
                // No options left
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
    } else {
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
    // Play first video (Add true 2nd parameter to disable autoplay)
    changeVid(currentVideoid)
}



// Main video playing function Add true 2nd parameter to disable autoplay
function changeVid(videoid, noautoplay) {
    let videoLinks = extractVidId(videoid)
    let vidUrl = getVidData(videoLinks)
    // await async function
    vidUrl.then(function (result) {
        let vidLink = result.links
        myPlayer.src({
            type: 'video/mp4',
            src: vidLink
        })
        if (noautoplay) return
        myPlayer.ready(function () {
            myPlayer.play()
        })
    })
}

// myPlayer.on("ended", function() {
//     // Do this when video ends
//     console.log("Video Ended");
// })


var ModalDialog = videojs.getComponent('ModalDialog');

var modal = new ModalDialog(myPlayer, {
    //  content:'test content',
    temporary: false
    //closeable:true
});

myPlayer.addChild(modal);

myPlayer.on('ended', function () {
    console.log("Video Ended");
    modal.open();
});

modal.on('modalopen', function () {
    console.log('modalopen')
    modal.contentEl().innerHTML = optionsBlocks
});

// Click on options
$("#watch_body").on("click", ".video_options", function () {
    let selectedOptionTitle = $(this).data("title")
    let selectedOptionBlockID = $(this).data("blockid")
    console.log(selectedOptionTitle, selectedOptionBlockID);

    let nextBlock = filter(projectData, selectedOptionBlockID, 'blockID')[0]
    console.log(nextBlock)
    modal.close();
    currentBlock = nextBlock
    playBlock(currentBlock)
})

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