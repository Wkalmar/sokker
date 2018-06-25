// MobX
import { values, runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Models
import PlayerModel from "models/players/Player.model";
// GraphQl
import client from "graphql/client";
import CREATE_PLAYER_MUTATION from "graphql/mutations/players/createPlayer.mutation";


const Players = {
	all: types.optional(types.map(PlayerModel), {})
};


// let interval = null;
const actions = (self)=> {
	return {

		createMutation(newPlayer) {
			const duplicatedPlayer = values(self.all).find((player)=> {
				return player.playerId === newPlayer.id;
			});
			if(duplicatedPlayer) return duplicatedPlayer.updateMutation({ ...newPlayer, id: duplicatedPlayer.id });
			client.mutate({
				variables: newPlayer,
				mutation: CREATE_PLAYER_MUTATION
			}).catch((e)=> console.log("CREATE_PLAYER_MUTATION", e));
		},


		create(player = {}) {
			if(self.all.has(player.id)) return self.all.get(player.id).update(player);
			runInAction(`PLAYER-CREATE-SUCCESS ${player.id}`, ()=> {
				self.all.set(player.id, player);
			});
		}
	};
};


const views = (self)=> {
	return {
	};
};

export default types.model('Players', Players).actions(actions).views(views);
