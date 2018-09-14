import React from 'react';
import Slider from 'rc-slider';
// Styles
import 'rc-slider/assets/index.css';
import "styles/filters.css";
// Store
import store from "store";
// MobX
import { observer } from "mobx-react";
// Components
import T from "components/parts/T.component";
import FiltersCustom from "components/parts/filters/FiltersCustom.component";
import FiltersSkillBtn from "components/parts/filters/FiltersSkillBtn.component";
import FiltersSkillRange from "components/parts/filters/FiltersSkillRange.component";
import PredictedSkillsFilters from "components/parts/filters/PredictedSkillsFilters.component";


class Filters extends React.Component {


	get ageRange() { return store.filters.age.get('range'); };

	get ageOrder() { return store.filters.age.get('order'); };


	onOrderChange = ()=> {
		store.filters.change({
			age: { order: this.ageOrder === "✘" ?
				"▼"
				:
				this.ageOrder === "▲" ? "✘" : "▲"
			}
		})
	};


	render() {
		return (
			<div className="filters">
				<div className="filter">
					<div className="filter_title" />
					<button style={{ background: '#2876b4' }} onClick={ ()=> store.filters.resetFilters() }>
						<T>Reset filters</T>
					</button>
				</div>

				{ store.NET.status !== 'disabled' && <FiltersCustom /> }

				<div className="filter">
					<div className="filter_title"><T>Search by name</T></div>
					<input type="text"
						   placeholder={ store.t('search') }
						   value={ store.filters.search }
						   onChange={ (e)=> store.filters.realChange({ search: e.currentTarget.value }) } />
				</div>

				<div className="filter">
					<div className="filter_title"><T>Age range</T>: ({ this.ageRange[0] } - { this.ageRange[1] })</div>
					{ store.filters.isLoading ?
						<div className="rc-slider">
							<div className="rc-slider-rail"/>
							<div className="rc-slider-track rc-slider-track-1" style={{ left: 0, width: '100%' }}/>
							<div className="rc-slider-step"/>
							<div className="rc-slider-handle rc-slider-handle-1"  style={{ left: '0%' }} />
							<div className="rc-slider-handle rc-slider-handle-2" style={{ left: '100%' }}/>
							<div className="rc-slider-mark"/>
						</div>
						:
						<Slider.Range min={16}
									  max={40}
									  pushable
									  onChange={ (range)=> store.filters.change({ age: { range } }) }
									  defaultValue={[this.ageRange[0], this.ageRange[1]]} />
					}
					<button onClick={ this.onOrderChange }
							style={{ color: this.ageOrder === "✘" ? "white" : "black" }}>
						<T>Order</T> { this.ageOrder }
					</button>
				</div>

				{ store.NET.status !== 'disabled' ? <PredictedSkillsFilters /> : null }

				<div className="filter">
					<div className="filter_title"><T>Sort by skills</T>:</div>
					<FiltersSkillBtn name="stamina" />

					<FiltersSkillBtn name="keeper" />
					<FiltersSkillBtn name="pace" />
					<FiltersSkillBtn name="defender" />
					<FiltersSkillBtn name="technique" />
					<FiltersSkillBtn name="playmaker" />
					<FiltersSkillBtn name="passing" />
					<FiltersSkillBtn name="striker" />

					<FiltersSkillRange name="keeper" />
					<FiltersSkillRange name="pace" />
					<FiltersSkillRange name="defender" />
					<FiltersSkillRange name="technique" />
					<FiltersSkillRange name="playmaker" />
					<FiltersSkillRange name="passing" />
					<FiltersSkillRange name="striker" />
				</div>
			</div>
		)
	}
}

export default observer(Filters)
