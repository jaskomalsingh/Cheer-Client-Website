import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ChatButton from './ChatButton';
import '../styles/CreateChatrooms.css'; // Ensure you link to your CSS file

const CreateChatrooms = () => {
    const [name, setName] = useState('');
    const [allowedRoles, setAllowedRoles] = useState(['admin']);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();


    
    useEffect(() => {
      const role = localStorage.getItem('role'); // Get role from localStorage

      // Redirect if not admin
      if (role !== 'admin') {
        navigate('/'); // Redirect to home page or a designated "not authorized" page
    }});

   

    const handleRoleChange = (role, isChecked) => {
        if (isChecked) {
            setAllowedRoles(prev => [...prev, role]);
        } else {
            setAllowedRoles(prev => prev.filter(r => r !== role));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('allowedRoles', JSON.stringify(allowedRoles)); // Convert array to JSON string
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/createChatroom', { // Replace with your actual API endpoint
                method: 'POST',
                body: formData, // Send as FormData
                // Don't set Content-Type header, as the browser will set it with the correct boundary
                // Include any necessary headers like Authorization if needed
            });

            if (response.ok) {
              alert('Chatroom created successfully!');
              // Reset form fields to their initial state
              setName('');
              setAllowedRoles(['admin']); // Reset to default or initial state as per your requirement
              setImage(null);
              setImagePreview(null);
          } else {
                alert('Failed to create chatroom.');
            }
        } catch (error) {
            console.error('Error creating chatroom:', error);
            alert('Error creating chatroom.');
        }
    };

    // Render a form for creating a new chatroom
    return (
        <div className="header_footer_div">
          <Header />
          <div className="gallery-page">
            <div className="side-by-side">
              <div className="upload-div">
                <h2>Create Chatroom</h2>
                <form onSubmit={handleSubmit} className="upload-form1">
                  <div className="form-group">
                    <label htmlFor="chatroomName">Chatroom Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="chatroomName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
      
                  <fieldset className="form-group">
                    <legend>Allowed Roles</legend>
                    {['user', 'verifiedUser', 'employee'].map((role) => (
                      <div className="form-check" key={role}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`role-${role}`}
                          checked={allowedRoles.includes(role)}
                          onChange={(e) => handleRoleChange(role, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor={`role-${role}`}>
                          {role}
                        </label>
                      </div>
                    ))}
                  </fieldset>
      
                  <div className="form-group">
                    <label htmlFor="chatroomImage">Chatroom Image:</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="chatroomImage"
                      accept=".jpg,.png,.jpeg,.jfif,.gif"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
      
                  <button type="submit" className="btn btn-primary mt-3">Create Chatroom</button>
                </form>
              </div>
              <div className={imagePreview ? "image-preview1" : "placeholder-text"}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Chatroom preview" />
                ) : (
                  "Image Preview"
                )}
              </div>
            </div>
          </div>
          <ChatButton />
          <Footer />
        </div>
      );
      


};

export default CreateChatrooms;
