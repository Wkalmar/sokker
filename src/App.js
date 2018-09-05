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
		// window.addEventListener("beforeunload", function (e) {
		// 	             //Webkit, Safari, Chrome
		// });
	}

	componentWillUnmount() {
		//alert(3)
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
