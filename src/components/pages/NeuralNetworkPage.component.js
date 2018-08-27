import React from 'react';
// Styles
import "styles/net-info.css";
// MobX
import { values, observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";
import T from "components/parts/T.component";
import InterfacePlayerInfo from "components/parts/interface/InterfacePlayerInfo.component";
import InterfacePlayerForm from "components/parts/interface/InterfacePlayerForm.component";


class NeuralNetworkPage extends React.Component {

	isLoadingDeleteBtn = observable.box(false);

	openedDetailsBlock = observable.box('');


	get players() { return values(store.players.all); };

	get userPlayers() { return this.players.filter((player)=> player.userId === store.authorizedUser.id); };


	showPlayerDetails(player) {
		this.openedDetailsBlock.get() === player.id ?
			this.openedDetailsBlock.set('')
			:
			this.openedDetailsBlock.set(player.id);
	}


	relearnNet = ()=> {
		store.players.refreshPlayersCharts(true);
		store.NET.train(this.userPlayers);
		store.transfers.addPredictions();
		store.players.refreshPlayersCharts(false);
	};


	async removePlayer(id) {
		this.isLoadingDeleteBtn.set(true);
		await store.players.deleteMutation({ id: id });
		this.isLoadingDeleteBtn.set(false);
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
									<div style={{ width: 'calc(100% - 100px)' }}>{ player.name }</div>
									<button className="net-info-details-button" onClick={ ()=> this.showPlayerDetails(player) }>
										<T>{  this.openedDetailsBlock.get() === player.id ? "Hide" : "Show" }</T> <T>details</T>
									</button>
									<div className="net-info-details-block" style={{ height: this.openedDetailsBlock.get() === player.id ? 'auto' : 0 }}>
										{ this.openedDetailsBlock.get() === player.id && <InterfacePlayerInfo player={ player } /> }
										{ this.openedDetailsBlock.get() === player.id && <InterfacePlayerForm player={ player } /> }
										<button onClick={ ()=> this.removePlayer(player.id) }>
											{ this.isLoadingDeleteBtn.get() ?
												<PreLoader />
												:
												<T>Remove trained player and relearn NET</T>
											}
										</button>
									</div>
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