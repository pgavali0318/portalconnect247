'use client';

import { useState } from 'react';
import AddressInput from '../components/AddressInput';
import ProviderResults from '../components/ProviderResults';

export default function HomePage() {
  const [searchData, setSearchData] = useState<{ address: string; zipCode: string } | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAddressSelect = (address: string, zipCode: string) => {
    setSearchData({ address, zipCode });
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setSearchData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-violet-600 p-2 rounded-lg">
                <span className="text-white font-bold text-xl">🏠</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ConnectPortal247</h1>
            </div>
            <div className="text-sm text-gray-600">
              Currently serving 5 cities across MI, OH & IN
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Moving Made
                <span className="text-indigo-600"> Simple</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Find real electricity, internet, and trash service providers 
                with verified contact information and pricing.
              </p>

              {/* Service Icons */}
              <div className="flex justify-center space-x-12 mb-12">
                <div className="text-center">
                  <div className="bg-yellow-100 p-4 rounded-full inline-block mb-2">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Electricity</p>
                  <p className="text-xs text-gray-500">Same-day quotes</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full inline-block mb-2">
                    <span className="text-3xl">📶</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Internet</p>
                  <p className="text-xs text-gray-500">Speed comparisons</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full inline-block mb-2">
                    <span className="text-3xl">🗑️</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Trash Service</p>
                  <p className="text-xs text-gray-500">Immediate setup</p>
                </div>
              </div>
            </div>

            {/* Address Input Section */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Enter Your New Address
                </h3>
                <AddressInput onAddressSelect={handleAddressSelect} />
              </div>
            </div>

            {/* Coverage Area */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
                Currently Serving These Cities
              </h3>
              <div className="grid md:grid-cols-5 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium text-gray-900">Detroit</p>
                  <p className="text-sm text-gray-600">Michigan</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="font-medium text-gray-900">Columbus</p>
                  <p className="text-sm text-gray-600">Ohio</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="font-medium text-gray-900">Indianapolis</p>
                  <p className="text-sm text-gray-600">Indiana</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-medium text-gray-900">Ann Arbor</p>
                  <p className="text-sm text-gray-600">Michigan</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="font-medium text-gray-900">Toledo</p>
                  <p className="text-sm text-gray-600">Ohio</p>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-6">
                More cities coming soon! We&apos;re expanding to all major metropolitan areas.
              </p>
            </div>
          </>
        ) : (
          searchData && (
            <ProviderResults 
              address={searchData.address}
              zipCode={searchData.zipCode}
              onBack={handleBackToSearch}
            />
          )
        )}
      </main>
    </div>
  );
}