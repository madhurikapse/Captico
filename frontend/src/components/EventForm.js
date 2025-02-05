import React, { useState } from 'react';
import axios from 'axios';

function EventForm() {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date_time: '',
    location: '',
    image_url: '',
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', event);
      alert('Event created successfully');
    } catch (error) {
      alert('Error creating event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={event.title} onChange={handleChange} placeholder="Title" />
      <textarea name="description" value={event.description} onChange={handleChange} placeholder="Description"></textarea>
      <input type="datetime-local" name="date_time" value={event.date_time} onChange={handleChange} />
      <input type="text" name="location" value={event.location} onChange={handleChange} placeholder="Location" />
      <input type="text" name="image_url" value={event.image_url} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;