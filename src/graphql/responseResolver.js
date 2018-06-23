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
		case "signupUser":
		case "authenticateUser":
			if(!data) return;
			sessionStorage.setItem('token', data.token);
			store.logIn(data.id);
			history.push(store.nextPathUrl || '/');
			break;

		//	Players
		case "createPlayer":
			Alert.success("Player saved");
			break;

		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED:`, 'color: darkred', dataName, data);
	}
}


function revertData(dataName, errorMsg) {

	switch (dataName) {

		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED ERROR:`, 'color: darkred', dataName, errorMsg);
	}
}