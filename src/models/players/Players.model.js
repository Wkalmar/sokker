// MobX
import { runInAction } from "mobx";
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

		createMutation(player) {
			client.mutate({
				variables: player,
				mutation: CREATE_PLAYER_MUTATION
			}).catch((e)=> console.log("CREATE_PLAYER_MUTATION", e));
		},

		fetchPlayers() {
			fetch("https://brainsokker.herokuapp.com/current_transfers", {
			}).then((response)=> response.json()).then((players)=> {
				runInAction(`PLAYERS-SAVE-ALL`, ()=> {
					players.map((player)=> self.create({ ...player, playerId: player.id }));
				});
			});
		},


		create(player = {}) {
			self.all.set(player.name, player);
		}
	};
};


export default types.model('Players', Players).actions(actions);
