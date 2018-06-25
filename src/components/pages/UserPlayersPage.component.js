import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import UserPlayers from "components/parts/players/UserPlayers.component";


class UserPlayersPage extends React.Component {

	static permissions = {
		needAuth: true,
		redirectPath: "/"
	};


	render() {
		return (
			<div>
				{ store.NET.status }
				{ store.NET.status === "success" ?
					<p style={{ color: store.NET.maxErrorThresh < store.NET.errorThresh ? "red" : "green" }}>Eerror thresh: { store.NET.errorThresh }</p>
					:
					null
				}

				<UserPlayers userId={ store.authorizedUser.id } />
			</div>
		)
	}
}


export default observer(UserPlayersPage);