// MobX
import { values, runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import PlayerModel from "models/players/Player.model";
// GraphQl
import client from "graphql/client";
import CREATE_PLAYER_MUTATION from "graphql/mutations/players/createPlayer.mutation";
import DELETE_PLAYER_MUTATION from "graphql/mutations/players/deletePlayer.mutation";


const Players = {
	all: types.optional(types.map(PlayerModel), {}),
	isHideCharts: types.boolean
};


const actions = (self)=> {
	return {

		async createMutation(newPlayer) {
			self.refreshPlayersCharts(true);
			const duplicatedPlayer = values(self.all).find((player)=> {
				return player.playerId === newPlayer.id;
			});
			if(duplicatedPlayer) return await duplicatedPlayer.updateMutation({ ...newPlayer, id: duplicatedPlayer.id });
			await client.mutate({
				variables: newPlayer,
				mutation: CREATE_PLAYER_MUTATION
			}).catch((e)=> console.log("CREATE_PLAYER_MUTATION 🍪 🍩 ", e));
		},

		async deleteMutation({ id }) {
			self.refreshPlayersCharts(true);
			await client.mutate({
				variables: { id },
				mutation: DELETE_PLAYER_MUTATION
			}).catch((e)=> console.log("DELETE_PLAYER_MUTATION 🍪 + 🍩 ", e));
		},

		create(player = {}) {
			if(self.all.has(player.id)) return self.all.get(player.id).update(player);
			self.all.set(player.id, player);
		},

		delete(id) {
			self.all.delete(id);
		},

		refreshPlayersCharts(isHideCharts) {
			self.isHideCharts = isHideCharts;
		}
	};
};


const views = (self)=> {
	return {};
};

export default types.model('Players', Players).actions(actions).views(views);
