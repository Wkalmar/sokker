import { types } from "mobx-state-tree";
import { runInAction } from "mobx";


const Transfers = {
	players: types.frozen
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
				self.players = players;
			});
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Transfers', Transfers).actions(actions).views(views);