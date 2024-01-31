import React from "react";
import "../styles/footer.css";

export const Footer = () => {
    return (
        <div className="content">
          <div className="overlap-group">
            <div className="background">
              <div className="overlap-group">
                <div className="background-wrapper">
                  <img className="img" alt="Background" src="https://c.animaapp.com/lPCECV6H/img/background.png" />
                </div>
                <div className="copyright">
                  <img className="line" alt="Line" src="https://c.animaapp.com/lPCECV6H/img/line-5.svg" />
                  <p className="text-wrapper">
                    ©2024 SE3350 Group 1. All rights reserved | Terms of Service | Privacy Policy
                  </p>
                </div>
              </div>
            </div>
            <div className="content-2">
              <div className="logo">
                <div className="logo-wrapper">
                  <img className="logo-2" alt="Logo" src="https://c.animaapp.com/lPCECV6H/img/logo.svg" />
                </div>
              </div>
              <div className="content-3">
                <div className="div-wrapper">
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
                <div className="element">
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
                <div className="div-3">
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
    )
}