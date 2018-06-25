import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
import brain from "brainjs";

const NET = window.NET = new brain.NeuralNetwork();

const Net = {
	status: types.string,
	errorThresh: types.number,
	maxErrorThresh: types.number
};


const actions = (self)=> {
	return {

		run(player) {
			if(self.status !== "success") return {};
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


		train(data = []) {
			runInAction(`NET-TRAIN-PENDING (players: ${data.length})`, ()=> self.status = "training");
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
					self.status = "error";
				});
			} else {
				runInAction(`NET-TRAIN-SUCCESS (players: ${data.length})`, ()=> {
					self.errorThresh = NET.train(formattedData).error;
					self.status = "success";
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