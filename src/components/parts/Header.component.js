import React from 'react';
// SVG
import LoginSVG from "svg/login.svg";
import LogoutSVG from "svg/logout.svg";
import NeuralSVG from "svg/neural.svg";
import HomeSVG from "svg/home.svg";
import LanguageSVG from "svg/language.svg";
import ProfileSVG from "svg/profile.svg";
import HelpSVG from "svg/help.svg";
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
				<ul className="header_menu" style={{ width: '100%' }}>
					<Link to="/"><HomeSVG /></Link>
					{ store.authorizedUser && <Link to="/network"><NeuralSVG /></Link> }
				</ul>
				<ul className="header_menu">
					<p><LanguageSVG /></p>
					<Link to="/help"><HelpSVG /></Link>
					{ store.authorizedUser && <Link to="/profile"><ProfileSVG /></Link> }
					{ !store.authorizedUser && <Link to="/login"><LoginSVG /></Link> }
					{ store.authorizedUser && <a onClick={ store.logOut }><LogoutSVG /></a> }
				</ul>
			</div>
		)
	}
}

export default observer(Header)
