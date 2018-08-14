import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import QueryLoader from "components/QueryLoader.component";
import Interface from "components/parts/interface/Interface.component";
import PreLoader from "components/parts/PreLoader.component";


class TransfersPage extends React.Component {

	render() {
		return (
			<div>
				<QueryLoader query={ USER_PLAYERS_QUERY }
							 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
							 variables={{ userId: store.authorizedUser.id }}>
					<Interface />
				</QueryLoader>
			</div>
		)
	}
}


export default observer(TransfersPage);