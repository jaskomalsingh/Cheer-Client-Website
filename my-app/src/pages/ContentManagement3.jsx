import React from "react";

import "../styles/cm3.css";

export const ContentManagement3 = () => {
  return (
    <div className="content-management">
      <div className="div">
        <div className="content">
          <div className="overlap-group">
            <div className="background">
              <div className="overlap-group">
                <div className="background-wrapper">
                  <img className="img" alt="Background" src="background.png" />
                </div>
                <div className="copyright">
                  <img className="line" alt="Line" src="line-5.svg" />
                  <p className="text-wrapper">
                    ©2024 SE3350 Group 1. All rights reserved | Terms of Service | Privacy Policy
                  </p>
                </div>
              </div>
            </div>
            <div className="content-2">
              <div className="logo">
                <div className="logo-wrapper">
                  <img className="logo-2" alt="Logo" src="logo.svg" />
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
        <div className="manage-newsletters">
          <div className="div-wrapper">
            <div className="text-wrapper-6">Manage Newsletters</div>
          </div>
          <div className="mini-side-bar">
            <div className="overlap-group-2">
              <div className="nav">
                <div className="ellipse" />
                <div className="icon-wrapper">
                  {/*<TypeFiFileTextSize24ColorBlack className="icon" color="#191D23" />*/}
                </div>
                <div className="icon-wrapper">
                  {/*<TypeFiUsersSize24ColorBlack className="icon" color="#191D23" />*/}
                </div>
              </div>
              <div className="text-wrapper-7">Subscribers</div>
              <div className="text-wrapper-8">Newsletters</div>
              <div className="text-wrapper-9">New...</div>
              <img className="line-2" alt="Line" src="line-6.svg" />
              <img className="line-3" alt="Line" src="line-7.svg" />
              <img className="rectangle-2" alt="Rectangle" src="rectangle-2487.svg" />
            </div>
          </div>
        </div>
        <div className="text-2">
          <div className="text-wrapper-6">Content Management</div>
        </div>
        <div className="overlap">
          <header className="header">
            <div className="ongoing-living-wrapper">
              <p className="ongoing-living">Ongoing Living &amp; Learning Inc.</p>
            </div>
            <div className="menu-bar">
              <div className="home-wrapper">
                <div className="home">
                  <div className="text-wrapper-10">About</div>
                  <div className="ellipse-2" />
                </div>
              </div>
              <div className="element-4">
                <div className="home-2">
                  <div className="text-wrapper-11">Newsletter</div>
                  <div className="ellipse-3" />
                </div>
              </div>
              <div className="element-5">
                <div className="home-3">
                  <div className="text-wrapper-10">Page 2</div>
                  <div className="ellipse-2" />
                </div>
              </div>
              <div className="element-6">
                <div className="text-wrapper-10">Page 3</div>
                <div className="ellipse-2" />
              </div>
              <div className="element-6">
                <div className="text-wrapper-10">Page 4</div>
                <div className="ellipse-2" />
              </div>
              <div className="element-7">
                <div className="text-wrapper-10">Contact</div>
                <div className="ellipse-2" />
              </div>
            </div>
            <button className="content-wrapper">
              <div className="content-4">
                <div className="text-wrapper-12">Login</div>
              </div>
            </button>
          </header>
          <img className="image" alt="Image" src="image-8.png" />
        </div>
      </div>
    </div>
  );
};
