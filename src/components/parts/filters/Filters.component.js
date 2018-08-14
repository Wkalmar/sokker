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
import FiltersSkillBtn from "components/parts/filters/FiltersSkillBtn.component";
import FiltersSkillRange from "components/parts/filters/FiltersSkillRange.component";


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
					<div className="filter_title">+ Saved filters..</div>
					<button>Reset filters</button>
				</div>
				<div className="filter">
					<div className="filter_title">Age range: ({ this.ageRange[0] } - { this.ageRange[1] }) <span>✘</span></div>
					<Slider.Range min={16}
								  max={40}
								  dots
								  pushable
								  onChange={ (range)=> store.filters.change({ age: { range } }) }
								  defaultValue={[this.ageRange[0], this.ageRange[1]]} />
					<div className="filter_title">Sort by age:</div>
					<button onClick={ this.onOrderChange }
							style={{ color: this.ageOrder === "✘" ? "white" : "black" }}>
						Order { this.ageOrder }
					</button>
				</div>

				<div className="filter">
					<FiltersSkillRange name="keeper" />
					<FiltersSkillRange name="pace" />
					<FiltersSkillRange name="defender" />
					<FiltersSkillRange name="technique" />
					<FiltersSkillRange name="playmaker" />
					<FiltersSkillRange name="passing" />
					<FiltersSkillRange name="striker" />
				</div>
				<div className="filter">
					<div className="filter_title">Sort by role</div>
					<FiltersSkillBtn name="ATT" color="#2876b4" />
					<FiltersSkillBtn name="DEF" color="rgb(247, 126, 17)" />
					<FiltersSkillBtn name="MID" color="rgb(44, 160, 44)" />
					<FiltersSkillBtn name="GK" color="rgb(215, 39, 41)" />
				</div>
				<div className="filter">
					<div className="filter_title">Sort by skills:</div>
					<FiltersSkillBtn name="stamina" />
					<FiltersSkillBtn name="keeper" />
					<FiltersSkillBtn name="pace" />
					<FiltersSkillBtn name="defender" />
					<FiltersSkillBtn name="technique" />
					<FiltersSkillBtn name="playmaker" />
					<FiltersSkillBtn name="passing" />
					<FiltersSkillBtn name="striker" />
				</div>
				<div className="filter">
					<div className="filter_title">Search by name</div>
					<input type="text"
						   placeholder="search..."
						   value={ store.filters.search }
						   onChange={ (e)=> store.filters.change({ search: e.currentTarget.value }) } />
				</div>
				{/*<div className="filter" style={{ paddingTop: 20 }}>*/}
					{/*<pre>{ JSON.stringify(store.filters.toJSON(), null, '\t') }</pre>*/}
				{/*</div>*/}
			</div>
		)
	}
}

export default observer(Filters)
