'use client';

import { useState } from 'react';

type Props = {
  headlines: string[];
  onUpdateHeadline: (index: number, newText: string) => void; // New prop
};

export default function HeadlineOutput({ headlines, onUpdateHeadline }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleEdit = (index: number, currentText: string) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const handleSave = (index: number) => {
    onUpdateHeadline(index, editText);
    setEditingIndex(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  if (!headlines || headlines.length === 0) {
    return null;
  }

  const buttonBaseClasses = "py-2 px-3 rounded-md font-medium text-sm transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75";
  const primaryButtonClasses = `${buttonBaseClasses} bg-indigo-600 hover:bg-indigo-700 text-indigo-100 focus:ring-indigo-500`;
  const secondaryButtonClasses = `${buttonBaseClasses} bg-gray-600 hover:bg-gray-700 text-gray-100 focus:ring-gray-500`;
  const successButtonClasses = `${buttonBaseClasses} bg-green-500 hover:bg-green-600 text-white focus:ring-green-400`;


  return (
    <div className="mt-8 w-full max-w-2xl px-4">
      <h2 className="text-2xl font-semibold text-center text-indigo-400 mb-6">
         Generated Headlines
      </h2>
      <div className="space-y-4">
        {headlines.map((text, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-300 ease-in-out hover:shadow-indigo-500/50"
          >
            {editingIndex === idx ? (
              <div className="flex-grow w-full mb-3 sm:mb-0 sm:mr-4">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ) : (
              <p className="text-gray-100 text-lg flex-grow mb-3 sm:mb-0 sm:mr-4 break-words w-full sm:w-auto">
                {text}
              </p>
            )}
            <div className="flex space-x-2 flex-shrink-0 w-full sm:w-auto justify-end">
              {editingIndex === idx ? (
                <>
                  <button onClick={() => handleSave(idx)} className={successButtonClasses}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className={secondaryButtonClasses}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(idx, text)}
                    className={primaryButtonClasses}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCopy(text, idx)}
                    className={`${primaryButtonClasses} ${copiedIndex === idx ? 'bg-green-500 hover:bg-green-500 cursor-default' : ''}`}
                    disabled={copiedIndex === idx}
                  >
                    {copiedIndex === idx ? 'Copied!' : 'Copy'}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
