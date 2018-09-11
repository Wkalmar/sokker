import React from 'react';
import { push as Menu } from 'react-burger-menu';
import { withRouter } from "react-router-dom";
// Styles
import "styles/layout.css";
import "styles/sidebar.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// GraphQL
import GET_USER_INFO_QUERY from "graphql/queries/getUserInfo.query";
// Store
import store from "store";
// Components
import Header from "components/parts/Header.component";
import Filters from "components/parts/filters/Filters.component";
import QueryLoader from "components/QueryLoader.component";
import PreLoader from "components/parts/PreLoader.component";


class Layout extends React.Component {

	menuWidth = observable.box(window.innerWidth / 100 * 90);
	menuHeight = observable.box(window.innerHeight - 100);


	componentDidMount() {
		window.addEventListener('resize', this.onWindowResize);
	}


	onWindowResize = ()=> {
		store.interfaceMeasurerCache.clearAll();
		this.menuWidth.set(window.innerWidth / 100 * 90);
		this.menuHeight.set(window.innerHeight - 100);
	};


	onMenuChange = ({ isOpen })=> {
		window.document.getElementsByTagName('body')[0].style.height = isOpen ? window.innerHeight - 100 + 'px' : '100%';
	};


	render() {
		return (
			<div id="outer-container">
				<Header />

				{ store.authorizedUser && store.device === "mobile" ?
					<Menu right
						  push
						  disableOverlayClick
						  isOpen={ store.isOpenSidebar }
						  pageWrapId={ "page-wrap" }
						  onStateChange={ this.onMenuChange }
						  outerContainerId={ "outer-container" }
						  width={ this.menuWidth.get() }>
						{ store.authorizedUser &&
							<div style={{ height: this.menuHeight.get(), overflow: 'scroll' }}>
								<Filters />
							</div>
						}
					</Menu>
					: null }

				<div id="page-wrap">
					{ store.authorizedUser ?
						<QueryLoader query={ GET_USER_INFO_QUERY }
									 preLoader={ <div className="cssload-loader-big"><PreLoader/></div>}
									 variables={{ id: store.authorizedUser.id }}>
							{ this.props.children }
						</QueryLoader>
						:
						this.props.children
					}
				</div>
			</div>
		)
	}
}

export default withRouter(observer(Layout));
