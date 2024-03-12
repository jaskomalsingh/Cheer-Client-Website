import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CMSideBar from "./CMSideBar";
import "../styles/cm3.css"; // Ensure this matches your file structure

export const ContentManagement3 = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfVisibility, setPdfVisibility] = useState('');

  useEffect(() => {
    // Fetch the list of all newsletters
    const fetchNewsletters = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/list-newsletters?role=admin'); // Adjust role as necessary
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

  const changePdfVisibility = async (newsletterId, newVisibility) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/change-newsletter-visibility', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newsletterId, makePublic: newVisibility === 'private' }) // toggle visibility
      });
      if (response.ok) {
        const updatedList = newsletters.map(newsletter =>
          newsletter._id === newsletterId ? { ...newsletter, visibility: newVisibility } : newsletter
        );
        setNewsletters(updatedList);
        alert('Visibility updated successfully');
      } else {
        throw new Error('Failed to change PDF visibility');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="content-management">
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
              onClick={() => setSelectedPdf(newsletter)}
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
              {selectedPdf.pdfUrl && (
                <p><a href={selectedPdf.pdfUrl} target="_blank" rel="noopener noreferrer">View Newsletter</a></p>
              )}
              <p>Visibility: {selectedPdf.visibility}</p>
              <p>Created At: {new Date(selectedPdf.createdAt).toLocaleDateString()}</p>
              <button onClick={() => changePdfVisibility(selectedPdf._id, selectedPdf.visibility === 'private' ? 'public' : 'private')}>
                Make {selectedPdf.visibility === 'private' ? 'Public' : 'Private'}
              </button>
              <button onClick={() => setSelectedPdf(null)}>Close</button>
            </div>
          </>
        )}
      </div>
      <Header />
      {/* Uncomment if you use Footer */}
      {/* <Footer /> */}
    </div>
  );
};
