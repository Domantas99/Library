import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ title, actions, children, className }) => {
  return (
    <div className={`panel ${className}`}>
      <div className="panel__header">
        <h1>{title}</h1>
        {actions && <div className="panel__actions">{actions}</div>}
      </div>
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
};

Panel.defaultProps = {
  title: '',
  className: '',
  actions: null,
};

export default Panel;
