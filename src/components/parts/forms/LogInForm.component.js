import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// Store
import store from "store";
// Components
import PreLoader from 'components/parts/PreLoader.component';


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


	render() {
		return (
			<div>
				<input type="text"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value }/>
				<input type="password"
					   value={ this.form.password }
					   onChange={ (e)=> this.form.password = e.currentTarget.value }/>

				<button onClick={  this.logIn }
						disabled={ this.isLoading.get() || !this.form.email || !this.form.password }>{
					this.isLoading.get() ?
						<PreLoader/>
						:
						'LogIn'
				}</button>

				<p>or</p>
				<Link to="/registration">Sign up</Link>
			</div>
		)
	}
}

export default observer(LogInForm);
