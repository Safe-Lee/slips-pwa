window.onload = function(){
	var listOfCheckboxes = document.querySelectorAll(`[type*="checkbox"]`);
	listOfCheckboxes.forEach( el => {
		var checked = JSON.parse(localStorage.getItem(el.id));
		document.getElementById(el.id).checked = checked;
		var justIDnumber = el.id.match(/\d+$/);
		justIDnumber = parseInt(justIDnumber, 10);
		setSuggestedVisibilityBasedOnCheckbox(el.checked,justIDnumber);
			
		el.addEventListener('change', (event) => {
			// Update value in localstorage 
			localStorage.setItem(el.id, el.checked);	
			//alert("this changed: "+justIDnumber+ " to "+ el.checked);	
			setSuggestedVisibilityBasedOnCheckbox(el.checked,justIDnumber);
			console.log(el.id,el.checked);					
		})
	});
	var listOfInputs = document.querySelectorAll(`[type*="text"]`);
	listOfInputs.forEach( el => {
		var valor = localStorage.getItem(el.id);
		document.getElementById(el.id).value = valor;
 
		el.addEventListener('input', (event) => {
			localStorage.setItem(el.id, el.value);
			console.log(el.id,el.value);						
			//alert('i changed');
		})
	
	});					
}

save = function(){
	var list = document.querySelectorAll(`[type*="checkbox"]`);
	list.forEach( el => {
		localStorage.setItem(el.id, el.checked);
		console.log(el.id,el.checked);
	})
}
			
clearz = function(){
  localStorage.clear();
  window.location.reload();
}

setSuggestedVisibilityBasedOnCheckbox = function(checkStatus,theID){
	var tempSuggestedAction = document.getElementById("suggestedAction"+theID);
	if (tempSuggestedAction){ // only check if element exists (otherwise it breaks)
		if (checkStatus) {
			tempSuggestedAction.style.display = "inline-block";
		} else {
			tempSuggestedAction.style.display = "none";
		}
	}
}