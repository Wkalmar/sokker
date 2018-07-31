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
					self.players.set(player.id, { ...player, att: 0, def: 0, mid: 0, gk: 0, playerId: player.id });
				});
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
			const skill = entries(store.filters.skills).find((entry)=> entry[1] !== "✘");
			// Filter by name
			if(store.filters.search) players = fuse.search(store.filters.search).map((result)=> result.item);
			// Filter by age
			players = players.filter((player)=> player.age * 100 >= ageRange[0] && player.age * 100 <= ageRange[1]);
			// Sort by skill
			if(skill) players = players.sort((a, b)=> {
				const skillName = skill[0].toLowerCase();
				const x = a[skillName];
				const y = b[skillName];
				return skill[1] === "▼" ?
					x > y ? -1 : 1
					:
					x > y ? 1 : -1;
			});

			return players;
		}
	};
};


export default types.model('Transfers', Transfers).actions(actions).views(views);