// src/components/AddressInput.tsx - Updated with Navy Colors

'use client';

import { useState, useEffect } from 'react';

interface AddressInputProps {
  onAddressSelect: (data: { address: string; zipCode: string }) => void;
}

export default function AddressInput({ onAddressSelect }: AddressInputProps) {
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !zipCode.trim()) return;
    
    setIsLoading(true);
    onAddressSelect({ address: address.trim(), zipCode: zipCode.trim() });
    setIsLoading(false);
  };

  // Prevent hydration errors by not rendering until mounted
  if (!mounted) {
    return (
      <div className="w-full">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <div className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-100 h-12"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <div className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-100 h-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main Street, City, State"
              className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
              disabled={isLoading}
              suppressHydrationWarning
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="49001"
              maxLength={5}
              pattern="[0-9]{5}"
              className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
              disabled={isLoading}
              suppressHydrationWarning
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !address.trim() || !zipCode.trim()}
          className="w-full bg-slate-700 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-slate-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Searching...' : 'Find My Providers'}
        </button>
      </form>
    </div>
  );
}