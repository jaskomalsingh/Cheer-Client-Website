import React, { useState } from 'react';

const EventForm = ({ onEventSubmit }) => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    googleFormLink: '',
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEventSubmit(event);
    setEvent({ title: '', description: '', date: '', googleFormLink: '' });
  };

  return (
    <div className="event-form-container">
    <h2>Add New Event</h2>
    <form onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Title" value={event.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={event.description} onChange={handleChange} required />
      <input name="date" type="date" value={event.date} onChange={handleChange} required />
      <input name="googleFormLink" type="text" placeholder="Google Form Link" value={event.googleFormLink} onChange={handleChange} required />
      <button type="submit">Post Event</button>
      </form>
    </div>
  );
};

export default EventForm;