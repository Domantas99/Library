import React from 'react';
import {useSelector} from 'react-redux';
import {BookList, BookDetails} from '../../components';
import { useParams } from 'react-router-dom';

export default () => {
  const bookData = useSelector(state => state.library.bookData);
  console.log(bookData);
  const {id} = useParams();
  console.log(bookData.find(element => element.Id === 1));
  return (
    id ? <BookDetails id={id}/> :
    <div>
      <h1>Library</h1>
      <BookList data={bookData}/>
    </div>
  )
}