import React from 'react';
// Styles
import "styles/interface/interface-player.css";
// MobX
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import InterfacePlayerChart from "components/parts/interface/InterfacePlayerChart.component";
import InterfacePlayerSkillsChart from "components/parts/interface/InterfacePlayerSkillsChart.component";
import InterfacePlayerInfo from "components/parts/interface/InterfacePlayerInfo.component";
import InterfacePlayerForm from "components/parts/interface/InterfacePlayerForm.component";
import PreLoader from "components/parts/PreLoader.component";


class InterfacePlayer extends React.Component {

	render() {
		return (
			<div className="interface-player"
				 key={ store.NET.status }>

				<InterfacePlayerInfo player={ this.props.player } />

				{ store.players.isHideCharts ?
					<PreLoader />
					:
					store.NET.status !== 'disabled' ?
						<InterfacePlayerChart playerData={{
							gk: this.props.player.gk,
							def: this.props.player.def,
							mid: this.props.player.mid,
							att: this.props.player.att
						}} />
						:
						<InterfacePlayerSkillsChart player={ this.props.player } />
				}

				<InterfacePlayerForm player={ this.props.player } />
			</div>
		);
	}
}

export default observer(InterfacePlayer);

