window.onload = function(){
	// Each section below initializes inputs for each type (sets existing values, if they exist, and adds eventlisteners, mostly for saving)
	console.log(`Initializing form.`);
	
	// INITIALIZE CHECKBOXES
	var listOfCheckboxes = document.querySelectorAll(`[type*="checkbox"]`);
	var savedState;
	var tempIDnumber;
	listOfCheckboxes.forEach( el => {
		// For each checkbox on the page...
		
		// Grab the event ID number (useful later)
		tempIDnumber = grabNumberFromEventID(el);		
		
		// Attempt to grab its saved state in localstorage
		savedState = JSON.parse(localStorage.getItem(el.id));
		if(savedState!=null){
			// If there is a saved state for this checkbox...
			// Set the checkbox on the page to that state
			document.getElementById(el.id).checked = savedState;
			// And set the visibility of the Suggested Actions box accordingly
			setSuggestedVisibilityBasedOnCheckbox(el.checked,tempIDnumber);
		}else{
			// If there is no saved state for this checkbox yet...
			// Assume it's false
			setSuggestedVisibilityBasedOnCheckbox(false,tempIDnumber);
		}
		
		// Attach an eventlistener to that checkbox, so that every time it's changed...
		el.addEventListener('change', (event) => {
			//... it updates its value on localstorage
			localStorage.setItem(el.id, el.checked);
			//... and sets the Suggested Action visibility accordingly
			tempIDnumber = grabNumberFromEventID(el);
			setSuggestedVisibilityBasedOnCheckbox(el.checked,tempIDnumber);
			console.log(el.id,el.checked);					
		})
	});
	
	// INITIALIZE TEXT FIELDS	
	var listOfInputs = document.querySelectorAll(`[type*="text"]`);
	var savedText;
	listOfInputs.forEach( el => {
		// For each text field on the page

		// Attempt to grab its saved text in localstorage
		savedText = localStorage.getItem(el.id);
		if(savedText!=null){
			// If there is a saved text for this text box...			
			// Set the text box to be that text
			document.getElementById(el.id).value = savedText;
		}

		// Attach an eventlistener to that text box, so that every time it loses focus..
		el.addEventListener('blur', (event) => {
			if(el.value!=null){
				// It's value is saved to localstorage
				localStorage.setItem(el.id, el.value);
				console.log(el.id,el.value);						
			}
		})
	
	});

	// INITIALIZE DATE FIELDS
	var listOfInputs = document.querySelectorAll(`[type*="date"]`);
	var savedDate;
	listOfInputs.forEach( el => {
		// For each date input on the page (just 1)

		// Attempt to grab the saved date in localstorage
		savedDate = localStorage.getItem(el.id);
		if(savedDate!=null){
			// If there is a saved date...			
			// Set the date to be that 
			document.getElementById(el.id).value = savedDate;
		}

		// Attach an eventlistener to that date input, so that every time it loses focus...
		el.addEventListener('blur', (event) => {
			if(el.value!=null){
				// Its saved to localstorage
				localStorage.setItem(el.id, el.value);
				console.log(el.id,el.value);						
			}
		})
	
	});			

	// INITIALIZE TEXTAREA (at the bottom)
	var bigTextArea = document.querySelector('#TextAdditional');
	var savedBigText = localStorage.getItem(bigTextArea.id);
	if(savedBigText!=null){
		// If there is a saved date...			
		// Set the date to be that 
		bigTextArea.value = savedBigText;
	}
	bigTextArea.addEventListener('blur', (event) => {
		if(bigTextArea.value!=null){
			// Its saved to localstorage
			localStorage.setItem(bigTextArea.id, bigTextArea.value);
			console.log(bigTextArea.id,bigTextArea.value);						
		}
	})


	// Adds Go To Top links to all header2 (except first)
	var listOfHeader2s = document.getElementsByClassName("tableHeader2");
	Array.from(listOfHeader2s).slice(1).forEach( el => {
		console.log(el);	
		let a = document.createElement("a");
		a.addEventListener( 'click', (event) => {
			scrollToTop();
			return false;
		} )
		a.append("Go to top ▲");
		el.append(a);		
	
	});
	
	
}

save = function(){
	// No longer used, as save happens automatically
}
			
clearz = function(){
	// Clears the localstorage data, and reloads the page (the name "clear" couldn't be used)
	if (confirm("⚠️ Are you sure? You will lose all the work you've done.")){
		localStorage.clear();
		window.location.reload();
	}
}

// Other useful functions:
setSuggestedVisibilityBasedOnCheckbox = function(checkStatus,theID){
	// This changes the visibility of the Suggested Actions box based on the state of its related checkbox 
	var tempSuggestedAction = document.getElementById("suggestedAction"+theID);
	if (tempSuggestedAction){ // only check if element exists (otherwise it breaks)
		if (checkStatus) {
			if(tempSuggestedAction.classList.contains("hide")){
				tempSuggestedAction.classList.remove("hide");
			}
		}else{
			if(!tempSuggestedAction.classList.contains("hide")){
				tempSuggestedAction.classList.add("hide");
			}			
		}
	}
}
grabNumberFromEventID = function(evento){
	tempIDnumber = evento.id.match(/\d+$/);
	return parseInt(tempIDnumber, 10);	
}
scrollToTop = function (){
  window.scrollTo({top: 0, behavior: 'smooth'});
}
scrollToBottom = function (){
	var body = document.body,
		html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, 
						   html.clientHeight, html.scrollHeight, html.offsetHeight );	
  window.scrollTo({top:height, behavior: 'smooth'});
}
// End