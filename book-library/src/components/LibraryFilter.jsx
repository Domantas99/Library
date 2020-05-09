/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilters } from '../store/library/actions';
import Button from './Button';
import Modal from './Modal';
import FilterModalContent from './FilterModalContent';

const LibraryFilter = ({ dataAction }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.library.filters);
  const [filterElements, setFilterElements] = useState([]);
  const [modalState, setModalState] = useState(false);

  const filterNames = {
    category: 'Category',
    status: 'Status',
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

  const handleModalClick = () => {
    setModalState(true);
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

  return (
    <>
      {filterElements}
      <Button onClick={() => handleModalClick()}>Add Filters</Button>
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="400px"
        width="80%"
      >
        <FilterModalContent
          filters={filters}
          labels={filterNames}
          modalHandler={setModalState}
        />
      </Modal>
    </>
  );
};

LibraryFilter.propTypes = {
  dataAction: PropTypes.func.isRequired,
};

export default LibraryFilter;
