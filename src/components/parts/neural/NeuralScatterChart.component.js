import React from "react";
// Styles
import 'styles/neural/chart.css';
// MobX
import { observable, values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// @SOURCE: https://github.com/recharts/recharts/blob/master/demo/component/PieChart.js
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter } from "recharts";
// Components
import PreLoader from "components/parts/PreLoader.component";
import T from "components/parts/T.component";
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";


class NeuralScatterChart extends React.Component {


	activeTab = observable.box('att');

	activePlayers = observable.box('all');

	activeChart = observable.box('age'); // age, price

	selectedPlayer = observable.box(null);

	colors = {
		gk: '#2876b4',
		def: 'rgb(247, 126, 17)',
		mid: 'rgb(44, 160, 44)',
		att: 'rgb(215, 39, 41)',
	};
	

	get players() { return this.activePlayers.get() === 'all' ? values(store.transfers.players) : store.transfers.filtered; };


	get chartData() {
		return this.players.map((player)=> {
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
		const player = this.players.find((player)=> player.id === id);
		this.selectedPlayer.set(player);
	};


	renderTooltip = (tooltip)=> {
		if(!tooltip.payload.length) return null;
		const data = tooltip.payload[0].payload;
		const player = this.players.find((player)=> player.id === data.id);
		return (
			<div style={{ background: 'white', border: '1px solid gray', padding: '10px', fontSize: '13px', lineHeight: '20px', textAlign: 'left' }}>
				{ player.name }<br/>
				age: { Math.round(player.age * 100) }<br/>
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
					   r={ skill * 15 <= 7 ? 7 : skill * 15 }
					   fill={ fill } stroke="none" />;
	};


	renderPlayersTabs() {
		return (
			<div className='neural-chart-controls'>
				<div className='neural-chart-controls-title'><T>Show players</T>: </div>
				<div style={{ display: 'flex' }}>
					<div className='neural-chart-controls-item'
						 style={{ background: this.activePlayers.get() === 'all' ? 'rgb(247, 126, 17)' : '#b3b3b3' }}
						 onClick={ ()=> this.activePlayers.set('all') }>all</div>
					<div className='neural-chart-controls-item'
						 style={{ background: this.activePlayers.get() === 'filtered' ? 'rgb(247, 126, 17)' : '#b3b3b3' }}
						 onClick={ ()=> this.activePlayers.set('filtered') }>filtered</div>
				</div>
			</div>
		);
	}


	renderChartTabs() {
		return (
			<div className='neural-chart-controls'>
				<div className='neural-chart-controls-title'><T>Current active chart</T>: </div>
				<div style={{ display: 'flex' }}>
					<div className='neural-chart-controls-item'
						 style={{ background: this.activeChart.get() === 'age' ? '#2876b4' : '#b3b3b3' }}
						 onClick={ ()=> this.activeChart.set('age') }>age</div>
					<div className='neural-chart-controls-item'
						 style={{ background: this.activeChart.get() === 'price' ? 'rgb(215, 39, 41)' : '#b3b3b3' }}
						 onClick={ ()=> this.activeChart.set('price') }>price</div>
				</div>
			</div>
		);
	}


	renderLabels() {
		return (
			<div className='neural-chart-controls'>
				<div className='neural-chart-controls-title'><T>Order by</T>: </div>
				<div style={{ display: 'flex' }}>
					{ Object.keys(this.colors).map((skill)=> {
						return (
							<div key={skill}
								 className='neural-chart-controls-item'
								 style={{ background: skill === this.activeTab.get() ? this.colors[skill] : '#b3b3b3' }}
								 onClick={ ()=> this.activeTab.set(skill) }>{ skill }</div>
						);
					}) }
				</div>
			</div>
		);
	}


	renderChart() {
		if(!this.players.length) return <div className="cssload-loader-big"><PreLoader /></div>;
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

				{ this.activePlayers.get('filtered') ?
					<YAxis type="number"
						   dataKey={ this.activeChart.get() }
						   allowDecimals={ false }
						   tickCount={ 15 }
						   domain={ this.activeChart.get() === 'age' ?
							   [15, 'dataMax + 1']
							   :
							   ['dataMin', 'dataMax + 1000000'] }
						   tick={{ fontSize: '11px' }}
						   name={ this.activeChart.get() }
						   unit={ ` ${this.activeChart.get()}` } />
					:
					<YAxis type="number"
						   dataKey={ this.activeChart.get() }
						   allowDecimals={ false }
						   tickCount={ 15 }
						   domain={ this.activeChart.get() === 'age' ?
							   [store.filters.age.get('range')[0]-1, store.filters.age.get('range')[1]+1]
							   :
							   ['dataMin', 'dataMax + 1000000'] }
						   tick={{ fontSize: '11px' }}
						   name={ this.activeChart.get() }
						   unit={ ` ${this.activeChart.get()}` } />
				}

				<CartesianGrid />

				<Tooltip cursor={{ strokeDasharray: '3 3' }}
						 isAnimationActive={false}
						 content={ this.renderTooltip } />

				<Scatter name={ this.activeTab.get().toUpperCase() }
						 data={ this.chartData }
						 fill={ this.colors[this.activeTab.get()] }
						 onClick={ this.onScatterClick }
						 shape={ this.renderScatterShape } />
			</ScatterChart>
		);
	}


	render() {
		return (
			<div style={{ width: '100%' }}>
				<div className='neural-chart'>

					{ this.renderChartTabs() }

					{ this.renderPlayersTabs() }

					{ this.renderLabels() }

					<div style={{ height: '500px', width: '100%' }}>
						<ResponsiveContainer>
							{ this.renderChart() }
						</ResponsiveContainer>
					</div>
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