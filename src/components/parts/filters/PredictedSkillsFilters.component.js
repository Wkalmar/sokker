import React from 'react';
import Slider from 'rc-slider';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import FiltersSkillBtn from "components/parts/filters/FiltersSkillBtn.component";
import T from "components/parts/T.component";


class PredictedSkillsFilters extends React.Component {

    get attRange() { return store.filters.att.get('range'); };

	get midRange() { return store.filters.mid.get('range'); };

	get defRange() { return store.filters.def.get('range'); };

	get gkRange() { return store.filters.gk.get('range'); };


	renderSkillRange(type, labels) {
	    if(store.filters.isLoading) return (
			<div className="rc-slider">
				<div className="rc-slider-rail"/>
				<div className="rc-slider-track rc-slider-track-1" style={{ left: 0, width: '100%' }}/>
				<div className="rc-slider-step"/>
				<div tabIndex="0" className="rc-slider-handle rc-slider-handle-1"  style={{ left: '0%' }} />
				<div tabIndex="0"  className="rc-slider-handle rc-slider-handle-2" style={{ left: '100%' }}/>
				<div className="rc-slider-mark"/>
			</div>
        );
	    return (
			<Slider.Range min={0}
						  max={100}
						  pushable
						  onChange={ (range)=> store.filters.change({ [type]: { range } }) }
						  defaultValue={[labels[0], labels[1]]} />
        );
    }


    render() {
        return (
            <div className="filter">
                <div className="filter_title"><T>Sort by role</T></div>
                <FiltersSkillBtn name="ATT" color="#2876b4" />
                <FiltersSkillBtn name="DEF" color="rgb(247, 126, 17)" />
                <FiltersSkillBtn name="MID" color="rgb(44, 160, 44)" />
                <FiltersSkillBtn name="GK" color="rgb(215, 39, 41)" />

                <div className="filter_title"><T>Predicted attacker range</T>:  ({ this.attRange[0] } - { this.attRange[1] })</div>
                { this.renderSkillRange('att', this.attRange) }

                <div className="filter_title"><T>Predicted midfelder range</T>:  ({ this.midRange[0] } - { this.midRange[1] })</div>
                { this.renderSkillRange('mid', this.midRange) }

                <div className="filter_title"><T>Predicted defender range</T>:  ({ this.defRange[0] } - { this.defRange[1] })</div>
                { this.renderSkillRange('def', this.defRange) }

                <div className="filter_title"><T>Predicted goalkeeper range</T>:  ({ this.gkRange[0] } - { this.gkRange[1] })</div>
                { this.renderSkillRange('gk', this.gkRange) }

            </div>

        );
    }
}

export default observer(PredictedSkillsFilters)