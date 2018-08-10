import React from 'react';
// MobX
import { Provider, observer } from "mobx-react";
// Styles
import "styles/reset.css";
// Routes
import Router from "components/Router";
// Store
import store from "store";
// Components
import AlertContainer from "components/AlertContainer.component";


class App extends React.Component {

	render() {
		return (
			<Provider store={ store }>
				<div>
					<Router />
					<AlertContainer />
				</div>
			</Provider>
		);
	}
}


export default observer(App);
