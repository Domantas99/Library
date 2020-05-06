/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../store/library/actions";

export default ({dataAction}) => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.library.filters);
    const [filterElements, setFilterElements] = useState([]);

    const filterNames = {
        category: "Category",
        offices: "Office",
        authors: "Author"
    };

    const removeFilter = (key, filter) => {
        let newFilters = {...filters};
        newFilters[key] = newFilters[key].filter((item) => item !== filter);
        dispatch(setFilters(newFilters));
    }

    const createFilterPill = (key, filter) => {
        return (
          <button
            className="book-details__filter-pill"
            key={`${key}-${filter}`}
            onClick={()=>removeFilter(key, filter)}
          >
            {`${filterNames[key]}: ${filter}`}
          </button>
        );
    }

    const createFilterElements = (filters) => {
        let elements = [];
        for (let key in filters) {
          if (Array.isArray(filters[key])){
            filters[key].forEach((filter) => {
              elements.push(createFilterPill(key, filter));
            });
          } else {
            elements.push(createFilterPill(key, filters[key]));
          }
        }
        return elements;
      }
    
    useEffect(() => {
        dispatch(dataAction(filters));
    }, [filters]);

    useEffect(() => {
        setFilterElements(createFilterElements(filters));
    }, [filters]);
    
    return filterElements;
}