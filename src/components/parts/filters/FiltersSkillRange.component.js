import React from 'react';
import Slider from 'rc-slider';
// Store
import store from "store";
// MobX
import { observer } from "mobx-react";
// Components
import T from "components/parts/T.component";


function getSkill(name) { return store.filters.skills.get(name); }

export default observer(function({ name }) {
	return (
		<div>
			<div className="filter_title"><T>Filter by <span>{ name }</span></T> ({ getSkill(name).range[0]} - { getSkill(name).range[1] })</div>
			<Slider.Range min={0}
						  max={17}
						  pushable
						  trackStyle={{
						  		background: "red"
						  }}
						  onChange={ (range)=> store.filters.change({ skills: { [name]: { range } } }) }
						  defaultValue={ [getSkill(name).range[0], getSkill(name).range[1]] } />
		</div>
	)
});