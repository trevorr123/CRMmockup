import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="header-search">
        <Search size={18} className="text-muted" />
        <input 
          type="text" 
          placeholder="Search clients, tasks, or files..." 
          className="search-input"
        />
      </div>

      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">Jasper</span>
            <span className="user-role">Managing Director</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
