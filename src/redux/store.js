import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const { NODE_ENV } = process.env;

let $compose = compose(applyMiddleware(thunk));
if(NODE_ENV !== 'production') {
	$compose = compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}

const store = createStore(
	rootReducer,
	initialState,
	$compose
);

export default store;