import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <Link to="/create-event">Create Event</Link>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date_time).toLocaleString()}</p>
            <Link to={`/book-ticket/${event._id}`}>Book Ticket</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;