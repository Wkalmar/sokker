import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import UserPlayers from "components/parts/players/UserPlayers.component";


class TransfersPage extends React.Component {

	static permissions = {
		needAuth: true,
		redirectPath: "/"
	};


	componentDidMount() {
		// TODO: Move this
		store.transfers.fetchTransferPlayers();
	}


	render() {
		return (
			<div>
				{ store.NET.isLearned ?
					<p>Learned</p>
					:
					<p>Learning...</p>
				}
				{ store.NET.isLearned ?
					<p style={{ color: store.NET.maxErrorThresh < store.NET.errorThresh ? "red" : "green" }}>Eerror thresh: { store.NET.errorThresh }</p>
					:
					null
				}

				<UserPlayers userId={ store.authorizedUser.id } />
			</div>
		)
	}
}


export default observer(TransfersPage);