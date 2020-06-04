/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
  getAuthors,
  getCategories,
  getWishlist,
  moveWishToLibrary,
  setFilters,
  setVote,
} from '../../store/wishlist/actions';
import {
  ActionItem,
  BookList,
  Button,
  Filter,
  Modal,
  Panel,
  WishForm,
} from '../../components';
import WishListVotes from '../../components/WishlistVotes';
import BookForm from '../../components/BookForm';
import { BUTTON_APPEARANCE } from '../../components/Button';

const Wishlist = ({ location }) => {
  const dispatch = useDispatch();
  const values = queryString.parse(location.search);
  const wishSelector = useSelector((state) => state.wishlist.bookData);
  const filterSelector = useSelector((state) => state.wishlist.filters);
  const categories = useSelector((state) => state.wishlist.categories);
  const authors = useSelector((state) => state.wishlist.authors);
  const offices = useSelector((state) => state.office.offices);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, setExcludedFilters] = useState(['sort']);
  const [modalState, setModalState] = useState(false);
  const isAdmin = useSelector((state) => state.user.userData.isAdmin);
  const actionButton = (
    <ActionItem
      linkTitle="Add new book request"
      onClickAction={() => setModalState(true)}
    />
  );

  const [filterMap, setFilterMap] = useState({
    category: {
      label: 'Category',
      values: [],
    },
    authors: {
      label: 'Author',
      values: [],
    },
  });
  /* eslint-disable no-unused-vars */
  const [sortMap, setSortMap] = useState([
    {
      value: 'recent',
      label: 'Recent',
    },
    {
      value: 'oldest',
      label: 'Oldest',
    },
    {
      value: 'titleaz',
      label: 'Title [A-Z]',
    },
    {
      value: 'titleza',
      label: 'Title [Z-A]',
    },
    {
      value: 'authoraz',
      label: 'Author [A-Z]',
    },
    {
      value: 'authorza',
      label: 'Author [Z-A]',
    },
    {
      value: 'votesasc',
      label: 'Votes [Ascending]',
    },
    {
      value: 'votesdsc',
      label: 'Votes [Descending]',
    },
  ]);
  const [bookToMove, setBookToMove] = useState(null);

  useEffect(() => {
    const generateFilterMap = () => {
      return {
        category: {
          label: 'Category',
          values: categories,
        },
        authors: {
          label: 'Author',
          values: authors,
        },
      };
    };

    setFilterMap(generateFilterMap());
  }, [categories, authors]);

  const filterComponent = useCallback(
    () => (
      <Filter
        dataAction={getWishlist}
        filterMap={filterMap}
        filterSelector={filterSelector}
        sortMap={sortMap}
        excludedFilters={excludedFilters}
        setFilterAction={(filterValues) => {
          return setFilters(filterValues);
        }}
      />
    ),
    [filterSelector, filterMap, sortMap, excludedFilters]
  );

  useEffect(() => {
    dispatch(setFilters(values));
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
  }, []);

  const handleVote = (wishId, index) => {
    dispatch(setVote(wishId, index));
  };

  const handleMove = (book) => {
    const obj = { ...book, id: bookToMove.id };
    dispatch(moveWishToLibrary(obj));
    setBookToMove(null);
  };

  return (
    <>
      <Panel title="Wishlist">
        <BookList
          dataSelector={wishSelector}
          dataAction={getWishlist(values)}
          addLink="/add-wishlist"
          filterComponent={filterComponent()}
          actionButton={actionButton}
          renderItemActions={(data, index) => (
            <div className="wishlist__actions">
              <WishListVotes
                voteCount={data.votes}
                hasVoted={data.userVoted}
                onVote={() => handleVote(data.wishId, index)}
              />
              {isAdmin === true && (
                <Button
                  buttonAppearance={
                    BUTTON_APPEARANCE.MINI |
                    BUTTON_APPEARANCE.SECONDARY |
                    BUTTON_APPEARANCE.WIDE
                  }
                  onClick={() => setBookToMove(data)}
                >
                  Move
                </Button>
              )}
            </div>
          )}
        />
      </Panel>
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="fit-content"
        width="550px"
      >
        <WishForm exitAction={() => setModalState(false)} />
      </Modal>
      <Modal
        modalState={!!bookToMove}
        exitAction={() => setBookToMove(null)}
        width="550px"
        height="unset"
      >
        <Panel title="Add wish to library">
          {bookToMove && bookToMove.comment.length > 0 && (
            <div className="form__field">
              <label className="form__group-item-label">User comment</label>
              <p>
                <h4>{bookToMove.comment}</h4>
              </p>
            </div>
          )}
          <BookForm
            bookDetails={bookToMove}
            offices={offices}
            buttonText="Move"
            onSubmit={handleMove}
          />
        </Panel>
      </Modal>
    </>
  );
};

Wishlist.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ search: PropTypes.string }),
  ]),
};

Wishlist.defaultProps = {
  location: '',
};

export default Wishlist;
