import * as actions from '../actions/actionTypes';

const initialState = {
  meetup: {},
  loading: false,
  error: false,
};

const fetchStarted = state => ({
  ...state,
  loading: true,
});

const fetchSuccess = (state, action) => ({
  ...state,
  meetup: action.payload,
  loading: false,
});

const fetchFailed = state => ({
  ...state,
  loading: false,
  error: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_SINGLE_MEETUP_STARTED: return fetchStarted(state);
    case actions.GET_SINGLE_MEETUP_SUCCESSFUL: return fetchSuccess(state, action);
    case actions.GET_SINGLE_MEETUP_FAILED: return fetchFailed(state);
    default:
      return state;
  }
};

export default reducer;
