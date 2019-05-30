import * as actions from './actionTypes';

export const signupStarted = (user, setSubmitting) => ({
  type: actions.SIGNUP_STARTED,
  payload: user,
  setSubmitting
});

export const signinStarted = (user, setSubmitting) => ({
  type: actions.SIGNIN_STARTED,
  payload: user,
  setSubmitting
});

export const authSuccess = user => ({
  type: actions.AUTH_SUCCESS,
  payload: user,
});

export const authLoading = () => ({
  type: actions.AUTH_LOADING
});

export const authFailed = () => ({
  type: actions.AUTH_FAILURE,
});
