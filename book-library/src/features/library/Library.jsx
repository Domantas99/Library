/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import queryString from "query-string";
import { BookList, BookDetails } from "../../components";
import { getBookList, setFilters } from "../../store/library/actions";
import ActionItem from "../../components/ActionItem";
import LibraryFilter from "../../components/LibraryFilter";
import { useEffect } from "react";

export default (props) => {
  const dispatch = useDispatch();
  const values = queryString.parse(props.location.search);
  const { id } = useParams();
  const history = useHistory();
  const bookSelector = useSelector((state) => state.library.bookData)
  
  useEffect(() => {
    dispatch(setFilters(values));
  }, []);

  return id ? (
    <BookDetails id={id} />
  ) : (
    <div className="panel">
      <div className="panel__header">
        <h1>Library</h1>
      </div>
      <BookList
        dataSelector={bookSelector}
        dataAction={getBookList(values)}
        navigateItems
        addLink="/register-book"
        actionButton={
          <ActionItem
            linkTitle="Register new book"
            onClickAction={() => history.push("/register-book")}
          />
        }
        filterComponent={<LibraryFilter dataAction={getBookList}/>}
      />
    </div>
  );
};
