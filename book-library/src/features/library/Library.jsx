/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { BookList, BookDetails } from "../../components";
import { getBookList } from "../../store/library/actions";
import ActionItem from "../../components/ActionItem";

export default () => {
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
        dataAction={getBookList}
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
