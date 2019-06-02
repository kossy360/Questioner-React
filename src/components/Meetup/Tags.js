import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tags = ({ tags }) => (
  <div className="meet-tags-container">
    <div className="meet-tags-title">
      <span className="meet-tags-title-text">Tags</span>
      <span
        className="tags-icon meet-icon"
      />
    </div>
    <div className="meet-tags populated">
      {tags.map(tag => (
        <Link key={Math.random().toString()} to="/search">
          <span className="meet-tag">{tag}</span>
        </Link>
      ))}
    </div>
  </div>
);

Tags.propTypes = {
  tags: propTypes.array.isRequired,
};

export default Tags;
