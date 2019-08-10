import { combineReducers } from 'redux';
import marvelReducer from './marvelReducer';
import errorReducer from './errorsReducer';



export default combineReducers({
  marvel: marvelReducer,
  errors: errorReducer,
});