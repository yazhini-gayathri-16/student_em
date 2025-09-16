import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const SearchableDropdown = ({
  value,
  onChange,
  options,
  placeholder = "Search or select...",
  label,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState(value || '');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchText(value || '');
  }, [value]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter options based on search text
    if (text) {
      const filtered = options.filter(option =>
        option.keyword.toLowerCase().includes(text.toLowerCase())
      ).sort((a, b) => {
        const aKeyword = a.keyword.toLowerCase();
        const bKeyword = b.keyword.toLowerCase();
        const searchLower = text.toLowerCase();

        // Exact matches first
        if (aKeyword === searchLower && bKeyword !== searchLower) return -1;
        if (aKeyword !== searchLower && bKeyword === searchLower) return 1;

        // Then starts with matches
        if (aKeyword.startsWith(searchLower) && !bKeyword.startsWith(searchLower)) return -1;
        if (!aKeyword.startsWith(searchLower) && bKeyword.startsWith(searchLower)) return 1;

        // Finally alphabetical
        return aKeyword.localeCompare(bKeyword);
      });
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }

    onChange(text);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setSearchText(option.keyword);
    onChange(option.keyword);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleOptionClick(filteredOptions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-8 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-button-primary)] focus:border-transparent text-sm"
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map((option, index) => (
                <li key={option.id || index}>
                  <button
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                  >
                    <span className="block text-gray-900">
                      {option.keyword}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              {searchText ? `No keywords found matching "${searchText}"` : 'No keywords available'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;