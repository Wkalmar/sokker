import React from 'react';
// MobX
import { observer, inject } from "mobx-react";
// Components
import BoxList from "components/parts/boxes/BoxList.component";
import Link from "components/Link.component";


class HomePageContent extends React.Component {

	render() {
		return (
			<BoxList boxes={ [
				<div>
					<h1>Home page</h1>
					{ !this.props.store.authorizedUser && <Link to="/login">Log in</Link> }
					{ !this.props.store.authorizedUser && <Link to="/registration">Registration</Link> }
				</div>
			] } />
		)
	}
}


export default inject("store")(observer(HomePageContent));