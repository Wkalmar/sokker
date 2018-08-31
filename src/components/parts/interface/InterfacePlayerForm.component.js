import React from 'react';
// MobX
import { observable } from "mobx";
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import InterfacePlayerInput from "components/parts/interface/InterfacePlayerInput.component";


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
		await store.players.createMutation({
			...this.props.player,
			...this.output.toJSON(),
			playerId: this.props.player.id,
			userId: store.authorizedUser.id
		});
		this.isSavingData.set(false);
		this.setOutput(this.props);
	};


	render() {
		if(!store.NET.isEnabled) return null;
		return (
			<div className="interface-player-form">

				<div className="interface-player-form-inputs">
					<p>
						<span>GK</span>
						<InterfacePlayerInput pos="gk" output={ this.output } />
					</p>
					<p>
						<span>DEF</span>
						<InterfacePlayerInput pos="def" output={ this.output } />
					</p>
					<p>
						<span>MID</span>
						<InterfacePlayerInput pos="mid" output={ this.output } />
					</p>
					<p>
						<span>ATT</span>
						<InterfacePlayerInput pos="att" output={ this.output } />
					</p>

					<button onClick={ this.savePlayer } disabled={ this.isSavingData.get() }>
						{ this.isSavingData.get() ? 'Saving...' : 'Save' }
					</button>
				</div>
			</div>
		);
	}
}


export default observer(InterfacePlayerFrom);