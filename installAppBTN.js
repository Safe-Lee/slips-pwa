let deferredPrompt;

// DF: First, hide the install button
var installButton = document.getElementById('installApp');
installButton.style.display = 'none';
	
window.addEventListener('beforeinstallprompt', (e) => {
	deferredPrompt = e;
	
	// If gets installprompt, show install button
var installButton = document.getElementById('installApp');
	
	installButton.style.display = 'inline-block';
	
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

