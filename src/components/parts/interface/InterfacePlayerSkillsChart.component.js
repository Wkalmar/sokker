import React from 'react';
// MobX
import { observer } from 'mobx-react';
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, LabelList, Radar } from "recharts";
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';

const colors = scaleOrdinal(schemeCategory10).range();

const data = [
	{ subject: 'Math', A: 120, B: 110 },
	{ subject: 'Chinese', A: 98, B: 130 },
	{ subject: 'English', A: 86, B: 130 },
	{ subject: 'Geography', A: 99, B: 100 },
	{ subject: 'Physics', A: 85, B: 90 },
	{ subject: 'History', A: 65, B: 85 },
];


class InterfacePlayerSkillsChart extends React.Component {

	get playerData() {
		return ['keeper', 'pace', 'defender', 'technique', 'playmaker', 'passing', 'striker'].map((skillName)=> {
			return {
				name: skillName,
				value: this.props.player[skillName]
			};
		});
	}


	render() {
		return (
			<div className="interface-player-chart">
				<ResponsiveContainer>
					<RadarChart data={this.playerData}>
						<PolarGrid />
						<PolarAngleAxis dataKey="name" />
						<Tooltip />
						<Radar name="Player" dataKey="value" stroke="#d67800" fill="#d67800" fillOpacity={0.6} />
					</RadarChart>
				</ResponsiveContainer>
			</div>
		)
	}
}


export default observer(InterfacePlayerSkillsChart);