import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
// Utils
import formatMoney from "utils/formatMoney.utils";
// Store
import store from "store";
// GraphQL
import client from "graphql/client";
import UPDATE_PLAYER_MUTATION from "graphql/mutations/players/updatePlayer.mutation";
import moment from "moment/moment";


const Player = {
	user: types.frozen,
	id: types.string,

	saleFor: types.maybe(types.string),
	currentBid: types.maybe(types.string),
	endOfTrade: types.maybe(types.string),

	playerId: types.string,
	name: types.string,

	isFavorite: types.maybe(types.boolean),

	age: types.maybe(types.number),
	defender: types.maybe(types.number),
	keeper: types.maybe(types.number),
	pace: types.maybe(types.number),
	passing: types.maybe(types.number),
	playmaker: types.maybe(types.number),
	stamina: types.maybe(types.number),
	striker: types.maybe(types.number),
	technique: types.maybe(types.number),

	att: types.maybe(types.number),
	def: types.maybe(types.number),
	mid: types.maybe(types.number),
	gk: types.maybe(types.number),
};


const actions = (self)=> {
	return {

		async updateMutation(player={}) {
			return await client.mutate({
				variables: player,
				mutation: UPDATE_PLAYER_MUTATION
			}).catch((e)=> console.log("UPDATE_PLAYER_MUTATION", e));
		},


		update(player={}) {
			runInAction(`PLAYER-UPDATE-SUCCESS ${player.id}`, ()=> {
				Object.keys(self).forEach((fieldName)=> {
					if(player[fieldName] !== undefined) self[fieldName] = player[fieldName];
				});
			});
		}
	};
};


const views = (self)=> {
	return {
		get userId() { return self.user.id },
		get endOfTradeFromNow() { return moment(self.endOfTrade).add(1, 'h').fromNow(); },
		get price() {
			let amount = +(self.currentBid || self.saleFor).replace(/\s/g, "");

			// Ukraine = zl 100 -> 160 грн.
			// Romania =  zl 100 -> 100 lei
			// Italia =  zl 100 -> € 100

			switch(store.lang) {
				case 'ua':
					amount = Math.round(amount * 1.6);
					return formatMoney(amount) + ' грн.';
				case "pl":
					return formatMoney(amount) + ' zł';
				default:
					return '€ ' + formatMoney(amount);
			}
			},
		skill(name) { return (+self.toJSON()[name] * 100).toFixed(0); }
	};
};


export default types.model('Player', Player).actions(actions).views(views);