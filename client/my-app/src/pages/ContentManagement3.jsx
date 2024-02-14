import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CMSideBar from "./CMSideBar";
import "../styles/cm3.css";

export const ContentManagement3 = () => {
  return (
    <div className="content-management">
      <div className="div">
      <Footer height="924px" />
        <div className="manage-newsletters">
          <div className="div-wrapper">
            <div className="text-wrapper-6">Manage Newsletters</div>
          </div>
          <CMSideBar currentTab="Newsletters"/>
        </div>
        <div className="text-2">
          <div className="text-wrapper-6">Content Management</div>
        </div>
        <Header />
      </div>
    </div>
  );
};
