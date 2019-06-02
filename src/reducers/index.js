import { combineReducers } from 'redux';
import authReducer from './authReducer';
import allMeetupsReducer from './allMeetupsReducer';
import singleMeetupReducer from './singleMeetupReducer';
import questionsReducer from './quetionsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  meetups: allMeetupsReducer,
  meetup: singleMeetupReducer,
  questions: questionsReducer,
});

export default rootReducer;
