import { types } from "mobx-state-tree";
// Models
import AuthorizedUserModel from "models/AuthorizedUser.model";
import UsersModel from "models/users/Users.model";
import PlayersModel from "models/players/Players.model";


const RootModel = {
	nextPathUrl: types.maybe(types.string),

	authorizedUser: types.optional(types.maybe(AuthorizedUserModel), null),
	users: UsersModel,
	players: PlayersModel
};


const actions = (store)=> {
	return {

		setNextPathUrl(url = "") {
			store.nextPathUrl = url;
		}
	};
};


export default types.model(RootModel).actions(actions);