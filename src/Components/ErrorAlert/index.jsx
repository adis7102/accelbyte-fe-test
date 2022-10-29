import React from 'react';
import './styles.scss';

const ErrorAlert = (props) => {
  const { error } = props;

  return (
    <div className="error-alert">
      <p className="error-alert-title">Error!</p>
      <p className="error-alert-text">{error}</p>
    </div>
  )
}

export default ErrorAlert