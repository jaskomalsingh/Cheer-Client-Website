import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CMSideBar from "./CMSideBar";
import "../styles/cm3.css"; // Make sure this path matches your project structure
import Container from 'react-bootstrap/Container';

export const ContentManagement3 = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  useEffect(() => {
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

  const handleNewsletterClick = (newsletter) => {
    setSelectedNewsletter(newsletter);
  };

  return (
    <Container fluid>
      <div className="content-management">
        <div className="div">

          <Header />
          <div className="content-title">
            <div className="text-wrapper-6">Content Management</div>
          </div>
          <div className="manage-newsletters">
            <CMSideBar currentTab="Newsletters" />
            <div className="div-wrapper">
              <div className="text-wrapper-6">Manage Newsletters</div>
            </div>

            {/* New Newsletter Grid Section Starts Here */}
            <div className="newsletter-grid">
              {newsletters.map((newsletter) => (
                <div
                  key={newsletter._id}
                  className="newsletter-item"
                  onClick={() => handleNewsletterClick(newsletter)}
                >
                  {newsletter.title}
                </div>
              ))}
            </div>
            {selectedNewsletter && (
              <div className="newsletter-details">
                <h2>{selectedNewsletter.title}</h2>
                <p>{selectedNewsletter.content}</p>
                <p>Created At: {new Date(selectedNewsletter.createdAt).toLocaleDateString()}</p>
                <button onClick={() => setSelectedNewsletter(null)}>Close</button>
              </div>
            )}
            {/* New Newsletter Grid Section Ends Here */}
          </div>
          <Footer />
        </div>
      </div>
    </Container>
  );
};
