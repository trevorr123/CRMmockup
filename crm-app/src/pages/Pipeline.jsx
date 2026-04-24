import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { mockClients, pipelineStages } from '../data/mockData';
import { MoreHorizontal } from 'lucide-react';
import './Pipeline.css';

const Pipeline = () => {
  return (
    <div className="pipeline animate-fade-in">
      <div className="page-header">
        <h1>Client Pipeline</h1>
        <p className="text-muted">Kanban view of active projects and their current SOP stage.</p>
      </div>

      <div className="pipeline-board">
        {pipelineStages.map(stage => {
          const clientsInStage = mockClients.filter(c => c.stage === stage);
          return (
            <div key={stage} className="pipeline-column">
              <div className="column-header">
                <h3 className="column-title">{stage}</h3>
                <Badge variant="neutral">{clientsInStage.length}</Badge>
              </div>
              
              <div className="column-content">
                {clientsInStage.map(client => (
                  <Card key={client.id} className="pipeline-card">
                    <div className="pipeline-card-header">
                      <span className="client-id">{client.id}</span>
                      <button className="icon-btn-small">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <h4 className="pipeline-client-name">{client.name}</h4>
                    <span className="pipeline-client-loc">{client.location}</span>
                    
                    <div className="pipeline-card-footer">
                      <div className="assignees">
                        <div className="avatar-sm" title={`PM: ${client.pm}`}>
                          {client.pm.charAt(0)}
                        </div>
                        <div className="avatar-sm" title={`Sales: ${client.sales}`}>
                          {client.sales.charAt(0)}
                        </div>
                      </div>
                      <Badge variant={client.status === 'completed' ? 'success' : 'primary'}>
                        {client.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pipeline;
