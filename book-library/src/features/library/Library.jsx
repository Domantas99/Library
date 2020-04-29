/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import queryString from "query-string";
import { BookList, BookDetails } from "../../components";
import { getBookList } from "../../store/library/actions";
import ActionItem from "../../components/ActionItem";

export default (props) => {
  const values = queryString.parse(props.location.search);

  const { id } = useParams();
  const history = useHistory();
  return id ? (
    <BookDetails id={id} />
  ) : (
    <div className="panel">
      <div className="panel__header">
        <h1>Library</h1>
      </div>
      <BookList
        dataSelector={useSelector((state) => state.library.bookData)}
        dataAction={getBookList(values.category)}
        addLink="/register-book"
        actionButton={
          <ActionItem
            linkTitle="Register new book"
            onClickAction={() => history.push("/register-book")}
          />
        }
      />
    </div>
  );
};
