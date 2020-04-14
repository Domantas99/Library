import React from 'react';
import { useSelector } from "react-redux"
import { BookList, BookDetails } from '../../components';
import { getBookList } from "../../store/library/actions"
import { useParams } from 'react-router-dom';

export default () => {
  const {id} = useParams();
  
  return (
    id ?
      <div className="panel">
       <div className="panel__content">
          <BookDetails id={id}/>
        </div>
      </div> :
      <div className="panel">
        <div className="panel__header">
          <h1>Library</h1>
        </div>
        <BookList dataSelector={useSelector(state => state.library.bookData)} dataAction={getBookList}/>
      </div>
  )
}