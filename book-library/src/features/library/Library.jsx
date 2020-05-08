/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { BookList, BookDetails } from '../../components';
import { getBookList } from '../../store/library/actions';
import ActionItem from '../../components/ActionItem';
import Panel from '../../components/Panel';

export default ({ location }) => {
  const values = queryString.parse(location.search);

  const { id } = useParams();
  const history = useHistory();
  const bookSelector = useSelector((state) => state.library.bookData);
  const actionButton = (
    <ActionItem
      linkTitle="Register new book"
      onClickAction={() => history.push('/register-book')}
    />
  );

  return id ? (
    <BookDetails id={id} />
  ) : (
    <Panel title="Library">
      <BookList
        dataSelector={bookSelector}
        dataAction={getBookList(values.category)}
        navigateItems
        addLink="/register-book"
        actionButton={actionButton}
      />
    </Panel>
  );
};
