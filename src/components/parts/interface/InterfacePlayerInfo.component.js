import React from 'react';
// Styles
import "styles/interface/interface-player-info.css";
// MobX
import { observer } from 'mobx-react';
import { observable } from "mobx";
// Components
import T from "components/parts/T.component";



class InterfacePlayerInfo extends React.Component {

	dateNow = observable.box(Date.now());


	componentDidMount() {
		this.interval = setInterval(()=> this.dateNow.set(Date.now()), 60000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}


	renderSkill(skillName) {
		const skill = this.props.player[skillName] * 100;

		const color = skill > 10 ?
			'#2ca02c'
			:
			skill < 5 ?
				'red'
				:
				'black';
		return (
			<p style={{ padding: '10px' }}>
				<b style={{ color }}>{ Math.round(skill) }</b>
				&nbsp;{ (<T>{ skillName }</T>) }
			</p>
		);
	}


	render() {
		const player = this.props.player;
		const isPrice = player.currentBid || player.saleFor;

		return (
			<div className="interface-player-info" style={{ width: '40%' }} id={ this.dateNow.get() }>
				<a href={ `http://sokker.org/player/PID/${player.id}` } target="_blank">
					<p style={{ margin: '0 0 10px 0' }}>
						{ player.name }
					</p>
				</a>

				{ isPrice ?
					<p>{ player.currentBid ? <T>Current bid</T> : <T>Sales for</T> }: { player.price }</p>
					: null }

				<i><T>Age</T> { Math.round(player.age * 100) }</i>

				{ player.endOfTrade && <i><T>End of trade</T>: { player.endOfTradeFromNow }</i> }

				<div className="interface-player-info-block">
					<div key='1'>
						{ this.renderSkill('stamina') }
						{ this.renderSkill('keeper') }
					</div>
					<div key='2'>
						{ this.renderSkill('pace') }
						{ this.renderSkill('defender') }
					</div>
					<div key='3'>
						{ this.renderSkill('technique') }
						{ this.renderSkill('playmaker') }
					</div>
					<div key='4'>
						{ this.renderSkill('passing') }
						{ this.renderSkill('striker') }
					</div>
				</div>
			</div>
		);
	}
}

export default observer(InterfacePlayerInfo);