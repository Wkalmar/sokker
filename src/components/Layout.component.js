import React from 'react';
// Styles
import "styles/layout.css";
// MobX
import { observer } from "mobx-react";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Store
import store from "store";
// Components
import Header from "components/parts/Header.component";
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


class Layout extends React.Component {


	render() {
		return (
			<div className="wrapper">
				<Header />
				{ store.authorizedUser ?
					<QueryLoader query={ GET_USER_INFO_QUERY }
								 fetchPolicy="network-only"
								 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
								 variables={{ id: store.authorizedUser.id }}>
						{ this.props.children }
					</QueryLoader>
					:
					this.props.children
				}
			</div>
		)
	}
}

export default observer(Layout)
