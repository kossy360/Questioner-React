import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuth }) => {
  if (!isAuth) {
    return (<Redirect to="/index" />);
  }
  return (
    <div>
      <h3>Authentications successful</h3>
    </div>
  );
};

Home.propTypes = {
  isAuth: propTypes.bool.isRequired
};

const mapStateToProps = ({ auth: { token } }) => ({
  isAuth: !!token,
});

export default connect(mapStateToProps)(Home);
