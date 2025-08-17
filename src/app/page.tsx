// src/app/page.tsx
// Complete full homepage with AI integration - no truncation

'use client';

import { useState } from 'react';
import AddressInput from '../components/AddressInput';
import DatabaseProviderResults from '../components/DatabaseProviderResults';
import AIUtilityAdvisor from '../components/AIUtilityAdvisor';

interface SearchData {
  address: string;
  zipCode: string;
  services?: string[];
}

export default function HomePage() {
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(['internet']);

  const handleAddressSelect = (data: { address: string; zipCode: string }) => {
    setSearchData({ 
      address: data.address,
      zipCode: data.zipCode,
      services: selectedServices 
    });
  };

  const handleBack = () => {
    setSearchData(null);
  };

  const handleProviderSelect = (provider: any) => {
    console.log('AI recommended provider:', provider);
  };

  const handleBundleSelect = (bundle: any) => {
    console.log('AI recommended bundle:', bundle);
  };

  if (searchData) {
    return (
      <>
        <DatabaseProviderResults
          address={searchData.address}
          zipCode={searchData.zipCode}
          selectedServices={searchData.services || selectedServices}
          onBack={handleBack}
        />
        <AIUtilityAdvisor
          userLocation={searchData.zipCode}
          onProviderSelect={handleProviderSelect}
          onBundleSelect={handleBundleSelect}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">ConnectPortal247</h1>
              <p className="text-slate-200 text-sm">Your AI-Powered Utility Connection Experts</p>
            </div>
            <div className="text-right">
              <p className="text-slate-200 text-sm">Need Help?</p>
              <p className="text-white font-semibold">Ask Our AI Advisor →</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section with AI Highlight */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Utility Providers with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Get personalized recommendations for electricity, internet, cellular, and waste management services. 
            Our AI advisor finds the best deals and bundle savings for your specific needs.
          </p>
          
          {/* AI Features Highlight */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-lg">🤖</span>
              <span className="text-sm font-medium text-blue-900">AI-Powered Recommendations</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
              <span className="text-lg">💰</span>
              <span className="text-sm font-medium text-green-900">Bundle Savings Finder</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
              <span className="text-lg">⚡</span>
              <span className="text-sm font-medium text-purple-900">Instant Comparisons</span>
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="px-8 py-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              What services do you need?
            </h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { id: 'internet', name: 'Internet', icon: '📶', desc: 'High-speed broadband', popular: true },
                { id: 'cellular', name: 'Mobile', icon: '📱', desc: 'Cell phone service', popular: true, new: true },
                { id: 'electricity', name: 'Electricity', icon: '⚡', desc: 'Electric utility' },
                { id: 'waste', name: 'Waste', icon: '🗑️', desc: 'Trash & recycling' }
              ].map(service => (
                <button
                  key={service.id}
                  onClick={() => {
                    const updated = selectedServices.includes(service.id)
                      ? selectedServices.filter(s => s !== service.id)
                      : [...selectedServices, service.id];
                    setSelectedServices(updated);
                  }}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    selectedServices.includes(service.id) 
                      ? 'border-slate-700 bg-slate-50 shadow-md' 
                      : 'border-gray-200 hover:border-slate-400'
                  }`}
                >
                  {service.new && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <div className="font-semibold text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-600">{service.desc}</div>
                  {service.popular && (
                    <div className="mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Popular
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Bundle Alert */}
            {selectedServices.length > 1 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 text-lg">💰</span>
                  <h4 className="font-semibold text-green-900">Bundle Savings Available!</h4>
                </div>
                <p className="text-sm text-green-800">
                  You selected multiple services - our AI can find bundle deals that save you $10-30/month!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Address Input Section */}
        <div className="bg-white rounded-lg shadow-lg mb-12">
          <div className="px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Enter Your Address
                </h3>
                <p className="text-gray-600">
                  Get personalized recommendations for your location
                </p>
              </div>
              <AddressInput onAddressSelect={handleAddressSelect} />
              
              {/* AI Alternative */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Not sure what you need? Let our AI advisor help you!
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">🤖</span>
                      <div className="text-left">
                        <div className="font-medium text-blue-900">AI Utility Advisor</div>
                        <div className="text-sm text-blue-700">
                          Ask questions, get personalized recommendations, find bundle savings
                        </div>
                      </div>
                      <div className="text-blue-600 text-lg">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="bg-white rounded-lg shadow-lg mb-12">
          <div className="px-8 py-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Why Use Our AI Advisor?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">Personalized Recommendations</h4>
                <p className="text-gray-600 text-sm">
                  Tell us your needs, budget, and priorities. Our AI finds providers that match perfectly.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Bundle Savings Finder</h4>
                <p className="text-gray-600 text-sm">
                  Discover bundle deals that save $15-30/month compared to separate providers.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">Instant Expert Advice</h4>
                <p className="text-gray-600 text-sm">
                  Get answers 24/7. No waiting for callbacks or researching dozens of websites.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="bg-white rounded-lg shadow-lg mb-12">
          <div className="px-8 py-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Service Areas
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-4">Michigan</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Kalamazoo (Complete Coverage)</li>
                  <li>• Detroit</li>
                  <li>• Grand Rapids</li>
                  <li>• Ann Arbor</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-4">Ohio</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Columbus</li>
                  <li>• Cleveland</li>
                  <li>• Cincinnati</li>
                  <li>• Toledo</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-4">Indiana</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Indianapolis</li>
                  <li>• Fort Wayne</li>
                  <li>• Evansville</li>
                  <li>• More cities coming soon</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators with AI */}
        <div className="bg-slate-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Why Choose ConnectPortal247?
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-slate-700 mb-2">🤖</div>
                <div className="text-sm font-medium text-gray-900">AI-Powered</div>
                <p className="text-gray-600 text-xs">Smart recommendations</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-700 mb-2">500+</div>
                <div className="text-sm font-medium text-gray-900">Verified Providers</div>
                <p className="text-gray-600 text-xs">Comprehensive database</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-700 mb-2">14</div>
                <div className="text-sm font-medium text-gray-900">Cities Covered</div>
                <p className="text-gray-600 text-xs">Growing coverage</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-700 mb-2">24/7</div>
                <div className="text-sm font-medium text-gray-900">AI Support</div>
                <p className="text-gray-600 text-xs">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ConnectPortal247</h3>
              <p className="text-slate-300 text-sm">
                Your AI-powered resource for finding local utility providers across the Midwest.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">AI Features</h4>
              <p className="text-slate-300 text-sm">
                Personalized recommendations<br />
                Bundle savings finder<br />
                24/7 expert advice<br />
                Smart comparisons
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-slate-300 text-sm">
                Phone: 1-800-CONNECT<br />
                Email: support@connectportal247.com<br />
                AI Advisor: Always available
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <p className="text-slate-300 text-sm">
                Electricity • Internet • Cellular<br />
                Waste Management • Bundle Deals<br />
                AI Recommendations • Customer Support
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8">
            <div className="text-center mb-4">
              <p className="text-slate-400 text-sm">
                © 2025 ConnectPortal247. All rights reserved.
              </p>
            </div>
            <div className="text-xs text-slate-400 text-center max-w-4xl mx-auto">
              <p>
                ConnectPortal247 provides AI-powered utility provider information for informational purposes only. 
                Provider ratings and scores are opinions based on publicly available data. AI recommendations are 
                generated using advanced algorithms but should be verified with providers. We are not affiliated 
                with any utility providers and receive no compensation for rankings. 
                Verify all information directly with service providers before making decisions.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot - Always Available */}
      <AIUtilityAdvisor
        userLocation={undefined}
        onProviderSelect={handleProviderSelect}
        onBundleSelect={handleBundleSelect}
      />
    </div>
  );
}