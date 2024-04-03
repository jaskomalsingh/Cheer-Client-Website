import React, { useState, useEffect } from "react";
import "../styles/ImageView.css";
//import Header from "./Header";
//import Footer from "./Footer";
//import ChatButton from './ChatButton';
import { Modal, Button } from 'react-bootstrap';
//import SpeechButton from "./TextToSpeech";
import  NewsletterImage from "../assets/newsletter.png";
import "../styles/NewsletterView.css";

export const NewsletterView = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [selectedNewsletter, setSelectedNewsletter] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Update the fetch URL to point to the newsletter listing endpoint
        fetch('http://localhost:3001/api/auth/list-newsletters')
            .then(response => response.json())
            .then(data => setNewsletters(data))
            .catch(error => console.error('Error fetching newsletters:', error));
    }, []);

    const handleSelectNewsletter = (newsletter) => {
        setSelectedNewsletter(newsletter);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <div className="NewsGallery">
            {/* <Header /> */}
            <div className="gallery-title">Our Newsletters!</div>
            <div className="horizontal-scroll-box">
                <div className="scroll-container">
                {newsletters.map(newsletter => (
    <div key={newsletter._id} className="newsletter-container" onClick={() => handleSelectNewsletter(newsletter)}>
        {/* Placeholder image or a generic newsletter icon */}
        <img src={NewsletterImage} alt={newsletter.title} className="newsletter-thumbnail" />
        <p>{newsletter.title}</p>
    </div>
))}
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNewsletter?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Assuming the newsletter PDF URL is accessible directly, display it in an iframe for scrolling through */}
                    {selectedNewsletter?.pdfUrl && (
                        <iframe src={selectedNewsletter.pdfUrl} width="100%" height="500px" title="Newsletter Content"></iframe>
                    )}
                    <p>Published: {new Date(selectedNewsletter?.createdAt).toLocaleDateString()}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <SpeechButton />
            <ChatButton /> */}
            {/* <Footer /> */}
        </div>
    );
};
