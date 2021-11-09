const SUBMIT_BUTTON_VALUE = "Buscar";

const STATE = {
	cpfInputElement: null,
	submitInputElement: null,
	database: null,
};

downloadDatabase();
window.onload = function() {
	STATE.cpfInputElement = document.getElementById("cpf-input");
	STATE.submitInputElement = document.getElementById("submit-input");

	if (STATE.database == null) {
		STATE.submitInputElement.value = "Atualizando Banco de Dados...";
		STATE.submitInputElement.disabled = true;
	} else {
		STATE.submitInputElement.value = SUBMIT_BUTTON_VALUE;
		STATE.submitInputElement.disabled = true;
	}
};

function onFormSubmit() {
	if (STATE.database == null) {
		return;
	}

	const query = STATE.cpfInputElement.textContent;
	searchDatabase(query);
	return false;
}

function searchDatabase(query) {
	alert("buscando por ", query);
}

function downloadDatabase() {
	const request = new XMLHttpRequest();
	request.open("GET", "db.csv", true);
	request.overrideMimeType("text/csv");
	request.onreadystatechange = function() {
		if (request.readyState === request.DONE) {
			if (request.status === 200) {
				STATE.database = request.responseText;
				console.log(STATE.database.length);
			} else {
				STATE.database = "";
			}

			STATE.submitInputElement.disabled = false;
			STATE.submitInputElement.value = SUBMIT_BUTTON_VALUE;
		}
	};
	request.send();
}

