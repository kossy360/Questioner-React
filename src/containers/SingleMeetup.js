import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getMeetup } from '../actions/singleMeetupActions';
import Meetups from '../components/Meetup';

const SingleMeetup = ({
  dispatch, token, meetup, isadmin, id
}) => {
  useEffect(() => {
    dispatch(getMeetup(id, token));
  }, []);
  return meetup.id ? (
    <>
      <Helmet>
        <title>{meetup.topic}</title>
      </Helmet>
      <Meetups meetups={[meetup]} isadmin={isadmin} isSingle>
        <div>expanded</div>
      </Meetups>
    </>
  ) : null;
};


SingleMeetup.propTypes = {
  dispatch: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  meetup: propTypes.object.isRequired,
  isadmin: propTypes.bool.isRequired,
  id: propTypes.string.isRequired,
};

const mapStateToProps = ({
  auth: { token, user: { isadmin } },
  meetup: { meetup },
}) => ({
  token, meetup, isadmin
});

export default connect(mapStateToProps)(SingleMeetup);
