import { runInAction } from "mobx";
import { types } from "mobx-state-tree";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	name: types.maybe(types.string)
};


const actions = (self)=> {
	return {
		update(user) {
			runInAction(`USER-UPDATE-SUCCESS ${user.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(user[fieldName] !== undefined) self[fieldName] = user[fieldName];
				});
			});
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('UserModel', UserModel).actions(actions).views(views);