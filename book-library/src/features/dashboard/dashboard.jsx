import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BooksSection from "../../components/BooksSection";
import { getLatestBooks } from "../../store/dashboard/actions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const latestBooks = useSelector((state) => state.dashboard.latestBooks);

  useEffect(() => {
    dispatch(getLatestBooks(4));
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="page">
        <div className="page_content">
          <div className="panel panel--size-5">
            <BooksSection sectionName="New Books" books={latestBooks} />
          </div>
        </div>
      </div>
    </div>
  );
}
