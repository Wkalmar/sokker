import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
import brain from "brainjs";
import webworkify from 'webworkify-webpack';
// Store
import store from "store";

let NET = new brain.NeuralNetwork();

const Net = {
	status: types.string,
	errorThresh: types.number,
	maxErrorThresh: types.number
};


const worker = webworkify(require.resolve('./NET.model.worker.js'));
worker.addEventListener('message', (event)=> {
	runInAction(`NET-TRAIN-SUCCESS`, ()=> {
		NET = NET.fromJSON(event.data.NET);
		store.NET.setErrorThresh(event.data.error);
		store.NET.setStatus(store.NET.errorThresh < store.NET.maxErrorThresh ? "success" : "error");
		store.transfers.addPredictions();
		store.players.refreshPlayersCharts(false);
	});
});



const actions = (self)=> {
	return {

		toggleNet() {
			self.status = self.status === 'disabled' ? 'enabled' : 'disabled';
			store.transfers.transfersMutation();
			store.interfaceMeasurerCache.clearAll();

			if(self.status === 'enabled') {
				self.train(store.players.userPlayers);
			}
		},


		setStatus(status = "") {
			self.status = status;
		},


		setErrorThresh(errorThresh) {
			self.errorThresh = errorThresh;
		},


		run(player) {
			// if(self.status !== "success") return {};
			try {
				return NET.run({
					age: player.age,
					defender: player.defender,
					keeper: player.keeper,
					pace: player.pace,
					passing: player.passing,
					playmaker: player.playmaker,
					stamina: player.stamina,
					striker: player.striker,
					technique: player.technique,
				});
			}
			catch (err) {
				return {
					att: 0,
					def: 0,
					mid: 0,
					gk: 0
				};
			}
		},


		async train(data = []) {

			store.players.refreshPlayersCharts(true);
			if(self.status === 'disabled') return runInAction(`NET-TRAIN-WARNING (status: ${self.status })`, ()=> store.players.refreshPlayersCharts(false));

			runInAction(`NET-TRAIN-PENDING (players: ${data.length})`, ()=> {
				self.status = "learning";
				self.setErrorThresh(0);
			});

			const formattedData = data.map((player)=> ({
				input: {
					age: player.age,
					defender: player.defender,
					keeper: player.keeper,
					pace: player.pace,
					passing: player.passing,
					playmaker: player.playmaker,
					stamina: player.stamina,
					striker: player.striker,
					technique: player.technique,
				},
				output: {
					att: player.att,
					def: player.def,
					mid: player.mid,
					gk: player.gk
				}
			}));

			if(!formattedData.length) {
				runInAction(`NET-TRAIN-ERROR (players: ${data.length})`, ()=> {
					self.setStatus("error");
					NET = new brain.NeuralNetwork();
					store.transfers.addPredictions();
					store.players.refreshPlayersCharts(false);
				});
			} else {
				worker.postMessage(formattedData);
			}
		},

		// Hooks
		postProcessSnapshot(snapshot) {
			window.localStorage.setItem('NET.status', snapshot.status);
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Net', Net).actions(actions).views(views);