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
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-violet-600">
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
              Now serving 14 major cities across MI, OH & IN
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Moving Made
                <span className="text-yellow-300"> Simple</span>
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto mb-8">
                Find real electricity, internet, and trash service providers 
                with verified contact information across the Midwest.
              </p>

              {/* Service Icons */}
              <div className="flex justify-center space-x-12 mb-12">
                <div className="text-center">
                  <div className="bg-yellow-100 p-4 rounded-full inline-block mb-2">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <p className="text-sm font-medium text-white">Electricity</p>
                  <p className="text-xs text-violet-200">Same-day quotes</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full inline-block mb-2">
                    <span className="text-3xl">📶</span>
                  </div>
                  <p className="text-sm font-medium text-white">Internet</p>
                  <p className="text-xs text-violet-200">Speed comparisons</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full inline-block mb-2">
                    <span className="text-3xl">🗑️</span>
                  </div>
                  <p className="text-sm font-medium text-white">Trash Service</p>
                  <p className="text-xs text-violet-200">Immediate setup</p>
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

            {/* Coverage Area - Now showing all 14 cities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                Complete Coverage Across the Midwest
              </h3>
              <p className="text-center text-gray-600 mb-8">
                We now serve 14 major metropolitan areas with over 40 verified providers
              </p>

              {/* Michigan Cities */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-blue-600 mb-4 text-center">Michigan</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Detroit</p>
                    <p className="text-sm text-gray-600">Metro Area</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Grand Rapids</p>
                    <p className="text-sm text-gray-600">West Michigan</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Ann Arbor</p>
                    <p className="text-sm text-gray-600">University City</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Lansing</p>
                    <p className="text-sm text-gray-600">Capital City</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Kalamazoo</p>
                    <p className="text-sm text-gray-600">Southwest MI</p>
                  </div>
                </div>
              </div>

              {/* Ohio Cities */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-red-600 mb-4 text-center">Ohio</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Columbus</p>
                    <p className="text-sm text-gray-600">Capital City</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Cleveland</p>
                    <p className="text-sm text-gray-600">Northeast OH</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Cincinnati</p>
                    <p className="text-sm text-gray-600">Southwest OH</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Toledo</p>
                    <p className="text-sm text-gray-600">Northwest OH</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Dayton</p>
                    <p className="text-sm text-gray-600">West-Central OH</p>
                  </div>
                </div>
              </div>

              {/* Indiana Cities */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-yellow-600 mb-4 text-center">Indiana</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Indianapolis</p>
                    <p className="text-sm text-gray-600">Capital City</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Fort Wayne</p>
                    <p className="text-sm text-gray-600">Northeast IN</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">Evansville</p>
                    <p className="text-sm text-gray-600">Southwest IN</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <p className="font-medium text-gray-900">South Bend</p>
                    <p className="text-sm text-gray-600">North-Central IN</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-violet-50 rounded-xl p-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-violet-600">14</div>
                    <div className="text-sm text-gray-600">Major Cities</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-violet-600">42+</div>
                    <div className="text-sm text-gray-600">Verified Providers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-violet-600">3</div>
                    <div className="text-sm text-gray-600">States Covered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-violet-600">24/7</div>
                    <div className="text-sm text-gray-600">Service Available</div>
                  </div>
                </div>
              </div>

              <p className="text-center text-gray-600 mt-6">
                <strong>Coming Soon:</strong> More cities across the Midwest region including Battle Creek, MI • Akron, OH • Gary, IN • and many more!
              </p>
            </div>

            {/* How It Works - Enhanced */}
            <div className="mt-20">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-12">
                  How ConnectPortal247 Works
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-violet-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      1
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Enter Your Address</h4>
                    <p className="text-gray-600">
                      Tell us where you&apos;re moving across MI, OH, or IN and we&apos;ll instantly identify all available providers in your specific area.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-violet-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      2
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Get Smart Recommendations</h4>
                    <p className="text-gray-600">
                      Our system analyzes your location and provides personalized recommendations based on service quality, pricing, and local performance.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-violet-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      3
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Connect Instantly</h4>
                    <p className="text-gray-600">
                      Contact providers directly with verified phone numbers and websites. Schedule installations and get your new home connected fast.
                    </p>
                  </div>
                </div>
              </div>
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