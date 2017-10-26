
// Function performed when a key is hit.
// This is the fundamental input mechanism for the ATSC Broadcast Applications
// since there is no "mouse" interface.  When testing the application
// developer uses a keyboard rather than a mouse.
function processKeyEvents(event)
{
	var theKeyCode = event.which;
	if (theKeyCode == keycodes.SELECT)
		document.getElementById("HomeButton").click();
}

// Function performed when the Home Button is selected in this simple application.
function homeButtonProcessing()
{
	var x = document.getElementById("HomeButtonImage");
	var y = x.getAttribute("src");
	document.getElementById("simpleOutput").innerHTML="Image file is at: "+y;
}


// "Setup" function.  Done when the page is loaded.
function startUpSetUp()
{
	document.addEventListener('keydown', processKeyEvents)
}

