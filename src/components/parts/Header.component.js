import React from 'react';
// Styles
import "styles/header.css";
// MobX
import { observer } from "mobx-react";


class Header extends React.Component {

	render() {
		return (
			<div className="header">
				<ul className="header_menu">
					<img src="https://img00.deviantart.net/44e6/i/2016/256/f/b/brain_a_logo_shopping_logo_by_komikis-dahiij0.png" className="header_logo"/>
					<p>234</p>
					<p>asd</p>
				</ul>
			</div>
		)
	}
}

export default observer(Header)
