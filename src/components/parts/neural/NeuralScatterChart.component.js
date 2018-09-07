import React from "react";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend, Scatter } from "recharts";
// Components
import PreLoader from "components/parts/PreLoader.component";
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";


class NeuralScatterChart extends React.Component {


	activeTab = observable.box('att');

	selectedPlayer = observable.box(null);

	colors = {
		gk: '#2876b4',
		def: 'rgb(247, 126, 17)',
		mid: 'rgb(44, 160, 44)',
		att: 'rgb(215, 39, 41)',
	};
	

	get chartData() {
		return this.props.players.map((player)=> {
			return {
				att: player.att + 0.01,
				def: player.def + 0.01,
				mid: player.mid + 0.01,
				gk: player.gk + 0.01,
				age: Math.round(player.age * 100),
				name: player.name,
				id: player.id
			};
		});
	};


	onScatterClick = ({ id })=> {
		const player = this.props.players.find((player)=> player.id === id);
		this.selectedPlayer.set(player);
	};


	renderTooltip = (tooltip)=> {
		if(!tooltip.payload.length) return null;
		const player = tooltip.payload[0].payload;
		return (
			<div style={{ background: 'white', border: '1px solid gray', padding: '10px', fontSize: '13px', lineHeight: '20px' }}>
				{ player.name }<br/>
				age: { player.age }<br/>
				{ this.activeTab.get() }: { player[this.activeTab.get()].toFixed(1) }<br/>
			</div>
		)
	};


	renderScatterShape = (player)=> {
		const skill = player[this.activeTab.get()];
		let fill = this.colors[this.activeTab.get()];
		if(this.selectedPlayer.get() && this.selectedPlayer.get().id === player.id) fill = 'gray';
		return <circle cx={player.x}
					   cy={player.y}
					   r={ skill * 14 <= 6 ? 6 : skill * 14 }
					   fill={ fill } stroke="none" />;
	};


	renderLabels() {
		return (
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				{ Object.keys(this.colors).map((skill)=> {
					return <div key={skill}
								onClick={ ()=> this.activeTab.set(skill) }
								style={{
									background: this.colors[skill],
									border: `3px solid ${ skill === this.activeTab.get() ? 'white' : this.colors[skill] }`,
									width: '40px',
									cursor: 'pointer',
									height: '15px',
									margin: '10px' }} />
				}) }
			</div>
		);
	}


	renderChart() {
		if(!this.props.players.length) return <div className="cssload-loader-big"><PreLoader /></div>;
		if(store.players.isHideCharts) return <div className="cssload-loader-big"><PreLoader /></div>;
		return (
			<ScatterChart margin={{ top: 10, right: 20, bottom: 50, left: 0 }}>
				<Legend verticalAlign="top" height={30} iconType="square" />
				<XAxis type="number"
					   tick={{ fontSize: '11px' }}
					   dataKey={ this.activeTab.get() }
					   tickCount={ 6 }
					   domain={[0, 1]}
					   name={ this.activeTab.get() }
					   unit={` ${this.activeTab.get()}`} />
				<YAxis type="number"
					   dataKey="age"
					   tickCount={ 15 }
					   domain={[15, 'dataMax + 1']}
					   tick={{ fontSize: '11px' }}
					   name="age"
					   unit=" age" />
				<CartesianGrid />
				<Tooltip cursor={{ strokeDasharray: '3 3' }}
						 isAnimationActive={false}
						 content={ this.renderTooltip } />
				<Scatter name={ this.activeTab.get().toUpperCase() }
						 data={ this.chartData }
						 fill={ this.colors[this.activeTab.get()] }
						 onClick={ this.onScatterClick }
						 shape={ this.renderScatterShape }
				/>
			</ScatterChart>
		);
	}


	render() {
		return (
			<div style={{ width: '100%' }}>
				<div style={{ width: '100%', height: '700px', background: 'white' }}>
					{ this.renderLabels() }

					<ResponsiveContainer>
						{ this.renderChart() }
					</ResponsiveContainer>
				</div>
				<div>
					{ this.selectedPlayer.get() ?
						<div className="net-info-details-block">
							<InterfacePlayer player={ this.selectedPlayer.get() } key={this.selectedPlayer.get().id } />
						</div>
						:
						null }
				</div>
			</div>
		);
	}
}


export default observer(NeuralScatterChart);