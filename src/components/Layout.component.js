import React from 'react';
import { push as Menu } from 'react-burger-menu';
// Styles
import "styles/layout.css";
import "styles/sidebar.css";
// MobX
import { observer, inject } from "mobx-react";
// Components
import Header from "components/parts/Header.component";


class Layout extends React.Component {


	render() {
		return (
			<div id="outer-container">
				<Header />

				<Menu noOverlay right push pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
					<a id="home" className="menu-item" href="/">Home</a>
					<a id="about" className="menu-item" href="/about">About</a>
					<a id="contact" className="menu-item" href="/contact">Contact</a>
					<a className="menu-item--small" href="">Settings</a>
				</Menu>

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
