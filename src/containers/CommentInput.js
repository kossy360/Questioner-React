import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment } from '../actions/commentsActions';

const CommentInput = ({
  dispatch, question, user, token, createLoading, createError
}) => {
  const [iValue, setValue] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);

  const handleChange = ({ target: { value } }) => setValue(value);

  const handleSubmit = () => {
    const comment = {
      question, comment: iValue,
    };
    setSubmitted(true);
    dispatch(createComment(comment, token, user));
  };

  useEffect(() => {
    if (!createLoading && isSubmitted) {
      setValue(createError ? iValue : '');
      setSubmitted(false);
    }
  });

  return (
    <div className="add-comment-container">
      <input
        onChange={handleChange}
        value={iValue}
        id="add-comment-input"
        type="text"
        placeholder="Add comment..."
      />
      <button
        onClick={handleSubmit}
        id="add-comment-button"
        type="button"
      >
          comment
      </button>
    </div>
  );
};

CommentInput.propTypes = {
  dispatch: propTypes.func.isRequired,
  question: propTypes.number.isRequired,
  user: propTypes.object.isRequired,
  token: propTypes.string.isRequired,
  createError: propTypes.bool.isRequired,
  createLoading: propTypes.bool.isRequired,
};

const mapStateToProps = ({
  auth: { token, user },
  questions: { createError, createLoading },
}) => ({
  token, user, createError, createLoading,
});

export default connect(mapStateToProps)(CommentInput);
