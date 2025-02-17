import React from "react";
import LoginForm from "./LoginForm";
import "../styles/style.css";
import Header from "./Header";
import ChatButton from './ChatButton';
import  Footer  from "./Footer";
import EditProfileForm from "./EditProfileForm";
import Container from 'react-bootstrap/Container';
import SpeechButton from "./TextToSpeech";

export const EditUserProfile = () => {
  return (
    <Container fluid>
    <Header/>
    <div className="edit-user-profile">
      <div className="div">
        <EditProfileForm className="login-form-instance" />
      </div>
    </div>
    <SpeechButton/>
    <ChatButton />
    <Footer />
    </Container>
  );
};
