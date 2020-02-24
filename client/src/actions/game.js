import { alphabet } from '../assets/nl';
import {
  NEW_GAME,
  INCREMENT,
  DELETE_WORD,
  RESET_ATTEMPTS,
  CHANGE_GAME_INFO
} from './types';

// Get words for game
export const newGame = words => async dispatch => {
  const data = [];
  for (let letter of alphabet) {
    if (words[letter].length) {
      let randomNum = Math.floor(Math.random() * words[letter].length);
      data.push([words[letter][randomNum], letter, randomNum]);
    }
  }
  dispatch({
    type: NEW_GAME,
    payload: data
  });
};

// Change game info
export const changeGameInfo = info => async dispatch => {
  dispatch({
    type: CHANGE_GAME_INFO,
    payload: info
  });
};

// Increment count or score
export const incr = type => async dispatch => {
  dispatch({
    type: INCREMENT,
    payload: type
  });
};

// Delete word from game array
export const deleteWord = index => async dispatch => {
  await dispatch({
    type: DELETE_WORD,
    payload: index
  });
};

// Reset the amount of attempts
export const resetAttempts = () => async dispatch => {
  dispatch({
    type: RESET_ATTEMPTS
  });
};
