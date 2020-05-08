/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/library/actions';
import Button from './Button';

export default ({ dataAction }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.library.filters);
  const [filterElements, setFilterElements] = useState([]);

  const filterNames = {
    category: 'Category',
    offices: 'Office',
    authors: 'Author',
  };

  const removeFilter = (key, filter) => {
    const newFilters = { ...filters };
    newFilters[key] = newFilters[key].filter((item) => item !== filter);
    dispatch(setFilters(newFilters));
  };

  const createFilterPill = (key, filter) => {
    return (
      <Button
        mini
        key={`${key}-${filter}`}
        onClick={() => removeFilter(key, filter)}
      >
        {`${filterNames[key]}: ${filter}`}
      </Button>
    );
  };

  const createFilterElements = () => {
    const elements = [];
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key])) {
        filters[key].forEach((filter) => {
          elements.push(createFilterPill(key, filter));
        });
      } else {
        elements.push(createFilterPill(key, filters[key]));
      }
    });
    return elements;
  };

  useEffect(() => {
    dispatch(dataAction(filters));
  }, [filters]);

  useEffect(() => {
    setFilterElements(createFilterElements());
  }, [filters]);

  return filterElements;
};
