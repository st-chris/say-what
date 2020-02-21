import axios from 'axios';

import { GET_WORDS, WORDS_ERROR } from './types';

// Get words for game
export const getWords = () => async dispatch => {
  try {
    const res = await axios.get('/api/words');

    dispatch({
      type: GET_WORDS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: WORDS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
