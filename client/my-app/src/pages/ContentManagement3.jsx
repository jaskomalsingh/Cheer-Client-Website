import React from "react";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {CMSideBar} from "./CMSideBar";
import "../styles/cm3.css";

export const ContentManagement3 = () => {
  return (
    <div className="content-management">
      <div className="div">
      <Footer />
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
        <Header />
      </div>
    </div>
  );
};
