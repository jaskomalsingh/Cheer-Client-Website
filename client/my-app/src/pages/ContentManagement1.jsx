import React, { useState } from "react";
import Header from "./Header";
import CMSideBar from "./CMSideBar";
import Container from 'react-bootstrap/Container';
import "../styles/cm1.css";
import Footer from "./Footer";

export const ContentManagement1 = () => {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // State for PDF file
  const [newsletterType, setNewsletterType] = useState("public"); // State for newsletter type

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleNewsletterTypeChange = (e) => {
    setNewsletterType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    formData.append('title', title);

    // Convert newsletterType to boolean value
    const makePublic = newsletterType === 'public';

    formData.append('makePublic', makePublic); // Append boolean newsletter type to FormData
    formData.append('newsletter', pdfFile); // Append PDF file to FormData

    try {
      const response = await fetch('/api/auth/create-newsletter', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Reset form
        setTitle('');
        setPdfFile(null);
        setNewsletterType('public'); // Reset newsletter type to default
      } else {
        alert('Failed to create newsletter. Please try again.');
      }
    } catch (error) {
      console.error('Error creating newsletter:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container fluid>
      <div className="content-management">
        <div className="div-2">
          <Header />
          <div className="text-4">
            <div className="text-wrapper-heading">Content Management</div>
          </div>
          <div className="newsletter-builder">
            <CMSideBar currentTab="New..." />
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
            <input className="input-instance"
              state="active"
              text="ENTER A TITLE FOR YOUR NEWSLETTER"
              type="text"
              placeholder="Enter a title for your newsletter"
              value={title}
              onChange={handleTitleChange}
            />
            <div className="element-wrapper">
              <div className="element-title">
                <div className="text-3">
                  <div className="text-wrapper-subheading">PDF</div>
                </div>
              </div>
            </div>
            {/* PDF upload input */}
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfChange}
          />
            {/* Newsletter type selection */}
          <div>
            <label htmlFor="newsletterType">Select newsletter type:</label>
            <select id="newsletterType" value={newsletterType} onChange={handleNewsletterTypeChange}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
            <button className="content-wrapper-create" onClick={handleSubmit}>
              <div className="content-create">
                <div className="text-wrapper-create">Create</div>
              </div>
            </button>

          </div>
          <Footer />
        </div>
      </div>
    </Container>
  );

};
