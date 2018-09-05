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


	logIn = async (e)=> {
		e.preventDefault();
		this.isLoading.set(true);
		await store.logInMutation(this.form);
		this.isLoading.set(false);
	};


	get isLoginDisabled() {
		return this.isLoading.get() || !this.form.email || !this.form.password;
	}


	render() {
		return (
			<div className="login-form">
				<form onSubmit={ this.logIn }>

					<p><T>Email</T>:</p>
					<input type="text"
						className="email"
						value={ this.form.email }
						onChange={ (e)=> this.form.email = e.currentTarget.value }/>

					<p><T>Password</T>:</p>
					<input type="password"
						className="password"
						value={ this.form.password }
						onChange={ (e)=> this.form.password = e.currentTarget.value }/>

					<button disabled={ this.isLoginDisabled }>
						{ this.isLoading.get() ?
							<PreLoader/>
							:
							<T>LogIn</T> }
					</button>
				</form>
				<Link to="/registration"><T>Sign up</T></Link>
			</div>
		)
	}
}

export default observer(LogInForm);
