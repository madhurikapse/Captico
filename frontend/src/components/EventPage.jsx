import React from 'react';
import SocialShare from './SocialShare';

const EventPage = () => {
    const eventUrl = 'https://example.com/event/12345'; // Replace with actual event URL
    const eventTitle = 'Exciting Event';
    const eventDescription = 'Join us for an exciting event where you can learn and grow.';

    return (
        <div>
            <h1>{eventTitle}</h1>
            <p>{eventDescription}</p>
            <SocialShare
                url={eventUrl}
                title={eventTitle}
                description={eventDescription}
            />
        </div>
    );
};

export default EventPage;