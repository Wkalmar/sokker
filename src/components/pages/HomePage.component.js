import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import BoxList from "components/parts/boxes/BoxList.component";


class HomePageContent extends React.Component {

	render() {
		console.log(store, 42);
		return (
			<div>
				<BoxList boxes={ [
					<div>42</div>
				] } />
			</div>
		)
	}
}


export default observer(HomePageContent);