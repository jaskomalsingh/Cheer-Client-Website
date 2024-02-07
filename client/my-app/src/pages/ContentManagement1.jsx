import React, { useState } from "react";
import Header from "./Header";
import {Footer} from "./Footer";
import {CMSideBar} from "./CMSideBar";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/cm1.css";




export const ContentManagement1 = () => {
  const [title, setTitle] = useState("");
  const[content, setContent]= useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch('http://localhost:3001/api/auth/create-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        alert('Newsletter created successfully!');
        // Reset form
        setTitle('');
        setContent('');
      } else {
        alert('Failed to create newsletter. Please try again.');
      }
    } catch (error) {
      console.error('Error creating newsletter:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
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
          <input className="input-instance" state="active" text="ENTER A TITLE FOR YOUR NEWSLETTER" type="text" placeholder = "Enter a title for your newsletter"
          onChange={(e) => setTitle(e.target.value)}/>
          <div className="element-wrapper">
            <div className="element-title">
              <div className="text-3">
                <div className="text-wrapper-subheading">Content</div>
              </div>
            </div>
          </div>
          {/*<TextEditor className="text-editor-instance" /> add a third party text editor*/} 
          <Editor
            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
            value={content}
  onEditorChange={(newContent) => setContent(newContent)}
  init={{
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help'
  }}
            />
          <button className="content-wrapper-create" onClick={handleSubmit}>
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
