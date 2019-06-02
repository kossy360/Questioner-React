import { combineReducers } from 'redux';
import authReducer from './authReducer';
import allMeetupsReducer from './allMeetupsReducer';
import singleMeetupReducer from './singleMeetupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  meetups: allMeetupsReducer,
  meetup: singleMeetupReducer,
});

export default rootReducer;
