import React from 'react';
// Styles
import "styles/header.css";
// Store
import store from "store";
// MobX
import { observer } from "mobx-react";
// Components
import Link from "components/Link.component";


class Header extends React.Component {

	render() {
		return (
			<div className="header">
				<ul className="header_menu">
					<Link to="/"><img alt="logo" src="https://img00.deviantart.net/44e6/i/2016/256/f/b/brain_a_logo_shopping_logo_by_komikis-dahiij0.png" className="header_logo"/></Link>
					{ !store.authorizedUser && <Link to="/login">Log in</Link> }
					{ store.authorizedUser && <Link to="/transfers">Current transfers</Link> }
					{ store.authorizedUser && <Link to="/user-players">User players</Link> }
					{ store.authorizedUser && <a onClick={ store.logOut }>Log out</a> }
				</ul>
			</div>
		)
	}
}

export default observer(Header)
