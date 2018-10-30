import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import Info from "components/parts/Info.component";
import QueryLoader from "components/QueryLoader.component";
import Interface from "components/parts/interface/Interface.component";
import PreLoader from "components/parts/PreLoader.component";


class HomePage extends React.Component {

	static permissions = {
	};

	render() {
		return (
			<div style={{
				opacity: store.currentPath === "/" ? "1" : "0",
				height: store.currentPath === "/" ? "auto" : "0",
				overflow: store.currentPath === "/" ? "auto" : "hidden"
			}}>
				{ !store.authorizedUserId && <Info /> }

				{ store.authorizedUserId &&
					<QueryLoader query={ USER_PLAYERS_QUERY }
								 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
								 variables={{ userId: store.authorizedUserId }}>
						<Interface />
					</QueryLoader>
				}
			</div>
		)
	}
}


export default observer(HomePage);