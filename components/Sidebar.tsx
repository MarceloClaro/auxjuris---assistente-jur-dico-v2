import React from 'react';
import { Agent } from '../types';
import AgentSelector from './AgentSelector'; // Assuming AgentSelector is in the same directory or adjust path

interface SidebarProps {
  agents: Agent[];
  selectedAgentId: string;
  onAgentChange: (agentId: string) => void;
  onModelFileSelect: (file: File) => void;
  isLoadingOrGenerating: boolean; // True if model is loading OR AI is generating response
  expectedModelName: string;
  lastError: string | null; // To display specific errors related to model loading attempts
}

const Sidebar: React.FC<SidebarProps> = ({
  agents,
  selectedAgentId,
  onAgentChange,
  onModelFileSelect,
  isLoadingOrGenerating,
  expectedModelName,
  lastError,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onModelFileSelect(file);
    }
    // Reset file input to allow selecting the same file again if needed after an error
    event.target.value = '';
  };

  return (
    <aside className="flex-none w-80 lg:w-96 bg-gray-50 p-4 border-r border-gray-200 shadow-lg flex flex-col overflow-y-auto custom-scrollbar">
      <div className="flex flex-col items-center mb-6 flex-shrink-0">
        <img 
          src="https://raw.githubusercontent.com/MarceloClaro/AUXJURIS/refs/heads/main/jus.png" 
          alt="AUXJURIS Logo" 
          className="w-24 h-24 rounded-full mb-4 shadow-md"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Configurações</h2>
        
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Carregar Modelo LLM</h3>
          <p className="text-xs text-gray-500 mb-1">
            Se o carregamento automático falhar, você pode carregar o arquivo <code>.bin</code> do modelo manualmente.
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Modelo esperado: <strong>{expectedModelName}</strong>
          </p>
          <input
            type="file"
            accept=".bin"
            onChange={handleFileChange}
            disabled={isLoadingOrGenerating}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100
                       disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Selecionar arquivo do modelo LLM"
          />
          {lastError && isLoadingOrGenerating && ( // Show error only if it's relevant to current loading process
             <p className="mt-2 text-xs text-red-600">Falha no carregamento: {lastError}</p>
          )}
           <p className="mt-2 text-xs text-gray-500">
            Após selecionar, o modelo tentará carregar automaticamente.
          </p>
        </div>
      </div>

      <div className="flex-grow"> {/* AgentSelector can take remaining space if needed */}
        <AgentSelector
          agents={agents}
          selectedAgentId={selectedAgentId}
          onAgentChange={onAgentChange}
          disabled={isLoadingOrGenerating}
        />
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200 text-center px-2 flex-shrink-0">
        <img 
          src="https://raw.githubusercontent.com/MarceloClaro/logos/refs/heads/main/EU1.jpg" 
          alt="Author's Photo" 
          className="w-16 h-16 rounded-full mx-auto mb-2 shadow-md"
        />
        <p className="text-xs text-gray-500 mb-1">
          AUXJURIS &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs text-gray-500">
          Autor: Marcelo Claro Laranjeira.
        </p>
        <p className="text-xs text-gray-500">
          Contato: +55 (88) 98587145
        </p>
        <p className="text-xs text-gray-500">
          marceloclaro@gmail.com
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
