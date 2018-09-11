import { fromEvent } from 'graphcool-lib';
let request = require('request');
request = request.defaults({ jar: true });


async function deleteAllUserPlayers(event) {
	const graphcool = fromEvent(event);
	const api = graphcool.api('simple/v1');

	const { userId } = event.data;

	const query = `query allPlayers($userId: ID!) {
		allPlayers(filter: {
			user: {
				id: $userId
			}
		}){
			id
			user {
				id
			}
	
			playerId
			name
	
			age
			defender
			keeper
			pace
			passing
			playmaker
			stamina
			striker
			technique
	
			att
			def
			gk
			mid
		}
	}`;

	const response = await api.request(query, { userId });

	response.allPlayers.forEach((player)=> {
		const mutation = `mutation deletePlayer(
			$id: ID!
		) {
			deletePlayer(id: $id) { id }
		}`;
		api.request(mutation, { id: player.id });
	});

	return {
		data: {
			response: '[]'
		}
	}
}


export default deleteAllUserPlayers;