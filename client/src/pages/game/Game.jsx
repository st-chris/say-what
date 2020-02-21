import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getProfile,
  correctDeleteWord,
  addToCount
} from '../../actions/profile';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlay,
  faPlus,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { alphabet } from '../../assets/nl';
import TitleBar from '../../components/title-bar/TitleBar';
import CustomButton from '../../components/custom-button/CustomButton';
import './game.css';

let woorden = [];
let roundLength = 0;
let score = 0;
let wordCount = 0;
let attempts = 0;

const Game = ({
  profile: { profile, loading },
  getProfile,
  correctDeleteWord,
  addToCount
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  // Keep track of words left
  const gameCount = () =>
    (document.getElementById('game-count').textContent =
      wordCount + '/' + roundLength);

  // Score in round
  const setScore = () =>
    (document.getElementById('score').textContent = score + '/' + roundLength);

  // Change the info text above the buttons
  const gameInfoText = text => {
    document.getElementById('game-info').textContent = text;
  };

  // Initialize new game
  const newGame = () => {
    score = 0;
    for (let letter of alphabet) {
      if (profile.words[letter].length) {
        let randomNum = Math.floor(
          Math.random() * profile.words[letter].length
        );
        woorden.push([profile.words[letter][randomNum], letter, randomNum]);
      }
    }
    document.getElementById('input').value = '';
    roundLength = woorden.length;
    wordCount = woorden.length;
    gameCount();
    setScore();
    playWord();
    gameInfoText('Click "Play Word" to repeat the audio');
    console.log(woorden);
  };

  // Next word
  // const next = () => {
  //   hasPressedEnter = false;
  //   if (woorden.length > 1) {
  //     gameCount();
  //     playWord();
  //     gameInfoText('Click "Play Word" to repeat the audio');
  //     document.getElementById('input').value = '';
  //     document.getElementById('game').style.background = '#f7f8f9';
  //   } else {
  //     gameInfoText(
  //       'This is the last word. Click New Game to start a new round.'
  //     );
  //   }
  // };

  // Previous word
  // const prev = () => {
  //   hasPressedEnter = false;
  //   if (woorden.length > 1) {
  //     gameCount();
  //     playWord();
  //   }
  //   document.getElementById('input').value = '';
  //   document.getElementById('game').style.background = '#f7f8f9';
  // };

  // Play the current word
  const playWord = () => {
    console.log(woorden);
    var to_speak = new SpeechSynthesisUtterance(woorden[0][0]);
    to_speak.lang = 'nl-NL';
    to_speak.voice = window.speechSynthesis
      .getVoices()
      .filter(v => v.lang === 'nl-NL')[0];
    window.speechSynthesis.speak(to_speak);
  };

  // CHeck if input is correct
  const checkWord = e => {
    e.preventDefault();
    // Action to increase words played count (see profile page)
    addToCount('words');
    // Increase amount of attempts
    attempts++;

    let input = document.getElementById('input').value.toLowerCase();
    const gameDiv = document.getElementById('game');
    // If correct
    if (input === woorden[0][0]) {
      // Color background green
      gameDiv.classList.add('green');
      // Increase score
      score++;
      // Decrease words left
      wordCount--;
      setScore();
      gameCount();
      gameInfoText('Correct!');
      // Action to increase words correct count (see profile page)
      addToCount('correct');
      correctDeleteWord([woorden[0][1], woorden[0][0]]);
      woorden.splice(0, 1);
      if (woorden.length) {
        setTimeout(function() {
          gameDiv.classList.remove('green');
          playWord();
          gameInfoText('Click "Play Word" to repeat the audio');
          document.getElementById('input').value = '';
        }, 2000);
      } else {
        setTimeout(function() {
          gameDiv.classList.remove('green');
          gameInfoText('Click "New game" to start a new round');
          document.getElementById('input').value = '';
        }, 2000);
      }
      console.log(woorden);
    } else {
      gameDiv.classList.add('red');
      if (attempts < 3) {
        gameInfoText('Wrong! Please try again.');
      } else {
        gameInfoText("Wrong! You'll get the next word.");
        woorden.splice(0, 1);
        document.getElementById('input').value = '';
        attempts = 0;
      }
      setTimeout(function() {
        gameDiv.classList.remove('red');
        playWord();
        gameInfoText('Click "Play Word" to repeat the audio');
      }, 1500);
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
                Score: <span id='score'>0 / 0</span>
              </div>
              <div id='game-count-box'>
                Words left: <span id='game-count'>0 / 0</span>
              </div>
            </div>
            <div id='game' className='game'>
              <div id='controls'>
                <form onSubmit={e => checkWord(e)}>
                  <input
                    id='input'
                    placeholder='answer'
                    className='answer'
                    type='text'
                  />
                  <button className='btn-first btn-answer' type='submit'>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </form>
              </div>
            </div>
            <div id='game-info' className='game-info w-100 text-center'>
              Press 'New game' to start!
            </div>
            <div className='buttons w-100'>
              <CustomButton onClick={playWord} side='left'>
                <FontAwesomeIcon icon={faPlay} /> Play word
              </CustomButton>
              <CustomButton onClick={newGame} side='right'>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getProfile,
  correctDeleteWord,
  addToCount
})(Game);
