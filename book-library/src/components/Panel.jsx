import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ title, actions, children, className, tabs }) => {
  return (
    <div className={`panel ${className}`}>
      <div className="panel__header">
        <h1>{title}</h1>
        {actions && <div className="panel__actions">{actions}</div>}
      </div>
      {!!tabs && (
        <div className="panel__tabs">
          {tabs}
        </div>
      )}
      <div className="panel__content">{children}</div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  tabs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Panel.defaultProps = {
  title: '',
  className: '',
  actions: null,
  tabs: null,
};

export default Panel;
