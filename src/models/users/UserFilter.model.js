import { runInAction } from "mobx";
import { types } from "mobx-state-tree";


const UserFilterModel = {
	id: types.string,
	name: types.string,
	filter: types.string
};


const actions = (self)=> {
	return {
		update(filter) {
			runInAction(`USER-FILTER-UPDATE-SUCCESS ${filter.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(filter[fieldName] !== undefined) self[fieldName] = filter[fieldName];
				});
			});
		}
	};
};


const views = (self)=> {
	return {
	};
};


export default types.model('UserFilterModel', UserFilterModel).actions(actions).views(views);