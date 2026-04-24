import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { mockMetrics, mockTasks, mockClients } from '../data/mockData';
import { Users, FileText, CheckCircle, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard animate-fade-in">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p className="text-muted">Bird's-eye view of your clients and PA Agent allocations.</p>
      </div>

      <div className="metrics-grid">
        <Card className="metric-card">
          <div className="metric-content">
            <div className="metric-icon bg-info-subtle">
              <Users size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Total Clients</span>
              <span className="metric-value">{mockMetrics.totalClients}</span>
            </div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="metric-content">
            <div className="metric-icon bg-warning-subtle">
              <FileText size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Active Projects</span>
              <span className="metric-value">{mockMetrics.activeProjects}</span>
            </div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="metric-content">
            <div className="metric-icon bg-success-subtle">
              <CheckCircle size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Pending Tasks</span>
              <span className="metric-value">{mockMetrics.pendingTasks}</span>
            </div>
          </div>
        </Card>

        <Card className="metric-card ai-metric">
          <div className="metric-content">
            <div className="metric-icon ai-icon">
              <Bot size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label text-white">AI Allocated Tasks</span>
              <span className="metric-value text-white">{mockMetrics.aiAllocatedTasks}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="dashboard-content">
        <Card title="AI-Suggested Next Actions" className="dashboard-tasks">
          <div className="task-list">
            {mockTasks.filter(t => t.aiGenerated).slice(0, 3).map(task => (
              <div key={task.id} className="task-item ai-task-item">
                <div className="task-left">
                  <div className="task-status"></div>
                  <div className="task-details">
                    <h4 className="task-title">{task.title}</h4>
                    <span className="task-client">{task.clientName} | {task.sopStep}</span>
                    <div className="task-reason">
                      <strong>Why:</strong> {task.triggerReason}
                    </div>
                  </div>
                </div>
                <div className="task-right">
                  <Badge variant={
                    task.priority === 'high' ? 'danger' : 
                    task.priority === 'medium' ? 'warning' : 'success'
                  }>
                    {task.priority}
                  </Badge>
                  <div className="task-assignee">
                    <span className="assignee-name">{task.assignee}</span>
                    <span className="assignee-role">{task.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/tasks" className="view-all-link">
            View all tasks <ArrowRight size={16} />
          </Link>
        </Card>

        <Card title="Active Client Pipeline" className="dashboard-clients">
          <div className="client-list">
            {mockClients.filter(c => c.status === 'active').map(client => (
              <div key={client.id} className="client-item">
                <div className="client-info">
                  <div className="client-info-header">
                    <h4 className="client-name">{client.name}</h4>
                    <Badge variant="neutral">{client.submissionType}</Badge>
                  </div>
                  
                  <div className="workflow-progression">
                    {['Business Development', 'Quotation', 'Project Kickoff', 'Submission', 'Post-Submission'].map((stage, idx) => {
                       const currentStageIdx = ['Business Development', 'Quotation', 'Project Kickoff', 'Submission', 'Post-Submission'].indexOf(client.stage);
                       const isPast = idx < currentStageIdx;
                       const isCurrent = idx === currentStageIdx;
                       return (
                         <div key={stage} className={`progress-step ${isPast ? 'past' : ''} ${isCurrent ? 'current' : ''}`} title={stage}>
                           <div className="step-dot"></div>
                           {idx < 4 && <div className="step-line"></div>}
                         </div>
                       );
                    })}
                  </div>
                </div>
                <div className="client-stage">
                  <Badge variant="primary">{client.stage}</Badge>
                </div>
                <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                  View
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
