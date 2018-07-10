import React from 'react';
// Styles
import "styles/interface/interface-player.css";
// MobX
import { observer } from 'mobx-react';
import { observable } from 'mobx';
// Store
import store from "store";
// Components
import InterfacePlayerChart from "components/parts/interface/InterfacePlayerChart.component";
import InterfacePlayerInput from "components/parts/interface/InterfacePlayerInput.component";
import InterfacePlayerInfo from "components/parts/interface/InterfacePlayerInfo.component";
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


	constructor(props) {
		super();
		this.isReady.set(true);
		Object.keys(this.getPlayerPrediction(props.player)).map((name)=> this.output.set(name, +this.getPlayerPrediction(props.player)[name].toFixed(1)));
	}


	savePlayer = ()=> {
		store.players.createMutation({
			...this.props.player,
			...this.output.toJSON(),
			playerId: this.props.player.id,
			userId: store.authorizedUser.id
		});
	};


	getPlayerPrediction(player = this.props.player) {
		return store.NET.run(player);
	};


	render() {
		if(!this.isReady.get()) return <PreLoader />;

		return (
			<div className="interface-player" key={ store.NET.status }>
				<InterfacePlayerInfo player={ this.props.player } />

				<div style={{ float: 'right', width: '60%', height: 280, marginTop: 20 }}>
					<InterfacePlayerChart playerData={ this.getPlayerPrediction() } />
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
						<InterfacePlayerInput role="gk" output={ this.output } />
					</p>
					<p>
						<span>DEF</span>&nbsp;
						<InterfacePlayerInput role="def" output={ this.output } />
					</p>
					<p>
						<span>MID</span>&nbsp;
						<InterfacePlayerInput role="mid" output={ this.output } />
					</p>
					<p>
						<span>ATT</span>&nbsp;
						<InterfacePlayerInput role="att" output={ this.output } />
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

