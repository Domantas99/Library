import React from 'react';
import {BookList, BookDetails} from '../../components';
import { useParams } from 'react-router-dom';

export default () => {
  const {id} = useParams();
  
  return (
    id ? <BookDetails id={id}/> :
    <div>
      <h1>Library</h1>
      <BookList/>
    </div>
  )
}