import React from 'react';
// MobX
import { observer } from "mobx-react";
import { observable } from "mobx";


class Box extends React.Component {

	componentDidMount() {
		window.addEventListener('resize', this.onWindowResize);
	}


	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}


	headerMargin = 200;

	timeout = null;

	itemHeight = 350;

	itemMinWidth = 500;

	itemBetweenDistance = 20;

	pageScrollBar = 15;

	windowWidth = observable.box(window.innerWidth - this.pageScrollBar);

	get itemsInRow() { return Math.floor((this.windowWidth.get() - this.itemBetweenDistance*3) / this.itemMinWidth); };

	get itemWidth() { return (this.windowWidth.get() - (this.itemBetweenDistance * (this.itemsInRow + 1))) / this.itemsInRow; };

	currentRow(index) { return (Math.ceil((index+1) / this.itemsInRow)); };

	top(index) { return this.itemHeight * (this.currentRow(index) - 1) + (this.itemBetweenDistance * this.currentRow(index)) + this.headerMargin; };

	left(index) { return (index % this.itemsInRow) * this.itemWidth + ((index % this.itemsInRow + 1) * this.itemBetweenDistance); };


	onWindowResize = ()=> {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(()=> this.windowWidth.set(window.innerWidth - this.pageScrollBar), 100);
	};


	// TODO: RefaQ me plz
	render() {
		return (
			<div style={{
				width: this.itemWidth,
				height: this.itemHeight,
				top: this.top(this.props.index),
				left: this.left(this.props.index),
				background: 'white',
				position: 'absolute'
			}}>
				{ this.props.children }
			</div>
		)
	}
}

export default observer(Box)
