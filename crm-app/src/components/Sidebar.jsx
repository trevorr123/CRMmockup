import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Columns, CheckSquare, Users, Settings, Bot } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Pipeline', path: '/pipeline', icon: <Columns size={20} /> },
    { name: 'Task Tracker', path: '/tasks', icon: <CheckSquare size={20} /> }
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Bot size={24} className="text-info" />
        </div>
        <h2>PA Agent CRM</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
