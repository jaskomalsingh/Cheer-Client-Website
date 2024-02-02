import React from "react";
import Header from "./Header";
import {Footer} from "./Footer";
import {CMSideBar} from "./CMSideBar";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/cm1.css";


export const ContentManagement1 = () => {
  return (
    <div className="content-management">
      <div className="div-2">
        <Footer />
        <div className="newsletter-builder">
          <div className="div-wrapper">
            <div className="text-wrapper-heading">Newsletter Builder</div>
          </div>
          <div className="element-wrapper">
            <div className="element-title">
              <div className="text-3">
                <div className="text-wrapper-subheading">Title</div>
              </div>
            </div>
          </div>
          <input className="input-instance" state="active" text="ENTER A TITLE FOR YOUR NEWSLETTER" type="text" />
          <div className="element-wrapper">
            <div className="element-title">
              <div className="text-3">
                <div className="text-wrapper-subheading">Content</div>
              </div>
            </div>
          </div>
          {/*<TextEditor className="text-editor-instance" /> add a third party text editor*/} 
          <Editor
            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc">
            </Editor>
          <button className="content-wrapper-create">
            <div className="content-create">
              <div className="text-wrapper-create">Create</div>
            </div>
          </button>
          <CMSideBar />
        </div>
        <div className="text-4">
          <div className="text-wrapper-heading">Content Management</div>
        </div>
        <Header />
      </div>
    </div>
  );
};
