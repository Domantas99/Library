/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { BookList } from '../../components';
import {
  getAuthors,
  getCategories,
  getWishlist,
  setFilters,
} from '../../store/wishlist/actions';
import ActionItem from '../../components/ActionItem';
import Filter from '../../components/Filter';
import Modal from '../../components/Modal';
import Panel from '../../components/Panel';
import WishForm from '../../components/WishForm';

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
  const [sortMap, setSortMap] = useState([{
    value: 'recent',
    label: 'Recent',
  },{
    value: 'oldest',
    label: 'Oldest',
  },{
    value: 'titleaz',
    label: 'Title [A-Z]',
  },{
    value: 'titleza',
    label: 'Title [Z-A]',
  },{
    value: 'authoraz',
    label: 'Author [A-Z]',
  },{
    value: 'authorza',
    label: 'Author [Z-A]',
  }]);

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

  useEffect(() => {
    dispatch(setFilters(values));
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAuthors());
  }, []);

  return (
    <>
      <Panel title="Wishlist">
        <BookList
          dataSelector={wishSelector}
          dataAction={getWishlist(values)}
          addLink="/add-wishlist"
          filterComponent={
            <Filter
              dataAction={getWishlist}
              filterMap={filterMap}
              filterSelector={filterSelector}
              sortMap={sortMap}
              excludedFilters={excludedFilters}
              setFilterAction={setFilters}
            />
          }
          actionButton={actionButton}
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
