import React from 'react';
// MobX
import { observer } from "mobx-react";
// Components
import RegistrationForm from "components/parts/forms/RegistrationForm.component";
import BoxList from "components/parts/boxes/BoxList.component";


class RegistrationPage extends React.Component {

	static permissions = {
		notForAuth: true,
		redirectPath: "/"
	};


	render() {
		return (
			<BoxList boxes={ [
				<RegistrationForm />
			] } />
		)
	}
}


export default observer(RegistrationPage);