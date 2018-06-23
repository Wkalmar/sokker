import { types } from "mobx-state-tree";
import brain from "brainjs";


const Net = {
	id: types.maybe(types.string)
};


const actions = (self)=> {
	return {

		train(data = []) {

		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('Net', Net).actions(actions).views(views);