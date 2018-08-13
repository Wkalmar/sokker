// @SOURCE: http://fusejs.io
import Fuse from 'fuse.js';
// MobX
import { types } from "mobx-state-tree";
import { runInAction, values, entries } from "mobx";
// Store
import store from "store";
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
		"id",
		"name"
	]
};


const Transfers = {
	players: types.optional(types.map(PlayerModel), {})
};

const actions = (self)=> {
	return {

		fetchTransferPlayers() {
			fetch("https://brainsokker.herokuapp.com/current_transfers", {
			}).then((response)=> response.json()).then((players)=> {
				// players.length = 10;
				self.create(players);
			});
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


const views = (self)=> {
	return {
		// TODO: memoize
		get filtered() {
			let players = values(self.players);
			const ageRange = store.filters.age.get('range');
			const ageOrder = store.filters.age.get('order');
			const skill = entries(store.filters.skills).find((entry)=> entry[1].order !== "✘");
			const skills = entries(store.filters.skills).filter((entry)=> entry[1].range[0] !== 0 || entry[1].range[1] !== 17).map((entry)=> ({ [entry[0]]: entry[1] }));

			// Filter by name
			if(store.filters.search) players = fuse.search(store.filters.search).map((result)=> result.item);

			// Filter by age
			players = players.filter((player)=> player.age * 100 >= ageRange[0] && player.age * 100 <= ageRange[1]);

			// Filter by skills
			if(skills.length) players = players.filter((player)=> {
				const validSkills = skills.filter((skill)=> {
					const skillName = Object.keys(skill)[0];
					return player[skillName] * 100 >= skill[skillName].range[0] && player[skillName] * 100 <= skill[skillName].range[1];
				});
				return validSkills.length === skills.length;
			});

			// Sort by age order
			if(ageOrder !== "✘") players = players.sort((a, b)=> {
				return ageOrder === "▼" ?
					a.age > b.age ? -1 : 1
					:
					a.age > b.age ? 1 : -1;
			});

			// Sort by skill
			if(skill) players = players.sort((a, b)=> {
				const skillName = skill[0].toLowerCase();
				const x = a[skillName];
				const y = b[skillName];
				if(x === y) return 0;
				return skill[1].order === "▼" ?
					x > y ? -1 : 1
					:
					x > y ? 1 : -1;
			});
			return players;
		}
	};
};


export default types.model('Transfers', Transfers).actions(actions).views(views);