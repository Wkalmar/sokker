import React from 'react';

import { storiesOf } from '@storybook/react';

import { Button, Welcome } from '@storybook/react/demo';
import Router from "components/Router";
import Header from "components/parts/Header.component";

storiesOf('Router', module)
	.addDecorator(story => (
		<Router initialEntries={['/']}>{ story() }</Router>
	))
  	.add('Header', () => <Header />);
