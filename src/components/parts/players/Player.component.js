import React from 'react';
// MobX
import { observer, inject } from "mobx-react";
// GraphQL
import PLAYER_ALL_INFO_QUERY from "graphql/queries/players/playerAllInfo.query";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import QueryLoader from "components/QueryLoader.component";


class Player extends React.Component {


	get player() { return this.props.store.players.all.get(this.props.playerId); };


	render() {
		if(this.player) return this.props.children;

		return (
			<QueryLoader query={ PLAYER_ALL_INFO_QUERY }
						 variables={{ id: this.props.playerId }}>
				{ this.player ?
					this.props.children
					:
					<PreLoader />
				}
			</QueryLoader>
		)
	}
}


export default inject("store")(observer(Player));
