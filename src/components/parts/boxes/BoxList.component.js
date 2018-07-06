import React from 'react';
// Styles
import "styles/boxes/box-list.css";
// MobX
import { observable } from "mobx";
import { observer } from "mobx-react";
// Components
import Box from "components/parts/boxes/Box.component";


class BoxList extends React.Component {

	componentDidMount() {
		this.offsetTop.set(this.refs.boxList.offsetTop)
	}


	offsetTop = observable.box(0);


	render() {
		return (
			<div className="box-list" ref="boxList">
				{ this.props.boxes.map((box, i)=> <Box key={i}
													   index={i}
													   offsetTop={ this.offsetTop.get() }>{ box }</Box>) }
			</div>
		)
	}
}

export default observer(BoxList)
