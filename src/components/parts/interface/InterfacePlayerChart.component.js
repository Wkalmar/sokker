import React from 'react';
// MobX
import { observer } from 'mobx-react';
import { observable } from 'mobx';
// Store
import store from "store";
// Chart
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, PieChart, Sector, Cell, Legend, Pie } from "recharts";
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';

const colors = scaleOrdinal(schemeCategory10).range();


class InterfacePlayerChart extends React.Component {

	activeIndex = observable.box(-1);

	maxChartRadius = 90;
	totalSkillsSum = 4 * 100;


	get chartData() { return Object.keys(this.props.playerData).map((name)=> ({
		name: name.toUpperCase(),
		value: this.props.playerData[name]
	})); };


	get playerSkillsSum() { return this.chartData.reduce(function(previousValue, currentValue) {
		return (previousValue.value ? previousValue.value * 100 : previousValue)  + currentValue.value * 100;
	}); };


	get chartRadius() {
		const chartRadiusInPercents = this.playerSkillsSum * 100 / this.totalSkillsSum;
		return this.maxChartRadius * chartRadiusInPercents / 100;
	};


	renderActiveShape = (props)=> {
		const RADIAN = Math.PI / 180;
		const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 6;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
				<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
				<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
					{ `${payload.name} / ${+payload.value.toFixed(1)}` }
				</text>
			</g>
		);
	};


	onPieEnter = (data, index, e)=> {
		this.activeIndex.set(index);
	};


	render() {
		if(!Object.keys(this.props.playerData).length) return null;
		return (
			<div className="interface-player-chart">
				<ResponsiveContainer>
					<PieChart width={120} height={100}>
						<Legend verticalAlign="top" align="right" />
						<Pie data={ this.chartData }
							 dataKey="value"
							 activeShape={this.renderActiveShape}
							 activeIndex={this.activeIndex.get()}
							 onMouseEnter={this.onPieEnter}
							 cx={'50%'}
							 cy={'50%'}
							 innerRadius={0}
							 outerRadius={ this.chartRadius }>
							{ this.chartData.map((entry, index)=> (
								<Cell key={`slice-${index}`} fill={colors[index % 10]} />
							)) }
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		)
	}
}


export default observer(InterfacePlayerChart);