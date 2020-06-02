/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Button, { BUTTON_APPEARANCE } from './Button';

const FilterPopupContent = ({
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

  const handleActiveFilterMenuChange = (filterCategory) => {
    setSearchText('');
    setActiveFilter(filterCategory);
  };

  const generateCategoryFilterItem = useCallback(
    (category, filter) => {
      return (
        <label
          key={`${category}-${filter}`}
          className="form__input form__checkbox"
        >
          {filter}
          <input
            type="checkbox"
            id={`checkbox-${category}-${filter}`}
            onChange={() => handleFilterChange(category, filter)}
            checked={checkedBoxes.includes(`checkbox-${category}-${filter}`)}
          />
          <span className="fake" />
        </label>
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
      const buttonClass = classNames('filter-popup__nav-item', {
        active: filterCategory === activeFilter,
      });

      return (
        <button
          type="button"
          className={buttonClass}
          key={filterCategory}
          onClick={() => {
            handleActiveFilterMenuChange(filterCategory);
          }}
        >
          {filterObj.label}
          <span className="filter-popup__nav-item-count">
            {newFilters[filterCategory] ? newFilters[filterCategory].length : 0}
          </span>
        </button>
      );
    },
    [newFilters, activeFilter]
  );

  useEffect(() => {
    const generateFilterMenu = () => {
      return (
        <div className="filter-popup__content-item filter-popup__nav">
          {Object.entries(filterMap).map(generateCategoryButton)}
        </div>
      );
    };

    if (!activeFilter) {
      setActiveFilter(_.head(_.head(Object.entries(filterMap))));
    }

    setFilterMenu(generateFilterMenu());
  }, [filterMap, newFilters, activeFilter, generateCategoryButton]);

  useEffect(() => {
    setFilteredOptions(
      Object.entries(filterMap).reduce((prev, [filterCategory, filterObj]) => {
        prev[filterCategory] = filterObj.values.filter((value) =>
          value.toLowerCase().includes(searchText.toLowerCase())
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
        <div className="filter-popup__content-item filter-popup__content-item--padded filter-popup__selected">
          <span>{`${countTotalSelections()} SELECTED`}</span>
          {Object.entries(filterMap).map(([filterCategory, filterObj]) => {
            const pills = newFilters[filterCategory]
              ? Object.values(newFilters[filterCategory]).map((filter) => {
                  return (
                    <button
                      type="button"
                      className="filter-popup__pill"
                      key={`${filterCategory}-${filter}`}
                      onClick={() => removeFilter(filterCategory, filter)}
                    >
                      {filter}
                    </button>
                  );
                })
              : [];

            if (_.isEmpty(pills)) {
              return null;
            }

            return (
              <div
                key={filterCategory}
                className="filter-popup__selected-category"
              >
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
    <div className="filter-popup">
      <div className="filter-popup__content">
        {filterMenu}
        <div className="filter-popup__content-item filter-popup__content-item--padded">
          <div className="filter-popup__search-wrapper">
            <input
              className="filter-popup__search"
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="filter-popup__list">
            {categorizedFilters[activeFilter]}
          </div>
        </div>
        {activeFilterComponents}
      </div>
      <div className="filter-popup__buttons">
        <Button
          buttonAppearance={BUTTON_APPEARANCE.CLEAR}
          onClick={() => modalHandler(false)}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit}>Apply</Button>
      </div>
    </div>
  );
};

FilterPopupContent.propTypes = {
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

export default FilterPopupContent;
