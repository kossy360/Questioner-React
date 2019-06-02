import React, { useState, useEffect, createRef } from 'react';
import propTypes from 'prop-types';
import { fancyTime } from '../helpers/timeConverter';
import Comments from '../containers/Comments';

const Question = ({ question }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const toggleCommentsRef = createRef();

  const toggleComment = () => {
    setCommentOpen(!commentOpen);
  };

  useEffect(() => {
    toggleCommentsRef.current.classList
      .replace(commentOpen ? 'collapsed' : 'expanded', commentOpen ? 'expanded' : 'collapsed');
  });

  return (
    <div className="meet-question-details" id="6">
      <div className="meet-question-details-1">
        <span className="meet-question-name span-flex">
          <span className="question-author">{question.username}</span>
          {question.body}
        </span>
      </div>
      <div className="meet-question-details-2">
        <span className="meet-question-stat span-flex">{fancyTime(question.created)}</span>
        <span
          ref={toggleCommentsRef}
          onClick={toggleComment}
          className="comment-control span-flex collapsed"
        >
          <span className="comment-exp">comments</span>
        </span>
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
      <Comments showing={commentOpen} questionId={question.id} />
    </div>
  );
};

Question.propTypes = {
  question: propTypes.object.isRequired,
};

export default Question;
