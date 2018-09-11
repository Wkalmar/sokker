// Apollo
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';
// GraphQL
import responseResolver from "graphql/responseResolver";


const cache = new InMemoryCache();
const responseResolverLink = new ApolloLink((operation, forward)=> {
	return forward(operation).map((data)=> {
		responseResolver(data.data, data.errors, cache);
		return data;
	})
});


const httpLink = new BatchHttpLink({
	uri: 'https://api.graph.cool/simple/v1/cjifv0wao4jus0111cytzymtk',
	batchInterval: 200,
	batchMax: 50,
	batchKey: str => str.operationName
});


const authLink = setContext((_, { headers }) => {
    const token = window.sessionStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});


const link = ApolloLink.from([
	responseResolverLink,
    authLink.concat(httpLink)
]);


const client = new ApolloClient({
	link: link,
	cache: cache
});

export default client;