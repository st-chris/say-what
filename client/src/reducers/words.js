import { GET_WORDS, WORDS_ERROR, CLEAR_WORDS } from '../actions/types';

const initialState = {
  words: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORDS:
      return {
        ...state,
        words: payload,
        loading: false
      };
    case CLEAR_WORDS:
      return {
        ...state,
        words: null,
        loading: false
      };
    case WORDS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
