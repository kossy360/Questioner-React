import * as actions from './actionTypes';

export const getMeetup = (id, token) => ({
  type: actions.GET_SINGLE_MEETUP_STARTED,
  token,
  id,
});

export const getMeetupSuccess = payload => ({
  type: actions.GET_SINGLE_MEETUP_SUCCESSFUL,
  payload,
});

export const getMeetupFailed = () => ({
  type: actions.GET_SINGLE_MEETUP_FAILED,
});
