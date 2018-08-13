import React from 'react';
import { push as Menu } from 'react-burger-menu';
// Styles
import "styles/layout.css";
import "styles/sidebar.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import Header from "components/parts/Header.component";
import Filters from "components/parts/filters/Filters.component";


class Layout extends React.Component {

	menuWidth = observable.box(window.innerWidth / 100 * 95);


	componentDidMount() {
		window.addEventListener('resize', this.onWindowResize);
	}

	componenWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}


	onWindowResize = ()=> {
		this.menuWidth.set(window.innerWidth / 100 * 95);
	};


	onMenuChange = ({ isOpen })=> {
		window.document.getElementsByTagName('body')[0].style.height = isOpen ? window.innerHeight - 100 + 'px' : '100%';
	};


	render() {
		return (
			<div id="outer-container">
				<Header />

				{ store.device === "mobile" ?
					<Menu right push
						  pageWrapId={ "page-wrap" }
						  onStateChange={ this.onMenuChange }
						  outerContainerId={ "outer-container" }
						  width={ this.menuWidth.get() }>
						{ store.authorizedUser && <Filters /> }
					</Menu>
					: null }

				<div id="page-wrap">
					{ store.authorizedUser ?
						this.props.children
						:
						this.props.children
					}
				</div>
			</div>
		)
	}
}

export default observer(Layout)
