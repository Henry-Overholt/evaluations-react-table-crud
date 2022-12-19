import React from 'react';
import './toaster-message.css';

function ToasterMessageComponent({ message, color, onButtonClicked }) {
  return (
    <div className="toasterMessageContainer" style={{ backgroundColor: color }}>
      <span>{message}</span>
      <button onClick={onButtonClicked}>Dismiss</button>
    </div>
  );
}

export default ToasterMessageComponent;
