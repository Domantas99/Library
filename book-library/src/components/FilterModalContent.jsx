/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

const FilterModalContent = ({
  filters,
  filterMap,
  setFilterAction,
  modalHandler,
}) => {
  const [newFilters, setNewFilters] = useState({ ...filters });
  const dispatch = useDispatch();
  const [filterMenu, setFilterMenu] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [activeFilterComponents, setActiveFilterComponents] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState({});
  const [categorizedFilters, setCategorizedFilters] = useState({});
  const [searchText, setSearchText] = useState('');

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
    (category, filter) => {
      return (
        filter === Object(filter) ? 
        <div key={`${category}-${filter.value}`}>
          <input
            type="checkbox"
            id={`checkbox-${category}-${filter.value}`}
            onChange={() => handleFilterChange(category, filter.value)}
            checked={checkedBoxes.includes(`checkbox-${category}-${filter.value}`)}
          />
          <label htmlFor={`checkbox-${category}-${filter.value}`}>{filter.text}</label>
          </div>
        :
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
    const generateCategorizedFilters = () => {
      return Object.entries(filteredOptions).reduce(
        (prev, [filterCategory, filterValues]) => {
          prev[filterCategory] = filterValues.map((value) =>
            generateCategoryFilterItem(filterCategory, value)
          );
          return prev;
        },
        {}
      );
    };
    setCategorizedFilters(generateCategorizedFilters());
  }, [
    newFilters,
    checkedBoxes,
    filteredOptions,
    dispatch,
    generateCategoryFilterItem,
  ]);

  const generateCategoryButton = useCallback(
    ([filterCategory, filterObj]) => {
      return (
        <Button
          key={filterCategory}
          onClick={() => {
            setActiveFilter(filterCategory);
          }}
        >
          {`${filterObj.label}${
            newFilters[filterCategory]
              ? ` ${newFilters[filterCategory].length}`
              : ' 0'
          }`}
        </Button>
      );
    },
    [newFilters]
  );

  useEffect(() => {
    const generateFilterMenu = () => {
      return (
        <div className="filter-modal__categories">
          {Object.entries(filterMap).map(generateCategoryButton)}
        </div>
      );
    };
    setFilterMenu(generateFilterMenu());
  }, [filterMap, newFilters, generateCategoryButton]);

  useEffect(() => {
    setFilteredOptions(
      Object.entries(filterMap).reduce((prev, [filterCategory, filterObj]) => {
        prev[filterCategory] = filterObj.values.filter((value) =>
          (value === Object(value) ? value.text : value).toLowerCase().includes(searchText.toLowerCase())
        );
        return prev;
      }, {})
    );
  }, [filterMap, searchText]);

  useEffect(() => {
    const countTotalSelections = () => {
      return Object.entries(newFilters)
        .map(([key, value]) => (filterMap[key] ? value.length : 0))
        .reduce((prev, curr) => {
          return prev + curr;
        }, 0);
    };
    const generateActiveFilterComponents = () => {
      return (
        <div className="filter-modal__active">
          <span>{`${countTotalSelections()} SELECTED`}</span>
          {Object.entries(filterMap).map(([filterCategory, filterObj]) => {
            const pills = newFilters[filterCategory]
              ? Object.values(newFilters[filterCategory]).map((filter) => {
                  return (
                    <Button
                      key={`${filterCategory}-${filter}`}
                      onClick={() => removeFilter(filterCategory, filter)}
                    >
                      {`${filterObj.label}: ${filter}`}
                    </Button>
                  );
                })
              : [];
            return (
              <div key={filterCategory}>
                <span>{filterObj.label}</span>
                {pills}
              </div>
            );
          })}
        </div>
      );
    };
    setActiveFilterComponents(generateActiveFilterComponents());
  }, [newFilters, filterMap, removeFilter]);

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

  const onSubmit = () => {
    dispatch(setFilterAction(newFilters));
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
            onChange={(e) => setSearchText(e.target.value)}
          />
          {categorizedFilters[activeFilter]}
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
  filters: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
  filterMap: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    values: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  }).isRequired,
  setFilterAction: PropTypes.func.isRequired,
  modalHandler: PropTypes.func.isRequired,
};

export default FilterModalContent;
