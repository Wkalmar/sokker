import React from "react";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter } from "recharts";
// Components
import PreLoader from "components/parts/PreLoader.component";
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";


class NeuralScatterChart extends React.Component {


	activeTab = observable.box('att');

	activeChart = observable.box('age'); // age, price

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
				id: player.id,
				price: player.saleFor ? +player.saleFor.replace(/\s/g, "") : +player.currentBid.replace(/\s/g, "")
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
			<div style={{ background: 'white', border: '1px solid gray', padding: '10px', fontSize: '13px', lineHeight: '20px', textAlign: 'left' }}>
				{ player.name }<br/>
				age: { player.age }<br/>
				price: { player.price }<br/>
				{ this.activeTab.get() }: { (player[this.activeTab.get()] * 100).toFixed(0) }<br/>
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


	renderChartTabs() {
		return (
			<div style={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}>
				<div style={{
					background: this.activeChart.get() === 'age' ? '#2876b4' : '#b3b3b3',
					width: '40px',
					cursor: 'pointer',
					color: 'white',
					height: '20px',
					margin: '10px' }}
					 onClick={ ()=> this.activeChart.set('age') }>age</div>
				<div style={{
					background: this.activeChart.get() === 'price' ? 'rgb(215, 39, 41)' : '#b3b3b3',
					width: '40px',
					cursor: 'pointer',
					color: 'white',
					height: '20px',
					margin: '10px' }}
					 onClick={ ()=> this.activeChart.set('price') }>price</div>
			</div>
		);
	}


	renderLabels() {
		return (
			<div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
				{ Object.keys(this.colors).map((skill)=> {
					return <div key={skill}
								onClick={ ()=> this.activeTab.set(skill) }
								style={{
									background: skill === this.activeTab.get() ? this.colors[skill] : '#b3b3b3',
									width: '40px',
									cursor: 'pointer',
									color: 'white',
									height: '20px',
									margin: '10px' }} >{ skill }</div>
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
					   dataKey={ this.activeChart.get() }
					   tickCount={ 15 }
					   domain={ this.activeChart.get() === 'age' ? [15, 'dataMax + 1'] : ['dataMin', 'dataMax + 1000000']}
					   tick={{ fontSize: '11px' }}
					   name={ this.activeChart.get() }
					   unit={ ` ${this.activeChart.get()}` } />

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
				<div style={{
					width: '100%',
					height: '500px',
					background: 'white',
					display: 'flex',
					flexWrap: 'wrap',
					fontSize: '12px',
					lineHeight: '20px',
					textAlign: 'center'
				}}>
					{ this.renderChartTabs() }
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