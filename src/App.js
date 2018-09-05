import React from 'react';
// MobX
import { observer } from "mobx-react";
// Styles
import "styles/reset.css";
// Routes
import Router from "components/Router";
// Components
import AlertContainer from "components/AlertContainer.component";


class App extends React.Component {


	componentDidMount() {
		window.addEventListener("beforeunload", function (e) {
			var confirmationMessage = "\o/";
			/* Do you small action code here */
			(e || window.event).returnValue = confirmationMessage; //Gecko + IE
			return confirmationMessage;                            //Webkit, Safari, Chrome
		});
	}

	render() {
		return (
			<div>
				<Router />
				<AlertContainer />
			</div>
		);
	}
}


export default observer(App);
