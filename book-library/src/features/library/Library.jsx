import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BookList, BookDetails } from "../../components";
import { getBookList } from "../../store/library/actions";

export default () => {
  const { id } = useParams();

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
      />
    </div>
  );
};
