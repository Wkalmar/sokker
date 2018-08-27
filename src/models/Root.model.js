import i18n from 'i18next';
import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
// Utils
import history from "utils/history.utils";
// GraphQL
import client from "graphql/client";
import LOG_IN_USER_MUTATION from "graphql/mutations/authenticateUser.mutation";
import SIGN_UP_USER_MUTATION from "graphql/mutations/signupUser.mutation";
// Models
import AuthorizedUserModel from "models/AuthorizedUser.model";
import UsersModel from "models/users/Users.model";
import FiltersModel from "models/Filters.model";
import PlayersModel from "models/players/Players.model";
import TransfersModel from "models/Transfers.model";
import NetModel from "models/Net.model";


const RootModel = {
	isRenderedInterface: types.boolean,
	lang: types.string,
	isOpenSidebar: types.boolean,

	NET: types.optional(types.maybe(NetModel), null),

	device: types.string,
	nextPathUrl: types.maybe(types.string),
	currentPath: types.maybe(types.string),

	authorizedUser: types.optional(types.maybe(AuthorizedUserModel), null),
	users: UsersModel,
	players: PlayersModel,
	transfers: TransfersModel,
	filters: FiltersModel
};


const actions = (store)=> {
	return {

		setRenderedInterface() {
			store.isRenderedInterface = true;
		},

		t(translate="", params={}) {
			return i18n.t(translate, params, store.lang);
		},

		toggleSideBar() {
			store.isOpenSidebar = !store.isOpenSidebar;
		},

		changeLang(lang) {
			i18n.changeLanguage(lang);
			store.lang = lang;
		},

		setDevice() {
			store.device = window.innerWidth > 800 ? "desktop" : "mobile";
		},

		setCurrentPath(url = "") {
			if(url === '/') store.setRenderedInterface();
			store.currentPath = url;
		},

		setNextPathUrl(url = "") {
			store.nextPathUrl = url;
		},


		signUpMutation: ({ email, password, name })=> {
			return client.mutate({
				variables: { email, password, name },
				mutation: SIGN_UP_USER_MUTATION
			}).catch((e)=> console.log("SIGN_UP_USER_MUTATION" + e));
		},


		logInMutation: ({ email, password })=> {
			return client.mutate({
				variables: { email, password },
				mutation: LOG_IN_USER_MUTATION
			}).catch((e)=> console.log("LOG_IN_USER_MUTATION" + e));
		},


		logIn: (userId)=> { store.authorizedUser = { id: userId } },


		logOut: (e)=> {
			e.preventDefault();
			history.push("/");
			runInAction(`USER-LOGOUT-SUCCESS`, ()=> {
				sessionStorage.removeItem('token');
				store.authorizedUser = null;
				client.resetStore();
			});
		},


		// Hooks
		afterCreate() {
			store.setDevice();
			window.addEventListener('resize', store.setDevice);
		},
		beforeDestroy() {
			window.removeEventListener('resize', store.setDevice);
		}
	};
};


export default types.model("RootModel", RootModel).actions(actions);