import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import LoginForm from "components/parts/forms/LogInForm.component";


class LoginPage extends React.Component {

	render() {
		return (
			<LoginForm />
		)
	}
}


export default observer(LoginPage);