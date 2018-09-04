import React from 'react';
import moment from 'moment';
// Styles
import "styles/interface/interface-player-info.css";
// MobX
import { observer } from 'mobx-react';
import { observable } from "mobx";
// Store
import store from 'store';
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


	toggleFavorite = ()=> {
		this.props.player.update({
			id: this.props.player.id,
			isFavorite: !this.props.player.isFavorite
		});
	};


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

		return (
			<div className="interface-player-info" style={{ width: store.NET.status !== 'disabled' ? '40%' : '100%' }} id={ this.dateNow.get() }>
				<a href={ `http://sokker.org/player/PID/${player.id}` } target="_blank">
					<p style={{ margin: '0 0 10px 0' }}>
						{ player.name }
					</p>
				</a>

				{ player.user ?
					null
					:
					<div className="interface-player-favorite" onClick={ this.toggleFavorite }>
						{ player.isFavorite ? '★' : '☆' }
					</div>
				}

				<p><T>Age</T> { Math.round(player.age * 100) }</p>
				{ player.endOfTrade && <i><T>End of trade</T>: { moment(player.endOfTrade).add(1, 'h').fromNow() }</i> }

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