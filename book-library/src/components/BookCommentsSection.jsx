import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getBookComments } from '../store/comments/actions';
import BookCommentComponent from './BookCommentComponent';
import Button from './Button';
import CommentForm from './CommentForm';

const BookCommentsSection = ({ id, pageSize }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const [page, setPage] = useState(1);
  const [commentComponents, setCommentComponents] = useState([]);
  const [navButtons, setNavButtons] = useState([]);

  useEffect(() => {
    const generateCommentComponents = () => {
      return comments.result.map((comment) => {
        return (
          <BookCommentComponent
            key={comment.id}
            data={comment}
            page={page}
            pageSize={pageSize}
          />
        );
      });
    };

    const generateNavButtons = () => {
      const buttons = [];
      buttons.push(
        <Button
          key="prev"
          className="comments__button-step"
          disabled={!comments.hasPreviousPage}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          &lt; Prev
        </Button>
      );
      if (page > 1) {
        if (page > 2 && !comments.hasNextPage) {
          buttons.push(
            <Button
              key={page - 2}
              className="comments__button-number"
              onClick={() => {
                setPage(page - 2);
              }}
            >
              {page - 2}
            </Button>
          );
        }
        buttons.push(
          <Button
            key={page - 1}
            className="comments__button-number"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {page - 1}
          </Button>
        );
      }
      buttons.push(
        <Button key={page} className="comments__button-current">
          {page}
        </Button>
      );
      if (comments.hasNextPage) {
        buttons.push(
          <Button
            key={page + 1}
            className="comments__button-number"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {page + 1}
          </Button>
        );
        if (page === 1 && comments.totalPages > 2) {
          buttons.push(
            <Button
              key={3}
              className="comments__button-number"
              onClick={() => {
                setPage(3);
              }}
            >
              {3}
            </Button>
          );
        }
      }
      buttons.push(
        <Button
          key="next"
          className="comments__button-step"
          disabled={!comments.hasNextPage}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next &gt;
        </Button>
      );
      return buttons;
    };

    if (comments.result) {
      setCommentComponents(generateCommentComponents());
      setNavButtons(generateNavButtons());
    }
  }, [comments, page, pageSize]);

  useEffect(() => {
    dispatch(getBookComments({ book: id, page, pageSize }));
  }, [dispatch, id, page, pageSize]);

  return (
    <div>
      <span>
        Comments &bull;
        {comments.items}
      </span>
      {commentComponents}
      <hr />
      <div>
        <span>{`${comments.items} comments`}</span>
        <div className="comments__nav">{navButtons}</div>
      </div>
      <CommentForm book={id} page={page} pageSize={pageSize} />
    </div>
  );
};

BookCommentsSection.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default BookCommentsSection;
