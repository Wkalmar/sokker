// @SOURCE: http://fusejs.io
import Fuse from 'fuse.js';
// MobX
import { types } from "mobx-state-tree";
import { runInAction, values, entries } from "mobx";
// Store
import store from "store";
// GraphQL
import client from "graphql/client";
import TRANSFERS_MUTATION from "graphql/mutations/transfers.mutation";
// Models
import PlayerModel from "models/players/Player.model";


let fuse = null;
const fuseOptions = {
	shouldSort: true,
	includeScore: true,
	threshold: 0.3,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 2,
	keys: [
		"name"
	]
};


const Transfers = {
	players: types.optional(types.map(PlayerModel), {})
};

const actions = (self)=> {
	return {

		async createMutation() {
			await client.mutate({
				mutation: TRANSFERS_MUTATION
			}).catch((e)=> console.log("TRANSFERS_MUTATION 🍪 + 🍩 ", e));
		},


		create(players) {
			runInAction(`TRANSFER-PLAYERS-CREATE-SUCCESS`, ()=> {
				players.forEach((player)=> {
					self.players.set(player.id, { ...player, ...store.NET.run(player), playerId: player.id });
				});
			});
		},


		addPredictions() {
			values(self.players).forEach((player)=> {
				self.players.set(player.id, { ...player, ...store.NET.run(player) });
			});
		},


		// Hooks
		postProcessSnapshot(snapshot) {
			fuse = new Fuse(values(self.players), fuseOptions); // "list" is the item array
		}
	};
};

const filterByName = (players) => {
	if (store.filters.search) {
		return fuse
			.search(store.filters.search)
			.map((result)=> result.item);
	}
	return players;
}

const filterByAge = (players) => {
	const ageRange = store.filters.age.get('range');
	return players.filter((player) => player.age * 100 >= ageRange[0]
		&& player.age * 100 <= ageRange[1]);
}

const filterBySkills = (players) => {
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
}

const filterByPredictedValues = (players) => {
	const attRange = store.filters.att.get('range');
	const midRange = store.filters.mid.get('range');
	const defRange = store.filters.def.get('range');
	const gkRange = store.filters.gk.get('range');

	let result = players = players.filter((player) => player.att * 100 >= attRange[0] && player.att * 100 <= attRange[1]);
	result = result.filter((player) => player.mid * 100 >= midRange[0] && player.mid * 100 <= midRange[1]);
	result = result.filter((player) => player.def * 100 >= defRange[0] && player.def * 100 <= defRange[1]);
	return result.filter((player) => player.gk * 100 >= gkRange[0] && player.gk * 100 <= gkRange[1]);
}

const sortByAge = (players) => {
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
}

const sortBySkill = (players) => {
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
}

const views = (self)=> {
	return {
		// TODO: memoize
		get filtered() {
			let players = values(self.players);
			players = filterByName(players);
			players = filterByAge(players);
			players = filterBySkills(players);
			players = filterByPredictedValues(players);
			players = sortByAge(players);
		// TODO: Looks like sortBySkill overrides sortByAge if both are applied
		// I didn't change this for now, just extracted methods
		// But I guess it would be cool to combine orderings smh
			players = sortBySkill(players);
			return players;
		}
	};
};


export default types.model('Transfers', Transfers).actions(actions).views(views);