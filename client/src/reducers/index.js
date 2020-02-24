import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import game from './game';

export default combineReducers({ auth, profile, game });
