import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as api from '../src/api';
import { getMeetups, getMeetupsFailed, getMeetupsSuccess } from '../src/actions/meetupsActions';
import { getMeetup, getMeetupFailed, getMeetupSuccess } from '../src/actions/singleMeetupActions';
import meetupSaga from '../src/saga/meetupSaga';
import meetupsSaga from '../src/saga/meetupsSaga';
import allMeetupsReducer from '../src/reducers/allMeetupsReducer';
import singleMeetupReducer from '../src/reducers/singleMeetupReducer';
import MeetupContainer from '../src/components/Meetup';

describe('meetups saga tests', () => {
  const meetupData = {
    data: {
      token: 'token',
      data: [{
        topic: 'topic',
        created: 'sometime',
      }]
    }
  };

  const error = new Error('error');

  it('get meetup successfully', () => expectSaga(meetupSaga)
    .provide([
      [matchers.call.fn(api.getSingleMeetup), meetupData],
    ])
    .dispatch(getMeetup(3, 'token'))
    .put(getMeetupSuccess(meetupData.data.data[0]))
    .run());

  it('get meetups successfully', () => expectSaga(meetupsSaga)
    .provide([
      [matchers.call.fn(api.getAllMeetups), meetupData],
    ])
    .dispatch(getMeetups('token'))
    .put(getMeetupsSuccess(meetupData.data.data))
    .run());

  it('errors on fetch meetup failure', () => expectSaga(meetupSaga)
    .provide([
      [matchers.call.fn(api.getSingleMeetup), throwError(error)],
    ])
    .dispatch(getMeetup(3, 'token'))
    .put(getMeetupFailed())
    .run());

  it('errors on fetch meetups failure', () => expectSaga(meetupsSaga)
    .provide([
      [matchers.call.fn(api.getAllMeetups), throwError(error)],
    ])
    .dispatch(getMeetups('token'))
    .put(getMeetupsFailed())
    .run());
});

describe('Single meetup reducer', () => {
  const initialState = {
    meetup: {},
    loading: false,
    error: false,
  };

  const meetup = {
    topic: 'testing is hard',
  };

  it('fetch meetup started', () => {
    expect(singleMeetupReducer(initialState, getMeetup(1, 'token')))
      .toEqual({
        ...initialState,
        loading: true,
      });
  });

  it('fetch meetup success', () => {
    expect(singleMeetupReducer(initialState, getMeetupSuccess(meetup)))
      .toEqual({
        ...initialState,
        meetup: { ...meetup }
      });
  });

  it('fetch meetup failed', () => {
    expect(singleMeetupReducer(initialState, getMeetupFailed(meetup)))
      .toEqual({
        ...initialState,
        error: true,
      });
  });

  it('does nothing', () => {
    expect(singleMeetupReducer(initialState, { type: 'NOT_MY_BUSINESS' }))
      .toEqual({
        ...initialState,
      });
  });
});

describe('all meetups reducer', () => {
  const initialState = {
    meetup: [],
    loading: false,
    error: false,
    fetched: false,
  };

  const meetups = [{
    topic: 'testing is hard',
  }];

  it('fetch meetups started', () => {
    expect(allMeetupsReducer(initialState, getMeetups('token')))
      .toEqual({
        ...initialState,
        loading: true,
      });
  });

  it('fetch meetups success', () => {
    expect(allMeetupsReducer(initialState, getMeetupsSuccess(meetups)))
      .toEqual({
        ...initialState,
        meetups,
        fetched: true,
      });
  });

  it('fetch meetups failed', () => {
    expect(allMeetupsReducer(initialState, getMeetupsFailed()))
      .toEqual({
        ...initialState,
        error: true,
      });
  });

  it('does nothing', () => {
    expect(allMeetupsReducer(initialState, { type: 'NOT_MY_BUSINESS' }))
      .toEqual({
        ...initialState,
      });
  });
});

describe('Authentication components', () => {
  const meeting = [
    {
      id: 1,
      happening: '2019-03-07T11:00:00.000Z',
      topic: 'new meetup',
      location: 'Lagos',
      tags: [
        'new',
        'test'
      ],
      images: [],
      rsvp: null,
      questions: '15',
      notification: false
    },
    {
      id: 2,
      happening: '2019-06-01T17:54:24.000Z',
      topic: 'another meetup',
      location: 'Abuja',
      tags: [
        'test'
      ],
      images: [],
      rsvp: 'yes',
      questions: '1',
      notification: false
    }
  ];

  const adminMeeting = [
    {
      id: 1,
      happening: '2019-03-07T11:00:00.000Z',
      topic: 'new meetup',
      location: 'Lagos',
      tags: [
        'new',
        'test'
      ],
      images: [],
      rsvp: {
        yes: 2,
        no: 1,
        maybe: 4,
      },
      questions: '15',
      notification: false
    },
    {
      id: 2,
      happening: '2019-06-01T17:54:24.000Z',
      topic: 'another meetup',
      location: 'Abuja',
      tags: [
        'test'
      ],
      images: [],
      rsvp: {
        yes: 2,
        no: 1,
        maybe: 4,
      },
      questions: '1',
      notification: false
    }
  ];
  window.location = jest.fn(() => ({ location: [] }));
  it('renders <AuthComponent /> for user', () => {
    const Test = () => (
      <>
        <Router>
          <Route>
            <MeetupContainer
              meetups={meeting}
              isadmin={false}
              isSingle
            />
          </Route>
        </Router>
      </>
    );
    const wrapper = mount(<Test />);
    expect(wrapper.find(MeetupContainer).length).toEqual(1);
    wrapper.unmount();
  });

  it('renders <AuthComponent /> for admin', () => {
    const Test = () => (
      <>
        <Router>
          <Route>
            <MeetupContainer
              meetups={adminMeeting}
              isadmin
              isSingle
            />
          </Route>
        </Router>
      </>
    );
    const wrapper = mount(<Test />);
    expect(wrapper.find(MeetupContainer).length).toEqual(1);
    wrapper.unmount();
  });
});
