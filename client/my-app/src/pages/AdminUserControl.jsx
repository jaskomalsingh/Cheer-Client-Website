import React from "react";
//import { Accordion } from "./Accordion";
//import "./style.css";

export const AdminUserControl = () => {
  return (
    <div className="admin-user-control">
      <div className="div">
        <div className="overlap-wrapper">
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
                  <div className="title-2">
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
                  <div className="title-2">
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
                  <div className="title-2">
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
          <div className="manage-newsletters">
            <div className="div-wrapper">
              <div className="text-wrapper-6">Manage Users</div>
            </div>
            <div className="group">
              <div className="frame">
                <Accordion className="accordion-instance" description="Description" open={false} title="Title 1" />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 2"
                />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 3"
                />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 4"
                />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 5"
                />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 6"
                />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 7"
                />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 8"
                />
                <Accordion
                  className="design-component-instance-node"
                  description="Description"
                  open={false}
                  title="Title 9"
                />
                <Accordion className="accordion-2" description="Description" open={false} title="Title 10" />
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="title-text-wrapper">
              <div className="text-wrapper-6">Admin User Control</div>
            </div>
          </div>
        </div>
        <div className="overlap-2">
          <header className="header">
            <div className="ongoing-living-wrapper">
              <p className="ongoing-living">Ongoing Living &amp; Learning Inc.</p>
            </div>
            <div className="menu-bar">
              <div className="home-wrapper">
                <div className="home">
                  <div className="text-wrapper-7">About</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="element-4">
                <div className="home-2">
                  <div className="text-wrapper-8">Newsletter</div>
                  <div className="ellipse-2" />
                </div>
              </div>
              <div className="element-5">
                <div className="home-3">
                  <div className="text-wrapper-7">Page 2</div>
                  <div className="ellipse" />
                </div>
              </div>
              <div className="element-6">
                <div className="text-wrapper-7">Page 3</div>
                <div className="ellipse" />
              </div>
              <div className="element-6">
                <div className="text-wrapper-7">Page 4</div>
                <div className="ellipse" />
              </div>
              <div className="element-7">
                <div className="text-wrapper-7">Contact</div>
                <div className="ellipse" />
              </div>
            </div>
            <button className="content-wrapper">
              <div className="content-4">
                <div className="text-wrapper-9">Login</div>
              </div>
            </button>
          </header>
          <img className="image" alt="Image" src="image-8.png" />
        </div>
      </div>
    </div>
  );
};
export default AdminUserControl;