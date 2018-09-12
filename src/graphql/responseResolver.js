import Alert from 'react-s-alert';
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
			Alert.success(store.t('Welcome') + `, ${data.name}!`);
			break;
		case "signupUser":
		case "authenticateUser":
			if(!data) return;
			window.sessionStorage.setItem('token', data.token);
			store.logIn(data.id);
			history.push(store.nextPathUrl || '/');
			Alert.success(store.t('Registration successful'));
			break;

		//	Players
		case "createPlayer":
			store.NET.train([ ...store.players.userPlayers, data ]);
			store.players.create(data);
			Alert.success(store.t("Player saved to DB"));
			break;
		case "updatePlayer":
			store.NET.train([ ...store.players.userPlayers, data ]);
			store.players.create(data);
			Alert.success(store.t("Player updated in DB"));
			break;
		case "deletePlayer":
			store.players.delete(data.id);
			store.NET.train(store.players.userPlayers);
			Alert.success(store.t("Player deleted from DB"));
			break;
		case 'deleteAllUserPlayers':
			store.players.deleteAll();
			store.NET.train(store.players.userPlayers);
			Alert.success(store.t("All user players deleted from DB"));
			break;
		case "allPlayers":
			store.NET.train(data);
			store.players.createAll(data);
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