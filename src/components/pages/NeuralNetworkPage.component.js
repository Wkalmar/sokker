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
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";
import NeuralScatterChart from "components/parts/neural/NeuralScatterChart.component";


class NeuralNetworkPage extends React.Component {

	isLoadingDeleteBtn = observable.box(false);

	openedDetailsBlock = observable.box('');


	get players() { return values(store.players.all); };

	get transfers() { return values(store.transfers.players); };

	get userPlayers() { return this.players.filter((player)=> player.userId === store.authorizedUser.id); };


	showPlayerDetails(player) {
		this.openedDetailsBlock.get() === player.id ?
			this.openedDetailsBlock.set('')
			:
			this.openedDetailsBlock.set(player.id);
	}


	relearnNet = ()=> {
		store.NET.train(this.userPlayers);
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
						<div className="net-info-table">
							<div className="net-info-row">
								<T>{ store.NET.status !== 'disabled' ? 'disable' : 'enable'} NET</T>
								<input type="checkbox"
									   style={{ margin: 0 }}
									   onChange={ store.NET.toggleNet }
									   checked={ store.NET.status !== 'disabled' } />
							</div>
						</div>

						{ store.NET.status !== 'disabled' && <div className="net-info-title"><T>NET information</T></div> }
						{ store.NET.status !== 'disabled' ?
							<div className="net-info-table">
								<div className="net-info-row">
									<T>status</T>: <span style={{
									color: store.NET.status === "success" ? "rgb(44, 160, 44)" : "rgb(215, 39, 41)"
								}}>{ store.NET.status }</span>
								</div>
								<div className="net-info-row">
									<T>error thresh</T>: <span style={{
									color: store.NET.errorThresh < store.NET.maxErrorThresh ? "rgb(44, 160, 44)" : "rgb(215, 39, 41)"
								}}>{ store.NET.errorThresh }</span>
								</div>
								<div className="net-info-row">
									<T>trained players</T> <span>{ store.players.all.size }</span>
								</div>
								<div className="net-info-row">
									<span />
									<button onClick={ this.relearnNet }>
										{ store.NET.status === "learning" ?
											<PreLoader />
											:
											<T>Relearn net</T>
										}
									</button>
								</div>
								<div className="net-info-row">
									<span />
									<button>
										<T>Remove all net players</T>
									</button>
								</div>
							</div>
							: null }

						{ store.NET.status !== 'disabled' && <div className="net-info-title"><T>Transfer players skill / age chart</T></div> }
						{ store.NET.status !== 'disabled' ?
							<div className="net-info-table">
								<div className="net-info-row">
									<NeuralScatterChart players={ this.transfers } />
								</div>
							</div>
							:
							null }

						{ store.NET.status !== 'disabled' && <div className="net-info-title"><T>Trained players information</T></div> }
						{ store.NET.status !== 'disabled' ?
							this.players.reverse().map((player)=> {
								return (
									<div className="net-info-row" key={ player.id }>
										<a style={{ width: 'calc(100% - 115px)' }}
										   href={ `http://sokker.org/player/PID/${player.id}` } target="_blank">
											<p>{ player.name }</p>
										</a>

										<button className="net-info-details-button" onClick={ ()=> this.showPlayerDetails(player) }>
											<T>{ this.openedDetailsBlock.get() === player.id ? "Hide" : "Show" }</T> <T>details</T>
										</button>

										<div className="net-info-details-block" style={{ height: this.openedDetailsBlock.get() === player.id ? 'auto' : 0 }}>
											{ this.openedDetailsBlock.get() === player.id && <InterfacePlayer player={ player } /> }

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
								})
							: null }
					</div>
				</QueryLoader>
			</div>
		)
	}
}


export default observer(NeuralNetworkPage);