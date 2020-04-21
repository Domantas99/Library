import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BooksSection from "../../components/BooksSection";
import {
  getLatestBooks,
  getCurrentlyReadingBooks,
} from "../../store/dashboard/actions";
import CurrentlyReadingSection from "../../components/CurrentlyReadingSection";

export default function Dashboard() {
  const dispatch = useDispatch();
  const latestBooks = useSelector((state) => state.dashboard.latestBooks);
  const currentlyReadingBooks = useSelector(
    (state) => state.dashboard.currentlyReadingBooks
  );
  console.log(currentlyReadingBooks);
  useEffect(() => {
    dispatch(getLatestBooks(4));
    dispatch(getCurrentlyReadingBooks());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="page">
        <div className="page_content dashboard">
          <div className="panel panel--size-5">
            <BooksSection sectionName="New Books" books={latestBooks} />
          </div>
          <div className="panel panel--margin-left">
            <CurrentlyReadingSection
              title="Currently Reading"
              books={currentlyReadingBooks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
