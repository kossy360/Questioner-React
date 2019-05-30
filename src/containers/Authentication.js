import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthComponent from '../components/Authentication';
import { signupStarted, signinStarted } from '../actions/AuthActions';

const Authentication = ({
  startSignup, startSignin, loading, error, isAuth
}) => !isAuth ? (
  <AuthComponent
    signup={startSignup}
    signin={startSignin}
    loading={loading}
    error={error}
  />
) : (
  <Redirect to="/" />
);

Authentication.propTypes = {
  startSignup: propTypes.func.isRequired,
  startSignin: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.bool.isRequired,
  isAuth: propTypes.bool.isRequired,
};

const mapStateToProps = ({ auth: { token, loading, error } }) => ({
  loading, error, isAuth: !!token,
});

const mapDispatchToProps = dispatch => ({
  startSignup: (userData, setSubmitting) => dispatch(signupStarted(userData, setSubmitting)),
  startSignin: (userData, setSubmitting) => dispatch(signinStarted(userData, setSubmitting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
