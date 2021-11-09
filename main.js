const STATE = {
	cpfInputElement: null,
};

window.onload = function() {
	STATE.cpfInputElement = document.getElementById("cpf-input");
};

function onFormSubmit() {
	const query = STATE.cpfInputElement.textContent;
	searchDatabase(query);
	return false;
}

function searchDatabase(query) {
	alert("buscando por ", query);
}
