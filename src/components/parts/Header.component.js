import React from 'react';
// PNG
import en from "png/en.png";
import ru from "png/ru.png";
import pl from "png/pl.png";
import ua from "png/ua.png";
// SVG
import LoginSVG from "svg/login.svg";
import LogoutSVG from "svg/logout.svg";
import NeuralSVG from "svg/neural.svg";
import HomeSVG from "svg/home.svg";
import SidebarSVG from "svg/sidebar.svg";
import InfoSVG from "svg/info.svg";
import ChartSVG from "svg/chart.svg";
// Styles
import "styles/header.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Store
import store from "store";
// Components
import Link from "components/Link.component";


const flags = {
	en,
	ru,
	pl,
	ua
};

class Header extends React.Component {

	isOpenDropDown = observable.box(false);

	popoverRef = React.createRef();

	headerLangRef = React.createRef();


	componentDidMount() {
		document.body.addEventListener('click', (e)=> {
			if(!this.isOpenDropDown.get()) return;

			if(!this.popoverRef.current.contains(e.target) && !this.headerLangRef.current.contains(e.target)) {
				this.toggleDropDown();
			}
		});
	}


	get netStatusColor() {
		switch(store.NET.status) {
			case 'error':
				return 'red';
			case 'success':
				return 'green';
			case 'learning':
				return 'yellow';
			default:
				return 'lightgray';
		}
	}


	toggleDropDown = ()=> {
		this.isOpenDropDown.set(!this.isOpenDropDown.get());
	};


	changeLang = (lang)=> {
		this.toggleDropDown();
		store.changeLang(lang)
	};


	render() {
		return (
			<div className="header">
				<ul className="header_menu">
					<Link to="/"><HomeSVG /></Link>
					{ store.authorizedUser && <span className="neural-link-wrapper">
						<Link className="rotating" style={{
							position: 'relative',
							left: '-7px'
						}} to="/neuralnetwork">
							<NeuralSVG />
						</Link>
						<span style={{ background: this.netStatusColor }} />
					</span> }

					{ store.authorizedUser && store.NET.status !== 'disabled' && <Link to="/charts"><ChartSVG /></Link> }
				</ul>

				<ul className="header_menu">
					{ store.device === "mobile" ?
						<a onClick={ store.toggleSideBar }><SidebarSVG /></a>
						: null }

					<div ref={ this.headerLangRef } style={{ cursor: 'pointer', position: "relative" }} onClick={ this.toggleDropDown }>
						<img style={{ width: '20px', height: '20px', marginTop: '2px' }} alt={store.lang} src={ flags[store.lang] } />
					</div>

					<Link to="/info"><InfoSVG /></Link>

					{/*{ store.authorizedUser && <Link to="/profile"><ProfileSVG /></Link> }*/}
					{ !store.authorizedUser && <Link to="/login"><LoginSVG /></Link> }
					{ store.authorizedUser && <a onClick={ store.logOut }><LogoutSVG /></a> }
				</ul>

				<ul ref={ this.popoverRef } className="header_drop_down" style={{
					top: this.isOpenDropDown.get() ? "0" : '-100px'
				}}>
					{ Object.keys(flags).map((lang)=> {
						return (
							<li key={lang} onClick={ ()=> this.changeLang(lang) }>
								<img style={{ width: '20px', height: '20px', marginTop: '2px' }} alt={lang} src={ flags[lang] } />
							</li>
						);
					}) }
				</ul>
			</div>
		)
	}
}

export default observer(Header)
