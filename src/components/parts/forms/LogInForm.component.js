import React from 'react';
// MobX
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
// Components
import PreLoader from 'components/parts/PreLoader.component';
import Link from "components/Link.component";


class LogInForm extends React.Component {

	isLoading = observable.box(false);

	form = observable({
		email: "",
		password: ""
	});


	logIn = async ()=> {
		this.isLoading.set(true);
		await this.props.store.logInMutation(this.form);
		this.isLoading.set(false);
	};


	render() {
		return (
			<div>
				<input type="text"
					   className="email"
					   value={ this.form.email }
					   onChange={ (e)=> this.form.email = e.currentTarget.value }/>
				<input type="password"
					   className="password"
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

export default inject("store")(observer(LogInForm));
