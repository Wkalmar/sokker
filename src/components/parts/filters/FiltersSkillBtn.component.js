import React from 'react';
// Store
import store from "store";
// MobX
import { observer } from "mobx-react";


function getSkill(name) { return store.filters.skills.get(name); };

function onSkillChange(name) {
	const skill = store.filters.skills.get(name);
	store.filters.change({
		skills: {
			[name]: skill === "✘" ?
				"▼"
				:
				skill === "▲" ? "✘" : "▲"
		}
	});
}


export default observer(function({ name, color="black" }) {
	return (
		<button onClick={ ()=> onSkillChange(name) } style={{ color: getSkill(name) === "✘" ? "white" : color }}>{ name } { getSkill(name) }</button>
	)
});