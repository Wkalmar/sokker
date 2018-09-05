import React from 'react';
// MobX
import { observer } from 'mobx-react';
// Store
import store from "store";
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, LabelList, Radar } from "recharts";


class InterfacePlayerSkillsChart extends React.Component {

	get playerData() {
		return ['pace', 'striker', 'technique', 'defender', 'playmaker', 'passing', 'keeper'].map((skillName)=> {
			return {
				name: store.t(skillName),
				value: this.props.player[skillName]
			};
		});
	}

	
	renderTooltip = (tooltip)=> {
		if(!tooltip.payload.length) return null;
		const name = tooltip.payload[0].payload.name;
		const skill = Math.round(tooltip.payload[0].value * 100);
		return (
			<div style={{ background: 'white', border: '1px solid gray', padding: '10px', fontSize: '13px', lineHeight: '20px' }}>
				{name}: { skill }
			</div>
		)
	};
	

	render() {
		return (
			<div className="interface-player-chart">
				<ResponsiveContainer>
					<RadarChart data={this.playerData} outerRadius={90}>
						<PolarGrid />
						<PolarAngleAxis dataKey="name" />
						<PolarRadiusAxis tickCount={17} domain={[0, 0.17]} tick={false}/>
						<Tooltip content={ this.renderTooltip } />
						<Radar name="Player" dataKey="value" stroke="#d67800" fill="#d67800" fillOpacity={0.7} />
					</RadarChart>
				</ResponsiveContainer>
			</div>
		)
	}
}


export default observer(InterfacePlayerSkillsChart);