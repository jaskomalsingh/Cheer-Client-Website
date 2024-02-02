import React from 'react'


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ContactPage} from './pages/ContactPage'
import {ContentManagement1} from './pages/ContentManagement1'
import {ContentManagement2} from './pages/ContentManagement2'
import {ContentManagement3} from './pages/ContentManagement3'
import {HomePage} from './pages/HomePage'
import SignIn from './pages/SignIn.js';
import {NewsletterPopup} from './pages/NewsletterPopup'
import AdminUserControl from './pages/AdminUserControl.js';
import Header from './pages/Header';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cm1" element={<ContentManagement1 />} />
          <Route path="/cm2" element={<ContentManagement2 />} />
          <Route path="/cm3" element={<ContentManagement3 />} />
          <Route path="/signin" element={<SignIn />} />       
          <Route path="/adminusercontrol" element={<AdminUserControl/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
