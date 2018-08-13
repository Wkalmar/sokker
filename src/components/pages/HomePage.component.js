import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import Link from "components/Link.component";


class HomePageContent extends React.Component {

	render() {
		return (
			<div>
				<h1>Home page { store.device }</h1>
				{ !store.authorizedUser && <Link to="/login">Log in</Link> }
				{ !store.authorizedUser && <Link to="/registration">Registration</Link> }
			</div>
		)
	}
}


export default observer(HomePageContent);