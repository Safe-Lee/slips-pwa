let deferredPrompt;
console.log(`Initialize Install App button.`);

// This code makes sure the "Install App" button only shows if it's not already installed
// Note: when running locally, this always default to false (ie. the button won't show, regardless)
// Note: there is an installedApp fake button that shows whenever the other one is hidden

// First, hide the install button (DF)
var installButton = document.getElementById('installApp');
var installedApp = document.getElementById('installedApp');
installButton.style.display = 'none';
console.log("Install button is hidden. Installed is shown.");

	
window.addEventListener('beforeinstallprompt', (e) => {
	// This event is triggered whenever a website can be installed (and isn't installed)
	console.log("Before Install Prompt event triggered.");
	
	// Note that, although on first visit this automatically also triggers the install prompt to pop up, this not always happends later (after a cancel)
	// Which is why having an "Install App" is good, in case the user missed that prompt (or rejected it initially)
	
	deferredPrompt = e;
	
	// Show the install button
	var installButton = document.getElementById('installApp');
	installButton.style.display = 'inline-block';
	var installedApp = document.getElementById('installedApp');
	installedApp.style.display = 'none';
	console.log("Install button is shown. Installed is hidden.");


	// What happens when it is clicked: (not fully sure what is done here, but seems to work)
	const installApp = document.getElementById('installApp');
	installApp.addEventListener('click', async () => {
		if (deferredPrompt !== null) {
			console.log("Deferred prompt not null.");
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				deferredPrompt = null;
			}
		}else{
			console.log("Deferred prompt is null.");	
		}
	});

});

