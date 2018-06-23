import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
import brain from "brainjs";

const NET = window.NET = new brain.NeuralNetwork();

const Net = {
	isLearned: types.boolean,
	errorThresh: types.number,
	maxErrorThresh: types.number,
};


const actions = (self)=> {
	return {

		run(player) {
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

			runInAction(`NET-TRAIN-SUCCESS`, ()=> {
				self.errorThresh = !formattedData.length ? -1 : NET.train(formattedData).error;
				self.isLearned = true;
			});
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Net', Net).actions(actions).views(views);