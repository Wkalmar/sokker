import React from 'react';
// MobX
import { reaction, values } from "mobx";
import { observer, inject } from "mobx-react";
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
		this.props.store.transfers.fetchTransferPlayers();

		this["@reaction on change [userPlayers]"] = reaction(
			()=> this.props.store.authorizedUser && this.userPlayers.map((player)=> player.mid + player.att + player.def + player.gk),
			()=> {
				if(!this.props.store.authorizedUser) return;
				this.props.store.NET.train(this.userPlayers);
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


	get userPlayers() { return values(this.props.store.players.all).filter((player)=> player.userId === this.props.store.authorizedUser.id); };


	renderNetStatus() {
		return (
			<div>
				<p style={{ color: this.props.store.NET.status === "error" ? "red" : "green" }}>Net train { this.props.store.NET.status }</p>
				<p style={{ color: this.props.store.NET.maxErrorThresh < this.props.store.NET.errorThresh ? "red" : "green" }}>
					Error thresh: { this.props.store.NET.errorThresh }
				</p>
			</div>
		);
	}


	render() {
		return (
			<div>
				<h1>Current transfers</h1>
				{ this.renderNetStatus() }
				<QueryLoader query={ USER_PLAYERS_QUERY }
							 variables={{ userId: this.props.store.authorizedUser.id }}>
					<BoxList boxes={ this.props.store.transfers.players.map((player, i)=> <InterfacePlayer player={ player }
																								key={player.name}
																								index={i} />) } />
				</QueryLoader>
			</div>
		)
	}
}


export default inject("store")(observer(TransfersPage));