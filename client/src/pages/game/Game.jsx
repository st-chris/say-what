import React, { Fragment, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  getProfile,
  correctDeleteWord,
  addToCount
} from '../../actions/profile';
import {
  newGame,
  incr,
  deleteWord,
  resetAttempts,
  changeGameInfo
} from '../../actions/game';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlay,
  faPlus,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import TitleBar from '../../components/title-bar/TitleBar';
import CustomButton from '../../components/custom-button/CustomButton';
import './game.css';

const Game = ({
  profile: { profile, loading },
  game: { woorden, roundLength, score, wordCount, attempts, gameInfo },
  getProfile,
  correctDeleteWord,
  addToCount,
  incr,
  newGame,
  changeGameInfo,
  deleteWord,
  resetAttempts
}) => {
  // Clean up for new word
  const newWord = useCallback(() => {
    let input = document.getElementById('input');
    let gameDiv = document.getElementById('game');
    if (input) input.value = '';
    if (gameDiv) {
      gameDiv.classList.remove('green');
      gameDiv.classList.remove('red');
    }
    changeGameInfo('Click "Play Word" to repeat the audio');
  }, [changeGameInfo]);

  // Play the current word
  const playWord = useCallback(
    words => {
      if (words.length) {
        var to_speak = new SpeechSynthesisUtterance(words[0][0]);
        to_speak.lang = 'nl-NL';
        to_speak.rate = Number(profile.voice_speed);
        to_speak.voice = window.speechSynthesis
          .getVoices()
          .filter(v => v.lang === 'nl-NL')[0];
        window.speechSynthesis.speak(to_speak);
      }
    },
    [profile]
  );

  useEffect(() => {
    if (!profile) getProfile();
    if (woorden.length) {
      let timer = setTimeout(() => {
        newWord();
        playWord(woorden);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [getProfile, newWord, playWord, profile, woorden]);

  // Initialize new game
  const newRound = () => {
    newGame(profile.words);
    newWord();
  };

  // Check if input is correct
  const checkWord = async e => {
    e.preventDefault();
    // Action to increase words played count (see profile page)
    addToCount('words');
    // Increase amount of attempts
    incr('attempts');

    let input = document.getElementById('input');
    const gameDiv = document.getElementById('game');
    // If correct
    if (input.value.toLowerCase() === woorden[0][0]) {
      correctDeleteWord([woorden[0][1], woorden[0][0]]);
      deleteWord(0);
      // Color background green
      gameDiv.classList.add('green');
      changeGameInfo('Correct!');
      // Action to increase words correct count (see profile page)
      incr('score');
      incr('wordCount');
      addToCount('correct');
      resetAttempts();
      if (woorden.length > 1) {
        setTimeout(function() {
          newWord();
        }, 1500);
      } else {
        setTimeout(function() {
          gameDiv.classList.remove('green');
          changeGameInfo('Click "New game" to start a new round');
          if (input.value) input.value = '';
        }, 1500);
      }
    } else {
      gameDiv.classList.add('red');
      if (attempts < 2) {
        changeGameInfo('Wrong! Please try again.');
        setTimeout(function() {
          if (input.value) input.value = '';
          gameDiv.classList.remove('red');
          // playWord(woorden);
        }, 1000);
      } else {
        incr('wordCount');
        changeGameInfo("Wrong! You'll get the next word.");
        deleteWord(0);
        resetAttempts();
      }
    }
  };

  return (
    <Fragment>
      <TitleBar title='Say what?!' />
      <div className='content w-100'>
        {loading ? (
          <Fragment>
            <div className='text-center text-top one-message'>Loading...</div>
            <div className='one-button w-100'>
              <CustomButton to='/' side='both'>
                Loading
              </CustomButton>
            </div>
          </Fragment>
        ) : profile === null ? (
          <Fragment>
            <div className='text-center text-top one-message'>
              Please sign in to play the game
            </div>
            <div className='one-button w-100'>
              <CustomButton to='/signin' side='both'>
                <FontAwesomeIcon icon={faUser} /> Sign in
              </CustomButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className='game-stats w-100 text-center text-top'>
              <div id='score-box'>
                Score:{' '}
                <span id='score'>
                  {score} / {roundLength}
                </span>
              </div>
              <div id='game-count-box'>
                Words:{' '}
                <span id='game-count'>
                  {wordCount} / {roundLength}
                </span>
              </div>
            </div>
            {woorden.length ? (
              <div id='game' className='game'>
                <form onSubmit={e => checkWord(e)}>
                  <input
                    id='input'
                    placeholder='answer'
                    className='answer'
                    type='text'
                    required
                  />
                  <button className='btn-first btn-answer' type='submit'>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </form>
              </div>
            ) : (
              ''
            )}
            <div id='game-info' className='game-info w-100 text-center'>
              {gameInfo}
            </div>
            <div className='buttons w-100'>
              <CustomButton onClick={e => playWord(woorden)} side='left'>
                <FontAwesomeIcon icon={faPlay} /> Play word
              </CustomButton>
              <CustomButton onClick={newRound} side='right'>
                <FontAwesomeIcon icon={faPlus} /> New Game
              </CustomButton>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Game.propTypes = {
  getProfile: PropTypes.func.isRequired,
  correctDeleteWord: PropTypes.func.isRequired,
  addToCount: PropTypes.func.isRequired,
  incr: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired,
  changeGameInfo: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired,
  resetAttempts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  game: state.game
});

export default connect(mapStateToProps, {
  getProfile,
  correctDeleteWord,
  addToCount,
  incr,
  newGame,
  changeGameInfo,
  deleteWord,
  resetAttempts
})(Game);
