const SUBMIT_BUTTON_VALUE = "Buscar";

const STATE = {
	database: null,

	cpfInputElement: null,
	submitInputElement: null,
	resultsElement: null,
	resultTemplate: null,
};

downloadDatabase();
window.onload = function() {
	STATE.cpfInputElement = document.getElementById("cpf-input");
	STATE.submitInputElement = document.getElementById("submit-input");
	STATE.resultsElement = document.querySelector(".results");
	STATE.resultTemplate = document.getElementById("result-template");

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

	const query = STATE.cpfInputElement.value;
	console.log("query: ", query);

	while (STATE.resultsElement.lastChild) {
		STATE.resultsElement.removeChild(STATE.resultsElement.lastChild);
	}

	for (const entry of STATE.database) {
		if (entry.cpf != query) {
			continue;
		}

		console.log("add entry: ", entry);
		const entryElement = createElementFromEntry(entry);
		STATE.resultsElement.appendChild(entryElement);
	}

	return false;
}

function createElementFromEntry(entry) {
	const element = STATE.resultTemplate.content.cloneNode(true);

	const cpfElement = element.querySelector(".cpf");
	cpfElement.textContent = entry.cpf;

	const nameElement = element.querySelector(".name");
	nameElement.textContent = entry.name;

	return element;
}

function downloadDatabase() {
	const request = new XMLHttpRequest();
	request.open("GET", "db.csv", true);
	request.overrideMimeType("text/csv");
	request.onreadystatechange = function() {
		if (request.readyState === request.DONE) {
			if (request.status === 200) {
				STATE.database = parseDatabase(request.responseText);
				console.log("entry count: ", STATE.database.length);
			} else {
				STATE.database = [];
			}

			STATE.submitInputElement.disabled = false;
			STATE.submitInputElement.value = SUBMIT_BUTTON_VALUE;
		}
	};
	request.send();
}

function parseDatabase(text) {
	return [
		{
			cpf: "1",
			name: "alberto",
		},
		{
			cpf: "2",
			name: "bernado",
		},
		{
			cpf: "3",
			name: "carlitos",
		}
	];
}
