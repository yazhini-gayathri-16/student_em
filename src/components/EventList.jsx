import React from 'react';
import EventCard from './EventCard.jsx';

const EventList = ({ events, onRegister }) => {
  return (
    <div className="space-y-3">
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={onRegister}
        />
      ))}
    </div>
  );
};

export default EventList;