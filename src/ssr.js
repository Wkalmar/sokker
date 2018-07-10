import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, generatePath } from "react-router-dom";
import { createLocation } from "history";
import store from "store";
import App from 'App';
// GraphQL
import client from "graphql/client";
import LOGGED_IN_USER_QUERY from "graphql/queries/loggedInUser.query";


export default async function() {

	// TODO: How can I define url for SSR (hardcoded '/user-players') ????
	const queries = JSON.parse(localStorage.getItem("SSR"))['/user-players'];
	await client.query({ query: LOGGED_IN_USER_QUERY });

	for(const queryName in queries) {
		console.log(queries[queryName], "!!");
		await client.query({ query: queries[queryName].query, variables: queries[queryName].variables });
	}

	document.querySelectorAll("#root")[0].innerHTML = ReactDOMServer.renderToString(<App />);

	return ReactDOMServer.renderToString(<App />);
};