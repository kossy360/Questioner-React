import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import NotFound from '../components/NotFound';
import AllMeetups from './AllMeetups';
import SingleMeetup from './SingleMeetup';

const component = () => <div />;

const Home = ({ isAuth, isadmin, match }) => {
  if (!isAuth) {
    return (<Redirect to="/index" />);
  }

  let Component;
  let tabIndex;

  if (match.params.meetupId) {
    Component = () => <SingleMeetup id={match.params.meetupId} />;
    tabIndex = 0;
  } else if (match.params.page) {
    switch (match.params.page || '') {
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
  } else {
    Component = AllMeetups;
    tabIndex = 0;
  }

  return Component ? (
    <>
      <Helmet>
        <title>Questioner</title>
      </Helmet>
      <div className="content-container">
        <Header />
        <NavBar isAdmin={isadmin} tabIndex={tabIndex} />
        <Component />
        <Footer />
      </div>
    </>
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
