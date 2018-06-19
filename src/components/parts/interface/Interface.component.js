import React from 'react';
// MobX
import { observer } from 'mobx-react';
import { values } from 'mobx';
// Store
import store from "store";
// Components
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";



class Interface extends React.Component {


	get players() { return values(store.players.all) };


	render() {
		return (
			<div style={{ fontFamily: 'Arial' }}>
				<div style={{ marginTop: 80, position: 'relative' }}>
					{ this.players.map((player, i)=> {
						return <InterfacePlayer player={ player } key={player.name} index={i} />
					}) }
				</div>
			</div>
		);
	}
}

export default observer(Interface);

