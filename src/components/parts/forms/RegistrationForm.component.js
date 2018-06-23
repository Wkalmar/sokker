import React from 'react';
import { Link } from "react-router-dom";
// MobX
import { observable } from 'mobx';
import { observer } from 'mobx-react';
// Apollo
import { Mutation } from 'react-apollo';
// Mutations
import SIGN_UP_USER_MUTATION from "graphql/mutations/signupUser.mutation";
// Components
import PreLoader from 'components/parts/PreLoader.component';


class RegistrationForm extends React.Component {

	isLoading = observable.box(false);

	form = observable({
		email: "",
		password: "",
		name: ""
	});


	register = async (signUpMutation)=> {
		this.isLoading.set(true);
		await signUpMutation({ variables: {
				email: this.form.email,
				password: this.form.password,
				name: this.form.name
			}});
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

				<Mutation mutation={SIGN_UP_USER_MUTATION}>
					{
						(signUpMutation)=> {
							return (
								<button onClick={ this.register.bind(this, signUpMutation) }
										disabled={ this.isLoading.get() || !this.form.email || !this.form.password }>{
									this.isLoading.get() ?
										<PreLoader />
										:
										'Register'
								}</button>
							)
						}
					}
				</Mutation>
				<hr/>
				<Link to="/login">Sign in</Link>
			</div>
		)
	}
}

export default observer(RegistrationForm);
