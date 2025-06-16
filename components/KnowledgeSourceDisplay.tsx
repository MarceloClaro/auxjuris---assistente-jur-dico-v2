
import React from 'react';
import { RagSource } from '../types';

interface KnowledgeSourceDisplayProps {
  sources: RagSource[];
}

const KnowledgeSourceDisplay: React.FC<KnowledgeSourceDisplayProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 mb-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm">
      <h4 className="text-xs font-semibold text-indigo-700 mb-1.5">Fontes de Informação Consultadas:</h4>
      <ul className="list-disc list-inside space-y-1">
        {sources.map((source, index) => (
          <li key={`${source.documentId}-${index}`} className="text-xs text-indigo-600">
            <span className="font-medium">{source.title}:</span> "{source.snippet}..."
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KnowledgeSourceDisplay;
