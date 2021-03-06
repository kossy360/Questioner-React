import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { convertTime } from '../../helpers/timeConverter';
import RsvpAdmin from './RsvpAdmin';
import RsvpUser from '../../containers/RsvpUser';
import Tags from './Tags';

const Clink = ({ isSingle, id, children }) => (
  isSingle ? (
    <>{children}</>
  ) : (
    <Link className="meetup-link" to={`/meetups/${id}`}>
      {children}
    </Link>
  )
);

Clink.propTypes = {
  isSingle: propTypes.bool.isRequired,
  id: propTypes.number.isRequired,
  children: propTypes.oneOfType([propTypes.array, propTypes.object]).isRequired,
};

const Meetups = ({
  meetups, isadmin, children, isSingle
}) => (
  <section className="main-section section-showing" id="meets-section">
    {meetups.map(meetup => (
      <div key={Math.random().toString()} className="meet-container main-container" id="1">
        <div className="meet-control-container">
          <button
            className="meet-control-btn meet-edit-btn"
            type="button"
          >
          edit
          </button>
          <button className="meet-control-btn meet-cancel-btn" type="button">delete</button>
        </div>
        <Clink isSingle={isSingle} id={meetup.id}>
          <p className="meet-name big">{meetup.topic}</p>
          <img className="meet-image" src={meetup.images[0] || 'https://res.cloudinary.com/kossy360/image/upload/v1559137008/Questioner%20Assets/meeting1.jpg'} alt="" />
          {isadmin ? (
            <RsvpAdmin rsvp={meetup.rsvp} />
          ) : (
            <RsvpUser rsvp={meetup.rsvp} />
          )}
          <div className="meet-stats">
            <div className="meet-stat date">
              <span className="meet-icon meet-date-icon" />
              <span
                className="meet-stat-text meet-date-text"
              >
                {convertTime(meetup.happening).date}
              </span>
            </div>
            <div className="meet-stat time">
              <span className="meet-icon meet-time-icon" />
              <span
                className="meet-stat-text meet-time-text"
              >
                {convertTime(meetup.happening).time}
              </span>
            </div>
            <div className="meet-stat place">
              <span className="meet-icon meet-place-icon" />
              <span
                className="meet-stat-text meet-place-text"
              >
                {meetup.location}
              </span>
            </div>
            <div className="meet-stat questions">
              <span className="question-count">{`${meetup.questions} question${meetup.questions !== 1 && 's'}`}</span>
            </div>
            <div className="meet-stat pictures">
              <span className="picture-count">{`${meetup.images.length} picture${meetup.images.length !== 1 && 's'}`}</span>
            </div>
          </div>
        </Clink>
        <Tags tags={meetup.tags} />
        {children}
      </div>
    ))}
  </section>
);

Meetups.propTypes = {
  meetups: propTypes.array.isRequired,
  isadmin: propTypes.bool.isRequired,
  children: propTypes.object,
  isSingle: propTypes.bool,
};

Meetups.defaultProps = {
  children: null,
  isSingle: false,
};

export default Meetups;
