import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CMSideBar from "./CMSideBar";
import "../styles/cm3.css"; // Ensure this matches your file structure

export const ContentManagement3 = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  useEffect(() => {
    // Fetch the list of newsletter titles
    const fetchNewsletters = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/get-newsletters');
        if (response.ok) {
          const data = await response.json();
          setNewsletters(data);
        } else {
          throw new Error('Failed to fetch newsletters');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNewsletters();
  }, []);

  const viewNewsletterDetails = async (title) => {
    try {
      // Replace spaces with %20 for URL encoding
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(`http://localhost:3001/api/auth/view-newsletter/${encodedTitle}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedNewsletter(data);
      } else {
        throw new Error('Failed to fetch newsletter details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="content-management">
      {/*<Footer height="924px" />*/}
      <div className="manage-newsletters">
        <div className="div-wrapper">
          <div className="text-wrapper-6">Manage Newsletters</div>
        </div>
        <CMSideBar currentTab="Newsletters"/>
        <div className="newsletter-grid">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter._id}
              className="newsletter-item"
              onClick={() => viewNewsletterDetails(newsletter.title)}
            >
              {newsletter.title}
            </div>
          ))}
        </div>
        {selectedNewsletter && (
          <>
            <div className="overlay" onClick={() => setSelectedNewsletter(null)}></div>
            <div className="newsletter-modal">
              <h2>{selectedNewsletter.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: selectedNewsletter.content }}></div>
              <p>Created At: {new Date(selectedNewsletter.createdAt).toLocaleDateString()}</p>
              <button onClick={() => setSelectedNewsletter(null)}>Close</button>
            </div>
          </>
        )}
      </div>
      <Header />
    </div>
  );
};
