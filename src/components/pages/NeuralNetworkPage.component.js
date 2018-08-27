import React from 'react';
// Styles
import "styles/net-info.css";
// MobX
import { values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";
import T from "components/parts/T.component";


class NeuralNetworkPage extends React.Component {

	get players() { return values(store.players.all); };

	get userPlayers() { return this.players.filter((player)=> player.userId === store.authorizedUser.id); };


	showPlayerDetails(player) {
		console.log("DETAILS:", player);
	}


	relearnNet = ()=> {
		store.players.refreshPlayersCharts(true);
		store.NET.train(this.userPlayers);
		store.transfers.addPredictions();
		store.players.refreshPlayersCharts(false);
	};
	

	render() {
		return (
			<div>
				<QueryLoader query={ USER_PLAYERS_QUERY }
							 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
							 variables={{ userId: store.authorizedUser.id }}>
					<div className="net-info">
						<div className="net-info-title"><T>NET information</T></div>
						<div className="net-info-table">
							<div className="net-info-row">
								status: <span style={{
								color: store.NET.status === "success" ? "rgb(44, 160, 44)" : "rgb(215, 39, 41)"
							}}>{ store.NET.status }</span>
							</div>
							<div className="net-info-row">
								error thresh: <span style={{
								color: store.NET.errorThresh < store.NET.maxErrorThresh ? "rgb(44, 160, 44)" : "rgb(215, 39, 41)"
							}}>{ store.NET.errorThresh }</span>
							</div>
							<div className="net-info-row">
								trained players <span>{ store.players.all.size }</span>
							</div>
							<div className="net-info-row">
								<span />
								<button onClick={ this.relearnNet }>Relearn net</button>
							</div>
						</div>

						<div className="net-info-title"><T>Trained players information</T></div>
						{ this.players.map((player)=> {
							return (
								<div className="net-info-row" key={ player.id }>
									{ player.name }
									<button className="net-info-details-button" onClick={ ()=> this.showPlayerDetails(player) }><T>Details</T></button>
								</div>
							)
						}) }
					</div>
				</QueryLoader>
			</div>
		)
	}
}


export default observer(NeuralNetworkPage);