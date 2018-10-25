// MobX
import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Store
import store from "store";
// Models
import UserModel from "models/users/User.model";


const Users = {
	all: types.optional(types.map(UserModel), {})
};


const actions = (self)=> {
	return {

		create(user = {}) {
			if(self.all.has(user.id)) return self.all.get(user.id).update(user);
			runInAction(`USER-CREATE-SUCCESS`, ()=> {
				self.all.set(user.id, { ...user, filters: {}, __type: "User" } );
				// Set all custom user [filters] to the filters [Map]. Format: [ [id: data], [id: data] ]
				self.all.get(user.id).filters.merge(user.filters.reduce((res, filter)=> [ ...res, [filter.id, filter]], []));
			});
		}
	};
};

const views = (self)=> {
	return {
		get authorizedUser() { return self.all.get(store.authorizedUserId); }
	};
};



export default types.model(Users).actions(actions).views(views);
