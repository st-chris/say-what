import React from 'react';
import './custom-button.css';
import { Link } from 'react-router-dom';

const CustomButton = ({ children, side, icon, ...otherProps }) => {
  const Component = otherProps.to ? Link : 'button';

  return (
    <Component
      className={`custom-button ${side ? side : ''} ${icon ? 'icon' : ''} ${
        otherProps.to ? 'link' : ''
      }`}
      {...otherProps}
    >
      {children}
    </Component>
  );
};

export default CustomButton;
