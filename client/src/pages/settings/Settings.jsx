import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile, saveProfileSettings } from '../../actions/profile';
import TitleBar from '../../components/title-bar/TitleBar';
import CustomButton from '../../components/custom-button/CustomButton';

import './settings.css';

const Settings = ({
  getProfile,
  saveProfileSettings,
  auth: { user },
  profile: { profile, loading }
}) => {
  const [formData, setFormData] = useState({
    voice_speed: 1
  });
  useEffect(() => {
    if (!profile) getProfile();
    if (!loading) setFormData({ voice_speed: profile.voice_speed });
  }, [loading, getProfile, profile]);

  const { voice_speed } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(voice_speed.toString());
    saveProfileSettings({ voice_speed });
  };

  return (
    <Fragment>
      <TitleBar title='Settings' />
      <div className='content w-100'>
        {loading || profile === null ? (
          <Fragment>
            <div className='text-center text-top'>Loading...</div>
            <div className='one-button w-100'>
              <CustomButton to='/' side='both'>
                Play
              </CustomButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='text-center text-top'>
              Game settings of {user && user.name}
            </div>
            <form className='form-settings' onSubmit={onSubmit}>
              <div className='stats p-10 text-center'>
                <label htmlFor='voice_speed'>Voice speed:</label>
                <input
                  type='range'
                  id='voice_speed'
                  name='voice_speed'
                  onChange={e => onChange(e)}
                  min='0.1'
                  max='1'
                  value={voice_speed}
                  step='0.1'
                />
              </div>
              <div className='one-button w-100'>
                <CustomButton type='submit' side='both'>
                  Save settings
                </CustomButton>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Settings.propTypes = {
  getProfile: PropTypes.func.isRequired,
  saveProfileSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile, saveProfileSettings })(
  Settings
);
