
import React from 'react';
import { Agent } from '../types';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgentId: string;
  onAgentChange: (agentId: string) => void;
  disabled?: boolean;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ agents, selectedAgentId, onAgentChange, disabled }) => {
  const selectedAgent = agents.find(agent => agent.id === selectedAgentId);

  return (
    // Removed mb-6, sidebar will manage spacing. Added width full.
    <div className="w-full p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <label htmlFor="agent-select" className="block text-sm font-semibold text-gray-700 mb-1">
        Selecionar Especialista:
      </label>
      <select
        id="agent-select"
        value={selectedAgentId}
        onChange={(e) => onAgentChange(e.target.value)}
        disabled={disabled}
        className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        aria-label="Selecionar especialista AI"
      >
        {agents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.name}
          </option>
        ))}
      </select>
      {selectedAgent && (
        <p className="mt-2 text-xs text-gray-500 italic">
          {selectedAgent.description}
        </p>
      )}
    </div>
  );
};

export default AgentSelector;
