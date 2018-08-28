import React from 'react';
import List from 'react-virtualized/dist/commonjs/List'
// MobX
import { reaction, observable, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";
import Filters from "components/parts/filters/Filters.component";
import PreLoader from "components/parts/PreLoader.component";
import T from "components/parts/T.component";


class Interface extends React.Component {

	table = observable({
		height: this.tableHeight,
		width: this.tableWidth,
		marginLeft: 15,
		rowHeight: 370
	});


	constructor() {
		super();
		store.transfers.transfersMutation();

		this["@reaction on change [userPlayers]"] = reaction(
			()=> store.authorizedUser && this.userPlayers.map((player)=> player.mid + player.att + player.def + player.gk),
			()=> {
				if(!store.authorizedUser) return;
				store.NET.train(this.userPlayers);
				store.transfers.addPredictions();
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


	get tableWidth() { return store.device === "desktop" ? window.innerWidth / 100 * 60 : window.innerWidth; };

	get tableHeight() { return window.innerHeight - 50; };

	get userPlayers() { return values(store.players.all).filter((player)=> player.userId === store.authorizedUser.id); };

	get players() { return store.transfers.filtered; };


	onWindowResize = (e)=> {
		this.table.width = this.tableWidth;
		this.table.height = this.tableHeight;
	};


	renderFilter() {
		return store.device === "desktop" ?
			<div style={{
				position: 'fixed',
				left: this.tableWidth + 15,
				width: window.innerWidth - (this.tableWidth + 50)
			}}>
				{ store.authorizedUser && <div style={{ height: this.table.height, overflowY: 'scroll' }}><Filters /></div> }
			</div>
			: null;
	}


	render() {
		if(!store.transfers.players.size) return (
			<div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'start' }}>
				<div style={{ overflow: 'hidden', width: this.table.width, padding: "0 10px" }}>
					<div className="cssload-loader-big"><PreLoader/></div>
				</div>
				{ this.renderFilter() }
			</div>
		);

		return (
			<div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'start' }}>
				<div style={{ overflow: 'hidden', width: this.table.width, padding: "0 10px" }}>
					<button>Refresh</button>
					{ this.players.length ?
						<List rowCount={ this.players.length }
							  height={ this.table.height }
							  width={ this.table.width }
							  rowHeight={ this.table.rowHeight }
							  rowRenderer={({ style, index })=> {
								  return (
									  <div style={ style } key={ this.players[index].id }>
										  <InterfacePlayer player={ this.players[index] }
														   index={index} />
									  </div>
								  )
							  } } />
						:
						<div style={{ fontSize: 20, textAlign: 'center', marginTop: '100px' }}>
							<T>No players found</T>
						</div>
					}
				</div>

				{ this.renderFilter() }
			</div>
		)
	}
}


export default observer(Interface);