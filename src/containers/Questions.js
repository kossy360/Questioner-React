import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fancyTime } from '../helpers/timeConverter';
import { getQuestions } from '../actions/questionsActions';
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
          <div key={question.id} className="meet-question-details" id="6">
            <div className="meet-question-details-1">
              <span className="meet-question-name span-flex">
                <span className="question-author">{question.username}</span>
                {question.body}
              </span>
            </div>
            <div className="meet-question-details-2">
              <span className="meet-question-stat span-flex">{fancyTime(question.created)}</span>
              <span className="comment-control span-flex collapsed"><span className="comment-exp">comments</span></span>
            </div>
            <img
              className="user-dp-small question-dp"
              src={question.displaypicture || `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${question.username}`}
              alt=""
            />
            <div className="feed-stat-vote">
              <span className={`upvote vote-btn ${question.response === 1 && 'active'}`} />
              <span className="vote-count" id="vote-count-6">{question.votes}</span>
              <span className={`dnvote vote-btn ${question.response === -1 && 'active'}`} />
            </div>
          </div>
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
