import React from 'react';
// MobX
import { values } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import InterfacePlayer from "components/parts/interface/InterfacePlayer.component";
import BoxList from "components/parts/boxes/BoxList.component";
import Player from "components/parts/players/Player.component";


class UserPlayers extends React.Component {

	get userPlayers() { return values(store.players.all).filter((player)=> player.userId === this.props.userId); };


	renderPlayersList() {
		return (
			<BoxList boxes={ this.userPlayers.map((player, i)=> {
				return (
					<Player playerId={ player.id }>
						<InterfacePlayer player={ player } key={player.name} index={i} />
					</Player>
				);
			}) } />
		);
	}


	render() {
		return (
			<div>
				<QueryLoader query={ USER_PLAYERS_QUERY }
							 variables={{ userId: this.props.userId }}>
					{ this.userPlayers.length ? this.renderPlayersList() : null }
				</QueryLoader>
			</div>
		)
	}
}


export default observer(UserPlayers);
