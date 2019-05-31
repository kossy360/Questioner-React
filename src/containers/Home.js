import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import NotFound from '../components/NotFound';

const component = () => <div />;

const Home = ({ isAuth, isadmin, match }) => {
  if (!isAuth) {
    return (<Redirect to="/index" />);
  }

  const params = match.params.page || '';

  let Component;
  let tabIndex;

  switch (params) {
    case '':
      Component = component;
      tabIndex = 0;
      break;
    case 'booked':
      Component = component;
      tabIndex = 1;
      break;
    case 'organize':
      Component = component;
      tabIndex = 1;
      break;
    case 'notifications':
      Component = component;
      tabIndex = 2;
      break;
    case 'search':
      Component = component;
      tabIndex = 3;
      break;
    case 'profile':
      Component = component;
      tabIndex = 4;
      break;
    default:
      break;
  }
  return Component ? (
    <div className="content-container">
      <Header />
      <NavBar isAdmin={isadmin} tabIndex={tabIndex} />
      <Component />
      <Footer />
    </div>
  ) : (
    <NotFound />
  );
};

Home.propTypes = {
  isAuth: propTypes.bool.isRequired,
  isadmin: propTypes.bool.isRequired,
  match: propTypes.object.isRequired,
};

const mapStateToProps = ({ auth: { token, user: { isadmin } } }) => ({
  isAuth: !!token,
  isadmin,
});

export default connect(mapStateToProps)(Home);
