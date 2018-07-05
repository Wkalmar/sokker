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


	onRoleChange = (name)=> {
		store.filters.change({ roles: { [name]: !store.filters.roles[name] }});
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
					<div className="filter_title">Show role/roles</div>
					<button onClick={ ()=> this.onRoleChange("ATT") } style={{ background: store.filters.roles["ATT"] ? "#2876b4" : "gray" }}>ATT</button>
					<button onClick={ ()=> this.onRoleChange("DEF") } style={{ background: store.filters.roles["DEF"] ? "rgb(247, 126, 17)" : "gray" }}>DEF</button>
					<button onClick={ ()=> this.onRoleChange("MID") } style={{ background: store.filters.roles["MID"] ? "rgb(44, 160, 44)" : "gray" }}>MID</button>
					<button onClick={ ()=> this.onRoleChange("GK") } style={{ background: store.filters.roles["GK"] ? "rgb(215, 39, 41)" : "gray" }}>GK</button>
				</div>
				<div className="filter">
					<div className="filter_title">Sort by skills:</div>
					<button onClick={ (e)=> this.onSkillChange('stamina') }
							style={{ background: store.filters.skills.stamina === "✘" ? "gray" : "#2876b4"}}>stamina { store.filters.skills.stamina }</button>
					<button onClick={ (e)=> this.onSkillChange('keeper') }
							style={{ background: store.filters.skills.keeper === "✘" ? "gray" : "#2876b4"}}>keeper { store.filters.skills.keeper }</button>
					<button onClick={ (e)=> this.onSkillChange('pace') }
							style={{ background: store.filters.skills.pace === "✘" ? "gray" : "#2876b4"}}>pace { store.filters.skills.pace }</button>
					<button onClick={ (e)=> this.onSkillChange('defender') }
							style={{ background: store.filters.skills.defender === "✘" ? "gray" : "#2876b4"}}>defender { store.filters.skills.defender }</button>
					<button onClick={ (e)=> this.onSkillChange('technique') }
							style={{ background: store.filters.skills.technique === "✘" ? "gray" : "#2876b4"}}>technique { store.filters.skills.technique }</button>
					<button onClick={ (e)=> this.onSkillChange('playmaker')}
							style={{ background: store.filters.skills.playmaker === "✘" ? "gray" : "#2876b4"}}>playmaker { store.filters.skills.playmaker }</button>
					<button onClick={ (e)=> this.onSkillChange('passing') }
							style={{ background: store.filters.skills.passing === "✘" ? "gray" : "#2876b4"}}>passing { store.filters.skills.passing }</button>
					<button onClick={ (e)=> this.onSkillChange('striker') }
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
