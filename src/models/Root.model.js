import { types } from "mobx-state-tree";
// GraphQL
import client from "graphql/client";
import LOG_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";
// Models
import AuthorizedUserModel from "models/AuthorizedUser.model";
import UsersModel from "models/users/Users.model";
import PlayersModel from "models/players/Players.model";
import NetModel from "models/Net.model";


const RootModel = {
	NET: types.optional(types.maybe(NetModel), null),
	nextPathUrl: types.maybe(types.string),

	authorizedUser: types.optional(types.maybe(AuthorizedUserModel), null),
	users: UsersModel,
	players: PlayersModel
};


const actions = (store)=> {
	return {

		setNextPathUrl(url = "") {
			store.nextPathUrl = url;
		},

		logInMutation: ({ email, password })=> {
			return client.mutate({
				variables: { email, password },
				mutation: LOG_IN_USER_MUTATION
			}).catch((e)=> console.log("LOG_IN_USER_MUTATION" + e));
		},


		logIn: (userId)=> { store.authorizedUser = { id: userId } },


		logOut: ()=> {
			sessionStorage.removeItem('token');
			store.authorizedUser = null;
			client.resetStore();
		}
	};
};


export default types.model(RootModel).actions(actions);