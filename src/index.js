import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import registerServiceWorker from './registerServiceWorker';
import { WebGLRenderer } from 'three';


const renderer = new WebGLRenderer({ antialias: true });

ReactDOM.render(<App renderer={ renderer }/>, document.getElementById('root'));


if(module.hot) {
	module.hot.accept('App', () => {
		const NextApp = require('App').default;
		ReactDOM.render(
			<NextApp renderer={ renderer } />,
			document.getElementById('root')
		)
	})
}

registerServiceWorker();
