/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactSelect, { components } from 'react-select';

const getSingleValue = (prefix) => ({ children, ...props }) => (
  <components.SingleValue {...props}>
    {prefix}
    &nbsp;&nbsp;
    <b>{children}</b>
  </components.SingleValue>
);

const Select = ({
  small,
  disabled,
  options,
  defaultValue,
  value,
  onChange,
  prefix,
  placeholder,
}) => {
  const classes = classNames('select', {
    'select--small': small,
  });

  const isObject = _.isObject(_.head(options));

  const realOptions = !isObject
    ? _.map(options, (v) => ({ value: v, label: v }))
    : options;

  let realValue = value;
  if (value && !isObject) {
    realValue = { value, label: value };
  }

  const handleChange = (selectedValue) =>
    isObject ? onChange(selectedValue) : onChange(selectedValue.value);

  return (
    <ReactSelect
      placeholder={placeholder}
      className={classes}
      classNamePrefix="select"
      onChange={handleChange}
      defaultValue={defaultValue || realOptions[0]}
      value={realValue}
      isDisabled={disabled}
      isLoading={false}
      isClearable={false}
      isRtl={false}
      isSearchable={false}
      name="color"
      options={realOptions}
      components={{
        SingleValue: prefix ? getSingleValue(prefix) : components.SingleValue,
      }}
    />
  );
};

Select.propTypes = {
  small: PropTypes.bool,
};

Select.defaultProps = {
  small: false,
};

export default Select;
