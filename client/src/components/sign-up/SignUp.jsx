import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../../actions/auth';
import TitleBar from '../title-bar/TitleBar';
import PropTypes from 'prop-types';

const SignUp = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords dont match');
    } else {
      signup({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <TitleBar title='Sign up' />
      <div className='content w-100'>
        <div className='text-center text-top'>
          <small>
            Already have an account? <Link to='/signin'>Sign in!</Link>
          </small>
        </div>
        <form onSubmit={e => onSubmit(e)}>
          <FormInput
            type='text'
            label='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
          <FormInput
            type='email'
            label='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
          <FormInput
            type='password'
            label='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
          <FormInput
            type='password'
            label='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />

          <div className='buttons w-100'>
            <CustomButton type='submit' side='left'>
              Sign Up
            </CustomButton>
            <CustomButton side='right'>Back</CustomButton>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);
