console.log(`Slips and Trips: page loaded`);

if ('serviceWorker' in navigator) {
	// Register Service Worker on page load (if not registered before)
	self.addEventListener('load', async () => {
		const container = navigator.serviceWorker;
		container.addEventListener(
			'controllerchange',
			() => console.log(`SW is changed (installed or removed).`)
		);
		if (container.controller === null) {
			console.log(`Register new SW for the app.`);
			await container.register('sw.js');
			console.log(`SW is registered.`);
		} else console.log(`SW is already registered.`);
	});
}