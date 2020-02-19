import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signin } from '../../actions/auth';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import TitleBar from '../title-bar/TitleBar';
import { Link, Redirect } from 'react-router-dom';

const SignIn = ({ signin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    signin({ email, password });
  };

  // Redirect logged in user
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <TitleBar title='Sign in' />
      <div className='content w-100'>
        <div className='text-center text-top'>
          <small>
            Don't have an account? <Link to='/signup'>Sign up!</Link>
          </small>
        </div>

        <form onSubmit={e => onSubmit(e)}>
          <FormInput
            name='email'
            type='email'
            label='Email'
            onChange={e => onChange(e)}
            value={email}
          />
          <FormInput
            name='password'
            type='password'
            label='Password'
            onChange={e => onChange(e)}
            value={password}
          />

          <div className='buttons w-100'>
            <CustomButton type='submit' side='left'>
              Sign In
            </CustomButton>
            <CustomButton side='right'>Back</CustomButton>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

SignIn.propTyps = {
  signin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signin })(SignIn);
