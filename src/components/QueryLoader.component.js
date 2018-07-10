import React from 'react';
import { Query } from "react-apollo";
// store
import store from "store";
// Components
import PreLoader from "components/parts/PreLoader.component";


class QueryLoader extends React.Component {

	constructor(props) {
		super();
		// console.log("request!", store.currentPath);
		// if(!store.currentPath) return;
		// if(!window.SSR) window.SSR = {};
		// if(!window.SSR[store.currentPath]) window.SSR[store.currentPath] = {};
		// window.SSR[store.currentPath][props.query.definitions[0].name.value] = { query: props.query, variables: props.variables };
		// let SSR = JSON.parse(window.localStorage.getItem("SSR"));
		//
		// if(!SSR) return window.localStorage.setItem("SSR", JSON.stringify(window.SSR));
		// window.localStorage.setItem("SSR", JSON.stringify({ ...SSR, ...window.SSR }));
	}


	render() {
		if(this.props.variables && this.props.variables.id === 'optimisticUpdate') return this.props.children;
		return (
			<Query { ...this.props }>
				{({ loading, error, data })=> {
					if(loading) return this.props.preLoader || <PreLoader />;
					return this.props.children;
				}}
			</Query>
		);
	}
}


export default QueryLoader;
