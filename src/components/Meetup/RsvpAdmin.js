import React from 'react';
import propTypes from 'prop-types';

const RsvpAdmin = ({ rsvp }) => (
  <div className="rsvp-container">
    <span className="rsvp-text">RSVPs:</span>
    <span
      className="rsvp-tag yes active admin"
    >
      yes
    </span>
    <span className="rsvp-tag-count yes">{rsvp.yes}</span>
    <span
      className="rsvp-tag maybe active admin"
    >
      maybe
    </span>
    <span className="rsvp-tag-count maybe">{rsvp.maybe}</span>
    <span
      className="rsvp-tag no active admin"
    >
      no
    </span>
    <span className="rsvp-tag-count no">{rsvp.no}</span>
  </div>
);

RsvpAdmin.propTypes = {
  rsvp: propTypes.object.isRequired,
};

export default RsvpAdmin;
