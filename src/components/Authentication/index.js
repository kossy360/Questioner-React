import React, { createRef } from 'react';
import propTypes from 'prop-types';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';

const Authentication = ({
  signup, signin, loading, error
}) => {
  const signinTabBtn = createRef();
  const signupTabBtn = createRef();
  const authContainerRef = createRef();
  const onClickTab = (tabName) => {
    if (loading) { return; }
    signinTabBtn.current.classList[tabName === 'signin' ? 'add' : 'remove']('active');
    signupTabBtn.current.classList[tabName === 'signup' ? 'add' : 'remove']('active');
    authContainerRef.current.classList.replace(tabName === 'signup' ? 'signin' : 'signup', tabName);
  };

  const handleSubmit = (data, { setSubmitting }) => {
    const newData = {};
    Object.keys(data).forEach((key) => {
      if (key === 'Confirm password') { return; }
      newData[key.replace(/ +/g, '').toLowerCase()] = data[key];
    });
    return data.firstname ? signup(newData, setSubmitting) : signin(newData, setSubmitting);
  };

  return (
    <div className="landing-page-container">
      <header className="main header">
        <p>Questioner</p>
      </header>
      <div className="text-container">
        <p>Crowd-source Questions</p>
        <p>Find meetups, ask questions, comment, vote, RSVP</p>
        <p>Ask a question now!</p>
      </div>
      <div className="image container" />
      <div className="main-sign-container">
        <div className="tab-container">
          <div onClick={() => onClickTab('signup')} ref={signupTabBtn} className="tab-signup tab-item active" id="signupTabBtn">
            <p>Sign Up</p>
          </div>
          <div onClick={() => onClickTab('signin')} ref={signinTabBtn} className="tab-signin tab-item" id="signinTabBtn">
            <p>Sign In</p>
          </div>
        </div>
        <div ref={authContainerRef} className="sign-container signup">
          <SignupForm
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <SigninForm
            handleSubmit={handleSubmit}
            isSubmitting={loading}
          />
        </div>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  signup: propTypes.func.isRequired,
  signin: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.bool.isRequired,
};

export default Authentication;
