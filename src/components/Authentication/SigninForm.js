import React from 'react';
import propTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import FormInput from './FormInput';

const validation = yup.object({
  Email: yup.string().email('The email you entered is not valid').required(),
  Password: yup.string().min(6, 'Password must be more than 6 characters')
    .max(12, 'Password cannot exceed 6 characters').required(),
});

const Form = ({
  handleSubmit, isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="signin-container">
      <Field type="text" name="Email" component={FormInput} />
      <Field type="password" name="Password" component={FormInput} />
      <div className="button-container">
        <button className="submit-button" id="signin-button" type="submit">
          {isSubmitting ? '...' : 'Enter'}
        </button>
      </div>
    </div>
  </form>
);

const SigninForm = ({ handleSubmit, isSubmitting }) => (
  <Formik
    initialValues={{
      Email: '',
      Password: '',
    }}
    onSubmit={handleSubmit}
    validationSchema={validation}
    component={Form}
    isSubmitting={isSubmitting}
  />
);

Form.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  isSubmitting: propTypes.bool.isRequired,
};

SigninForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  isSubmitting: propTypes.bool.isRequired,
};

export default SigninForm;
