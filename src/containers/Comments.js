import React, { useEffect, createRef } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fancyTime } from '../helpers/timeConverter';
import { getComments } from '../actions/commentsActions';
import CommentInput from './CommentInput';

const Comments = ({
  dispatch, token, showing, questionId, comments
}) => {
  const commentContainerRef = createRef();
  useEffect(() => {
    if (showing) { dispatch(getComments(questionId, token)); }
  }, [showing]);

  useEffect(() => {
    const elem = commentContainerRef.current;
    if (!showing) {
      elem.style.height = '0px';
    } else {
      const { children } = elem;
      let height = 0;
      Array.from(children).forEach((child) => {
        height += child.offsetHeight;
      });
      elem.style.height = `${height}px`;
    }
    commentContainerRef.current.classList[showing ? 'add' : 'remove']('showing');
  });
  return (
    <div ref={commentContainerRef} className="comment-box-container">
      {comments.map(comment => (
        <div key={comment.id} className="comment-box-container2">
          <div className="comment-box">
            <img
              className="user-dp-small comment-dp"
              src={comment.displaypicture || `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${comment.username}`}
              alt=""
            />
            <div className="comment-box-text">
              <span className="comment-text">
                <span className="comment-author">{comment.username}</span>
                {comment.comment}
              </span>
            </div>
            <div className="comment-options">
              <span className="comment-timestamp">{fancyTime(comment.created)}</span>
            </div>
          </div>
        </div>
      ))}
      <CommentInput question={questionId} />
    </div>
  );
};

Comments.propTypes = {
  dispatch: propTypes.func.isRequired,
  questionId: propTypes.number.isRequired,
  token: propTypes.string.isRequired,
  comments: propTypes.array.isRequired,
  showing: propTypes.bool.isRequired,
};

const mapStateToProps = ({ comments: { comments }, auth: { token } }, { questionId }) => ({
  comments: comments[questionId] || [], token,
});

export default connect(mapStateToProps)(Comments);
