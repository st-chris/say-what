import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faForward,
  faBackward,
  faArrowRight,
  faPlay,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { alphabet, getWords } from './assets/nl';

function App() {
  let woorden = [];
  let indexWord = 0;
  let score = 0;

  const gameCount = () =>
    (document.getElementById('game-count').textContent =
      indexWord + 1 + '/' + woorden.length);

  const setScore = () =>
    (document.getElementById('score').textContent =
      score + '/' + woorden.length);

  const gameInfoText = text => {
    document.getElementById('game-info').textContent = text;
  };

  const newGame = () => {
    woorden = [];
    indexWord = 0;
    score = 0;
    for (let letter of alphabet) {
      let randomNum = Math.floor(Math.random() * letter.length);
      woorden.push(...getWords(letter).splice(randomNum, 1));
    }
    document.getElementById('game').style.background = '#f7f8f9';
    document.getElementById('input').value = '';
    gameCount();
    setScore();
    playWord();
    gameInfoText('Click "Play Word" to repeat the audio');
    console.log(woorden);
  };

  const next = () => {
    if (indexWord < woorden.length - 1) {
      indexWord++;
      gameCount();
      playWord();
      gameInfoText('Click "Play Word" to repeat the audio');
      document.getElementById('input').value = '';
      document.getElementById('game').style.background = '#f7f8f9';
    } else {
      gameInfoText(
        'This is the last word. Click New Game to start a new game.'
      );
    }
  };
  const prev = () => {
    if (indexWord > 0) {
      indexWord--;
      gameCount();
      playWord();
    }
    document.getElementById('input').value = '';
    document.getElementById('game').style.background = '#f7f8f9';
  };

  const playWord = () => {
    var to_speak = new SpeechSynthesisUtterance(woorden[indexWord]);
    to_speak.voice = window.speechSynthesis
      .getVoices()
      .filter(v => v.lang === 'nl-NL')[0];
    window.speechSynthesis.speak(to_speak);
  };
  const checkWord = e => {
    e.preventDefault();
    let input = document.getElementById('input').value.toLowerCase();
    const gameDiv = document.getElementById('game');
    if (input === woorden[indexWord]) {
      gameDiv.style.background = 'green';
      score++;
      setScore();
      gameInfoText('Correct! Click next for a new word.');
    } else {
      gameDiv.style.background = 'red';
      gameInfoText('Wrong! Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className='game-box'>
        <div className='title w-100'>Say what?!</div>
        <div className='game-stats w-100'>
          <div id='score-box'>
            Score: <span id='score'>0 / 0</span>
          </div>
          <div id='game-count-box'>
            Word: <span id='game-count'>0 / 0</span>
          </div>
        </div>
        <div id='game' className='game'>
          <button onClick={prev} className='previous'>
            <FontAwesomeIcon icon={faBackward} />
          </button>
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
          <button className='next' onClick={next}>
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
        <div id='game-info' className='game-info w-100'>
          Press 'New game' to start!
        </div>
        <div className='buttons w-100'>
          <button className='btn-first btn-play' onClick={playWord}>
            <FontAwesomeIcon icon={faPlay} /> Play word
          </button>
          <button className='btn-first btn-new' onClick={newGame}>
            <FontAwesomeIcon icon={faPlus} /> New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
