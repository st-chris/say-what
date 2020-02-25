import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCog,
  faSignInAlt,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { signout } from '../../actions/auth';
import './title-bar.css';
import CustomButton from '../custom-button/CustomButton';

const TitleBar = ({ auth: { isAuthenticated, loading }, signout, title }) => {
  return (
    <div className='title w-100 text-center'>
      <div>
        <CustomButton icon='true' to='/'>
          <FontAwesomeIcon icon={faHome} />
        </CustomButton>
      </div>
      <div>
        {!loading && isAuthenticated ? (
          <CustomButton icon='true' to='/profile'>
            <FontAwesomeIcon icon={faUser} />
          </CustomButton>
        ) : (
          <CustomButton icon='true' to='/signin'>
            <FontAwesomeIcon icon={faSignInAlt} />
          </CustomButton>
        )}
      </div>
      <div>{title}</div>
      {!loading && isAuthenticated && (
        <Fragment>
          <div>
            <CustomButton icon='true' to='/settings'>
              <FontAwesomeIcon icon={faCog} />
            </CustomButton>
          </div>
          <div>
            <CustomButton icon='true' to='/' onClick={signout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </CustomButton>
          </div>
        </Fragment>
      )}
    </div>
  );
};

TitleBar.propTypes = {
  signout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signout })(TitleBar);
