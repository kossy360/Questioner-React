import * as actions from '../actions/actionTypes';

const initialState = {
  meetups: [],
  loading: false,
  error: false,
  fetched: false,
};

const fetchStarted = state => ({
  ...state,
  loading: true,
});

const fetchSuccess = (state, action) => ({
  ...state,
  meetups: action.payload,
  loading: false,
  fetched: true,
});

const fetchFailed = state => ({
  ...state,
  loading: false,
  error: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MEETUPS_STARTED: return fetchStarted(state);
    case actions.FETCH_MEETUPS_SUCCESSFUL: return fetchSuccess(state, action);
    case actions.FETCH_MEETUPS_FAILED: return fetchFailed(state);
    default:
      return state;
  }
};

export default reducer;
