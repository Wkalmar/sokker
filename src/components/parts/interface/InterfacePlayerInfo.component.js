import React from 'react';
import moment from 'moment';
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


	render() {
		const player = this.props.player;

		return (
			<div className="interface-player-info" id={ this.dateNow }>
				<a href={ `http://sokker.org/player/PID/${player.id}` } target="_blank">
					<p style={{ margin: '0 0 10px 0' }}>{ player.name }</p>
				</a>
				<p style={{ fontSize: '12px', fontWeight: 'bold' }}>Age { Math.round(player.age * 100) }</p>
				<p style={{ fontSize: '11px' }}><T>End of trade</T>: { moment(player.endOfTrade).add(1, 'h').fromNow() }</p>

				<div style={{ fontSize: '12px', margin: '35px 0 0 0' }}>
					<div key='1' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.stamina * 100) }</b> (stamina)</p>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.keeper * 100) }</b> (keeper)</p>
					</div>
					<div key='2' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.pace * 100) }</b> (pace)</p>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.defender * 100) }</b> (defender)</p>
					</div>
					<div key='3' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.technique * 100) }</b> (technique)</p>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.playmaker * 100) }</b> (playmaker)</p>
					</div>
					<div key='4' style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black' }}>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.passing * 100) }</b> (passing)</p>
						<p style={{ padding: '10px' }}><b>{ Math.round(player.striker * 100) }</b> (striker)</p>
					</div>
				</div>
			</div>
		);
	}
}

export default observer(InterfacePlayerInfo);