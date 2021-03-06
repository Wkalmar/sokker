import React from 'react';
// Styles
import "styles/net-info.css";
// MobX
import { observer } from "mobx-react";
import { values } from "mobx";
// Store
import store from "store";
// Components
import NeuralScatterChart from "components/parts/neural/NeuralScatterChart.component";
import NeuralScatterSkillsChart from "components/parts/neural/NeuralScatterSkillsChart.component";


class ChartsPage extends React.Component {

	get transfers() { return values(store.transfers.players); };


	render() {
		return (
			<div className="net-info">
				<div className="net-info-table">
					{ store.NET.status !== 'disabled' ?
						<div className="net-info-table">
							<div className="net-info-row">
								<NeuralScatterChart />
							</div>
						</div>
						:
						<div className="net-info-table">
							<div className="net-info-row">
								<NeuralScatterSkillsChart />
							</div>
						</div> }
				</div>
			</div>
		)
	}
}


export default observer(ChartsPage);