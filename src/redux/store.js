import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const { NODE_ENV } = process.env;

console.log(NODE_ENV);

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunk),
		NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null
	)
);

export default store;