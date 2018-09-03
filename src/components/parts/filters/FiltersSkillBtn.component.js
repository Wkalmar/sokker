import React from 'react';
// Store
import store from "store";
// MobX
import { observer } from "mobx-react";
// Components
import T from "components/parts/T.component";


function getSkill(name) { return store.filters.skills.get(name); }

function onSkillChange(name) {
	const skill = store.filters.skills.get(name);
	store.filters.change({
		skills: {
			[name]: {
				order: skill.order === "✘" ?
					"▼"
					:
					skill.order === "▲" ? "✘" : "▲"
			}
		}
	});
}


export default observer(function({ name, color="black" }) {
	return (
		<button onClick={ ()=> onSkillChange(name) }
				style={{ background: getSkill(name).order === "✘" ? "#d67800" : color }}>
			<T>{ name }</T> { getSkill(name).order }
		</button>
	)
});