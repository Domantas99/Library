import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getBookComments } from '../store/comments/actions';
import BookCommentComponent from './BookCommentComponent';
import Button, { BUTTON_APPEARANCE } from './Button';
import CommentForm from './CommentForm';

const BookCommentsSection = ({ id, pageSize }) => {
  const dispatch = useDispatch();
  const commentData = useSelector((state) => state.comments.comments);
  const [commentComponents, setCommentComponents] = useState([]);
  const [navButtons, setNavButtons] = useState([]);

  const setPage = useCallback(
    (page) => {
      dispatch(getBookComments({ book: id, page, pageSize }));
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [id, pageSize]
  );

  useEffect(() => {
    const generateCommentComponents = () => {
      return commentData.result.map((comment) => {
        return (
          <BookCommentComponent
            key={comment.id}
            data={comment}
            page={commentData.page}
            pageSize={pageSize}
          />
        );
      });
    };

    const buttonAppearance = BUTTON_APPEARANCE.SMALL | BUTTON_APPEARANCE.CLEAR | BUTTON_APPEARANCE.SQUARE;

    const generateNavButtons = () => {
      const buttons = [];
      buttons.push(
        <Button
          buttonAppearance={BUTTON_APPEARANCE.SMALL | BUTTON_APPEARANCE.LINK}
          key="prev"
          className="comments__button-step"
          disabled={!commentData.hasPreviousPage}
          onClick={() => {
            setPage(commentData.page - 1);
          }}
        >
          &lt; Prev
        </Button>
      );
      if (commentData.page > 1) {
        if (commentData.page > 2 && !commentData.hasNextPage) {
          buttons.push(
            <Button
              buttonAppearance={buttonAppearance}
              key={commentData.page - 2}
              className="comments__button-number"
              onClick={() => {
                setPage(commentData.page - 2);
              }}
            >
              {commentData.page - 2}
            </Button>
          );
        }
        buttons.push(
          <Button
            buttonAppearance={buttonAppearance}
            key={commentData.page - 1}
            className="comments__button-number"
            onClick={() => {
              setPage(commentData.page - 1);
            }}
          >
            {commentData.page - 1}
          </Button>
        );
      }
      buttons.push(
        <Button buttonAppearance={buttonAppearance} key={commentData.page} className="comments__button-current">
          {commentData.page}
        </Button>
      );
      if (commentData.hasNextPage) {
        buttons.push(
          <Button
            buttonAppearance={buttonAppearance}
            key={commentData.page + 1}
            className="comments__button-number"
            onClick={() => {
              setPage(commentData.page + 1);
            }}
          >
            {commentData.page + 1}
          </Button>
        );
        if (commentData.page === 1 && commentData.totalPages > 2) {
          buttons.push(
            <Button
              buttonAppearance={buttonAppearance}
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
          buttonAppearance={BUTTON_APPEARANCE.SMALL | BUTTON_APPEARANCE.LINK}
          key="next"
          className="comments__button-step"
          disabled={!commentData.hasNextPage}
          onClick={() => {
            setPage(commentData.page + 1);
          }}
        >
          Next &gt;
        </Button>
      );
      return buttons;
    };

    if (commentData.result) {
      setCommentComponents(generateCommentComponents());
      setNavButtons(generateNavButtons());
    }
  }, [commentData, pageSize]);

  useEffect(() => {
    dispatch(getBookComments({ book: id, page: 1, pageSize }));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [id, pageSize, setPage]);

  return (
    <div className="comments">
      <h3>
        Comments&emsp;&bull;&emsp;
        {commentData.items}
      </h3>
      {commentComponents}
      <hr />
      <div className="comments__nav">
        <h4>{`${commentData.items} comments`}</h4>
        <div className="comments__nav-buttons">{navButtons}</div>
      </div>
      <CommentForm book={id} page={commentData.page} pageSize={pageSize} />
    </div>
  );
};

BookCommentsSection.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default BookCommentsSection;
