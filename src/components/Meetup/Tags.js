import React from 'react';
import propTypes from 'prop-types';

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
        <span key={Math.random().toString()} className="meet-tag">{tag}</span>
      ))}
    </div>
  </div>
);

Tags.propTypes = {
  tags: propTypes.array.isRequired,
};

export default Tags;
