import { entries } from "mobx";
// Store
import store from "store";


const filterByName = function(fuse, players = []) {
	if (store.filters.search) {
		return fuse
			.search(store.filters.search)
			.map((result)=> result.item);
	}
	return players;
};


const filterByAge = function(players = []) {
	const ageRange = store.filters.age.get('range');
	return players.filter((player) => player.age * 100 >= ageRange[0]
		&& player.age * 100 <= ageRange[1]);
};


const filterBySkills = function(players) {
	const skills = entries(store.filters.skills)
		.filter((entry) => entry[1].range[0] !== 0 || entry[1].range[1] !== 17)
		.map((entry) => ({ [entry[0]]: entry[1] }));
	if(skills.length) {
		players = players.filter((player) => {
			const validSkills = skills.filter((skill) => {
				const skillName = Object.keys(skill)[0];
				return player[skillName] * 100 >= skill[skillName].range[0]
					&& player[skillName] * 100 <= skill[skillName].range[1];
			});
			return validSkills.length === skills.length;
		});
	}
	return players;
};


const filterByPredictedValues = function(players = []) {
	const attRange = store.filters.att.get('range');
	const midRange = store.filters.mid.get('range');
	const defRange = store.filters.def.get('range');
	const gkRange = store.filters.gk.get('range');

	let result = players = players.filter((player) => player.att * 100 >= attRange[0] && player.att * 100 <= attRange[1]);
	result = result.filter((player) => player.mid * 100 >= midRange[0] && player.mid * 100 <= midRange[1]);
	result = result.filter((player) => player.def * 100 >= defRange[0] && player.def * 100 <= defRange[1]);
	return result.filter((player) => player.gk * 100 >= gkRange[0] && player.gk * 100 <= gkRange[1]);
};


const sortByAge = function(players = []) {
	const ageOrder = store.filters.age.get('order');
	let result = players;
	if(ageOrder !== "✘") {
		result = players.sort((a, b)=> {
			return ageOrder === "▼" ?
				a.age > b.age ? -1 : 1
				:
				a.age > b.age ? 1 : -1;
		});
	}
	return result;
};


const sortBySkill = function(players) {
	const skill = entries(store.filters.skills).find((entry)=> entry[1].order !== "✘");
	let result = players;
	if(skill) {
		result = players.sort((a, b)=> {
			const skillName = skill[0].toLowerCase();
			const x = a[skillName];
			const y = b[skillName];
			if(x === y) return 0;
			return skill[1].order === "▼" ?
				x > y ? -1 : 1
				:
				x > y ? 1 : -1;
		});
	}
	return result;
};


export default {
	filterByName,
	filterByAge,
	filterBySkills,
	filterByPredictedValues,
	sortByAge,
	sortBySkill
};