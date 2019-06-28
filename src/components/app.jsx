import React, { useEffect, useState, useRef } from 'react';
import CorruptedText from './corrupted-text.jsx';
import TimedReveal from './timed-reveal.jsx';
import music from '../audio/music';
import corruptText from '../corrupt-text';
import './styles.scss';

const execCommandCopy = text => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

const clipboardApiCopy = text => navigator.clipboard.writeText(text);

const copyToClipboard = navigator.clipboard
  ? clipboardApiCopy
  : execCommandCopy;

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const startMusic = useRef(null);

  useEffect(() => {
    music().then(start => {
      startMusic.current = start;
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startMusic.current();

      let interval;
      const timeout = setTimeout(() => {
        interval = setInterval(() => {
          document.title = corruptText(document.title);
        }, Math.random() * 500 + 500);
      }, 60000);
      return () => {
        clearTimeout(timeout);
        if (typeof interval !== 'undefined') {
          clearInterval(interval);
        }
      };
    }
    //eslint-disable-next-line no-empty-function
    return () => {};
  }, [isPlaying]);

  if (!isReady) {
    return (
      <div className="app">
        <p className="copy">
          cor·rup·tion: the process by which something is changed from its
          original use or meaning to one that is regarded as erroneous or
          debased.
        </p>
        <p className="copy">Please wait...</p>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="app">
        <p className="copy">
          cor·rup·tion: the process by which something is changed from its
          original use or meaning to one that is regarded as erroneous or
          debased.
        </p>
        <div className="start">
          <button type="button" onClick={() => setIsPlaying(true)}>
            Begin
          </button>
        </div>
        <p className="copy">(This site will play audio)</p>
      </div>
    );
  }

  return (
    <div className="app">
      <CorruptedText corruptAfter="5000">
        cor·rup·tion: the process by which something is changed from its
        original use or meaning to one that is regarded as erroneous or debased.
      </CorruptedText>
      <div className="loop" />
      <TimedReveal revealAfter="5000">
        <CorruptedText corruptAfter="15000">
          A 10-second recording of music was generated by your device and is
          being played repeatedly. This exact recording will never be generated
          again.
        </CorruptedText>
      </TimedReveal>
      <TimedReveal revealAfter="15000">
        <CorruptedText corruptAfter="25000">
          Recordings are represented digitally as a very long series of numbers,
          which your device uses to create the sound you hear. This is
          &quot;data.&quot;
        </CorruptedText>
      </TimedReveal>
      <TimedReveal revealAfter="25000">
        <CorruptedText corruptAfter="35000">
          As the recording repeats, the data is being changed. Some numbers are
          copied from one place to another. Some numbers trade places with other
          numbers. Some numbers are overwritten with random numbers.
        </CorruptedText>
      </TimedReveal>
      <TimedReveal revealAfter="35000">
        <CorruptedText corruptAfter="45000">
          This corruption process is different every time, and will never be
          repeated exactly the same way. This site will never again produce the
          sound it&apos;s making now.
        </CorruptedText>
      </TimedReveal>
      <TimedReveal revealAfter="45000">
        <CorruptedText corruptAfter="55000">
          Eventually, none of the original data will remain.
        </CorruptedText>
      </TimedReveal>
      <div className="credits copy">
        <TimedReveal revealAfter="60000">
          <button
            type="button"
            onClick={() => copyToClipboard(window.location.href)}
            title="copy URL to clipboard"
          >
            copy link to share
          </button>{' '}
          | made by <a href="https://alexbainter.com">alex bainter</a>
        </TimedReveal>
      </div>
    </div>
  );
};

export default App;
