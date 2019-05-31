import React, { createRef, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = ({ isAdmin, tabIndex }) => {
  const [activeTab, setActiveTab] = useState(tabIndex);

  const navBar = createRef();

  const onClickTab = index => () => {
    setActiveTab(index);
  };

  useEffect(() => {
    const tab = navBar.current.children[activeTab];
    tab.classList.add('tab-active');
    return () => tab.classList.remove('tab-active');
  }, [activeTab]);

  return (
    <nav ref={navBar}>
      <span onClick={onClickTab(0)} className="tab-selector" tab-id="meets-section" id="tab-selector-meets">
        <img className="icon-img" src="https://res.cloudinary.com/kossy360/image/upload/v1559137008/Questioner%20Assets/meetup.svg" alt="" />
        <span className="tab-selector-text">meets</span>
        <Link className="tab-link" to="/" />
      </span>
      {isAdmin ? (
        <span onClick={onClickTab(1)} className="tab-selector" tab-id="meet-create-section">
          <img className="icon-img" src="https://res.cloudinary.com/kossy360/image/upload/v1559137006/Questioner%20Assets/folder.svg" alt="" />
          <span className="tab-selector-text">organize</span>
          <Link className="tab-link" to="/organize" />
        </span>
      ) : (
        <span onClick={onClickTab(1)} className="tab-selector" tab-id="booked-section" id="tab-selector-booked">
          <img className="icon-img" src="https://res.cloudinary.com/kossy360/image/upload/v1559137003/Questioner%20Assets/booked.svg" alt="" />
          <span className="tab-selector-text">booked</span>
          <Link className="tab-link" to="/booked" />
        </span>
      )}
      <span onClick={onClickTab(2)} className="tab-selector" tab-id="notif-section" id="tab-selector-notif">
        <img className="icon-img" src="https://res.cloudinary.com/kossy360/image/upload/v1559137009/Questioner%20Assets/notifications.svg" alt="" />
        <span className="tab-selector-text">notifications</span>
        <Link className="tab-link" to="/notifications" />
      </span>
      <span onClick={onClickTab(3)} className="tab-selector" tab-id="search-section" id="tab-selector-search">
        <img className="icon-img" src="https://res.cloudinary.com/kossy360/image/upload/v1559137013/Questioner%20Assets/search.svg" alt="" />
        <span className="tab-selector-text">search</span>
        <Link className="tab-link" to="/search" />
      </span>
      <span onClick={onClickTab(4)} className="tab-selector" tab-id="profile-section" id="tab-selector-profile">
        <img className="icon-img profile-icon-img" id="profile-icon" src="https://res.cloudinary.com/kossy360/image/upload/v1559137009/Questioner%20Assets/profile.svg" alt="" />
        <span className="tab-selector-text">profile</span>
        <Link className="tab-link" to="/profile" />
      </span>
    </nav>
  );
};

NavBar.propTypes = {
  isAdmin: propTypes.bool.isRequired,
  tabIndex: propTypes.number.isRequired,
};

export default NavBar;
