/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthors, setFilters } from '../store/library/actions';
import { getOffices } from '../store/office/actions';
import Button from './Button';

const FilterModalContent = ({ filters, labels, modalHandler }) => {
  const [newFilters, setNewFilters] = useState({ ...filters });
  const dispatch = useDispatch();
  const [filterMenu, setFilterMenu] = useState([]);
  // These will be the actual elements for filtering
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [officeFilters, setOfficeFilters] = useState([]);
  const [authorFilters, setAuthorFilters] = useState([]);
  // These two trach which is the currently active filtering category
  const [activeFilter, setActiveFilter] = useState('');
  const [activeFilterOptions, setActiveFilterOptions] = useState([]);
  // These generate pills for all active filters
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

  // Callbacks all over because of stale state issues.
  const filterIsActive = useCallback(
    (key, filter) => {
      return newFilters[key] && newFilters[key].includes(filter);
    },
    [newFilters]
  );

  const removeFilter = useCallback(
    (key, filter) => {
      const nextFilters = { ...newFilters };
      nextFilters[key] = nextFilters[key].filter((item) => item !== filter);
      setNewFilters(nextFilters);
    },
    [newFilters]
  );

  const addFilter = useCallback(
    (key, filter) => {
      const nextFilters = { ...newFilters };
      if (nextFilters[key]) {
        if (!Object.values(nextFilters[key]).includes(filter)) {
          nextFilters[key] = [...nextFilters[key], filter];
        }
      } else {
        nextFilters[key] = [filter];
      }
      setNewFilters(nextFilters);
    },
    [newFilters]
  );

  const handleFilterChange = useCallback(
    (category, filter) => {
      if (filterIsActive(category, filter)) {
        removeFilter(category, filter);
      } else {
        addFilter(category, filter);
      }
    },
    [addFilter, removeFilter, filterIsActive]
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
    newFilters,
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
  }, [
    newFilters,
    statuses,
    checkedBoxes,
    dispatch,
    generateCategoryFilterItem,
  ]);

  useEffect(() => {
    const generateOfficeFilters = () => {
      return filteredOffices
        .map((office) => ['offices', office.name])
        .map(generateCategoryFilterItem);
    };

    setOfficeFilters(generateOfficeFilters());
  }, [
    newFilters,
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
    newFilters,
    checkedBoxes,
    filteredAuthors,
    dispatch,
    generateCategoryFilterItem,
  ]);

  const generateCategoryButton = useCallback(
    (category) => {
      return (
        <Button
          key={category}
          onClick={() => {
            setActiveFilter(category);
          }}
        >
          {`${labels[category]}${
            newFilters[category] ? ` ${newFilters[category].length}` : ' 0'
          }`}
        </Button>
      );
    },
    [labels, newFilters]
  );

  useEffect(() => {
    const generateFilterMenu = () => {
      return (
        <div className="filter-modal__categories">
          {Object.keys(labels).map(generateCategoryButton)}
        </div>
      );
    };
    setFilterMenu(generateFilterMenu());
  }, [labels, categoryFilters, newFilters, generateCategoryButton]);

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
    const countTotalSelections = () => {
      return Object.values(newFilters)
        .map((value) => value.length)
        .reduce((prev, curr) => {
          return prev + curr;
        }, 0);
    };
    const generateActiveFilterComponents = () => {
      return (
        <div className="filter-modal__active">
          <span>{`${countTotalSelections()} SELECTED`}</span>
          {Object.keys(labels).map((category) => {
            const pills = newFilters[category]
              ? Object.values(newFilters[category]).map((filter) => {
                  return (
                    <Button
                      key={`${category}-${filter}`}
                      onClick={() => removeFilter(category, filter)}
                    >
                      {`${labels[category]}: ${filter}`}
                    </Button>
                  );
                })
              : [];
            return (
              <div key={category}>
                <span>{labels[category]}</span>
                {pills}
              </div>
            );
          })}
        </div>
      );
    };
    setActiveFilterComponents(generateActiveFilterComponents());
  }, [newFilters, labels, removeFilter]);

  useEffect(() => {
    const handleCheckboxes = () => {
      return Object.entries(newFilters)
        .map(([category, list]) => {
          return list.map((filter) => {
            return `checkbox-${category}-${filter}`;
          });
        })
        .flat();
    };
    setCheckedBoxes(handleCheckboxes());
  }, [newFilters]);

  useEffect(() => {
    dispatch(getOffices());
    dispatch(getAuthors());
  }, [dispatch]);

  const onSubmit = () => {
    dispatch(setFilters(newFilters));
    modalHandler(false);
  };

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
      <div className="filter-modal__buttons">
        <Button onClick={() => modalHandler(false)}>Cancel</Button>
        <Button onClick={onSubmit}>Apply</Button>
      </div>
    </div>
  );
};

FilterModalContent.propTypes = {
  filters: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default FilterModalContent;
