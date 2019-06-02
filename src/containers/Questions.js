import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/questionsActions';
import Question from '../components/Question';
import QuestionInput from './QuestionInput';

const Questions = ({
  dispatch, id, token, questions
}) => {
  useEffect(() => {
    dispatch(getQuestions(id, token));
  }, []);

  return (
    <div className="meet-expanded-details">
      <div className="meet-expanded-questions">
        {questions.map(question => (
          <Question key={question.id} question={question} />
        ))}
      </div>
      <QuestionInput meetup={id} />
    </div>
  );
};

Questions.propTypes = {
  dispatch: propTypes.func.isRequired,
  id: propTypes.number.isRequired,
  token: propTypes.string.isRequired,
  questions: propTypes.array.isRequired,
};

const mapStateToProps = ({ questions: { questions }, auth: { token } }) => ({
  questions, token
});

export default connect(mapStateToProps)(Questions);
