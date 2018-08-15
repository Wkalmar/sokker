import React from 'react';
// Styles
import "styles/net-info.css";
// MobX
import { values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import T from "components/parts/T.component";


class NeuralNetworkPage extends React.Component {

	get players() { return values(store.players.all); };


	showPlayerDetails(player) {
		console.log("DETAILS:", player);
	}
	

	render() {
		return (
			<div>
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
			</div>
		)
	}
}


export default observer(NeuralNetworkPage);