import React from 'react';
// MobX
import { observer, inject } from "mobx-react";
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
				{ this.props.store.NET.status }
				{ this.props.store.NET.status === "success" ?
					<p style={{
						color: this.props.store.NET.maxErrorThresh < this.props.store.NET.errorThresh ? "red" : "green"
					}}>Eerror thresh: { this.props.store.NET.errorThresh }</p>
					:
					null
				}

				<UserPlayers userId={ this.props.store.authorizedUser.id } />
			</div>
		)
	}
}


export default inject("store")(observer(UserPlayersPage));