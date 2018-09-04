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
import InterfacePlayerInfo from "components/parts/interface/InterfacePlayerInfo.component";
import InterfacePlayerForm from "components/parts/interface/InterfacePlayerForm.component";
import PreLoader from "components/parts/PreLoader.component";


class InterfacePlayer extends React.Component {


	isReady = observable.box(false);


	constructor(props) {
		super(props);
		this.isReady.set(true);
	}


	getPlayerPrediction(player = this.props.player) {
		return store.NET.run(player);
	};


	render() {
		if(!this.isReady.get()) return <PreLoader />;

		return (
			<div className="interface-player"
				 key={ store.NET.status } >
				<InterfacePlayerInfo player={ this.props.player } />

				{ store.players.isHideCharts ?
					<PreLoader />
					:
					store.NET.status !== 'disabled' && <InterfacePlayerChart playerData={ this.getPlayerPrediction() } />
				}

				<InterfacePlayerForm player={ this.props.player } />
			</div>
		);
	}
}

export default observer(InterfacePlayer);

