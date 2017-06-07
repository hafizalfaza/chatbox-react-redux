import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import App from './components/App';
import rootReducer from './rootReducer';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f		
	)
);


render(<Provider store={store}>
	<Router>
		<div>
			<Route  path='/' component={App} />
		</div>
	</Router>
</Provider>, document.getElementById('app'));