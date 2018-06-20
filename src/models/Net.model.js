import { types } from "mobx-state-tree";


const Net = {
	id: types.maybe(types.string)
};


const actions = (self)=> {
	return {
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Net', Net).actions(actions).views(views);