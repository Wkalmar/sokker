import React from 'react';
// MobX
import { values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import ALL_PLAYERS_QUERY from "graphql/queries/players/allPlayers.query";
// Components
import BoxList from "components/parts/boxes/BoxList.component";
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";
import QueryLoader from "components/QueryLoader.component";


class TransfersPage extends React.Component {

	static permissions = {
		needAuth: true,
		redirectPath: "/"
	};


	componentDidMount() {
		store.players.fetchPlayers();
	}


	get players() { return values(store.players.all) };


	render() {
		return (
			<div>
				<QueryLoader query={ ALL_PLAYERS_QUERY }>
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
					<BoxList boxes={ this.players.map((player, i)=> <InterfacePlayer player={ player } key={player.name} index={i} />) } />
				</QueryLoader>
			</div>
		)
	}
}


export default observer(TransfersPage);