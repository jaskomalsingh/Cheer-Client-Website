import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CMSideBar from "./CMSideBar";
import "../styles/cm3.css"; // Make sure this path matches your project structure
import Container from 'react-bootstrap/Container';

export const ContentManagement3 = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [newVisibility, setNewVisibility] = useState('');

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/list-newsletters?role=admin'); // Add your role checking logic here
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

  const handleVisibilityChange = () => {
    // Toggle between 'public' and 'private'
    setNewVisibility(newVisibility === 'private' ? 'public' : 'private');
  };

  const saveVisibilityChange = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/change-newsletter-visibility', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newsletterId: selectedPdf._id, makePublic: newVisibility === 'public' })
      });
      if (response.ok) {
        // Update local state to reflect the change
        const updatedList = newsletters.map(newsletter =>
          newsletter._id === selectedPdf._id ? { ...newsletter, visibility: newVisibility } : newsletter
        );
        setNewsletters(updatedList);
        setSelectedPdf({ ...selectedPdf, visibility: newVisibility });
        alert('Visibility updated successfully');
      } else {
        throw new Error('Failed to change PDF visibility');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
    <div className="content-management">
      <div className="manage-newsletters">
        <div className="div-wrapper">
          <div className="text-wrapper-6">Manage Newsletters</div>
        </div>
        <CMSideBar currentTab="Newsletters"/>
        <div className="newsletter-grid">
          {newsletters.map(newsletter => (
            <div
              key={newsletter._id}
              className="newsletter-item"
              onClick={() => {
                setSelectedPdf(newsletter);
                setNewVisibility(newsletter.visibility);
              }}
            >
              {newsletter.title}
            </div>
          ))}
        </div>
        {selectedPdf && (
          <>
            <div className="overlay" onClick={() => setSelectedPdf(null)}></div>
            <div className="newsletter-modal">
              <h2>{selectedPdf.title}</h2>
              {selectedPdf.pdfUrl && <p><a href={selectedPdf.pdfUrl} target="_blank" rel="noopener noreferrer">View Newsletter</a></p>}
              <p>Visibility: 
                <select value={newVisibility} onChange={(e) => setNewVisibility(e.target.value)}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </p>
              <button onClick={saveVisibilityChange}>Save Changes</button>
              <p>Created At: {new Date(selectedPdf.createdAt).toLocaleDateString()}</p>
              <button onClick={() => setSelectedPdf(null)}>Close</button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
