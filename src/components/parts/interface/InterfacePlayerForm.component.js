import React from 'react';
// MobX
import { observable, reaction } from "mobx";
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import InterfacePlayerInput from "components/parts/interface/InterfacePlayerInput.component";
import T from "components/parts/T.component";


class InterfacePlayerFrom extends React.Component {

	output = observable.map({
		gk: '0',
		def: '0',
		mid: '0',
		att: '0'
	});


	componentDidMount() {
		this.setOutput();
		
		this['@silentReaction on [store.players.isHideCharts]'] = reaction(
			()=> store.players.isHideCharts,
			(isHideCharts)=> {
				if(isHideCharts === false) this.setOutput();
			},
			{ name: '@silentReaction on [store.players.isHideCharts]' });
	}


	componentWillUmount() {
		this['@silentReaction on [store.players.isHideCharts]']();
	}


	setOutput() {
		this.output.set('gk', this.props.player.skill('gk'));
		this.output.set('def', this.props.player.skill('def'));
		this.output.set('mid', this.props.player.skill('mid'));
		this.output.set('att', this.props.player.skill('att'));
	}


	savePlayer = async ()=> {
		store.players.refreshPlayersCharts(true);

		const playerOutput =  Object.keys(this.output.toJSON()).reduce((res, name)=> {
			res[name] = +this.output.toJSON()[name] / 100;
			return res;
		}, {});

		await store.players.upsertMutation({
			...this.props.player,
			...playerOutput,
			playerId: this.props.player.id,
			userId: store.authorizedUserId
		});
	};


	render() {
		return (
			<div className="interface-player-form">

				<div className="interface-player-form-inputs">
					<InterfacePlayerInput pos="gk" output={ this.output } color='#2876b4' />
					<InterfacePlayerInput pos="def" output={ this.output } color='rgb(247, 126, 17)'/>
					<InterfacePlayerInput pos="mid" output={ this.output } color='rgb(44, 160, 44)'/>
					<InterfacePlayerInput pos="att" output={ this.output } color='rgb(215, 39, 41)'/>

					<button onClick={ this.savePlayer }
							style={{ width: '92px' }}
							disabled={ store.players.isHideCharts }>
						{ store.players.isHideCharts ? <T>Saving</T> : <T>Save</T> }
					</button>
				</div>
			</div>
		);
	}
}


export default observer(InterfacePlayerFrom);