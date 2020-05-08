import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getLatestBooks,
  getCurrentlyReadingBooks,
} from '../../store/dashboard/actions';
import CurrentlyReadingSection from '../../components/CurrentlyReadingSection';
import { BookList } from '../../components';
import Panel from '../../components/Panel';

export default function Dashboard() {
  const dispatch = useDispatch();
  const latestBooks = useSelector((state) => state.dashboard.latestBooks);
  const currentlyReadingBooks = useSelector(
    (state) => state.dashboard.currentlyReadingBooks
  );

  useEffect(() => {
    dispatch(getCurrentlyReadingBooks());
  }, [dispatch]);

  const seeAllLink = (
    <Link className="book-section-header-link" to="/library">
      See all &gt;
    </Link>
  );

  return (
    <div className="dashboard">
      <Panel title="New Books" actions={seeAllLink}>
        <BookList
          noSort
          dataSelector={latestBooks}
          dataAction={getLatestBooks(4)}
          navigateItems
        />
      </Panel>
      <div className="dashboard__sidebar">
        <Panel title="Currently Reading" className="sticky">
          <CurrentlyReadingSection
            title="Currently Reading"
            books={currentlyReadingBooks}
          />
        </Panel>
      </div>
    </div>
  );
}
