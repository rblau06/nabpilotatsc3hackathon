var streamUri="urn:uuid:9a04f079-9840-4286"
var streamRequestIds = {};
var otherEventRequestIds = {};

function getStreamText(text) {
    // If there is a <br> in the text, then just take everything after the <br> for the streamUri.
    return text.substring((text.indexOf('<br>') > -1) ? text.indexOf('<br>') + 4 : 0);
}

function setStreamChoice(id)
{       
    streamUri= getStreamText(document.getElementById(id).innerHTML);
}

var focusButtonIdx = 0;
var focusButton = null;
const buttonInfo = [
    { id: 'B1', rightIdx: 3, leftIdx: 13, upIdx: 2, downIdx: 1, isRequest: false, isUnrequest: false, isStreamEvent: true, statusId: "streamStatus" }
  , { id: 'B2', rightIdx: 3, leftIdx: 17, upIdx: 0, downIdx: 2, isRequest: false, isUnrequest: false, isStreamEvent: true, statusId: "streamStatus" }
  , { id: 'B3', rightIdx: 4, leftIdx: 18, upIdx: 1, downIdx: 0, isRequest: false, isUnrequest: false, isStreamEvent: true, statusId: "streamStatus" }
  , { id: 'B4', rightIdx: 5, leftIdx: 0, upIdx: 4, downIdx: 4, isRequest: true, isUnrequest: false, isStreamEvent: true, statusId: "streamStatus" }
  , { id: 'B4a', rightIdx: 16, leftIdx: 2, upIdx: 3, downIdx: 3, isRequest: false, isUnrequest: true, isStreamEvent: true, statusId: "streamStatus" }
  , { id: 'B5', rightIdx: 7, leftIdx: 3, upIdx: 16, downIdx: 6, isRequest: true, isUnrequest: false, isStreamEvent: false, statusId: "ratingChangeStatus" }
  , { id: 'B5a', rightIdx: 8, leftIdx: 4, upIdx: 5, downIdx: 15, isRequest: false, isUnrequest: true, isStreamEvent: false, statusId: "ratingChangeStatus" }
  , { id: 'B5A', rightIdx: 9, leftIdx: 5, upIdx: 18, downIdx: 8, isRequest: true, isUnrequest: false, isStreamEvent: false, statusId: "serviceChangeStatus" }
  , { id: 'B5Aa', rightIdx: 10, leftIdx: 6, upIdx: 7, downIdx: 17, isRequest: false, isUnrequest: true, isStreamEvent: false, statusId: "serviceChangeStatus" }
  , { id: 'B5B', rightIdx: 11, leftIdx: 7, upIdx: 10, downIdx: 10, isRequest: true, isUnrequest: false, isStreamEvent: false, statusId: "toBeTerminatedStatus" }
  , { id: 'B5Ba', rightIdx: 12, leftIdx: 8, upIdx: 9, downIdx: 9, isRequest: false, isUnrequest: true, isStreamEvent: false, statusId: "toBeTerminatedStatus" }
  , { id: 'B5C', rightIdx: 13, leftIdx: 9, upIdx: 12, downIdx: 12, isRequest: true, isUnrequest: false, isStreamEvent: false, statusId: "captionChangeStatus" }
  , { id: 'B5Ca', rightIdx: 14, leftIdx: 10, upIdx: 11, downIdx: 11, isRequest: false, isUnrequest: true, isStreamEvent: false, statusId: "captionChangeStatus" }
  , { id: 'B5D', rightIdx: 0, leftIdx: 11, upIdx: 14, downIdx: 14, isRequest: true, isUnrequest: false, isStreamEvent: false, statusId: "personalizationStatus" }
  , { id: 'B5Da', rightIdx: 0, leftIdx: 12, upIdx: 13, downIdx: 13, isRequest: false, isUnrequest: true, isStreamEvent: false, statusId: "personalizationStatus" }
  , { id: 'B8Aa', rightIdx: 17, leftIdx: 3, upIdx: 6, downIdx: 16, isRequest: false, isUnrequest: false, isStreamEvent: false, statusId: "" }
  , { id: 'B8Ab', rightIdx: 18, leftIdx: 4, upIdx: 15, downIdx: 5, isRequest: false, isUnrequest: false, isStreamEvent: false, statusId: "" }
  , { id: 'B8A', rightIdx: 2, leftIdx: 15, upIdx: 8, downIdx: 18, isRequest: false, isUnrequest: false, isStreamEvent: false, statusId: "" }
  , { id: 'B8B', rightIdx: 2, leftIdx: 16, upIdx: 17, downIdx: 7, isRequest: false, isUnrequest: false, isStreamEvent: false, statusId: "" }
];

/*
 * Sample UI for when a button gets focus based on a arrow selection.
 * The actual UI would be more elegent.
 */

function setButtonFocus(button)
{
    if (focusButton != null)
    {   
        focusButton.className = focusButton.className.replace(/(?:^|\s)selected(?!\S)/g, '');
    }
    focusButton = button;    
    focusButton.className = focusButton.className + ' selected';
}

/*
 * Sample logic for navigating between selectable buttons on a page.
 * The actual logic would be a richer use of JavaScript and be more
 * elegant.
 */
function processKeyEvents(event)
{
    var theKeyCode = event.which;
    console.log("Keycode: " + theKeyCode);
    switch (theKeyCode) {
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
            if (focusButton != null) {
                focusButton.className = focusButton.className + ' selecting';
                var myButton = focusButton;
                setTimeout(function () {    // need to use myButton, in case focusButton has changed before this function triggers.                    
                    myButton.className = myButton.className.replace(/(?:^|\s)selecting(?!\S)/g, '')
                }, 250);

                if (buttonInfo[focusButtonIdx].statusId == 'streamStatus') {
                    // The user is selecting a Stream Events button. These need to be handled separately.
                    if (buttonInfo[focusButtonIdx].isRequest) {
                        document.getElementById(buttonInfo[focusButtonIdx].statusId).innerHTML = "Requested:";
                        var index;
                        switch (streamUri) {
                            case getStreamText(document.getElementById(buttonInfo[0].id).innerHTML):
                                index = 0;	                     
                                break;
                            case getStreamText(document.getElementById(buttonInfo[1].id).innerHTML):
                                index = 1;
                                break;
                            case getStreamText(document.getElementById(buttonInfo[2].id).innerHTML):
                                index = 2;
                                break;
                        }
                        document.getElementById('streamStatusList').getElementsByTagName('li')[index].innerHTML = streamUri;
                        document.getElementById('streamStatusList').style.display = 'block';
                    }
                    else if (buttonInfo[focusButtonIdx].isUnrequest) {
                        var index;
                        switch (streamUri) {
                            case getStreamText(document.getElementById(buttonInfo[0].id).innerHTML):
                                index = 0;
                                break;
                            case getStreamText(document.getElementById(buttonInfo[1].id).innerHTML):
                                index = 1;
                                break;
                            case getStreamText(document.getElementById(buttonInfo[2].id).innerHTML):
                                index = 2;
                                break;
                        }
                        document.getElementById('streamStatusList').getElementsByTagName('li')[index].innerHTML = '';
                        if (document.getElementById('streamStatusList').getElementsByTagName('li')[0].innerHTML == '' &&
                            document.getElementById('streamStatusList').getElementsByTagName('li')[1].innerHTML == '' &&
                            document.getElementById('streamStatusList').getElementsByTagName('li')[2].innerHTML == '')
                        {
                            document.getElementById('streamStatus').innerHTML = '';
                            document.getElementById('streamStatusList').style.display = 'none';
                        }

	                    
                    }
                    else {
                        // Streaming URI was selected.	                    
                        document.getElementById(buttonInfo[0].id).className = document.getElementById(buttonInfo[0].id).className.replace(/(?:^|\s)activeStream(?!\S)/g, '');
                        document.getElementById(buttonInfo[1].id).className = document.getElementById(buttonInfo[1].id).className.replace(/(?:^|\s)activeStream(?!\S)/g, '');
                        document.getElementById(buttonInfo[2].id).className = document.getElementById(buttonInfo[2].id).className.replace(/(?:^|\s)activeStream(?!\S)/g, '');
                        document.getElementById(buttonInfo[focusButtonIdx].id).className = document.getElementById(buttonInfo[focusButtonIdx].id).className + ' activeStream';
                    }
                } else {
                    /// Update status text as needed for Request/Unrequest selection.
                    if (buttonInfo[focusButtonIdx].isRequest) {
                        document.getElementById(buttonInfo[focusButtonIdx].statusId).innerHTML = 'Requested';
                    }
                    else if (buttonInfo[focusButtonIdx].isUnrequest) {
                        document.getElementById(buttonInfo[focusButtonIdx].statusId).innerHTML = '';
                    }
                }
                focusButton.click();
            }
            break;
    }
}


/*
 * Sample websocket handling.
 * The following example shows the minimal code for setting up, listening,
 * and sending on the websocket.
 * All Broadcast Apps should interface with the receiver websocket as per
 * "ATSC Working Draft: Application Runtime Environment - S34-4-WD"
 */
 
var mySocket;

/*
 * Setup the socket when the application is loaded, and
 * establish a messages handler.
 */
function setWebSocketConnection()
{	
    mySocket = new WebSocket('ws:localhost:3355','echo-protocol');
    mySocket.onopen =
		function ()
		{
		    console.log("Client connection is open.");
		};
    mySocket.onerror =
		function (error)
		{
		    console.log('WebSocket error: ' + error);
		};

    mySocket.onmessage = messageHandler;
}


/*
 * This simple handler displays the JSON string on the page.
 * Actual message handlers are tied into the overall logic of
 * the application.
 */ 
function messageHandler(message)
{
    var jsonData = message.data;
    console.log(jsonData);
    document.getElementById("ReceivedFromSocket").innerHTML=jsonData;
    var obj = JSON.parse(jsonData);
    if ("result" in obj)
    {
        // If this is due to a stream event registration, save the result Id.
        if (obj.id == "111")
            streamRequestIds[streamUri]=obj.result.registrationId;
        else if (obj.id == "112")
            otherEventRequestIds.RatingChange=obj.result.registrationId;
        else if (obj.id == "113")
            otherEventRequestIds.ServiceChange=obj.result.registrationId;
        else if (obj.id == "114")
            otherEventRequestIds.ToBeTerminated=obj.result.registrationId;
        else if (obj.id == "115")
            otherEventRequestIds.CaptionState=obj.result.registrationId;
        else if (obj.id == "116")
            otherEventRequestIds.Personalization=obj.result.registrationId;
    }
}


/*
 * Simple example of sending JSON messages on a websocket as per
 * "ATSC Working Draft: Application Runtime Environment - S34-4-WD"
 */

function eventUnrequest(Id)
{
    return {
        "jsonrpc":"2.0",
        "method":"org.atsc.event.unregister",
        "params":{"registrationId":Id}};
}

function eventStreamRegistrationRequest()
{
    return {
        "jsonrpc":"2.0",
        "method":"org.atsc.event.register",
        "params":{"eventType":"eventStream",
            "eventArg":{"schemeIdUri":streamUri}},
        "id":"111"};
}


var eventRegistrationRequestRatingChange = {
    "jsonrpc":"2.0",
    "method":"org.atsc.event.register",
    "params":{"eventType":"ratingChange"},
    "id":"112"
}

var eventRegistrationRequestServiceChange = {
    "jsonrpc":"2.0",
    "method":"org.atsc.event.register",
    "params":{"eventType":"serviceChange"},
    "id":"113"
}

var eventRegistrationRequestToBeTerminated = {
    "jsonrpc":"2.0",
    "method":"org.atsc.event.register",
    "params":{"eventType":"toBeTerminated"},
    "id":"114"
}

var eventRegistrationRequestCaptionChange = {
    "jsonrpc":"2.0",
    "method":"org.atsc.event.register",
    "params":{"eventType":"captionState"},
    "id":"115"
}

var eventRegistrationRequestPersonalization = {
    "jsonrpc":"2.0",
    "method":"org.atsc.event.register",
    "params":{"eventType":"personalization"},
    "id":"116"
}

var sampleSwitchVideoAction = {
    "jsonrpc":"2.0",
    "method":"org.atsc.broadcast.switchvideo",
    "params":{"svcToAcquire":"file:///root/MEDIA/sources/LlamaTV.mp4","timeOffset":"10"},
    "id":"211"
}

var sampleChangeSizeAction = {
    "jsonrpc":"2.0",
    "method":"org.atsc.application.scale-position",
    "params":{
        "scaleFactor":25,
        "xPos": 30,
        "yPos": 60
    },
    "id":"212"
}

var sampleResetSizeAction = {
    "jsonrpc":"2.0",
    "method":"org.atsc.application.scale-position",
    "params":{
        "scaleFactor":100,
        "xPos": 30,
        "yPos": 60
    },
    "id":"213"
}

var requestCCStatus = {
    "jsonrpc":"2.0",
    "method":"org.atsc.settings.cc",
    "id":"311"
}
var requestPersZipcode = {
    "jsonrpc":"2.0",
    "method":"org.atsc.settings.personalization",
    "params":{
        "persKey":"zipcode"
    },
    "id":"312"
}

function sampleServiceRequest(s)
{
    return {
        "jsonrpc":"2.0",
        "method":"org.atsc.broadcast.tune",
        "params":{"svcToAcquire":s},
        "id":"411"};
}



function sendToSocket(message)
{
    if (mySocket != null)
    {
        mySocket.send(JSON.stringify(message));
    }
}

/*
 * Startup Script.
 */
function startUpSetUp()
{
    document.addEventListener('keydown', processKeyEvents)
    setWebSocketConnection();
    setButtonFocus(document.getElementById(buttonInfo[focusButtonIdx].id));
}
