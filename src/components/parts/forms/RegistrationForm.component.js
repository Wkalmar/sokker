import React from 'react';
// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// Store
import store from 'store';
// Components
import PreLoader from 'components/parts/PreLoader.component';
import Link from "components/Link.component";


class RegistrationForm extends React.Component {

	isLoading = observable.box(false);

	form = observable({
		email: "",
		password: "",
		name: ""
	});


	register = async ()=> {
		this.isLoading.set(true);

		await store.signUpMutation(this.form);

		this.isLoading.set(false);
	};


	render() {
		return (
			<div>
				<p>Email:</p>
				<input type="text"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value } />

				<p>Password:</p>
				<input type="password"
					   value={ this.form.password }
					   onChange={ (e)=> this.form.password = e.currentTarget.value } />

				<p>Name:</p>
				<input type="text"
					   value={ this.form.name }
					   onChange={ (e)=> this.form.name = e.currentTarget.value } />

				<button onClick={ this.register }
						disabled={ this.isLoading.get() || !this.form.email || !this.form.password }>{
					this.isLoading.get() ?
						<PreLoader />
						:
						'Register'
				}</button>
				<hr/>
				<Link to="/login">Sign in</Link>
			</div>
		)
	}
}

export default observer(RegistrationForm);
