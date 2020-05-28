/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import {
  getAuthors,
  getCategories,
  getWishlist,
  setFilters,
  setVote,
} from '../../store/wishlist/actions';
import {
  ActionItem,
  BookList,
  Filter,
  Modal,
  Panel,
  WishForm,
} from '../../components';
import WishListVotes from '../../components/WishlistVotes';

const Wishlist = (location) => {
  const dispatch = useDispatch();
  const values = queryString.parse(location.search);
  const wishSelector = useSelector((state) => state.wishlist.bookData);
  const filterSelector = useSelector((state) => state.wishlist.filters);
  const categories = useSelector((state) => state.wishlist.categories);
  const authors = useSelector((state) => state.wishlist.authors);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, setExcludedFilters] = useState(['sort']);
  const [modalState, setModalState] = useState(false);

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
            <WishListVotes
              voteCount={data.votes}
              hasVoted={data.userVoted}
              onVote={() => handleVote(data.wishId, index)}
            />
          )}
        />
      </Panel>
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="80%"
        width="56%"
      >
        <WishForm exitAction={() => setModalState(false)} />
      </Modal>
    </>
  );
};

export default Wishlist;
