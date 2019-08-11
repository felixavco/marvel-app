import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [ thunk ];
const { NODE_ENV } = process.env;

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware)
        //! CAMBIAR LATER
		// NODE_ENV === 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null
	)
);

export default store;