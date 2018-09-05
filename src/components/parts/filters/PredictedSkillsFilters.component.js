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


    render() {
        return (
            <div className="filter">
                <div className="filter_title"><T>Sort by role</T></div>
                <FiltersSkillBtn name="ATT" color="#2876b4" />
                <FiltersSkillBtn name="DEF" color="rgb(247, 126, 17)" />
                <FiltersSkillBtn name="MID" color="rgb(44, 160, 44)" />
                <FiltersSkillBtn name="GK" color="rgb(215, 39, 41)" />

                <div className="filter_title"><T>Predicted attacker range</T>:  ({ this.attRange[0]/100 } - { this.attRange[1]/100 })</div>
                <Slider.Range min={0}
                                max={100}
                                pushable
                                onChange={ (range)=> store.filters.change({ att: { range } }) }
                                defaultValue={[this.attRange[0], this.attRange[1]]} />

                <div className="filter_title"><T>Predicted midfelder range</T>:  ({ this.midRange[0]/100 } - { this.midRange[1]/100 })</div>
                <Slider.Range min={0}
                                max={100}
                                pushable
                                onChange={ (range)=> store.filters.change({ mid: { range } }) }
                                defaultValue={[this.midRange[0], this.midRange[1]]} />

                <div className="filter_title"><T>Predicted defender range</T>:  ({ this.defRange[0]/100 } - { this.defRange[1]/100 })</div>
                <Slider.Range min={0}
                                max={100}
                                pushable
                                onChange={ (range)=> store.filters.change({ def: { range } }) }
                                defaultValue={[this.defRange[0], this.defRange[1]]} />

                <div className="filter_title"><T>Predicted goalkeeper range</T>:  ({ this.gkRange[0]/100 } - { this.gkRange[1]/100 })</div>
                <Slider.Range min={0}
                                max={100}
                                pushable
                                onChange={ (range)=> store.filters.change({ gk: { range } }) }
                                defaultValue={[this.gkRange[0], this.gkRange[1]]} />
            </div>

        );
    }
}

export default observer(PredictedSkillsFilters)