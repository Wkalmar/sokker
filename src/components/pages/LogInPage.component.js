import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import LoginForm from "components/parts/forms/LogInForm.component";
import BoxList from "components/parts/boxes/BoxList.component";


class LoginPage extends React.Component {

	render() {
		return (
			<BoxList boxes={ [
				<LoginForm />
			] } />
		)
	}
}


export default observer(LoginPage);