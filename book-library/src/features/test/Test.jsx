import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TestBlock } from '../../components'
import { getMocked, getMockedById, getTest } from '../../store/test/actions';

export default () => {
  const dispatch = useDispatch();
  const testData = useSelector(state => state.test.testData);
  const mockedData = useSelector(state => state.test.mockedData);
  const mockedById = useSelector(state => state.test.mockedById);

  const [id, setId] = useState(0);

  return (
    <div className="test">
      <input type="number" value={id} onChange={(e) => setId(e.target.value || 0)}/>
      <div className="test--wrapper">
        <TestBlock label="API" data={testData} action={() => dispatch(getTest())} />
        <TestBlock label="Mocked" data={mockedData} action={() => dispatch(getMocked())} />
        <TestBlock label="Mocked with input" data={mockedById} action={() => dispatch(getMockedById(id))} />
      </div>
    </div>
  )
}