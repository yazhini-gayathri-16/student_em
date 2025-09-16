# Event Management System - Student Portal

A React-based student dashboard for event management system with Firebase backend integration.

## Project Structure

```
eventman_student/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Static assets (images, icons, etc.)
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx       # Application header with logout
│   │   ├── Header.css
│   │   ├── SideBar.jsx      # Filter sidebar
│   │   ├── SideBar.css
│   │   ├── EventCard.jsx    # Individual event card
│   │   ├── EventCard.css
│   │   ├── EventList.jsx    # List of events
│   │   ├── EventList.css
│   │   └── index.js         # Components barrel export
│   ├── context/             # React context providers
│   │   └── AuthContext.jsx  # Authentication context
│   ├── data/                # Static data and constants
│   │   └── sampleEvents.js  # Sample event data
│   ├── pages/               # Page components
│   │   ├── StudentDashboard.jsx  # Main dashboard page
│   │   ├── StudentDashboard.css
│   │   └── index.js         # Pages barrel export
│   ├── services/            # API services and business logic
│   │   ├── authService.js   # Authentication services
│   │   ├── eventService.js  # Event-related services
│   │   └── index.js         # Services barrel export
│   ├── utils/               # Utility functions and configurations
│   │   └── firebase.js      # Firebase configuration
│   ├── App.js               # Main application component
│   ├── App.css              # Global application styles
│   ├── index.js             # Application entry point
│   └── index.css            # Global CSS styles
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## Features

- **Student Dashboard**: Clean, responsive interface for viewing events
- **Event Filtering**: Filter by location, team size, and event type
- **Firebase Integration**: Real-time data with Firestore
- **Authentication**: Firebase Auth integration ready
- **Responsive Design**: Mobile-friendly layout
- **Component Architecture**: Well-structured, reusable components

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Configuration

The application is configured to connect to Firebase with the following services:
- **Firestore**: For event data storage
- **Authentication**: For user management
- **Hosting**: For deployment

## Components Overview

### Header
- Application title
- Logout functionality
- Responsive design

### SideBar
- Event filtering options
- Location, team size, and event type filters
- Clean, dark theme design

### EventCard
- Individual event display
- Event details (title, description, location, date, type)
- Registration button
- Hover effects and animations

### EventList
- Container for multiple EventCard components
- Responsive grid layout

## Services

### eventService
- `getAllEvents()`: Fetch all events from Firestore
- `getEventById(id)`: Get specific event details
- `registerForEvent(eventId, studentData)`: Register student for event
- `getStudentRegistrations(studentId)`: Get student's registered events

### authService
- `login(email, password)`: User authentication
- `register(email, password, userData)`: User registration
- `logout()`: User logout
- `getUserProfile(userId)`: Get user profile data

## Available Scripts

- `npm start`: Run development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)