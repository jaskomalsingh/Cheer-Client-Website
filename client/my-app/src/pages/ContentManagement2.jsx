import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CMSideBar } from "./CMSideBar";
import { UserRowEntry } from "./UserRowEntry";
import "../styles/cm2.css";

export const ContentManagement2 = () => {
  const [data, setData] = useState([]);
  

  return (
    <div className="content-management">
      <div className="div">
        <Footer />
        <div className="manage-subscribers">
          <div className="div-wrapper">
            <div className="text-wrapper-6">Manage Subscribers</div>
          </div>
          <div className="rectangle-2" />
          
          <div className="rectangle-8" />
            <img className="union-6" alt="Union" src="union-1-5.svg" />
            <div className="text-wrapper-13">email@email.com</div>
            <button className="button-6">
              <div className="content-4">
                <div className="text-wrapper-8">Remove</div>
              </div>
            </button>

          <CMSideBar />
        </div>
        <div className="text-2">
          <div className="text-wrapper-6">Content Management</div>
        </div>
        <Header />
      </div>
    </div>
  );
};
