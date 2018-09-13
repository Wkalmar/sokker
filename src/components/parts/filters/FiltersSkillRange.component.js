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
			{ store.filters.isLoading ?
				<div className="rc-slider">
					<div className="rc-slider-rail"/>
					<div className="rc-slider-track rc-slider-track-1" style={{ left: 0, width: '100%' }}/>
					<div className="rc-slider-step"/>
					<div tabIndex="0" className="rc-slider-handle rc-slider-handle-1"  style={{ left: '0%' }} />
					<div tabIndex="0" className="rc-slider-handle rc-slider-handle-2" style={{ left: '100%' }}/>
					<div className="rc-slider-mark"/>
				</div>
				:
				<Slider.Range min={0}
							  max={17}
							  pushable
							  trackStyle={{
									background: "red"
							  }}
							  onChange={ (range)=> store.filters.change({ skills: { [name]: { range } } }) }
							  defaultValue={ [getSkill(name).range[0], getSkill(name).range[1]] } />
			}
		</div>
	)
});