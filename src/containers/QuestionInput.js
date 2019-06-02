import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { createQuestion } from '../actions/questionsActions';

const QuestionInput = ({
  dispatch, meetup, user, token, createLoading, createError
}) => {
  const [iValue, setValue] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);

  const handleChange = ({ target: { value } }) => setValue(value);

  const handleSubmit = () => {
    const question = {
      meetup, body: iValue,
    };
    setSubmitted(true);
    dispatch(createQuestion(question, token, user));
  };

  useEffect(() => {
    if (!createLoading && isSubmitted) {
      setValue(createError ? iValue : '');
      setSubmitted(false);
    }
  });

  return (
    <div className="question-input-container">
      <label className="question-input-label">Ask a question</label>
      <div className="question-input-box">
        <input
          onChange={handleChange}
          value={iValue}
          id="question-input"
          type="text"
          placeholder="question here..."
        />
        <button
          onClick={handleSubmit}
          id="question-input-button"
          type="button"
        >
          Ask!
        </button>
      </div>
    </div>
  );
};

QuestionInput.propTypes = {
  dispatch: propTypes.func.isRequired,
  meetup: propTypes.number.isRequired,
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

export default connect(mapStateToProps)(QuestionInput);
