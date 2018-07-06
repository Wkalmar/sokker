import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
// Store
import store from "store";
// Models
import PlayerModel from "models/players/Player.model";


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
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Transfers', Transfers).actions(actions).views(views);