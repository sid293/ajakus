import React from 'react';
// import './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
