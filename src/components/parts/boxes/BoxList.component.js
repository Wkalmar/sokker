import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import Box from "components/parts/boxes/Box.component";


class BoxList extends React.Component {

	render() {
		return (
			<div>
				{ this.props.boxes.map((box, i)=> <Box key={i} index={i}>{ box }</Box>) }
			</div>
		)
	}
}

export default observer(BoxList)
