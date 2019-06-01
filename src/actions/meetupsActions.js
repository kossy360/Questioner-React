import * as actions from './actionTypes';

export const getMeetups = token => ({
  type: actions.FETCH_MEETUPS_STARTED,
  token,
});

export const getMeetupsSuccess = payload => ({
  type: actions.FETCH_MEETUPS_SUCCESSFUL,
  payload,
});

export const getMeetupsFailed = () => ({
  type: actions.FETCH_MEETUPS_FAILED,
});
