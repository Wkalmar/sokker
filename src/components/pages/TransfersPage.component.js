import React from 'react';
import List from 'react-virtualized/dist/commonjs/List'
// MobX
import { reaction, observable, values } from "mobx";
import { observer } from "mobx-react";
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";
import QueryLoader from "components/QueryLoader.component";
import Filters from "components/parts/filters/Filters.component";
import PreLoader from "components/parts/PreLoader.component";


class TransfersPage extends React.Component {

	table = observable({
		height: window.innerHeight,
		width: window.innerWidth / 100 * 60, // 60%
		marginLeft: 15,
		rowHeight: 370
	});


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

		window.addEventListener('resize', this.onWindowResize);
	}


	componentWillUnmount() {
		this["@reaction on change [userPlayers]"]();
		window.removeEventListener('resize', this.onWindowResize);
	}


	get userPlayers() { return values(store.players.all).filter((player)=> player.userId === store.authorizedUser.id); };

	get players() { return store.transfers.filtered; };


	onWindowResize = (e)=> {
		this.table.width = e.currentTarget.innerWidth / 100 * 60;
		this.table.height = e.currentTarget.innerHeight;
	};


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
							 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
							 variables={{ userId: store.authorizedUser.id }}>

					<div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'start' }}>
						<div style={{ overflow: 'hidden', width: this.table.width, marginLeft: 10 }}>
							<List rowCount={ this.players.length }
								  height={ this.table.height }
								  width={ this.table.width }
								  rowHeight={ this.table.rowHeight }
								  rowRenderer={({ style, index, isVisible })=> {
									  return (
										  <div style={ style } key={ this.players[index].id }>
											  <InterfacePlayer player={ this.players[index] }
															   index={index} />
										  </div>
									  )
								  } } />
						</div>

						<div style={{
							position: 'fixed',
							left: window.innerWidth / 100 * 60 + 15,
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