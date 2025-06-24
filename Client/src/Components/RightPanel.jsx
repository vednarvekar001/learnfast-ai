import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function RightPanel({ showRightPanel, chatLog, loading, assistantEndRef, rightPanelRef }) {
  if (!showRightPanel) return null;

  return (
    <div
      ref={rightPanelRef}
      className="w-1/2 p-4 border-l border-black/50 resize-x overflow-auto bg-black text-white font-mono custom-scrollbar"
      style={{ minWidth: '200px' }}
    >
      <div className="flex flex-col gap-3">
        {chatLog
          .filter((msg) => msg.role === 'assistant')
          .map((msg, idx) => (
            <div
              key={idx}
              className="bg-white/10 text-green-300 p-3 rounded-md font-mono text-left whitespace-pre-wrap"
            >
              🤖 <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        <div ref={assistantEndRef} />

        {loading && (
          <div className="flex items-center gap-2 text-white text-lg animate-pulse">
            <AiOutlineLoading3Quarters className="animate-spin" /> AI is thinking...
          </div>
        )}
      </div>
    </div>
  );
}

export default RightPanel;
