import React from 'react';

import './form-input.css';

const FormInput = ({ onChange, label, ...otherProps }) => (
  <div className='group'>
    {label ? (
      <label htmlFor='email' className='form-input-label'>
        {label}
      </label>
    ) : null}
    <input className='form-input' onChange={onChange} {...otherProps} />
  </div>
);

export default FormInput;
