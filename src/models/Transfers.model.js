// @SOURCE: http://fusejs.io
import Fuse from 'fuse.js';
// Utils
import playersFilters from "utils/playersFilters.utils";
// MobX
import { types } from "mobx-state-tree";
import { runInAction, values } from "mobx";
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

		async transfersMutation() {
			self.delete();
			await client.mutate({
				mutation: TRANSFERS_MUTATION
			}).catch((e)=> console.log("TRANSFERS-MUTATION 🍪 + 🍩 ", e));
		},


		create(players) {
			runInAction(`TRANSFER-PLAYERS-CREATE-SUCCESS`, ()=> {
				players.forEach((player)=> {
					if(store.NET.status === 'disabled') return self.players.set(
						player.id,
						{
							gk: 0,
							def: 0,
							att: 0,
							mid: 0,
							...player,
							playerId: player.id
						});
					self.players.set(player.id, { ...player, ...store.NET.run(player), playerId: player.id });
				});
			});
		},


		delete() {
			runInAction(`TRANSFER-PLAYERS-DELETE-SUCCESS`, ()=> {
				self.players.clear();
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
			players = playersFilters.filterByName(fuse, players);
			players = playersFilters.filterByAge(players);
			players = playersFilters.filterBySkills(players);
			players = playersFilters.filterByPredictedValues(players);
			players = playersFilters.sortByAge(players);
			// TODO: Looks like sortBySkill overrides sortByAge if both are applied
			// I didn't change this for now, just extracted methods
			// But I guess it would be cool to combine orderings smh
			players = playersFilters.sortBySkill(players);
			return players;
		}
	};
};


export default types.model('Transfers', Transfers).actions(actions).views(views);