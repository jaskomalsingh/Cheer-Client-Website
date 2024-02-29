import React from 'react'


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ContactPage} from './pages/ContactPage'
import {ContentManagement1} from './pages/ContentManagement1'
import {ContentManagement2} from './pages/ContentManagement2'
import {ContentManagement3} from './pages/ContentManagement3'
import {HomePage} from './pages/HomePage'
import SignIn from './pages/LoginForm.jsx';
import {SignUp} from './pages/SignUp';
import {EditUserProfile} from './pages/EditUserProfile.jsx';
import NewsletterPopup from './pages/NewsletterPopup'
import SignedIn from './pages/SignedIn.jsx'
import Container from 'react-bootstrap/esm/Container.js';

import Header from './pages/Header';


import {Clock} from './pages/Clock.jsx'

//import Header from './pages/Header';
//import CheckBoxWithLabel from './pages/CheckBoxWithLabel.jsx';
import  ManageSubscriber  from './pages/ManageSubscriber.js';
import AdminUserControl from './pages/AdminUserControl.js';



const App = () => {
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <BrowserRouter>
        {/*<Header />*/}
        <Routes>
          <Route path="/ManageSubscriber" element={<ManageSubscriber />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cm1" element={<ContentManagement1 />} />
          <Route path="/ManageSubscriber" element={<ManageSubscriber />} />
          <Route path="/cm2" element={<ManageSubscriber />} />
          <Route path="/cm3" element={<ContentManagement3 />} />
          <Route path="/signup" element={<SignUp />} />    
          <Route path="/signedin" element={<SignedIn />} /> 
          <Route path="/edituser" element={<EditUserProfile />} />   
          <Route path="/adminusercontrol" element={<ManageSubscriber />} />   

         
          <Route path="/clock" element = {<Clock/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
