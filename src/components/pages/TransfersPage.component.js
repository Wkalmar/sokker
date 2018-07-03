import React from 'react';
// MobX
import { reaction, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
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
		// TODO: Move this
		store.transfers.fetchTransferPlayers();

		this["@reaction on change [userPlayers]"] = reaction(
			()=> this.userPlayers.map((player)=> player.mid + player.att + player.def + player.gk),
			()=> {
				store.NET.train(this.userPlayers);
			},
			{
				fireImmediately: true,
				name: "@reaction on change [userPlayers]"
			}
		);
	}


	componentWillUnmount() {
		this["@reaction on change [userPlayers]"]();
	}


	get userPlayers() { return values(store.players.all).filter((player)=> player.userId === store.authorizedUser.id); };


	renderNetStatus() {
		return (
			<div>
				<p style={{ color: store.NET.status === "error" ? "red" : "green" }}>Net train { store.NET.status }</p>
				<p style={{ color: store.NET.maxErrorThresh < store.NET.errorThresh ? "red" : "green" }}>Eerror thresh: { store.NET.errorThresh }</p>
			</div>
		);
	}


	render() {
		return (
			<div>
				<h1>Current transfers</h1>
				{ this.renderNetStatus() }
				<QueryLoader query={ USER_PLAYERS_QUERY }
							 variables={{ userId: store.authorizedUser.id }}>
					<BoxList boxes={ store.transfers.players.map((player, i)=> <InterfacePlayer player={ player }
																								key={player.name}
																								index={i} />) } />
				</QueryLoader>
			</div>
		)
	}
}


export default observer(TransfersPage);