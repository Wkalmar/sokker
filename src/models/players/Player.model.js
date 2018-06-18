import { runInAction } from "mobx";
import { types } from "mobx-state-tree";


const Player = {
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
	technique: types.maybe(types.number),
};


const actions = (self)=> {
	return {
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Player', Player).actions(actions).views(views);