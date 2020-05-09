/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilters } from '../store/library/actions';
import Button from './Button';

const FilterModalContent = ({ filters, labels, modalHandler }) => {
  const filtersRef = useRef(filters);
  const dispatch = useDispatch();
  const [filterMenu, setFilterMenu] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [activeFilterOptions, setActiveFilterOptions] = useState([]);
  const [activeFilterComponents, setActiveFilterComponents] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const categories = useSelector((state) => state.library.categories);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState('');

  const filterIsActive = (key, filter) => {
    return filtersRef.current[key] && filtersRef.current[key].includes(filter);
  };

  const removeFilter = useCallback(
    (key, filter) => {
      const newFilters = { ...filtersRef.current };
      newFilters[key] = newFilters[key].filter((item) => item !== filter);
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const addFilter = useCallback(
    (key, filter) => {
      const newFilters = { ...filtersRef.current };
      if (newFilters[key]) {
        if (!Object.values(newFilters[key]).includes(filter)) {
          newFilters[key] = [...newFilters[key], filter];
        } else return;
      } else {
        newFilters[key] = [filter];
      }
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (category, filter) => {
      if (filterIsActive(category, filter)) {
        removeFilter(category, filter);
      } else {
        addFilter(category, filter);
      }
    },
    [addFilter, removeFilter]
  );

  const generateCategoryFilterItem = useCallback(
    (category) => {
      return (
        <div key={category}>
          <input
            type="checkbox"
            id={`checkbox-category-${category}`}
            onChange={() => handleFilterChange('category', category)}
            checked={checkedBoxes.includes(`checkbox-category-${category}`)}
          />
          <label htmlFor={`checkbox-category-${category}`}>{category}</label>
        </div>
      );
    },
    [checkedBoxes, handleFilterChange]
  );

  useEffect(() => {
    const generateCategoryFilters = () => {
      return filteredCategories.map(generateCategoryFilterItem);
    };

    setCategoryFilters(generateCategoryFilters());
  }, [
    filters,
    checkedBoxes,
    filteredCategories,
    dispatch,
    generateCategoryFilterItem,
  ]);

  useEffect(() => {
    const generateFilterMenu = () => {
      return (
        <div className="filter-modal__categories">
          <Button
            onClick={() => {
              setActiveFilter('category');
            }}
          >
            {`Categories${
              filters.category ? ` ${filters.category.length}` : ''
            }`}
          </Button>
        </div>
      );
    };
    setFilterMenu(generateFilterMenu());
  }, [categoryFilters, filters]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [categories, searchText]);

  useEffect(() => {
    switch (activeFilter) {
      case 'category': {
        setActiveFilterOptions(categoryFilters);
        break;
      }
      default:
        setActiveFilterOptions([]);
    }
  }, [activeFilter, categoryFilters]);

  useEffect(() => {
    const handleCheckboxes = () => {
      return Object.entries(filtersRef.current)
        .map(([category, list]) => {
          return list.map((filter) => {
            return `checkbox-${category}-${filter}`;
          });
        })
        .flat();
    };
    filtersRef.current = filters;
    setCheckedBoxes(handleCheckboxes());
  }, [filters]);

  return (
    <div className="filter-modal__body">
      <div className="filter-modal__menu">
        {filterMenu}
        <div className="filter-modal__options">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          {activeFilterOptions}
        </div>
        {activeFilterComponents}
      </div>
      <Button onClick={() => modalHandler(false)}>Done</Button>
    </div>
  );
};

FilterModalContent.propTypes = {
  filters: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default FilterModalContent;
