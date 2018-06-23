import React from 'react';
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
			<div ref="boxList">
				{ this.props.boxes.map((box, i)=> <Box key={i}
													   index={i}
													   offsetTop={ this.offsetTop.get() }>{ box }</Box>) }
			</div>
		)
	}
}

export default observer(BoxList)
