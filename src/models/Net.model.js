import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
import brain from "brainjs";
// Store
import store from "store";

const NET = window.NET = new brain.NeuralNetwork();

const Net = {
	isEnabled: true,
	isLoading: types.boolean,
	status: types.string,
	errorThresh: types.number,
	maxErrorThresh: types.number
};


const actions = (self)=> {
	return {

		toggleNet() {
			self.isEnabled = !self.isEnabled;
			store.transfers.transfersMutation();
			console.log(store.interfaceMeasurerCache, 42);
			store.interfaceMeasurerCache.clearAll();

			if(self.isEnabled === true) {
				self.train(store.players.userPlayers);
			}
		},

		setLoading(isLoading = false) {
			self.isLoading = isLoading;
		},


		setStatus(status = "") {
			self.status = status;
		},


		setErrorThresh(errorThresh) {
			self.errorThresh = errorThresh;
		},


		run(player) {
			// if(self.status !== "success") return {};
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
		},


		async train(data = []) {
			runInAction(`NET-TRAIN-PENDING (players: ${data.length})`, ()=> {
				self.status = "training";
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
				});
			} else {
				runInAction(`NET-TRAIN-SUCCESS (players: ${data.length})`, ()=> {
					setTimeout(()=> {
						// self.setErrorThresh(NET.train(formattedData).error);
						//self.errorThresh = NET.train(formattedData).error;
						self.setErrorThresh(NET.train(formattedData).error);
						self.setStatus(self.errorThresh < self.maxErrorThresh ? "success" : "error");
					}, 0);
				});
			}
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Net', Net).actions(actions).views(views);