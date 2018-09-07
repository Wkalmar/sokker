import React from 'react';
// MobX
import { observable } from "mobx";
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import InterfacePlayerInput from "components/parts/interface/InterfacePlayerInput.component";
import T from "components/parts/T.component";


class InterfacePlayerFrom extends React.Component {

	isSavingData = observable.box(false);

	output = observable.map({
		gk: 0,
		def: 0,
		mid: 0,
		att: 0
	});


	constructor(props) {
		super(props);
		this.setOutput(props);
	}


	setOutput(props) {
		this.output.set('gk', +props.player.gk.toFixed(1));
		this.output.set('def', +props.player.def.toFixed(1));
		this.output.set('mid', +props.player.mid.toFixed(1));
		this.output.set('att', +props.player.att.toFixed(1));
	}


	savePlayer = async ()=> {
		this.isSavingData.set(true);
		await store.players.upsertMutation({
			...this.props.player,
			...this.output.toJSON(),
			playerId: this.props.player.id,
			userId: store.authorizedUser.id
		});
		this.isSavingData.set(false);
		this.setOutput(this.props);
	};


	render() {
		if(store.NET.status === 'disabled') return null;
		return (
			<div className="interface-player-form">

				<div className="interface-player-form-inputs">
					<InterfacePlayerInput pos="gk" output={ this.output } color='#2876b4' />
					<InterfacePlayerInput pos="def" output={ this.output } color='rgb(247, 126, 17)'/>
					<InterfacePlayerInput pos="mid" output={ this.output } color='rgb(44, 160, 44)'/>
					<InterfacePlayerInput pos="att" output={ this.output } color='rgb(215, 39, 41)'/>

					<button onClick={ this.savePlayer }
							style={{ width: '92px' }}
							disabled={ this.isSavingData.get() }>
						{ this.isSavingData.get() ? <T>Saving</T> : <T>Save</T> }
					</button>
				</div>
			</div>
		);
	}
}


export default observer(InterfacePlayerFrom);