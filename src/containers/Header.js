import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/AuthActions';
import { persistor } from '../store';

const Header = ({ signout }) => (
  <>
    <header className="header">
      <p className="logo">Questioner</p>
    </header>
    <button
      onClick={signout}
      type="button"
      className="profile-button"
    />
  </>
);

Header.propTypes = {
  signout: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signout: () => {
    dispatch(signoutUser());
    persistor.flush().then(() => window.location.reload());
  },
});

export default connect(null, mapDispatchToProps)(Header);
