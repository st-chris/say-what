import {
  NEW_GAME,
  INCREMENT,
  DELETE_WORD,
  CHANGE_GAME_INFO,
  GAME_ERROR,
  CLEAR_GAME,
  RESET_ATTEMPTS
} from '../actions/types';
import { deleteWordFromGame } from '../utils/game';

const initialState = {
  woorden: [],
  roundLength: 0,
  score: 0,
  wordCount: 0,
  attempts: 0,
  gameInfo: "Press 'New game' to start!"
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NEW_GAME:
      return {
        ...state,
        woorden: payload,
        roundLength: payload.length,
        score: 0,
        wordCount: 0,
        attempts: 0
      };
    case CHANGE_GAME_INFO:
      return {
        ...state,
        gameInfo: payload
      };
    case INCREMENT:
      return {
        ...state,
        [payload]: state[payload] + 1
      };
    case DELETE_WORD:
      return {
        ...state,
        woorden: deleteWordFromGame(state.woorden, payload)
      };
    case RESET_ATTEMPTS:
      return {
        ...state,
        attempts: state.attempts - state.attempts
      };
    case CLEAR_GAME:
      return {
        ...state,
        game: null,
        loading: false
      };
    case GAME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
