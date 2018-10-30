import { runInAction } from "mobx";
import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import CREATE_FILTER_MUTATION from "graphql/mutations/filters/createFilter.mutation";
import UPDATE_FILTER_MUTATION from "graphql/mutations/filters/updateFilter.mutation";
import DELETE_FILTER_MUTATION from "graphql/mutations/filters/deleteFilter.mutation";
// Models
import UserFilterModel from "models/users/UserFilter.model";


const UserModel = {
	id: types.maybe(types.string),
	email: types.maybe(types.string),
	name: types.maybe(types.string),
	filters: types.map(UserFilterModel)
};


const actions = (self)=> {
	return {

		async createFilterMutation({ name="", filter="" }) {
			await client.mutate({
				variables: { userId: self.id, name, filter },
				mutation: CREATE_FILTER_MUTATION
			}).catch((e)=> console.log("CREATE_FILTER_MUTATION 🍪 + 🍩 ", e));
		},


		async updateFilterMutation({ filterId="", name, filter }) {
			await client.mutate({
				variables: { id: filterId, name, filter },
				mutation: UPDATE_FILTER_MUTATION
			}).catch((e)=> console.log("UPDATE_FILTER_MUTATION 🍪 + 🍩 ", e));
		},


		async deleteFilterMutation({ filterId="" }) {
			await client.mutate({
				variables: { id: filterId },
				mutation: DELETE_FILTER_MUTATION
			}).catch((e)=> console.log("DELETE_FILTER_MUTATION 🍪 + 🍩 ", e));
		},


		createFilter(filter) {
			self.filters.set(filter.id, filter);
		},


		deleteFilter(id) {
			self.filters.delete(id);
		},


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