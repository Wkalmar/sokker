import { runInAction } from "mobx";
import { types } from "mobx-state-tree";


const Player = {
	user: types.frozen,

	id: types.maybe(types.string),
	name: types.maybe(types.string),

	age: types.maybe(types.number),
	defender: types.maybe(types.number),
	keeper: types.maybe(types.number),
	pace: types.maybe(types.number),
	passing: types.maybe(types.number),
	playmaker: types.maybe(types.number),
	stamina: types.maybe(types.number),
	striker: types.maybe(types.number),
	technique: types.number,

	att: types.number,
	def: types.number,
	mid: types.number,
	gk: types.number
};


const actions = (self)=> {
	return {
	};
};


const views = (self)=> {
	return {
		get userId() { return self.user.id },
	};
};


export default types.model('Player', Player).actions(actions).views(views);