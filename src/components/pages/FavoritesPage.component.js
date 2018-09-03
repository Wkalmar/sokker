import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


class FavoritesPage extends React.Component {

	get favorites() { return store.players.favoritesPlayers; };

	render() {
		console.log(this.favorites, store.players.userPlayers, "??favorites");
		return (
			<QueryLoader query={ USER_PLAYERS_QUERY }
						 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
						 variables={{ userId: store.authorizedUser.id }}>
				<div>Favo  ri te s!</div>
			</QueryLoader>
		)
	}
}


export default observer(FavoritesPage);