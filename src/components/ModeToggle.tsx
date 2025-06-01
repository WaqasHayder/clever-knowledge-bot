
import React from 'react';

interface ModeToggleProps {
  isPrivateMode: boolean;
  onToggle: (isPrivate: boolean) => void;
}

const ModeToggle = ({ isPrivateMode, onToggle }: ModeToggleProps) => {
  return (
    <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
      <button
        onClick={() => onToggle(false)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          !isPrivateMode
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Public Mode
      </button>
      <button
        onClick={() => onToggle(true)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isPrivateMode
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Private Mode
      </button>
    </div>
  );
};

export default ModeToggle;
