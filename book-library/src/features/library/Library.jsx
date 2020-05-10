/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { BookList, BookDetails } from '../../components';
import { getBookList, setFilters } from '../../store/library/actions';
import ActionItem from '../../components/ActionItem';
import LibraryFilter from '../../components/LibraryFilter';
import Panel from '../../components/Panel';

export default ({ location }) => {
  const dispatch = useDispatch();
  const values = queryString.parse(location.search);
  const { id } = useParams();
  const history = useHistory();
  const bookSelector = useSelector((state) => state.library.bookData);
  const actionButton = (
    <ActionItem
      linkTitle="Register new book"
      onClickAction={() => history.push('/library/register-book')}
    />
  );

  const filter = <LibraryFilter dataAction={getBookList} />;

  useEffect(() => {
    dispatch(setFilters(values));
  }, []);

  return id ? (
    <BookDetails id={id} />
  ) : (
    <Panel title="Library">
      <BookList
        dataSelector={bookSelector}
        dataAction={getBookList(values)}
        navigateItems
        addLink="/library/register-book"
        filterComponent={filter}
        actionButton={actionButton}
      />
    </Panel>
  );
};
