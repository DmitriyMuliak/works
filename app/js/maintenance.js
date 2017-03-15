window.addEventListener('load', function() {
	FastClick.attach(document.body);

	// Show Form && Hide button
	var showFormBtn = document.querySelector('.show-form-btn');
	var formWrapper = document.querySelector('.form-wrapper');
	function showForm(){
		showFormBtn.className ='hide';
		formWrapper.className ='show-form';
	}

	// Change background-image
	var divWithBg = document.querySelector('.background-foto1');
	var bgCheckbox = document.querySelector('#flatOneRoundedCheckbox');
	function toggle(){
		if(bgCheckbox.checked){
			divWithBg.className ='background-foto2 wrapper';
		}
		else{
			divWithBg.className ='background-foto1 wrapper';
		}
	}

	showFormBtn.addEventListener("click",showForm,false);
	bgCheckbox.addEventListener("click",toggle,false);

	//Change select
		$('select').dropdown({
			label:"Послуга",
			customClass:"needsclick",
			mobile:true,
		});
}, false);