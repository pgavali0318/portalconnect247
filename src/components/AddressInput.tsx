'use client';

import { useState } from 'react';

interface AddressInputProps {
  onAddressSelect: (address: string, zipCode: string) => void;
}

export default function AddressInput({ onAddressSelect }: AddressInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || !zipCode.trim()) {
      alert('Please fill in both address and ZIP code');
      return;
    }

    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      onAddressSelect(inputValue, zipCode);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📍 Street Address
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="123 Main St, Columbus, OH"
            className="block w-full px-3 py-4 text-lg border border-gray-300 rounded-xl 
                     focus:ring-2 focus:ring-voilet-500 focus:border-voilet-500 
                     placeholder-gray-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📮 ZIP Code
          </label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="43215"
            className="block w-full px-3 py-4 text-lg border border-gray-300 rounded-xl 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                     placeholder-gray-500"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-4 text-lg font-medium 
         text-white bg-violet-600 border border-transparent rounded-xl 
         hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed
         transition-all duration-200"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Finding Real Providers...
            </>
          ) : (
            <>
              🔍 Find My Providers
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>✅ Currently serving Michigan, Ohio, and Indiana</p>
        <p className="mt-1">🏙️ Coverage: Detroit • Columbus • Indianapolis • Ann Arbor • Toledo</p>
      </div>
    </div>
  );
}