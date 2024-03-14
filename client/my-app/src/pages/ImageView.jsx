import React, { useState, useEffect } from "react";
import "../styles/ImageView.css";
import Header from "./Header";
import Footer from "./Footer";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';


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
    
    const navigateImage = (step) => {
        const currentIndex = photos.findIndex(photo => photo.url === selectedImage.url);
        const nextIndex = (currentIndex + step + photos.length) % photos.length;
        setSelectedImage(photos[nextIndex]);
    };

    return (
        <div className="header_footer_div">
            <Header />
            <Container className="image-grid">
                {photos.map(photo => (
                    <div key={photo.url} className="image-item" onClick={() => handleSelectImage(photo)}>
                        <img src={photo.url} alt="Uploaded" />
                    </div>
                ))}
            </Container>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedImage?.url} alt="Selected" style={{ width: '100%' }} />
                    <p>{selectedImage?.description || 'No description'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigateImage(-1)}>Previous</Button>
                    <Button variant="secondary" onClick={() => navigateImage(1)}>Next</Button>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    );
};
