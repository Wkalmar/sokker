import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import LoginForm from "components/parts/forms/LogInForm.component";


class LoginPage extends React.Component {

	static permissions = {
		notForAuth: true,
		redirectPath: "/"
	};

	render() {
		return (
			<LoginForm />
		)
	}
}


export default observer(LoginPage);