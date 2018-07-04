import React from 'react';

import { storiesOf, action } from '@storybook/react';
import { specs, describe, it } from 'storybook-addon-specifications';

import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

import { expect } from 'chai';
import sinon from 'sinon';

// Store
import store from "store";
// Utils
import history from "utils/history.utils";
// Components
import App from "App";
import Router from "components/Router";
import Header from "components/parts/Header.component";
import LogInForm from "components/parts/forms/LogInForm.component";

storiesOf('Header', module)
	// Test
	.addDecorator(story => (
		<div style={{ border: '1px solid black' }}>
			{ story() }
		</div>
	))
	.add('Header', function () {
		const story = <Router><Header /></Router>;

		specs(()=> describe('Header', function () {
			it('Should have the 404 label', function () {
				let output = enzyme.mount(story);
				expect(output.text()).toContain('404');
			});
		}));

		return story;
	});


storiesOf('LogInForm', module)
// Test
	.addDecorator(story => (
		<div style={{ border: '1px solid black'}}>
			{ story() }
		</div>
	))
	.add('LogInForm', function () {
		const story = <LogInForm />;

		specs(()=> describe('LogInForm', function () {
			it('LogInForm test Sign up text', function () {
				const LogInForm = enzyme.mount(story);
				expect(LogInForm.text()).contain('Sign up');
			});

			it('LogInForm test componentDidMount', function () {
				sinon.spy(LogInForm.prototype, 'componentDidMount');
				expect(LogInForm.prototype.componentDidMount).to.have.property('callCount', 1);
				LogInForm.prototype.componentDidMount.restore();
			});
		}));

		return story;
	});


storiesOf("App", module)
	.add('App', function () {
		const story = <App />;

		specs(()=> describe('App', function () {

			it("store", function() {
				history.push("/registration");
				console.log(store, 42);
			})
		}));

		return story;
	});