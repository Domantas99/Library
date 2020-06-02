/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';
import Button, { BUTTON_APPEARANCE } from './Button';
import FilterPopupContent from './FilterPopupContent';
import Select from './Select';

const Filter = ({
  filterSelector,
  filterMap,
  sortMap,
  excludedFilters,
  setFilterAction,
}) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(sortMap[0].value);
  const location = useLocation();
  const [filterElements, setFilterElements] = useState([]);
  const [popupState, setPopupState] = useState(false);

  const generateSortedFilters = useCallback(
    (newFilters) => {
      return {
        ...newFilters,
        sort: [sort.value],
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
        buttonAppearance={
          BUTTON_APPEARANCE.SECONDARY |
          BUTTON_APPEARANCE.MINI |
          BUTTON_APPEARANCE.DANGER
        }
        key={`${key}-${filter}`}
        onClick={() => removeFilter(key, filter)}
      >
        <b>
          {`${filterMap[key].label}: ${filter}`}
          &nbsp;&nbsp;&#x2716;
        </b>
      </Button>
    );
  };

  const handleAddFilter = () => {
    setPopupState(true);
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
    const { sort: querySort } = queryString.parse(location.search);
    if (querySort) {
      const selectedSort = _.find(sortMap, (s) => s.value === querySort);
      setSort(selectedSort);
    }
  }, []);

  return (
    <>
      <div className="filters">
        {filterElements}
        <Popover
          align="start"
          position="bottom"
          isOpen={popupState}
          onClickOutside={() => setPopupState(false)}
          content={
            <FilterPopupContent
              filters={filterSelector}
              filterMap={filterMap}
              modalHandler={setPopupState}
              setFilterAction={setFilterAction}
            />
          }
        >
          {(ref) => (
            <div ref={ref}>
              <Button
                buttonAppearance={BUTTON_APPEARANCE.LINK}
                onClick={handleAddFilter}
              >
                + Add Filter
              </Button>
            </div>
          )}
        </Popover>
      </div>
      <Select
        prefix="Sort by: "
        small
        options={sortMap}
        value={sort}
        onChange={handleChangeSort}
      />
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
