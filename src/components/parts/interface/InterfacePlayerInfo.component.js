import React from 'react';
// MobX
import { observer } from 'mobx-react';


export default observer(function({ player }) {
	return (
		<div style={{ float: 'left', padding: '20px 0 0 20px', width: 'calc(40% - 20px)' }}>
			<a href={ `http://sokker.org/player/PID/${player.id}` } target="_blank">
				<p style={{ margin: '0 0 10px 0' }}>{ player.name }</p>
			</a>
			<p>age { Math.round(player.age * 100) }</p>

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
})