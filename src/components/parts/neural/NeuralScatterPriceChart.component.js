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


class NeuralScatterPriceChart extends React.Component {


	selectedPlayer = observable.box(null);
	

	get chartData() {
		return this.props.players.map((player)=> {
			return {
				price: player.saleFor ? +player.saleFor.replace(/\s/g, "") : +player.currentBid.replace(/\s/g, ""),
				skill: player.gk > 5 ?  player.gk*3 : player.att + player.mid + player.def,
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
				skill: { player.skill }<br/>
				price: { player.price }<br/>
			</div>
		)
	};


	renderScatterShape = (player)=> {
		let fill = 'orange';
		if(this.selectedPlayer.get() && this.selectedPlayer.get().id === player.id) fill = 'gray';
		return <circle cx={player.x}
					   cy={player.y}
					   r={ 8 }
					   fill={ fill } stroke="none" />;
	};


	renderChart() {
		if(!this.props.players.length) return <div className="cssload-loader-big"><PreLoader /></div>;
		if(store.players.isHideCharts) return <div className="cssload-loader-big"><PreLoader /></div>;
		return (
			<ScatterChart margin={{ top: 10, right: 20, bottom: 50, left: 0 }}>
				<Legend verticalAlign="top" height={30} iconType="square" />
				<XAxis type="number"
					   dataKey="skill"
					   tickCount={ 5 }
					   tick={{ fontSize: '11px' }}
					   name="skill"
					   unit=" skill" />
				<YAxis type="number"
					   tick={{ fontSize: '11px' }}
					   dataKey={ 'price' }
					   domain={['dataMax', 'dataMin']}
					   tickCount={ 5 }
					   name={ 'price' }
					   unit={` price`} />
				<CartesianGrid />
				<Tooltip cursor={{ strokeDasharray: '3 3' }}
						 isAnimationActive={false}
						 content={ this.renderTooltip } />
				<Scatter name={ 'price' }
						 data={ this.chartData }
						 fill={ 'green' }
						 onClick={ this.onScatterClick }
						 shape={ this.renderScatterShape }
				/>
			</ScatterChart>
		);
	}


	render() {
		return (
			<div style={{ width: '100%' }}>
				<div style={{ width: '100%', height: '500px', background: 'white' }}>
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


export default observer(NeuralScatterPriceChart);