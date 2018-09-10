// MobX
import { values, runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Store
import store from 'store';
// Models
import PlayerModel from "models/players/Player.model";
// GraphQl
import client from "graphql/client";
import CREATE_PLAYER_MUTATION from "graphql/mutations/players/createPlayer.mutation";
import DELETE_PLAYER_MUTATION from "graphql/mutations/players/deletePlayer.mutation";
import DELETE_ALL_USER_PLAYERS_MUTATION from "graphql/mutations/players/deleteAllUserPlayers.mutation";


const Players = {
	all: types.optional(types.map(PlayerModel), {}),
	isHideCharts: types.boolean
};


const actions = (self)=> {
	return {

		async upsertMutation(newPlayer) {
			const duplicatedPlayer = values(self.all).find((player)=> {
				return player.playerId === newPlayer.playerId;
			});
			if(duplicatedPlayer) return await duplicatedPlayer.updateMutation({ ...newPlayer, id: duplicatedPlayer.id });
			await client.mutate({
				variables: newPlayer,
				mutation: CREATE_PLAYER_MUTATION
			}).catch((e)=> console.log("CREATE_PLAYER_MUTATION 🍪 🍩 ", e));
		},

		async deleteMutation({ id }) {
			await client.mutate({
				variables: { id },
				mutation: DELETE_PLAYER_MUTATION
			}).catch((e)=> console.log("DELETE_PLAYER_MUTATION 🍪 + 🍩 ", e));
		},


		async deleteAllUserPlayersMutation({ userId }) {
			await client.mutate({
				variables: { userId },
				mutation: DELETE_ALL_USER_PLAYERS_MUTATION
			}).catch((e)=> console.log("DELETE_ALL_USER_PLAYERS_MUTATION 🍪 + 🍩 ", e));
		},


		async createAll(players) {
			runInAction(`PLAYERS-CREATE-ALL-SUCCESS`, ()=> {
				players.map((player)=> store.players.create(player));
			});
		},

		async create(player = {}) {
			if(self.all.has(player.id)) return self.all.get(player.id).update(player);
			self.all.set(player.id, player);
		},

		delete(id) {
			self.all.delete(id);
		},


		deleteAll() {
			runInAction(`PLAYERS-DELETE-ALL-SUCCESS`, ()=> {
				self.all.clear();
			});
		},

		refreshPlayersCharts(isHideCharts) {
			self.isHideCharts = isHideCharts;
		}
	};
};


const views = (self)=> {
	return {
		get userPlayers() { return values(self.all).filter((player)=> player.userId === store.authorizedUser.id); }
	};
};

export default types.model('Players', Players).actions(actions).views(views);
