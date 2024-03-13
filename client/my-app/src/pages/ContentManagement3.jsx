import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CMSideBar from "./CMSideBar";
import "../styles/cm3.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const ContentManagement3 = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [newVisibility, setNewVisibility] = useState('');
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const role = localStorage.getItem('role'); // Get role from localStorage

    // Redirect if not admin
    if (role !== 'admin') {
      navigate('/'); // Redirect to home page or a designated "not authorized" page
    }
    const fetchNewsletters = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/list-newsletters?role=admin');
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

  const handleVisibilityChange = async (newsletterId, visibility) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/change-newsletter-visibility', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newsletterId, makePublic: visibility === 'public' })
      });
      if (response.ok) {
        const updatedList = newsletters.map(newsletter =>
          newsletter._id === newsletterId ? { ...newsletter, visibility } : newsletter
        );
        setNewsletters(updatedList);
        setSelectedPdf({ ...selectedPdf, visibility }); // Update the selectedPdf's visibility as well
        alert('Visibility updated successfully');
      } else {
        throw new Error('Failed to change newsletter visibility');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendNewsletter = async (newsletterId) => {
    if (!emailSubject.trim()) {
      alert('Please enter an email subject');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/auth/send-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          emailSubject, 
          newsletterId
        }),
      });

      if (response.ok) {
        alert('Newsletter sent successfully');
        setShowPublishPopup(false);
        setSelectedPdf(null);
      } else {
        throw new Error('Failed to send the newsletter');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send the newsletter');
    }
  };

  return (
    <div className="content-management">
      <Header />
      <div className="manage-newsletters">
        <div className="div-wrapper">
          <div className="text-wrapper-6">Manage Newsletters</div>
        </div>
        <CMSideBar currentTab="Newsletters" />
        <div className="newsletter-grid">
          {newsletters.map(newsletter => (
            <div
              key={newsletter._id}
              className="newsletter-item"
              onClick={() => {
                setSelectedPdf(newsletter);
                setNewVisibility(newsletter.visibility);
                setShowPublishPopup(false);
              }}
            >
              {newsletter.title}
            </div>
          ))}
        </div>
        {selectedPdf && !showPublishPopup && (
          <div className="overlay">
            <div className="newsletter-modal">
              <h2>{selectedPdf.title}</h2>
              {selectedPdf.pdfUrl && <p><a href={selectedPdf.pdfUrl} target="_blank" rel="noopener noreferrer">View Newsletter</a></p>}
              <p>Visibility: 
                <select value={newVisibility} onChange={(e) => setNewVisibility(e.target.value)}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </p>
              <button onClick={() => handleVisibilityChange(selectedPdf._id, newVisibility)}>Save Changes</button>
              <button onClick={() => setShowPublishPopup(true)}>Publish</button>
              <p>Created At: {new Date(selectedPdf.createdAt).toLocaleDateString()}</p>
              <button onClick={() => setSelectedPdf(null)}>Close</button>
            </div>
            
          </div>
        )}
        {showPublishPopup && (
          <div className="overlay">
            <div className="newsletter-modal">
              <h2>Publish "{selectedPdf?.title}"</h2>
              <input
                type="text"
                placeholder="Enter Email Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <div className="buttons">
                <button onClick={() => setShowPublishPopup(false)}>Cancel</button>
                <button onClick={() => sendNewsletter(selectedPdf._id)}>Confirm</button>
              </div>
            </div>
          </div>
        )}
              
      </div>
      
      <Footer />
    </div>
  );
};
