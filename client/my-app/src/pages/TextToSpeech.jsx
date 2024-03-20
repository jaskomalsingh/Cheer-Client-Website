import React, { useState } from 'react';
import "../styles/TextToSpeech.css";
import SpeakIcon from '../assets/speak.png';
import PauseIcon from '../assets/pause.png';
import ResumeIcon from '../assets/resume.png';
import StopIcon from '../assets/stop.png';

const SpeechButton = () => {
  const [speechState, setSpeechState] = useState('stopped');
  const [isControlsVisible, setIsControlsVisible] = useState(true); // Sidebar starts open

  const speakText = () => {
    let textToSpeak = window.getSelection().toString();
    if (!textToSpeak) {
      textToSpeak = document.body.innerText;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onend = () => setSpeechState('stopped');

    if (window.speechSynthesis.paused && window.speechSynthesis.speaking) {
      window.speechSynthesis.resume();
      setSpeechState('speaking');
    } else if (!window.speechSynthesis.speaking) {
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

  const toggleControls = () => setIsControlsVisible(!isControlsVisible);

  return (
    <div className="text-to-speech-sidebar">
      {isControlsVisible && (
        <div className="speech-controls">
          <button onClick={speakText} disabled={speechState === 'speaking'} className="speech-button">
            <img src={SpeakIcon} alt="Speak" className="button-icon" />
          </button>
          <button onClick={pauseSpeech} disabled={speechState !== 'speaking'} className="speech-button">
            <img src={PauseIcon} alt="Pause" className="button-icon" />
          </button>
          <button onClick={resumeSpeech} disabled={speechState !== 'paused'} className="speech-button">
            <img src={ResumeIcon} alt="Resume" className="button-icon" />
          </button>
          <button onClick={stopSpeech} disabled={speechState === 'stopped'} className="speech-button">
            <img src={StopIcon} alt="Stop" className="button-icon" />
          </button>
        </div>
      )}
      <div className="sidebar-toggle" onClick={toggleControls}>
        {isControlsVisible ? '❮' : '❯'}
      </div>
    </div>
  );
};

export default SpeechButton;
