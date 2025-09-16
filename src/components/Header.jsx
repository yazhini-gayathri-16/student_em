import React from 'react';
import { Bell, LogOut } from 'lucide-react';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-[var(--color-primary)] text-[var(--color-text-primary)] px-6 py-4 flex justify-between items-center shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Event management system</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* <Bell className="h-5 w-5 text-[var(--color-text-primary)]" /> */}
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 bg-[var(--color-button-primary)] hover:bg-[var(--color-button-secondary)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;