import React from 'react';
import Slider from 'rc-slider';
// Store
import store from "store";
// MobX
import { observer } from "mobx-react";


function getSkill(name) { return store.filters.skills.get(name); }

export default observer(function({ name }) {
	return (
		<div>
			<div className="filter_title">Filter by { name } ({ getSkill(name).range[0]} - { getSkill(name).range[1] })</div>
			<Slider.Range min={0}
						  max={17}
						  dots
						  pushable
						  onChange={ (range)=> store.filters.change({ skills: { [name]: { range } } }) }
						  defaultValue={[0, 17]} />
		</div>
	)
});