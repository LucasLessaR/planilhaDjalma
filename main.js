const SUBMIT_BUTTON_VALUE = "Buscar";

const STATE = {
	databaseLines: null,

	cpfInputElement: null,
	submitInputElement: null,
	resultsBodyElement: null,
	resultTemplate: null,
};

downloadDatabase();
window.onload = function() {
	STATE.cpfInputElement = document.getElementById("cpf-input");
	STATE.submitInputElement = document.getElementById("submit-input");
	STATE.resultsBodyElement = document.querySelector(".results tbody");
	STATE.resultTemplate = document.getElementById("result-template");

	if (STATE.databaseLines == null) {
		STATE.submitInputElement.value = "Atualizando Banco de Dados...";
		STATE.submitInputElement.disabled = true;
	} else {
		STATE.submitInputElement.value = SUBMIT_BUTTON_VALUE;
		STATE.submitInputElement.disabled = true;
	}
};

function onFormSubmit() {
	if (STATE.databaseLines == null) {
		return;
	}

	const query = STATE.cpfInputElement.value;
	console.log("query: ", query);

	while (STATE.resultsBodyElement.lastChild != null) {
		STATE.resultsBodyElement.removeChild(STATE.resultsBodyElement.lastChild);
	}

	for (const entry of STATE.databaseLines) {
		if (entry.cpf != query) {
			continue;
		}

		const entryElement = createElementFromEntry(entry);
		STATE.resultsBodyElement.appendChild(entryElement);
	}

	return false;
}

function createElementFromEntry(entry) {
	const element = STATE.resultTemplate.content.cloneNode(true);

	const timestampElement = element.querySelector(".timestamp");
	timestampElement.textContent = entry.timestamp;

	const invoiceElement = element.querySelector(".invoice");
	invoiceElement.textContent = entry.invoice;

	const paidElement = element.querySelector(".paid");
	paidElement.textContent = entry.paid;

	return element;
}

function downloadDatabase() {
	const request = new XMLHttpRequest();
	request.open("GET", "db.csv", true);
	request.overrideMimeType("text/csv");
	request.onreadystatechange = function() {
		if (request.readyState === request.DONE) {
			if (request.status === 200) {
				STATE.databaseLines = parseDatabase(request.responseText);
				console.log("entry count: ", STATE.databaseLines.length);
			} else {
				STATE.databaseLines = [];
			}

			STATE.submitInputElement.disabled = false;
			STATE.submitInputElement.value = SUBMIT_BUTTON_VALUE;
		}
	};
	request.send();
}

function parseDatabase(text) {
	const lines = text.split(/\r\n|\n\r|\n|\r/);
	console.log(lines.length);

	return [
		{
			cpf: "123",
			timestamp: "hoje",
			invoice: "34",
			paid: "35",
		},
		{
			cpf: "123",
			timestamp: "ontem",
			invoice: "34",
			paid: "35",
		},
		{
			cpf: "123",
			timestamp: "amanha",
			invoice: "34",
			paid: "35",
		}
	];
}
