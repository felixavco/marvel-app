import { combineReducers } from 'redux';
import marvelReducer from './marvelReducer';
import layoutReducer from './layoutReducer';
import errorReducer from './errorsReducer';



export default combineReducers({
  marvel: marvelReducer,
  layout: layoutReducer,
  errors: errorReducer,
});