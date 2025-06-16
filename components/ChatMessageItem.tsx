
import React from 'react';
import { ChatMessage } from '../types';
import KnowledgeSourceDisplay from './KnowledgeSourceDisplay';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

const AiIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-600">
    <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3.004 6.072a.75.75 0 0 0-.498.859l1.468 7.338a.75.75 0 0 0 .668.526h13.716a.75.75 0 0 0 .668-.526l1.468-7.338a.75.75 0 0 0-.498-.859L12.378 1.602Z" />
    <path fillRule="evenodd" d="M12 21a8.25 8.25 0 0 0 5.275-1.843l.724.723a.75.75 0 0 0 1.06-1.06l-.723-.724A8.25 8.25 0 0 0 12 4.5V2.25a.75.75 0 0 0-1.5 0V4.5A8.25 8.25 0 0 0 5.664 18.1a.75.75 0 1 0 1.06 1.061A6.75 6.75 0 0 1 12 19.5v1.5Zm0-2.625a6.75 6.75 0 0 0 0-13.5v13.5Z" clipRule="evenodd" />
  </svg>
);


const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const BubbleStyles = isUser
    ? 'bg-blue-500 text-white self-end rounded-l-xl rounded-tr-xl'
    : 'bg-gray-100 text-gray-800 self-start rounded-r-xl rounded-tl-xl border border-gray-200';
  const FlexStyles = isUser ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`flex ${FlexStyles} items-start mb-4 max-w-[85%]`}>
      <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
        {isUser ? <UserIcon /> : <AiIcon />}
      </div>
      <div className={`py-2 px-4 shadow-md ${BubbleStyles} `}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        {message.sender === 'ai' && message.ragContext && (
          <KnowledgeSourceDisplay sources={message.ragContext} />
        )}
         <span className={`text-xs block mt-1 ${isUser ? 'text-blue-200 text-right' : 'text-gray-500 text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessageItem;
