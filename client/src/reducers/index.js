import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import words from './words';

export default combineReducers({ auth, profile, words });
