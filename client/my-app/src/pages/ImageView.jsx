import React, { useState, useEffect } from "react";
import "../styles/ImageView.css";
import Header from "./Header";
import Footer from "./Footer";
import { Modal, Button } from 'react-bootstrap';

export const ImageView = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/auth/photos')
            .then(response => response.json())
            .then(data => setPhotos(data))
            .catch(error => console.error('Error fetching photos:', error));
    }, []);

    const handleSelectImage = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <div className="header_footer_div">
            <Header />
            <div className="gallery-title">Gallery of our Memories!</div>
            <div className="horizontal-scroll-box">
                <div className="scroll-container">
                    {photos.map(photo => (
                        <div key={photo.url} className="image-container" onClick={() => handleSelectImage(photo)}>
                            <img src={photo.url} alt="Uploaded" />
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedImage?.url} alt="Selected" className="modal-image" />
                    <p>Description: {selectedImage?.description || 'No description'}</p>
                    <p>Uploaded: {new Date(selectedImage?.uploaded).toLocaleDateString()}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    );
};
