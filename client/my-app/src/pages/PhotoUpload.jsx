import React, { useRef, useState, useEffect } from "react";
import "../styles/PhotoUpload.css";
import Header from "./Header";
import Footer from "./Footer";
import { useMediaQuery } from 'react-responsive';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import SpeechButton from "./TextToSpeech";

export const PhotoUpload = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` });
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate;
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    if (description) formData.append('description', description);

    try {
      const response = await fetch('http://localhost:3001/api/auth/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Image uploaded successfully: ${result.url}`);
        setFile(null);
        setDescription('');
        setPreviewUrl(null);
      } else {
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload error, please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className = "header_footer_div">
      <Header />
      <Container fluid>
        <div className="gallery-page">
          <div className="side-by-side">
          <div className="upload-div">
            
            {isMobile ? null : null}
            <form onSubmit={handleSubmit} className="upload-form">
              <Row>
                <Col>
                  <label htmlFor="image-upload">Upload Image:</label>
                  <input
                    type="file"
                    accept=".jpg,.png,.jpeg,.jfif,.gif"
                    id="image-upload"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </Col>
                <Col>
                  <label htmlFor="image-description">Caption (optional):</label>
                  <input
                    type="text"
                    id="image-description"
                    value={description}
                    onChange={handleDescriptionChange}
                    disabled={uploading}
                  />
                </Col>
              </Row>
              
              <button type="submit" disabled={uploading}>Upload Image</button>
              
            </form>

            
            
          </div>
          {previewUrl ? (
                <div className="image-preview">
                  <img src={previewUrl} alt="Image preview" placeholder="Image Preview"  />
                </div>
              ) : (
                <div className = "placeholder-text">Image Preview</div>
              )}
          
        </div>
        </div>
        
      </Container>
      <Footer />
    </div>
  );
};
