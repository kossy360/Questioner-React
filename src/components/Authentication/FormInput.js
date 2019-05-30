import React from 'react';
import propTypes from 'prop-types';

const FormInput = ({
  form: { touched, errors },
  field,
  ...props
}) => {
  const randomId = Math.random().toString();
  return (
    <div className="input-container">
      <label htmlFor={randomId} className="input-label">{field.name}</label>
      <input
        {...field}
        {...props}
        id={randomId}
        pointer="phonenumber"
        className={`signup-form-input form-input ${touched[field.name]
          && errors[field.name] && 'input-error'}`}
      />
      {touched[field.name]
      && errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  );
};

FormInput.propTypes = {
  form: propTypes.object.isRequired,
  field: propTypes.object.isRequired,
};

export default FormInput;
