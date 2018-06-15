import React from 'react';
// MobX
import { observer } from "mobx-react";


class LoginPage extends React.Component {

	static permissions = {
		notForAuth: true,
		redirectPath: "/"
	};


	render() {
		return (
			<div>
				Login page
			</div>
		)
	}
}


export default observer(LoginPage);
