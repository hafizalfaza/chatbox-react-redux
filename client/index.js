import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import App from './components/App';
import rootReducer from './rootReducer';

const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
);


render(<Provider store={store}>
	<Router>
		<div>
			<Route  path='/' component={App} />
		</div>
	</Router>
</Provider>, document.getElementById('app'));