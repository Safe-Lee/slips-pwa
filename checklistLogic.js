window.onload = function(){
	var listOfCheckboxes = document.querySelectorAll(`[type*="checkbox"]`);
	listOfCheckboxes.forEach( el => {
		var checked = JSON.parse(localStorage.getItem(el.id));
		document.getElementById(el.id).checked = checked;
		
		
		el.addEventListener('change', (event) => {
			localStorage.setItem(el.id, el.checked);
			console.log(el.id,el.checked);						
			//alert('c changed');
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