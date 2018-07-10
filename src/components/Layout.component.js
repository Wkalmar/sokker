import React from 'react';
// Styles
import "styles/layout.css";
// MobX
import { observer, inject } from "mobx-react";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Components
import Header from "components/parts/Header.component";
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


class Layout extends React.Component {


	render() {
		return (
			<div className="wrapper">
				<Header />
				{ this.props.store.authorizedUser ?
					this.props.children
					:
					this.props.children
				}
			</div>
		)
	}
}

export default inject("store")(observer(Layout))
