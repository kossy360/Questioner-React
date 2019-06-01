import { combineReducers } from 'redux';
import authReducer from './authReducer';
import allMeetupsReducer from './allMeetupsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  meetups: allMeetupsReducer,
});

export default rootReducer;
