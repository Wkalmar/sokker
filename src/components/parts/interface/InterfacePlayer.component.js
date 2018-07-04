import React from 'react';
import InputMask from 'react-input-mask';
// MobX
import { observer } from 'mobx-react';
import { observable } from 'mobx';
// Store
import store from "store";
// Components
import InterfacePlayerChart from "components/parts/interface/InterfacePlayerChart.component";
import PreLoader from "components/parts/PreLoader.component";


class InterfacePlayer extends React.Component {

	output = observable.map({
		gk: 0,
		def: 0,
		mid: 0,
		att: 0
	});

	isSavingData = observable.box(false);

	isReady = observable.box(false);


	componentDidMount() {
		setTimeout(()=> this.isReady.set(true), this.props.index * 200);
		Object.keys(this.playerPrediction).map((name)=> this.output.set(name, +this.playerPrediction[name].toFixed(1)));
	}


	savePlayer = ()=> {
		store.players.createMutation({ ...this.props.player, ...this.output.toJSON(), playerId: this.props.player.id, userId: store.authorizedUser.id });
	};


	get playerPrediction() {
		return store.NET.run(this.props.player);
	};


	render() {
		const player = this.props.player;

		if(!this.isReady.get()) return <PreLoader />;

		return (
			<div key={ store.NET.status }>
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

				<div style={{ float: 'right', width: '60%', height: 280, marginTop: 20 }}>
					<InterfacePlayerChart playerData={ this.playerPrediction } />
				</div>

				<div style={{
					float: 'right',
					display: 'flex',
					justifyContent: 'space-between',
					boxSizing: 'border-box',
					width: '70%',
					padding: '0 20px 0 0'
				}}>
					<p>Net&nbsp;prediction: </p>
					<p>
						<span>GK</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('gk') }
								   onChange={ (e)=> this.output.set('gk', +e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
					<p>
						<span>DEF</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('def') }
								   onChange={ (e)=> this.output.set('def', +e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
					<p>
						<span>MID</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('mid') }
								   onChange={ (e)=> this.output.set('mid', +e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
					<p>
						<span>ATT</span>&nbsp;
						<InputMask mask="9.9"
								   maskChar=" "
								   alwaysShowMask={ true }
								   value={ this.output.get('att') }
								   onChange={ (e)=> this.output.set('att', +e.currentTarget.value) }
								   style={{
									   outline: 'none',
									   width: 25,
									   height: 20,
									   border: 'none',
									   borderBottom: '1px solid black',
									   fontSize: 14
								   }}
						/>
					</p>
				</div>

				<button style={{
					margin: '0 0 0 20px',
					float: 'left',
					border: 'none',
					padding: 10,
					color: 'white',
					background: 'rgb(61, 117, 160)',
					outline: 'none',
					cursor: 'pointer'
				}} onClick={ this.savePlayer }>
					{ this.isSavingData.get() ? 'Saving...' : 'Save' }
				</button>
			</div>
		);
	}
}

export default observer(InterfacePlayer);

