/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button, { BUTTON_APPEARANCE } from './Button';
import FilterModalContent from './FilterModalContent';
import Modal from './Modal';
import Select from './Select';

const Filter = ({
  filterSelector,
  filterMap,
  sortMap,
  excludedFilters,
  setFilterAction,
}) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(sortMap[0]);
  const [filterElements, setFilterElements] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [sortOptions, setSortOptions] = useState([]);

  const generateSortedFilters = useCallback(
    (newFilters) => {
      return {
        ...newFilters,
        sort: [sort],
      };
    },
    [sort]
  );

  const removeFilter = (key, filter) => {
    const newFilters = { ...filterSelector };
    newFilters[key] = newFilters[key].filter((item) => item !== filter);
    if (!newFilters[key]) {
      delete newFilters[key];
    }
    dispatch(setFilterAction(generateSortedFilters(newFilters)));
  };

  const createFilterPill = (key, filter) => {
    return (
      <Button
        buttonAppearance={BUTTON_APPEARANCE.CLEAR | BUTTON_APPEARANCE.MINI}
        key={`${key}-${filter}`}
        onClick={() => removeFilter(key, filter)}
      >
        {`${filterMap[key].label}: ${filter} X`}
      </Button>
    );
  };

  const handleModalClick = () => {
    setModalState(true);
  };

  const handleChangeSort = (sortValue) => {
    setSort(sortValue);
    dispatch(
      setFilterAction({
        ...filterSelector,
        sort: [sortValue.value],
      })
    );
  };

  const createFilterElements = () => {
    const elements = [];
    Object.keys(filterSelector).forEach((key) => {
      if (!excludedFilters.includes(key)) {
        if (Array.isArray(filterSelector[key])) {
          filterSelector[key].forEach((filter) => {
            elements.push(createFilterPill(key, filter));
          });
        } else {
          elements.push(createFilterPill(key, filterSelector[key]));
        }
      }
    });
    return elements;
  };

  // useEffect(() => {
  //   dispatch(dataAction(generateSortedFilters(filterSelector)));
  // }, [filterSelector, sort]);

  useEffect(() => {
    setFilterElements(createFilterElements());
  }, [filterSelector]);

  useEffect(() => {
    setSortOptions(
      sortMap.map((sortEntry) => (
        <option key={sortEntry.value} value={sortEntry.value}>
          {sortEntry.label}
        </option>
      ))
    );
  }, [sortMap]);

  return (
    <>
      <div className="filters">
        {filterElements}
        <Button
          buttonAppearance={BUTTON_APPEARANCE.MINI}
          onClick={() => handleModalClick()}
        >
          Add Filters
        </Button>
      </div>
      <Select
        prefix="Sort by: "
        small
        options={sortMap}
        value={sort}
        onChange={handleChangeSort}
      />
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="400px"
        width="80%"
      >
        <FilterModalContent
          filters={filterSelector}
          filterMap={filterMap}
          modalHandler={setModalState}
          setFilterAction={setFilterAction}
        />
      </Modal>
    </>
  );
};

Filter.propTypes = {
  excludedFilters: PropTypes.arrayOf(PropTypes.string),
  filterMap: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  sortMap: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterSelector: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ),
    ])
  ).isRequired,
  setFilterAction: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  excludedFilters: [],
};

export default Filter;
