import { types } from "mobx-state-tree";
import { runInAction } from "mobx";
// GraphQL
import client from "graphql/client";
import UPDATE_PLAYER_MUTATION from "graphql/mutations/players/updatePlayer.mutation";


const Player = {
	user: types.frozen,
	id: types.string,

	details: types.maybe(types.string),
	endOfTrade: types.maybe(types.string),

	playerId: types.string,
	name: types.string,

	age: types.maybe(types.number),
	defender: types.maybe(types.number),
	keeper: types.maybe(types.number),
	pace: types.maybe(types.number),
	passing: types.maybe(types.number),
	playmaker: types.maybe(types.number),
	stamina: types.maybe(types.number),
	striker: types.maybe(types.number),
	technique: types.number,

	att: types.number,
	def: types.number,
	mid: types.number,
	gk: types.number
};


const actions = (self)=> {
	return {

		updateMutation: (player={})=> {
			return client.mutate({
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
	};
};


export default types.model('Player', Player).actions(actions).views(views);