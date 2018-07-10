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
	console.groupEnd(`%c🕺 REQUEST`, "color: darkgreen");

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
		case "allPlayers":
			runInAction(`PLAYERS-CREATE-ALL-SUCCESS`, ()=> {
				data.map((player)=> store.players.create(player));
			});
			break;

		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED:`, 'color: darkred', dataName, data);
	}
}


function revertData(dataName, errorMsg) {

	switch (dataName) {

		case "signupUser":
			Alert.error(errorMsg);
			break;
		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED ERROR:`, 'color: darkred', dataName, errorMsg);
	}
}