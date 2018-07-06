import React from 'react';
import Slider from 'rc-slider';
// Styles
import 'rc-slider/assets/index.css';
import "styles/filters.css";
// Store
import store from "store";
// MobX
import { observer } from "mobx-react";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Filters extends React.Component {


	onOrderChange = ()=> {
		store.filters.change({ age: { order: store.filters.age.order === "✘" ?
			"▼"
			:
			store.filters.age.order === "▲" ? "✘" : "▲"
		} })
	};


	onSkillChange = (name)=> {
		store.filters.change({ skills: { [name]: store.filters.skills[name] === "✘" ?
			"▼"
			:
			store.filters.skills[name] === "▲" ? "✘" : "▲"
		} });
	};


	render() {
		return (
			<div className="filters">
				<div className="filter">
					<div className="filter_title">Age range: ({ store.filters.age.range[0] } - { store.filters.age.range[1] }) <span>✘</span></div>
					<Range min={16}
						   max={40}
						   dots={ true }
						   pushable={ true }
						   onChange={ (range)=> store.filters.change({ age: { range } }) }
						   defaultValue={[16, 40]} />

					<div className="filter_title">Sort by age:</div>
					<button onClick={ this.onOrderChange }
							style={{ background: store.filters.age.order === "✘" ? "gray" : "#2876b4" }}>
						Order { store.filters.age.order }
					</button>
				</div>
				<div className="filter">
					<div className="filter_title">Sort by role</div>
					<button onClick={ ()=> this.onSkillChange('ATT') } style={{ background: store.filters.skills["ATT"] === "✘" ? "gray" : "#2876b4" }}>ATT { store.filters.skills["ATT"] }</button>
					<button onClick={ ()=> this.onSkillChange('DEF') } style={{ background: store.filters.skills["DEF"]  === "✘" ? "gray" : "rgb(247, 126, 17)" }}>DEF { store.filters.skills["DEF"] }</button>
					<button onClick={ ()=> this.onSkillChange("MID") } style={{ background: store.filters.skills["MID"]  === "✘" ? "gray" : "rgb(44, 160, 44)" }}>MID</button>
					<button onClick={ ()=> this.onSkillChange("GK") } style={{ background: store.filters.skills["GK"]  === "✘" ? "gray" : "rgb(215, 39, 41)" }}>GK</button>
				</div>
				<div className="filter">
					<div className="filter_title">Sort by skills:</div>
					<button onClick={ ()=> this.onSkillChange('stamina') }
							style={{ background: store.filters.skills.stamina === "✘" ? "gray" : "#2876b4"}}>stamina { store.filters.skills.stamina }</button>
					<button onClick={ ()=> this.onSkillChange('keeper') }
							style={{ background: store.filters.skills.keeper === "✘" ? "gray" : "#2876b4"}}>keeper { store.filters.skills.keeper }</button>
					<button onClick={ ()=> this.onSkillChange('pace') }
							style={{ background: store.filters.skills.pace === "✘" ? "gray" : "#2876b4"}}>pace { store.filters.skills.pace }</button>
					<button onClick={ ()=> this.onSkillChange('defender') }
							style={{ background: store.filters.skills.defender === "✘" ? "gray" : "#2876b4"}}>defender { store.filters.skills.defender }</button>
					<button onClick={ ()=> this.onSkillChange('technique') }
							style={{ background: store.filters.skills.technique === "✘" ? "gray" : "#2876b4"}}>technique { store.filters.skills.technique }</button>
					<button onClick={ ()=> this.onSkillChange('playmaker')}
							style={{ background: store.filters.skills.playmaker === "✘" ? "gray" : "#2876b4"}}>playmaker { store.filters.skills.playmaker }</button>
					<button onClick={ ()=> this.onSkillChange('passing') }
							style={{ background: store.filters.skills.passing === "✘" ? "gray" : "#2876b4"}}>passing { store.filters.skills.passing }</button>
					<button onClick={ ()=> this.onSkillChange('striker') }
							style={{ background: store.filters.skills.striker === "✘" ? "gray" : "#2876b4"}}>striker { store.filters.skills.striker }</button>
				</div>
				<div className="filter">
					<div className="filter_title">Search</div>
					<input type="text"
						   placeholder="search..."
						   value={ store.filters.search }
						   onChange={ (e)=> store.filters.change({ search: e.currentTarget.value }) } />
				</div>
				<div className="filter" style={{ width: "100%", border: "1px solid gray" }}>
					<pre>{ JSON.stringify(store.filters.toJSON(), null, '\t') }</pre>
				</div>
			</div>
		)
	}
}

export default observer(Filters)
