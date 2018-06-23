import React from 'react';
// MobX
import { values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import BoxList from "components/parts/boxes/BoxList.component";
// Components
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";


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
				<BoxList boxes={ this.players.map((player, i)=> <InterfacePlayer player={ player } key={player.name} index={i} />) } />
			</div>
		)
	}
}


export default observer(TransfersPage);