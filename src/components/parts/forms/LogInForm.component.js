import React from 'react';
// Styles
import "styles/forms/login-form.css";
// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';
import Link from "components/Link.component";
import T from "components/parts/T.component";


class LogInForm extends React.Component {

	isLoading = observable.box(false);

	form = observable({
		email: "",
		password: ""
	});


	logIn = async ()=> {
		this.isLoading.set(true);
		await store.logInMutation(this.form);
		this.isLoading.set(false);
	};

	handleKeyPress = async(e)=> {
		switch (e.key) {
			case 'Enter':
				if (this.isLoginDisabled()) {
					break;
				}
				await this.logIn();
				break;
			default:
				break;
		}
	}

	isLoginDisabled = ()=> {
		return this.isLoading.get() || !this.form.email || !this.form.password;
	}


	render() {
		return (
			<div className="login-form">
				<p>Email:</p>
				<input type="text"
					   className="email"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value }
					   onKeyPress={ this.handleKeyPress }/>

				<p>Password:</p>
				<input type="password"
					   className="password"
					   value={ this.form.password }
					   onChange={ (e)=> this.form.password = e.currentTarget.value }
					   onKeyPress={ this.handleKeyPress }/>

				<button onClick={  this.logIn }
						disabled={ this.isLoginDisabled() }>{
					this.isLoading.get() ?
						<PreLoader/>
						:
						'LogIn'
				}</button>

				<Link to="/registration"><T>Sign up</T></Link>
			</div>
		)
	}
}

export default observer(LogInForm);
