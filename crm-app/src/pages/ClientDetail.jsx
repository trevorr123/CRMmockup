import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { mockClients, mockTasks } from '../data/mockData';
import { ArrowLeft, MapPin, Building, User, FileCheck, Upload, Activity, Clock, FileText } from 'lucide-react';
import './ClientDetail.css';

const ClientDetail = () => {
  const { id } = useParams();
  const client = mockClients.find(c => c.id === id) || mockClients[0];
  const clientTasks = mockTasks.filter(t => t.clientId === client.id);

  return (
    <div className="client-detail animate-fade-in">
      <div className="page-header detail-header">
        <Link to="/pipeline" className="back-link">
          <ArrowLeft size={16} /> Back to Pipeline
        </Link>
        <div className="header-title-row">
          <h1>{client.name}</h1>
          <Badge variant="primary">{client.stage}</Badge>
          <Badge variant="neutral">{client.submissionType}</Badge>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          
          <Card title="SOP Next Action" className="action-card">
            <div className="next-action-box">
              <Activity size={24} className="text-warning" />
              <div className="next-action-content">
                <h3>{client.nextAction}</h3>
                <p className="text-muted">Assigned to: {client.admin} / {client.pm}</p>
              </div>
            </div>
          </Card>

          <Card title="Recent Activity Timeline" className="timeline-card">
            <div className="activity-timeline">
              {client.activityTimeline.map((activity, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-indicator"></div>
                  <div className="timeline-content">
                    <span className="timeline-date"><Clock size={12}/> {activity.date}</span>
                    <p className="timeline-text">{activity.text}</p>
                    <span className="timeline-actor">by {activity.actor}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Task Status (Pending & Completed)" className="tasks-card">
            <div className="task-list">
              {clientTasks.length > 0 ? clientTasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-left">
                    <div className={`task-status ${task.status === 'completed' ? 'status-done' : ''}`}></div>
                    <div className="task-details">
                      <h4 className={`task-title ${task.status === 'completed' ? 'text-muted line-through' : ''}`}>{task.title}</h4>
                      <span className="task-client">Due: {task.dueDate} | {task.sopStep}</span>
                    </div>
                  </div>
                  <div className="task-right">
                    <div className="task-assignee">
                      <span className="assignee-name">{task.assignee}</span>
                      <span className="assignee-role">{task.role}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-muted">No pending tasks for this client.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="detail-sidebar">
          <Card title="Client Info">
            <ul className="info-list">
              <li>
                <Building size={16} className="text-muted" />
                <span>{client.id}</span>
              </li>
              <li>
                <MapPin size={16} className="text-muted" />
                <span>{client.location}</span>
              </li>
              <li>
                <User size={16} className="text-muted" />
                <span>Sales: {client.sales}</span>
              </li>
              <li>
                <User size={16} className="text-muted" />
                <span>PM: {client.pm}</span>
              </li>
              <li>
                <User size={16} className="text-muted" />
                <span>Admin: {client.admin}</span>
              </li>
            </ul>
          </Card>

          <Card title="Required Documents">
            <ul className="doc-list required-docs">
              {client.requiredDocs.map((doc, idx) => (
                <li key={idx} className="doc-item">
                  <FileText size={16} className="text-warning" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <div className="doc-upload-area mt-4">
              <Upload size={24} className="text-muted mb-2" />
              <p className="text-muted text-sm text-center">Upload requested document</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
