import React from 'react';
import propTypes from 'prop-types';

const RsvpUser = ({ rsvp }) => (
  <div className="rsvp-container" id="rsvp-2">
    <span className="rsvp-text">RSVP</span>
    <span className={`rsvp-tag yes ${rsvp === 'yes' && 'active'}`}>yes</span>
    <span className={`rsvp-tag yes ${rsvp === 'maybe' && 'active'}`}>maybe</span>
    <span className={`rsvp-tag yes ${rsvp === 'no' && 'active'}`}>no</span>
  </div>
);

RsvpUser.propTypes = {
  rsvp: propTypes.string,
};

RsvpUser.defaultProps = {
  rsvp: null
};

export default RsvpUser;
