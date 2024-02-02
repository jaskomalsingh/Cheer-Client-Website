import React from "react";
import { LoginForm } from "./LoginForm";
import "./style.css";

export const EditUserProfile = () => {
  return (
    <div className="edit-user-profile">
      <div className="div-2">
        <div className="content">
          <div className="overlap-group">
            <div className="background">
              <div className="copyright">
                <img className="line" alt="Line" src="line-5.svg" />
                <p className="text-wrapper-6">
                  Â©2024 SE3350 Group 1. All rights reserved | Terms of Service | Privacy Policy
                </p>
              </div>
            </div>
            <div className="content-2">
              <div className="logo">
                <div className="logo-wrapper">
                  <img className="img" alt="Logo" src="logo.svg" />
                </div>
              </div>
              <div className="content-3">
                <div className="element-3">
                  <div className="title">
                    <div className="text-wrapper-7">Product</div>
                    <div className="rectangle" />
                  </div>
                  <div className="text-3">
                    <div className="text-wrapper-8">C.H.E.E.R. Works</div>
                    <div className="text-wrapper-9">C.H.E.E.R. Group</div>
                    <div className="text-wrapper-9">C.H.E.E.R. Living</div>
                    <div className="text-wrapper-9">C.H.E.E.R. Connections</div>
                  </div>
                </div>
                <div className="element-4">
                  <div className="title">
                    <div className="text-wrapper-7">Company</div>
                    <div className="rectangle" />
                  </div>
                  <div className="text-3">
                    <div className="text-wrapper-8">About</div>
                    <div className="text-wrapper-9">Page 1</div>
                    <div className="text-wrapper-9">Page 2</div>
                    <div className="text-wrapper-9">Page 3</div>
                    <div className="text-wrapper-9">Page 4</div>
                    <div className="text-wrapper-9">Contact Us</div>
                  </div>
                </div>
                <div className="element-5">
                  <div className="title">
                    <div className="text-wrapper-7">{""}</div>
                  </div>
                  <button className="button-2">
                    <div className="text-wrapper-10">Contact Us</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlap">
          <header className="header">
            <div className="ongoing-living-wrapper">
              <p className="ongoing-living">Ongoing Living &amp; Learning Inc.</p>
            </div>
            <div className="menu-bar">
              <div className="home-wrapper">
                <div className="home">
                  <div className="text-wrapper-11">About</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="element-6">
                <div className="home-2">
                  <div className="text-wrapper-11">Page 1</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="element-6">
                <div className="home-2">
                  <div className="text-wrapper-11">Page 2</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="element-7">
                <div className="text-wrapper-11">Page 3</div>
                <div className="ellipse" />
              </div>
              <div className="element-7">
                <div className="text-wrapper-11">Page 4</div>
                <div className="ellipse" />
              </div>
              <div className="element-8">
                <div className="text-wrapper-12">Contact</div>
                <div className="ellipse-2" />
              </div>
            </div>
            <div className="content-wrapper">
              <div className="content-4">
                <div className="text-4">
                  <div className="text-wrapper-13">Password</div>
                </div>
                <div className="login-sign-up">Login/Sign up</div>
              </div>
            </div>
          </header>
          <img className="image" alt="Image" src="image-8.png" />
        </div>
        <LoginForm className="login-form-instance" />
      </div>
    </div>
  );
};