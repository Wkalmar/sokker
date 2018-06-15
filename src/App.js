import React, {Component} from 'react';


class App extends Component {

	render() {
		return (
			<ApolloProvider client={client}>
				<QueryLoader query={ LOGGED_IN_USER_QUERY }
							 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}>
					<Router />
				</QueryLoader>
			</ApolloProvider>
		);
	}
}


export default App;
