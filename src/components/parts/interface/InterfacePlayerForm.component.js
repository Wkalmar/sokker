import React from 'react';
// MobX
import { observable } from "mobx";
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import InterfacePlayerInput from "components/parts/interface/InterfacePlayerInput.component";
import T from "components/parts/T.component";
import { isNumber } from 'util';


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

	formatSkill = (skill) => {
		if (isNumber(skill))
			return +skill.toFixed(2);
		return 0;
	}


	setOutput(props) {
		this.output.set('gk', this.formatSkill(props.player.gk));
		this.output.set('def', this.formatSkill(props.player.def));
		this.output.set('mid', this.formatSkill(props.player.mid));
		this.output.set('att', this.formatSkill(props.player.att));
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