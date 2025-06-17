'use client';

import React from 'react';

interface GenerateButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  children,
  disabled = false,
  className = 'w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all ease-in-out duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md',
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children || 'Generate Headlines'}
    </button>
  );
};

export default GenerateButton;