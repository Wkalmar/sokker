import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import TransfersPage from "components/pages/TransfersPage.component";
import UserPlayers from "components/parts/players/UserPlayers.component";


class UserPlayersPage extends TransfersPage {

	static permissions = {
		needAuth: true
	};

	render() {
		return (
			<div>
				<h1>User NET trained players</h1>
				{ this.renderNetStatus() }
				<UserPlayers userId={ store.authorizedUser.id } />
			</div>
		)
	}
}


export default observer(UserPlayersPage);