import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { mockTasks } from '../data/mockData';
import { Filter, Search, Bot } from 'lucide-react';
import './TaskTracker.css';

const TaskTracker = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredTasks = filter === 'All' 
    ? mockTasks 
    : mockTasks.filter(t => t.role === filter || t.assignee === filter);

  return (
    <div className="task-tracker animate-fade-in">
      <div className="page-header">
        <h1>Task Allocations</h1>
        <p className="text-muted">Manage and track AI-allocated tasks per staff member.</p>
      </div>

      <Card className="task-card">
        <div className="task-controls">
          <div className="search-box">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search tasks..." className="search-input-field" />
          </div>
          
          <div className="filter-group">
            <Filter size={18} className="text-muted" />
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Staff</option>
              <option value="Shafika">Shafika (Project Manager)</option>
              <option value="Wendy">Wendy (Admin/Accounts)</option>
              <option value="Jasper">Jasper (Sales Exec/MD)</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Client</th>
                <th>Assignee</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td>
                    <div className="task-name">{task.title}</div>
                    <div className="task-id">{task.id}</div>
                  </td>
                  <td>{task.clientName}</td>
                  <td>
                    <div className="td-assignee">
                      <span className="td-name">{task.assignee}</span>
                      <span className="td-role">{task.role}</span>
                    </div>
                  </td>
                  <td>{task.dueDate}</td>
                  <td>
                    <Badge variant={
                      task.priority === 'high' ? 'danger' : 
                      task.priority === 'medium' ? 'warning' : 'success'
                    }>
                      {task.priority}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant={task.status === 'completed' ? 'success' : 'neutral'}>
                      {task.status}
                    </Badge>
                  </td>
                  <td>
                    {task.aiGenerated ? (
                      <div className="ai-source" title="Allocated by PA Agent">
                        <Bot size={16} /> PA Agent
                      </div>
                    ) : (
                      <span className="manual-source">Manual</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TaskTracker;
