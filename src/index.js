import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import registerServiceWorker from './registerServiceWorker';
import { WebGLRenderer } from 'three';

import ssr from "ssr";
ssr();

const renderer = new WebGLRenderer({ antialias: true });

ReactDOM.render(<div>TEST SSR</div>, document.getElementById('root'));


if(module.hot) {
	module.hot.accept('App', () => {
		const NextApp = require('App').default;
		ReactDOM.render(
			<div>TEST SSR</div>,
			document.getElementById('root')
		)
	})
}

registerServiceWorker();
