import React, { useState, useEffect } from 'react';
import { Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchableDropdown from './SearchableDropdown.jsx';
import { keywordService } from '../services/keywordService.js';

const SideBar = ({ filters, onFilterChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [loadingKeywords, setLoadingKeywords] = useState(true);

  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      setLoadingKeywords(true);
      const fetchedKeywords = await keywordService.getAllKeywords();
      setKeywords(fetchedKeywords);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    } finally {
      setLoadingKeywords(false);
    }
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-68'} bg-[var(--color-primary)] border-r min-h-[88vh] transition-all duration-300 relative m-5 rounded-lg shadow-lg border border-[var(--color-border)]`}>
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-3 bg-[var(--color-button-primary)] border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
      >
        {isCollapsed ? (
          <ChevronRight className="h-6 w-6 text-white" />
        ) : (
          <ChevronLeft className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Header */}
      <div className="flex items-center p-4 mt-8 border-b border-gray-600">
        <Calendar className="h-5 w-5 text-[var(--color-text-primary)] flex-shrink-0" />
        {!isCollapsed && (
          <span className="ml-3 text-[var(--color-text-primary)] font-medium">Events</span>
        )}
      </div>

      {/* Filter section */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          <div className="flex items-center mb-4">
            <Filter className="h-4 w-4 text-[var(--color-text-primary)] mr-2" />
            <span className="text-[var(--color-text-primary)] font-medium">Filters</span>
          </div>

          <div className="space-y-4">
            {/* <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-button-primary)] focus:border-transparent text-sm"
              >
                <option value="">All Locations</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
              </select>
            </div> */}

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Location Search
              </label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-button-primary)] focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Team Size
              </label>
              <select
                value={filters.teamSize}
                onChange={(e) => onFilterChange('teamSize', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-button-primary)] focus:border-transparent text-sm"
              >
                <option value="">Any size</option>
                <option value="1-2">1-2</option>
                <option value="3-5">3-5</option>
                <option value="6-10">6-10</option>
              </select>
            </div>

            <div>
              {loadingKeywords ? (
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Event Type
                  </label>
                  <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500">
                    Loading keywords...
                  </div>
                </div>
              ) : (
                <SearchableDropdown
                  value={filters.eventType}
                  onChange={(value) => onFilterChange('eventType', value)}
                  options={keywords}
                  placeholder="Search event types..."
                  label="Event Type"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;