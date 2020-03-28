import React from 'react';
import {useSelector} from 'react-redux';
import {BookList} from '../../components';

export default () => {
  const bookData = useSelector(state => state.library.bookData);

  return (
    <div>
      <h1>Library</h1>
      <BookList data={bookData}/>
    </div>
  )
}