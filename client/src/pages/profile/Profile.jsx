import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';
import TitleBar from '../../components/title-bar/TitleBar';
import CustomButton from '../../components/custom-button/CustomButton';

const Profile = ({
  getProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <Fragment>
      <TitleBar title='Profile' />
      <div className='content w-100'>
        {loading || profile === null ? (
          <div className='text-center text-top'>Loading...</div>
        ) : (
          <Fragment>
            <div className='text-center text-top'>
              Profile of {user && user.name}
            </div>
            <div className='text-center'>
              Words played: {profile.stats.words}
            </div>
            <div className='text-center'>
              Words correct: {profile.stats.correct}
            </div>
          </Fragment>
        )}

        <div className='buttons w-100'>
          <CustomButton to='/' side='left'>
            Play
          </CustomButton>
          <CustomButton side='right'>Back</CustomButton>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile })(Profile);
