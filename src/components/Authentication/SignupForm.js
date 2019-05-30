import React from 'react';
import propTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import FormInput from './FormInput';

const validation = yup.object({
  Username: yup.string()
    .min(3, 'Username must be more than 3 characters')
    .max(10, 'Username cannot exceed 10 characters').required(),
  'First name': yup.string().required(),
  'Last name': yup.string().required(),
  'Other name': yup.string().required(),
  Email: yup.string().email('The email you entered is not valid').required(),
  'Phone number': yup.string().matches(/\d+/, 'Phone number invalid')
    .min(6, 'Phone cannot be less than 6 digits')
    .max(15, 'Phone cannot exceed 15 digitds')
    .required(),
  Password: yup.string().min(6, 'Password must be more than 6 characters')
    .max(12, 'Password cannot exceed 6 characters').required(),
  'Confirm password': yup.string()
    .when('Password', (value, schema) => schema.oneOf([value], 'Passwords do not match'))
    .required('')
});

const Form = ({
  handleSubmit, isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <div className="signup-container">
      <Field type="text" name="Username" component={FormInput} />
      <Field type="text" name="First name" component={FormInput} />
      <Field type="text" name="Last name" component={FormInput} />
      <Field type="text" name="Other name" component={FormInput} />
      <Field type="text" name="Email" component={FormInput} />
      <Field type="text" name="Phone number" component={FormInput} />
      <Field type="password" name="Password" component={FormInput} />
      <Field type="password" name="Confirm password" component={FormInput} />
      <div className="button-container">
        <button className="submit-button" id="signup-button" type="submit">
          {isSubmitting ? '...' : 'Join'}
        </button>
      </div>
    </div>
  </form>
);

const SignupForm = ({ handleSubmit }) => (
  <Formik
    initialValues={{
      Username: '',
      'First name': '',
      'Last name': '',
      'Other name': '',
      Email: '',
      'Phone number': '',
      Password: '',
      'Confirm password': '',
    }}
    onSubmit={handleSubmit}
    validationSchema={validation}
    component={Form}
  />
);

Form.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  isSubmitting: propTypes.bool.isRequired,
};

SignupForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};

export default SignupForm;
