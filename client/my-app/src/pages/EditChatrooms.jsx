import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatButton from './ChatButton';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateChatrooms.css';

const EditChatrooms = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const [selectedChatroom, setSelectedChatroom] = useState({});
    const [name, setName] = useState('');
    const [allowedRoles, setAllowedRoles] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const fetchChatrooms = async () => {
        const response = await fetch('http://localhost:3001/api/auth/getchatrooms');
        const data = await response.json();
        setChatrooms(data);
    };

    useEffect(() => {
        fetchChatrooms();
    }, []);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate]);

    const handleChatroomSelection = (e) => {
        const selectedId = e.target.value;
        const selected = chatrooms.find(chatroom => chatroom._id === selectedId);
        setSelectedChatroom(selected);
        setName(selected?.name || '');
        setAllowedRoles(selected?.allowedRoles || []);
        setImagePreview(selected?.image || '');
    };

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
    const deleteChatroom = async () => {
        if (!selectedChatroom || !selectedChatroom._id) {
            alert('No chatroom selected!');
            return;
        }
    
        const confirmDelete = window.confirm('Are you sure you want to delete this chatroom?');
    
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3001/api/auth/chatrooms/${selectedChatroom._id}`, {
                    method: 'DELETE', // Use the DELETE method
                    // Include headers if needed, such as for authentication
                });
    
                if (response.ok) {
                    alert('Chatroom deleted successfully!');
                    // Reset the form or perform other actions like navigating away or refreshing the chatroom list
                    setSelectedChatroom({}); // Reset selected chatroom
                    setName('');
                    setAllowedRoles([]);
                    setImage(null);
                    setImagePreview(null);
                    fetchChatrooms();
                } else {
                    // Handle errors or unsuccessful deletion
                    alert('Failed to delete chatroom.');
                }
            } catch (error) {
                console.error('Error deleting chatroom:', error);
                alert('Error deleting chatroom.');
            }
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('allowedRoles', JSON.stringify(allowedRoles));
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:3001/api/auth/editChatroom/${selectedChatroom._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Chatroom updated successfully!');
                // Reset the form to its initial state
                setSelectedChatroom({});
                setName('');
                setAllowedRoles(['admin']); // Or whatever your default roles are
                setImage(null);
                setImagePreview(null);
                // Optionally, you can also re-fetch the chatrooms to reflect any updates
                fetchChatrooms();
            }
            else {
                alert('Failed to update chatroom.');
            }
        } catch (error) {
            console.error('Error updating chatroom:', error);
            alert('Error updating chatroom.');
        }
    };

    return (
        <div className="header_footer_div">
            <Header />
            <div className="gallery-page">
                <div className="side-by-side">
                    <div className="upload-div">
                        <h2>Edit Chatroom</h2>
                        <select onChange={handleChatroomSelection} value={selectedChatroom?._id || ''}>
                            <option value=''>Select a chatroom</option>
                            {chatrooms.map(chatroom => (
                                <option key={chatroom._id} value={chatroom._id}>{chatroom.name}</option>
                            ))}
                        </select>
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
                                    accept=".jpg,.png,.jpeg,.gif"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mt-3">Update Chatroom</button>
                            <button type="button" className="btn btn-danger mt-3" onClick={deleteChatroom}>
                                Delete Chatroom
                            </button>

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

export default EditChatrooms;
