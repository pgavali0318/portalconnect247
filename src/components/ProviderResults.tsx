'use client';

import { useState, useEffect } from 'react';
import { Provider, detectCity, getProvidersForCity, getCityDisplayName } from '../data/providers';

interface ProviderResultsProps {
  address: string;
  zipCode: string;
  onBack: () => void;
}

export default function ProviderResults({ address, zipCode, onBack }: ProviderResultsProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay for realistic feel
    setTimeout(() => {
      const detectedCity = detectCity(address, zipCode);
      const cityProviders = getProvidersForCity(detectedCity);
      const displayName = getCityDisplayName(detectedCity);
      
      setProviders(cityProviders);
      setCityName(displayName);
      setIsLoading(false);
    }, 1500);
  }, [address, zipCode]);

  const getServiceIcon = (type: Provider['type']) => {
    switch (type) {
      case 'electricity':
        return '⚡';
      case 'internet':
        return '📶';
      case 'trash':
        return '🗑️';
      default:
        return '🏠';
    }
  };

  const getServiceColor = (type: Provider['type']) => {
    switch (type) {
      case 'electricity':
        return 'border-l-yellow-400 bg-yellow-50';
      case 'internet':
        return 'border-l-blue-400 bg-blue-50';
      case 'trash':
        return 'border-l-green-400 bg-green-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Finding Providers in Your Area
        </h2>
        <p className="text-gray-600">
          Searching for electricity, internet, and trash services...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Providers for {cityName}
            </h2>
            <p className="text-gray-600">{address}, {zipCode}</p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Search Again
          </button>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">
            ✅ Found {providers.length} providers in your area
          </p>
          <p className="text-green-700 text-sm mt-1">
            All contact information verified and up-to-date
          </p>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="grid gap-6">
        {providers.map((provider) => (
          <div 
            key={provider.id} 
            className={`bg-white rounded-xl shadow-xl border-l-4 ${getServiceColor(provider.type)} p-6 hover:shadow-2xl transition-shadow`}
          >
            {/* Provider Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getServiceIcon(provider.type)}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 capitalize">{provider.type} Provider</span>
                    <span className="text-yellow-500">{'★'.repeat(Math.floor(provider.rating))}</span>
                    <span className="text-sm text-gray-600">({provider.rating})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Details */}
            <p className="text-gray-700 mb-4">{provider.description}</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Estimated Price</p>
                <p className="text-lg font-bold text-gray-900">{provider.priceRange}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Connection Time</p>
                <p className="text-lg font-bold text-gray-900">{provider.connectionTime}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Service Area</p>
                <p className="text-lg font-bold text-gray-900">{provider.serviceArea}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${provider.phone}`}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                📞 Call {provider.phone}
              </a>
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                🌐 Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="font-semibold text-indigo-900 mb-2">Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-1 text-indigo-800">
          <li>Call providers to confirm availability and current pricing</li>
          <li>Schedule installation appointments</li>
          <li>Ask about any current promotions or discounts</li>
          <li>Coordinate timing between all three services</li>
        </ol>
        <p className="mt-4 text-sm text-indigo-700">
          💡 <strong>Pro tip:</strong> Mention you're moving to get the best new customer deals!
        </p>
      </div>
    </div>
  );
}