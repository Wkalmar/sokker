import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


class NeuralNetworkPage extends React.Component {

	render() {
		console.log(store, 42);
		return (
			<div>
				{ 42}
			</div>
		)
	}
}


export default observer(NeuralNetworkPage);