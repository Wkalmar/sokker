import React from 'react';
import { push as Menu } from 'react-burger-menu';
// Styles
import "styles/layout.css";
import "styles/sidebar.css";
// MobX
import { observer, inject } from "mobx-react";
// Store
import store from "store";
// Components
import Header from "components/parts/Header.component";


class Layout extends React.Component {


	render() {
		return (
			<div id="outer-container">
				<Header />

				{ store.device === "mobile" ?
					<Menu noOverlay right push pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
					: null }

				<div id="page-wrap">
					{ this.props.store.authorizedUser ?
						this.props.children
						:
						this.props.children
					}
				</div>
			</div>
		)
	}
}

export default inject("store")(observer(Layout))
