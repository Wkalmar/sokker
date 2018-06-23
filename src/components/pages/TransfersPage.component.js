import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import BoxList from "components/parts/boxes/BoxList.component";


class TransfersPage extends React.Component {

	static permissions = {
		needAuth: true,
		redirectPath: "/"
	};


	render() {
		return (
			<BoxList boxes={ [
				<div>Transfers</div>
			] } />
		)
	}
}


export default observer(TransfersPage);