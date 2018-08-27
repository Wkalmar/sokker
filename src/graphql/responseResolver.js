import Alert from 'react-s-alert';
import { runInAction } from 'mobx';
// Utils
import history from "utils/history.utils";
// Store
import store from "store";


export default function (data = {}, errors = null) {

	const dataName = Object.keys(data)[0];
	data = data[dataName];
	const errorMsg = errors ? errors[0].functionError || errors[0].message : "";

	console.groupCollapsed(`%c🕺 RESOLVER [${dataName}] (${errors ? "ERROR" : "SUCCESS"})`, "color: darkgreen");
	console.log("dataName", dataName);
	console.log("data", data);
	console.log("errors", errors);
	console.groupEnd(`%c🕺 RESOLVER [${dataName}] (${errors ? "ERROR" : "SUCCESS"})`);

    if(errors) return revertData(dataName, errorMsg);
	applyData(dataName, data);
}


function applyData(dataName, data) {

	switch (dataName) {

		// Users
		case "loggedInUser":
			if(!data) return;
			store.logIn(data.id); // sobaka@i.ua
			break;

		case "User":
			store.users.create(data);
			break;
		case "signupUser":
		case "authenticateUser":
			if(!data) return;
			sessionStorage.setItem('token', data.token);
			store.logIn(data.id);
			history.push(store.nextPathUrl || '/');
			break;

		//	Players
		case "createPlayer":
			store.players.create(data);
			Alert.success("Player saved to DB");
			break;
		case "updatePlayer":
			store.players.create(data);
			Alert.success("Player updated in DB");
			break;
		case "deletePlayer":
			store.players.delete(data.id);
			Alert.success("Player deleted from DB");
			break;
		case "allPlayers":
			runInAction(`PLAYERS-CREATE-ALL-SUCCESS`, ()=> {
				data.map((player)=> store.players.create(player));
			});
			break;

		// Transfers
		case "transfers":
			store.transfers.create(JSON.parse(data.response));
			break;
		// Custom Functions

		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED:`, 'color: darkred', dataName, data);
	}
}


function revertData(dataName, errorMsg) {

	switch (dataName) {

		default:
			Alert.error(errorMsg);
	}
}

function parse(data) {
	const result = {};
	Object.keys(data).forEach(key => {
		try {
			result[key] = JSON.parse(data[key]);
		} catch (e) {
			result[key] = data[key]; // For string case
		}
	});
	return result;
}