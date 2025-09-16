import React from 'react';
import { MapPin, Calendar, Tag } from 'lucide-react';

const EventCard = ({ event, onRegister }) => {
  return (
    <div className="bg-[var(--color-secondary)] p-4 rounded-lg hover:bg-[var(--color-accent)] transition-colors cursor-pointer border-l-4 border-[var(--color-button-primary)] shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <h3 className="text-slate-700 font-medium text-lg mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{event.description}</p>

          <div className="flex flex-wrap items-center gap-4 mb-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              <span>{event.type}</span>
            </div>
          </div>

          <a
            href="#"
            className="text-[var(--color-button-primary)] text-xs font-medium hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            {event.showLess ? 'See less' : 'See more'}
          </a>
        </div>

        <button
          onClick={() => onRegister(event.id)}
          className="bg-[var(--color-button-primary)] hover:bg-[var(--color-button-secondary)] text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default EventCard;