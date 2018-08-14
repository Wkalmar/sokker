import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// GraphQL
import USER_PLAYERS_QUERY from "graphql/queries/players/userPlayers.query";
// Components
import Link from "components/Link.component";
import QueryLoader from "components/QueryLoader.component";
import Interface from "components/parts/interface/Interface.component";
import PreLoader from "components/parts/PreLoader.component";


class HomePageContent extends React.Component {

	render() {
		return (
			<div style={{
				display: store.currentPath === "/" ? "block" : "none"
			}}>
				{ !store.authorizedUser && <Link to="/login">Log in</Link> }
				{ !store.authorizedUser && <Link to="/registration">Registration</Link> }

				{ store.authorizedUser &&
					<QueryLoader query={ USER_PLAYERS_QUERY }
								 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
								 variables={{ userId: store.authorizedUser.id }}>
						<Interface />
					</QueryLoader>
				}
			</div>
		)
	}
}


export default observer(HomePageContent);