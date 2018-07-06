import React from 'react';
// Styles
import "styles/boxes/box.css";
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";


class Box extends React.Component {


	static defaultProps = {
		offsetTop: 0
	};


	componentDidMount() {
		window.addEventListener('resize', this.onWindowResize);
	}


	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}


	timeout = null;

	itemHeight = 350;

	itemMinWidth = 500;

	itemBetweenDistance = 20;

	pageScrollBar = 15;

	windowWidth = observable.box(window.innerWidth - this.pageScrollBar);

	get offsetTop() { return this.props.offsetTop; };

	get itemsInRow() { return Math.floor((this.windowWidth.get() - this.itemBetweenDistance*3) / this.itemMinWidth); };

	get itemWidth() { return (this.windowWidth.get() - (this.itemBetweenDistance * (this.itemsInRow + 1))) / this.itemsInRow; };

	currentRow(index) { return (Math.ceil((index+1) / this.itemsInRow)); };

	top(index) { return this.itemHeight * (this.currentRow(index) - 1) + (this.itemBetweenDistance * this.currentRow(index)) + this.offsetTop; };

	left(index) { return (index % this.itemsInRow) * this.itemWidth + ((index % this.itemsInRow + 1) * this.itemBetweenDistance); };


	onWindowResize = ()=> {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(()=> this.windowWidth.set(window.innerWidth - this.pageScrollBar), 100);
	};


	// TODO: RefaQ me plz
	render() {
		return (
			<div className="box">
				{ this.props.children }
			</div>
		)
	}
}

export default observer(Box)
