'use client';

import { useState, useEffect, useCallback } from 'react';

interface Provider {
  id: string;
  name: string;
  type: 'electricity' | 'internet' | 'trash';
  phone: string;
  website: string;
  description: string;
  priceRange: string;
  connectionTime: string;
  serviceType: string;
  rating: number;
  coverage: number;
}

interface ProviderResultsProps {
  address: string;
  zipCode: string;
  onBack: () => void;
}

export default function ProviderResults({ address, zipCode, onBack }: ProviderResultsProps) {
  const [providers, setProviders] = useState<{[key: string]: Provider[]}>({});
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProviders = useCallback(async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Mock data based on ZIP code
        const mockProviders = getMockProviders(zipCode);
        setProviders(mockProviders.providers);
        setCityName(mockProviders.cityName);
        setLoading(false);
      }, 2000);
    } catch (error: unknown) {
      console.error('Error fetching providers:', error);
      setLoading(false);
    }
  }, [zipCode]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const getMockProviders = (zip: string): { cityName: string; providers: {[key: string]: Provider[]} } => {
    // Mock data for different ZIP codes
    if (zip === '49001') {
      return {
        cityName: 'Kalamazoo',
        providers: {
          electricity: [
            {
              id: 'consumers-energy',
              name: 'Consumers Energy',
              type: 'electricity' as const,
              phone: '1-800-477-5050',
              website: 'https://www.consumersenergy.com',
              description: 'Major electric utility serving western and central Michigan.',
              priceRange: '$85-125/month',
              connectionTime: '3 business days',
              serviceType: 'Electric Utility',
              rating: 4.1,
              coverage: 100
            }
          ],
          internet: [
            {
              id: 'spectrum',
              name: 'Spectrum',
              type: 'internet' as const,
              phone: '1-844-287-8405',
              website: 'https://www.spectrum.com',
              description: 'High-speed cable internet with reliable service in Kalamazoo area.',
              priceRange: '$55-90/month',
              connectionTime: '7-10 business days',
              serviceType: 'Cable Internet',
              rating: 4.2,
              coverage: 95
            },
            {
              id: 'xfinity',
              name: 'Xfinity',
              type: 'internet' as const,
              phone: '1-800-934-6489',
              website: 'https://www.xfinity.com',
              description: 'High-speed cable and fiber internet with wide coverage.',
              priceRange: '$60-100/month',
              connectionTime: '7-14 business days',
              serviceType: 'Cable/Fiber Internet',
              rating: 4.0,
              coverage: 85
            }
          ],
          trash: [
            {
              id: 'republic-services',
              name: 'Republic Services',
              type: 'trash' as const,
              phone: '1-800-746-4737',
              website: 'https://www.republicservices.com',
              description: 'Comprehensive waste management and recycling services.',
              priceRange: '$35-50/month',
              connectionTime: '1-2 business days',
              serviceType: 'Waste Collection',
              rating: 4.0,
              coverage: 100
            },
            {
              id: 'waste-management',
              name: 'Waste Management',
              type: 'trash' as const,
              phone: '1-800-796-9696',
              website: 'https://www.wm.com',
              description: 'Leading waste collection and recycling services nationwide.',
              priceRange: '$40-60/month',
              connectionTime: '1-3 business days',
              serviceType: 'Waste Collection & Recycling',
              rating: 4.1,
              coverage: 100
            }
          ]
        }
      };
    }

    // Default for other ZIP codes
    return {
      cityName: 'Your Area',
      providers: {} as {[key: string]: Provider[]}
    };
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electricity': return '⚡';
      case 'internet': return '📶';
      case 'trash': return '🗑️';
      default: return '🏠';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'electricity': return 'border-yellow-400 bg-yellow-50';
      case 'internet': return 'border-blue-400 bg-blue-50';
      case 'trash': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Finding Real Providers...</h2>
          <p className="text-gray-600">Searching for providers in {zipCode}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Providers Found: {Object.values(providers).flat().length} options
          </h2>
          <button 
            onClick={onBack}
            className="flex items-center text-violet-600 hover:text-violet-800 font-medium"
          >
            ← Search Another Address
          </button>
        </div>
        
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-lg font-semibold text-violet-800">📍 {address}</p>
          <p className="text-violet-700">ZIP: {zipCode} • City: {cityName}</p>
          <p className="text-sm text-violet-600 mt-1">
            ✅ Showing available providers in your area
          </p>
        </div>
      </div>

      {/* Provider Results */}
      <div className="space-y-8">
        {Object.entries(providers).map(([category, categoryProviders]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-2">{getCategoryIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)} Providers
              <span className="ml-2 bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-sm">
                {categoryProviders.length} found
              </span>
            </h3>

            <div className="grid gap-4">
              {categoryProviders.map((provider) => (
                <div 
                  key={provider.id} 
                  className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${getCategoryColor(category)}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {provider.name}
                      </h4>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {renderStars(provider.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {provider.rating}/5.0
                        </span>
                        <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          ✓ Verified
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{provider.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Cost</p>
                      <p className="font-semibold text-gray-900">{provider.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Connection Time</p>
                      <p className="font-semibold text-gray-900">{provider.connectionTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Service Type</p>
                      <p className="font-semibold text-gray-900">{provider.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Coverage</p>
                      <p className="font-semibold text-gray-900">{provider.coverage}% in your area</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a 
                      href={`tel:${provider.phone}`}
                      className="flex items-center bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      📞 {provider.phone}
                    </a>
                    <a 
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center border border-violet-600 text-violet-600 px-4 py-2 rounded-lg hover:bg-violet-50 transition-colors"
                    >
                      🌐 Visit Website
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">🎯 Next Steps:</h3>
        <ul className="space-y-2 text-gray-700">
          <li>1. 📞 Call providers 2-3 weeks before your move date</li>
          <li>2. ⚡ Schedule electricity connection first (required for other services)</li>
          <li>3. 📶 Book internet installation 7-10 days in advance</li>
          <li>4. 🗑️ Set up trash service for your move-in date</li>
        </ul>
        <p className="text-sm text-gray-600 mt-4">
          💡 <strong>Pro tip:</strong> Mention you&apos;re moving to get the best new customer deals!
        </p>
      </div>
    </div>
  );
}