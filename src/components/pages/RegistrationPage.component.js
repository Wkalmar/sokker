import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import RegistrationForm from "components/parts/forms/RegistrationForm.component";


class RegistrationPage extends React.Component {

	render() {
		return (
			<RegistrationForm />
		)
	}
}


export default observer(RegistrationPage);