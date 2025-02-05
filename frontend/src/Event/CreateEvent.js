import axios from 'axios';
import React, { useState } from 'react'
import "./events.css"
import Api from '../axiosconfig';
function CreateEvent() {
    const[title,setTitle]=useState('')
    const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post('/api/event/events', { title, description, date, location });
      alert('Event created successfully!');
    } catch (error) {
      alert('Error creating event');
    }
  };
  return (
    <div className='create'>
      <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required />
      <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Event Location" required />
      <button type="submit">Create Event</button>
    </form>
  
    </div>
  )
}

export default CreateEvent