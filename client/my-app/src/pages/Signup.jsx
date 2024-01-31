import React from "react";
import { CheckboxWithLabel } from "./CheckboxWithLabel";
import "./style.css";

export const SignUp = () => {
  return (
    <div className="sign-up">
      <div className="div">
        <div className="content">
          <div className="overlap-group">
            <div className="background">
              <div className="copyright">
                <img className="line" alt="Line" src="line-5.svg" />
                <p className="p">Â©2024 SE3350 Group 1. All rights reserved | Terms of Service | Privacy Policy</p>
              </div>
            </div>
            <div className="content-2">
              <div className="logo">
                <div className="logo-wrapper">
                  <img className="img" alt="Logo" src="logo.svg" />
                </div>
              </div>
              <div className="content-3">
                <div className="element">
                  <div className="title">
                    <div className="text-wrapper-2">Product</div>
                    <div className="rectangle" />
                  </div>
                  <div className="text">
                    <div className="text-wrapper-3">C.H.E.E.R. Works</div>
                    <div className="text-wrapper-4">C.H.E.E.R. Group</div>
                    <div className="text-wrapper-4">C.H.E.E.R. Living</div>
                    <div className="text-wrapper-4">C.H.E.E.R. Connections</div>
                  </div>
                </div>
                <div className="element-2">
                  <div className="title">
                    <div className="text-wrapper-2">Company</div>
                    <div className="rectangle" />
                  </div>
                  <div className="text">
                    <div className="text-wrapper-3">About</div>
                    <div className="text-wrapper-4">Page 1</div>
                    <div className="text-wrapper-4">Page 2</div>
                    <div className="text-wrapper-4">Page 3</div>
                    <div className="text-wrapper-4">Page 4</div>
                    <div className="text-wrapper-4">Contact Us</div>
                  </div>
                </div>
                <div className="element-3">
                  <div className="title">
                    <div className="text-wrapper-2">{""}</div>
                  </div>
                  <button className="button">
                    <div className="text-wrapper-5">Contact Us</div>
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
                  <div className="text-wrapper-6">About</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="div-wrapper">
                <div className="home-2">
                  <div className="text-wrapper-6">Page 1</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="div-wrapper">
                <div className="home-2">
                  <div className="text-wrapper-6">Page 2</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="element-4">
                <div className="text-wrapper-6">Page 3</div>
                <div className="ellipse" />
              </div>
              <div className="element-4">
                <div className="text-wrapper-6">Page 4</div>
                <div className="ellipse" />
              </div>
              <div className="element-5">
                <div className="text-wrapper-7">Contact</div>
                <div className="ellipse-2" />
              </div>
            </div>
            <button className="content-wrapper">
              <div className="login-sign-up-wrapper">
                <div className="login-sign-up">Login/Sign up</div>
              </div>
            </button>
          </header>
          <img className="image" alt="Image" src="image-8.png" />
        </div>
        <div className="login-form">
          <div className="proccess">
            <div className="text-2">
              <div className="text-3">
                <div className="text-wrapper-8">Login</div>
                <div className="text-wrapper-9">Login to your Account.</div>
              </div>
            </div>
          </div>
          <div className="form">
            <div className="element-6">
              <div className="element-7">
                <div className="text-wrapper-10">Email</div>
                <div className="text-4">
                  <div className="text-wrapper-11">email@email.com</div>
                </div>
              </div>
              <div className="element-7">
                <div className="text-wrapper-12">Password</div>
                <div className="text-5">
                  <div className="text-wrapper-11">Password</div>
                </div>
              </div>
            </div>
            <button className="button-2">
              <div className="text-wrapper-13">Login</div>
            </button>
          </div>
        </div>
        <div className="sign-up-form">
          <div className="proccess">
            <div className="text-2">
              <div className="text-3">
                <div className="text-wrapper-8">Sign-Up</div>
                <p className="text-wrapper-9">SIgn-up to create an account using your personal details.</p>
              </div>
            </div>
          </div>
          <div className="form-2">
            <div className="element-6">
              <div className="element-7">
                <div className="text-wrapper-12">Full Name</div>
                <div className="text-4">
                  <div className="text-wrapper-11">John Doe</div>
                </div>
              </div>
              <div className="element-7">
                <div className="text-wrapper-12">Email</div>
                <div className="text-5">
                  <div className="text-wrapper-11">email@email.com</div>
                </div>
              </div>
            </div>
            <div className="element-6">
              <div className="element-7">
                <div className="text-wrapper-12">Password</div>
                <div className="text-4">
                  <div className="text-wrapper-11">Password</div>
                </div>
              </div>
              <div className="element-7">
                <div className="text-wrapper-12">Confirm Password</div>
                <div className="text-5">
                  <div className="text-wrapper-11">Password</div>
                </div>
              </div>
            </div>
            <CheckboxWithLabel />
            <button className="button-2">
              <div className="text-wrapper-13">Sign Up</div>
            </button>
          </div>
        </div>
        <img className="line-2" alt="Line" src="line-10.svg" />
      </div>
    </div>
  );
};