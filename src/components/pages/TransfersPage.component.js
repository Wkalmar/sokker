import React from 'react';
import List from 'react-virtualized/dist/commonjs/List'
// MobX
import { reaction, values } from "mobx";
import { observer } from "mobx-react";
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";
import QueryLoader from "components/QueryLoader.component";
import Filters from "components/parts/filters/Filters.component";


class TransfersPage extends React.Component {

	constructor() {
		super();
		// TODO: Move this
		store.transfers.fetchTransferPlayers();

		this["@reaction on change [userPlayers]"] = reaction(
			()=> store.authorizedUser && this.userPlayers.map((player)=> player.mid + player.att + player.def + player.gk),
			()=> {
				if(!store.authorizedUser) return;
				store.NET.train(this.userPlayers);
				store.players.refreshPlayersCharts(false);
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


	get players() { return store.transfers.filtered; };


	renderNetStatus() {
		return (
			<div style={{ fontSize: '10px' }}>
				<p style={{ color: store.NET.status === "error" ? "red" : "green" }}>Net train { store.NET.status }</p>
				<p style={{ color: store.NET.maxErrorThresh < store.NET.errorThresh ? "red" : "green" }}>
					Error thresh: { store.NET.errorThresh }
				</p>
			</div>
		);
	}


	render() {
		return (
			<div>
				{ this.renderNetStatus() }
				<QueryLoader query={ USER_PLAYERS_QUERY }
							 variables={{ userId: store.authorizedUser.id }}>

					<div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'start'}}>
						<div style={{ overflow: 'hidden', width: window.innerWidth / 100 * 60 - 15, marginLeft: 10 }}>
							<List rowCount={ this.players.length }
								  height={ 1000 }
								  width={ window.innerWidth / 100 * 60 }
								  rowHeight={ 370 }
								  rowRenderer={({ style, index, key })=> {
									  return <div style={ style } key={ key }>
										  <InterfacePlayer player={ this.players[index] }
														   index={index} />
									  </div>
								  } } />
						</div>

						<div style={{
							position: 'fixed',
							left: window.innerWidth / 100 * 60,
							width: window.innerWidth - (window.innerWidth / 100 * 60 + 50)
						}}>
							{ store.authorizedUser && <Filters /> }
						</div>
					</div>
				</QueryLoader>
			</div>
		)
	}
}


export default observer(TransfersPage);