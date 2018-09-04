import React from "react";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend, Scatter } from "recharts";
// Components
import T from "components/parts/T.component";
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";


class NeuralScatterChart extends React.Component {

	
	selectedPlayer = observable.box(null);
	

	get chartData() {
		return this.props.players.map((player)=> {
			// const gkSkill = player.gk * 100 * 3;
			return {
				skill: (player.att + player.def + player.mid + player.gk) * 100,
				age: Math.round(player.age * 100),
				name: player.name,
				id: player.id
			};
		});
	};


	getColor(percent) {
		const r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
		const g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
		return 'rgb('+r+','+g+',0)';
	}


	onScatterClick = ({ id })=> {
		const player = this.props.players.find((player)=> player.id === id);
		this.selectedPlayer.set(player);
	};


	renderTooltip = (tooltip)=> {
		if(!tooltip.payload.length) return null;
		const player = tooltip.payload[0].payload;
		return (
			<div style={{ background: 'whitesmoke', padding: '10px', fontSize: '13px', lineHeight: '20px' }}>
				{ player.name }<br/>
				age: { player.age }<br/>
				skill: { Math.round(player.skill) }<br/>
			</div>
		)
	};


	renderScatterShape = ({ id, skill, age, x, y })=> {
		const skillToAge = (skill-age*3) / 20;
		const radius = skillToAge <= 6 ? 6 : skillToAge;
		return <circle cx={x} cy={y} r={ radius } fill={this.getColor(skill / 8)} stroke="none"/>
	};


	render() {
		return (
			<div style={{ width: '100%' }}>
				<div style={{ width: '100%', height: '600px', background: 'white' }}>
					<ResponsiveContainer>
						<ScatterChart margin={{ top: 50, right: 20, bottom: 50, left: 0 }}>
							<XAxis type="number"
								   tick={{ fontSize: '11px' }}
								   dataKey="skill"
								   tickCount={ 10 }
								   name="skill"
								   unit=" skill" />
							<YAxis type="number"
								   dataKey="age"
								   tickCount={ 10 }
								   domain={[15, 'dataMax + 1']}
								   tick={{ fontSize: '11px' }}
								   name="age"
								   unit=" age" />
							<CartesianGrid />
							<Tooltip cursor={{ strokeDasharray: '3 3' }}
									 isAnimationActive={false}
									 content={ this.renderTooltip } />
							<Legend />
							<Scatter name={ this.props.title }
									 data={ this.chartData }
									 fill="#2876b4"
									 onClick={ this.onScatterClick }
									 shape={ this.renderScatterShape }
							/>
						</ScatterChart>
					</ResponsiveContainer>
				</div>
				<div>
					{ this.selectedPlayer.get() ?
						<InterfacePlayer player={ this.selectedPlayer.get() } key={this.selectedPlayer.get().id } />
						:
						null }
				</div>
			</div>
		);
	}
}


export default observer(NeuralScatterChart);