import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { BookList } from '../../components';
import { getAuthors,
  getCategories,getWishlist, setFilters } from '../../store/wishlist/actions';
import ActionItem from '../../components/ActionItem';
import Filter from '../../components/Filter';
import Modal from '../../components/Modal';
import WishForm from '../../components/WishForm';
import Panel from '../../components/Panel';

const Wishlist = (location) => {
  const dispatch = useDispatch();
  const values = queryString.parse(location.search);
  const wishSelector = useSelector((state) => state.wishlist.bookData);
  const filterSelector = useSelector((state) => state.wishlist.filters);
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

  const categories = useSelector((state) => state.wishlist.categories);
  const authors = useSelector((state) => state.wishlist.authors);
  /* eslint-disable no-unused-vars */
  const [excludedFilters, _] = useState(['sortField', 'sortDirection']);

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
          filterComponent={<Filter
            dataAction={getWishlist}
            filterMap={filterMap}
            filterSelector={filterSelector}
            excludedFilters={excludedFilters}
            setFilterAction={setFilters}
          />}
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