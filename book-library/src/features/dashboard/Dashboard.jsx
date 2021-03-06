import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getLatestBooks,
  getCurrentlyReadingBooks,
  getRecommendedBooks,
} from '../../store/dashboard/actions';
import { BookList, CurrentlyReadingSection, Panel } from '../../components';

const Dashboard = () => {
  const dispatch = useDispatch();
  const latestBooks = useSelector((state) => state.dashboard.latestBooks);
  const recommendedBooks = useSelector(
    (state) => state.dashboard.recommendedBooks
  );
  const userOffice = useSelector((state) => state.user.userData?.officeId);
  const currentlyReadingBooks = useSelector(
    (state) => state.dashboard.currentlyReadingBooks
  );

  useEffect(() => {
    dispatch(getLatestBooks());
    dispatch(getRecommendedBooks());
    dispatch(getCurrentlyReadingBooks());
  }, [dispatch]);

  const seeAllLink = (
    <Link className="book-section-header-link" to="/library">
      See all &gt;
    </Link>
  );

  return (
    <div className="dashboard">
      {userOffice &&
      <div>
        {latestBooks && latestBooks.length > 0 && <Panel title="New Books" actions={seeAllLink}>
          <BookList
            noSort
            dataSelector={latestBooks}
            dataAction={getLatestBooks()}
            navigateItems
          />
        </Panel>}

        {recommendedBooks && recommendedBooks.length > 0 && <Panel title="You might enjoy" actions={seeAllLink}>
          <BookList
            noSort
            dataSelector={recommendedBooks}
            dataAction={getRecommendedBooks()}
            navigateItems
          />
        </Panel>}
      </div>
}
      {currentlyReadingBooks && currentlyReadingBooks.length > 0 && (
        <div className="dashboard__sidebar">
          <Panel title="Currently Reading" className="sticky">
            <CurrentlyReadingSection
              title="Currently Reading"
              reservations={currentlyReadingBooks}
            />
          </Panel>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
