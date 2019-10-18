import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

function CommentList({ comments }) {
  return (
    <ul className="commentList">
      {comments.map((comment, index) => (
        <li className="commentItem" key={comment.id}>
          <img className={classnames('commentImage', {
            right: index % 2 !== 0
          })} src={comment.user.avatar_url} alt="" />
          <div className="commentBody">
            <p>{comment.body}</p>
            <p>{moment(comment.created_at).fromNow()}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
