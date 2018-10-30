import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import Info from "components/parts/Info.component";


class InfoPage extends React.Component {

	render() {
		return (
			<Info />
		)
	}
}


export default observer(InfoPage);