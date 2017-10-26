
// maps path of the buttons. Which one it goes to next
var focusButtonIdx = 0;
var focusButton = null;
const buttonInfo = [
    { id: 'B1', rightIdx: 2, leftIdx: 1, upIdx: 1, downIdx: 0 }
    , { id: 'B2', rightIdx: 2, leftIdx: 1, upIdx: 1, downIdx: 1 }
    , { id: 'B3', rightIdx: 2, leftIdx: 1, upIdx: 0, downIdx: 2 }
];

function setButtonFocus(button) {
    if (focusButton != null)
    {   
        focusButton.className = focusButton.className.replace(/(?:^|\s)selected(?!\S)/g, '');
    }
    focusButton = button;    
    focusButton.className = focusButton.className + ' selected';
}


// Function performed when a key is hit.
function processKeyEvents(event) {
    var theKeyCode = event.which;
    console.log("Keycode: " + theKeyCode);
    switch (theKeyCode) {
        case keycodes.RED:
            document.getElementById("launch").click();
            break;
        case keycodes.RIGHT:
            focusButtonIdx = buttonInfo[focusButtonIdx].rightIdx;
            setButtonFocus(document.getElementById(buttonInfo[focusButtonIdx].id));
            break;
        case keycodes.LEFT:
            focusButtonIdx = buttonInfo[focusButtonIdx].leftIdx;
            setButtonFocus(document.getElementById(buttonInfo[focusButtonIdx].id));
            break;
        case keycodes.UP:
            focusButtonIdx = buttonInfo[focusButtonIdx].upIdx;
            setButtonFocus(document.getElementById(buttonInfo[focusButtonIdx].id));
            break;
        case keycodes.DOWN:
            focusButtonIdx = buttonInfo[focusButtonIdx].downIdx;
            setButtonFocus(document.getElementById(buttonInfo[focusButtonIdx].id));
            break;
        case keycodes.SELECT:
            focusButton.click()
            break;
    }
}

// "Setup" function.  Done when the page is loaded.
function startUpSetUp()
{
    document.addEventListener('keydown', processKeyEvents)
    setButtonFocus(document.getElementById(buttonInfo[focusButtonIdx].id));
}

//launch app
function launchApp(){
    //hide autoplay html video file spoofing the broadcast
    $('#broadcast')[0].pause();
    $("#broadcast").addClass("hide");
    //show app
    $("#launch").removeClass("hide");
}

function chooseLeft(){
    //position to left for tranistion
    $("#B2").css({            
        position:'absolute',
        left:'0'
    });
    // green slide and fade
    $("#B2").animate({            
        width:'100%',
        opacity:'0'
    });
    // remove yellow
    $("#B3").addClass("hide");
    // remove banner
    $(".banner-wrapper").addClass("hide");
    //show video
    $(".incorrect").removeClass("hide");
    //play video
    $('.incorrect')[0].play();
}

function chooseRight(){
    //position to right for tranistion
    $("#B3").css({            
        position:'absolute',
        right:'0'
    });
    // green slide and fade
    $("#B3").animate({            
        width:'100%',
        opacity:'0'
    });
    // remove yellow
    $("#B2").addClass("hide");
    // remove banner
    $(".banner-wrapper").addClass("hide");
    //show video
    $(".correct").removeClass("hide");
    //play video
    $('.correct')[0].play();
}

function reload(){
    location.reload();
}