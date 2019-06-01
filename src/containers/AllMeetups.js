import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMeetups } from '../actions/meetupsActions';
import Meetups from '../components/Meetup';

const AllMeetups = ({
  dispatch, token, fetched, meetups, isadmin
}) => {
  useEffect(() => {
    if (!fetched) { dispatch(getMeetups(token)); }
  });
  return (
    <Meetups meetups={meetups} isadmin={isadmin} />
  );
};

AllMeetups.propTypes = {
  dispatch: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  meetups: propTypes.array.isRequired,
  fetched: propTypes.bool.isRequired,
  isadmin: propTypes.bool.isRequired,
};

const mapStateToProps = ({
  auth: { token, user: { isadmin } },
  meetups: { meetups, fetched },
}) => ({
  token, meetups, fetched, isadmin
});

export default connect(mapStateToProps)(AllMeetups);
