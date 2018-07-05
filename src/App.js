import React from 'react';
// MobX
import { Provider, observer } from "mobx-react";
// Styles
import "styles/reset.css";
// Routes
import Router from "components/Router";
// Store
import store from "store";
// Apollo
import { ApolloProvider } from 'react-apollo';
// GraphQL
import client from "graphql/client";
import LOGGED_IN_USER_QUERY from "graphql/queries/loggedInUser.query";
// Components
import AlertContainer from "components/AlertContainer.component";
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


class App extends React.Component {

	render() {
		return (
			<ApolloProvider client={client}>
				<QueryLoader query={ LOGGED_IN_USER_QUERY }
							 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}>
					<Provider store={ store }>
						<div>
							<Router />
							<AlertContainer />
						</div>
					</Provider>
				</QueryLoader>
			</ApolloProvider>
		);
	}
}


export default observer(App);
