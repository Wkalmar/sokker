import Alert from 'react-s-alert';
// MobX
import { runInAction } from "mobx";


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

		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED:`, 'color: darkred', dataName, data);
	}
}


function revertData(dataName, errorMsg) {

	Alert.error(errorMsg);
	switch (dataName) {

		default:
			console.log(`%c RESPONSE RESOLVER UNHANDLED ERROR:`, 'color: darkred', dataName, data);
	}
}