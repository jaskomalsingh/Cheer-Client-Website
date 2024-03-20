import React, { useState } from 'react';
import "../styles/TextToSpeech.css";

const SpeechButton = () => {
  const [speechState, setSpeechState] = useState('stopped');

  const speakText = () => {
    let textToSpeak = window.getSelection().toString();
    if (!textToSpeak) {
      textToSpeak = document.body.innerText;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onend = () => {
      setSpeechState('stopped');
    };

    if (window.speechSynthesis.paused && window.speechSynthesis.speaking) {
      // Resume if paused
      window.speechSynthesis.resume();
      setSpeechState('speaking');
    } else if (!window.speechSynthesis.speaking) {
      // Start speaking
      window.speechSynthesis.speak(utterance);
      setSpeechState('speaking');
    }
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setSpeechState('paused');
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setSpeechState('speaking');
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeechState('stopped');
  };

  return (
    <div className="speech-controls">
      <button onClick={speakText} disabled={speechState === 'speaking'} className="speech-button">Speak</button>
      <button onClick={pauseSpeech} disabled={speechState !== 'speaking'} className="speech-button">Pause</button>
      <button onClick={resumeSpeech} disabled={speechState !== 'paused'} className="speech-button">Resume</button>
      <button onClick={stopSpeech} disabled={speechState === 'stopped'} className="speech-button">Stop</button>
    </div>
  );
};

export default SpeechButton;
