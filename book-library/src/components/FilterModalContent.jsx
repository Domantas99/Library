/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthors, setFilters } from '../store/library/actions';
import { getOffices } from '../store/office/actions';
import Button from './Button';

const FilterModalContent = ({ filters, labels, modalHandler }) => {
  const filtersRef = useRef(filters);
  const dispatch = useDispatch();
  const [filterMenu, setFilterMenu] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [officeFilters, setOfficeFilters] = useState([]);
  const [authorFilters, setAuthorFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [activeFilterOptions, setActiveFilterOptions] = useState([]);
  const [activeFilterComponents, setActiveFilterComponents] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const categories = useSelector((state) => state.library.categories);
  // eslint-disable-next-line no-unused-vars
  const [statuses, setStatuses] = useState(['Available', 'Unavailable']);
  const offices = useSelector((state) => state.office.offices);
  const authors = useSelector((state) => state.library.authors);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredOffices, setFilteredOffices] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchBarEnabled, setSearchBarEnabled] = useState(false);

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
    ([category, filter]) => {
      return (
        <div key={`${category}-${filter}`}>
          <input
            type="checkbox"
            id={`checkbox-${category}-${filter}`}
            onChange={() => handleFilterChange(category, filter)}
            checked={checkedBoxes.includes(`checkbox-${category}-${filter}`)}
          />
          <label htmlFor={`checkbox-${category}-${filter}`}>{filter}</label>
        </div>
      );
    },
    [checkedBoxes, handleFilterChange]
  );

  useEffect(() => {
    const generateCategoryFilters = () => {
      return filteredCategories
        .map((category) => ['category', category])
        .map(generateCategoryFilterItem);
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
    const generateStatusFilters = () => {
      return statuses
        .map((status) => ['status', status])
        .map(generateCategoryFilterItem);
    };

    setStatusFilters(generateStatusFilters());
  }, [filters, statuses, checkedBoxes, dispatch, generateCategoryFilterItem]);

  useEffect(() => {
    const generateOfficeFilters = () => {
      return filteredOffices
        .map((office) => ['offices', office.name])
        .map(generateCategoryFilterItem);
    };

    setOfficeFilters(generateOfficeFilters());
  }, [
    filters,
    labels,
    checkedBoxes,
    filteredOffices,
    dispatch,
    generateCategoryFilterItem,
  ]);

  useEffect(() => {
    const generateAuthorFilters = () => {
      return filteredAuthors
        .map((author) => ['authors', author])
        .map(generateCategoryFilterItem);
    };

    setAuthorFilters(generateAuthorFilters());
  }, [
    filters,
    checkedBoxes,
    filteredAuthors,
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
            {`${labels.category}${
              filters.category ? ` ${filters.category.length}` : ''
            }`}
          </Button>
          <Button
            onClick={() => {
              setActiveFilter('status');
            }}
          >
            {`${labels.status}${
              filters.status ? ` ${filters.status.length}` : ''
            }`}
          </Button>
          <Button
            onClick={() => {
              setActiveFilter('offices');
            }}
          >
            {`${labels.offices}${
              filters.offices ? ` ${filters.offices.length}` : ''
            }`}
          </Button>
          <Button
            onClick={() => {
              setActiveFilter('authors');
            }}
          >
            {`${labels.authors}${
              filters.authors ? ` ${filters.authors.length}` : ''
            }`}
          </Button>
        </div>
      );
    };
    setFilterMenu(generateFilterMenu());
  }, [labels, categoryFilters, filters]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [categories, searchText]);

  useEffect(() => {
    setFilteredOffices(
      offices.filter((office) =>
        `${office.name} ${office.fullAddress}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    );
  }, [offices, searchText]);

  useEffect(() => {
    setFilteredAuthors(
      authors.filter((author) =>
        author.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [authors, searchText]);

  useEffect(() => {
    switch (activeFilter) {
      case 'category': {
        setSearchBarEnabled(true);
        setActiveFilterOptions(categoryFilters);
        break;
      }
      case 'status': {
        setSearchBarEnabled(false);
        setActiveFilterOptions(statusFilters);
        break;
      }
      case 'offices': {
        setSearchBarEnabled(true);
        setActiveFilterOptions(officeFilters);
        break;
      }
      case 'authors': {
        setSearchBarEnabled(true);
        setActiveFilterOptions(authorFilters);
        break;
      }
      default:
        setActiveFilterOptions([]);
    }
  }, [
    activeFilter,
    categoryFilters,
    statusFilters,
    officeFilters,
    authorFilters,
  ]);

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

  useEffect(() => {
    dispatch(getOffices());
    dispatch(getAuthors());
  }, [dispatch]);

  return (
    <div className="filter-modal__body">
      <div className="filter-modal__menu">
        {filterMenu}
        <div className="filter-modal__options">
          <input
            type="text"
            placeholder="Search"
            className={searchBarEnabled ? '' : 'hidden'}
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
