// src/components/DatabaseProviderResults.tsx
// Complete full file - no truncation

'use client';

import { useState, useEffect } from 'react';

interface Provider {
  id: string;
  name: string;
  type: string;
  phone?: string;
  website?: string;
  description?: string;
  service_areas?: string[];
  rating?: number;
  overall_score?: number;
  popularity_score?: number;
  coverage_score?: number;
  price_score?: number;
  cellular_network?: string;
  cellular_plans?: any;
  bundle_options?: any;
  requires_internet_subscription?: boolean;
}

interface Bundle {
  id: string;
  provider_name: string;
  bundle_name: string;
  services: string[];
  monthly_price: number;
  monthly_savings: number;
  annual_savings: number;
  description: string;
  requirements?: string;
  features?: string[];
}

interface DatabaseProviderResultsProps {
  address: string;
  zipCode: string;
  selectedServices?: string[];
  onBack: () => void;
}

const LegalDisclaimers = ({ type = 'results' }: { type?: string }) => {
  if (type === 'results') {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 mb-6">
        <h4 className="font-semibold text-slate-900 mb-2">📋 Important Information</h4>
        <div className="space-y-2">
          <p>
            <strong>Provider Scores:</strong> Ratings and scores are opinions based on publicly available data including 
            coverage maps, published pricing, aggregated customer reviews, and industry analysis. Scores may not reflect 
            current offerings, promotions, or service quality in your specific location.
          </p>
          <p>
            <strong>Bundle Information:</strong> Bundle pricing and availability subject to change. Requirements like 
            internet subscriptions or contracts may apply. Contact providers directly to verify current offers.
          </p>
          <p>
            <strong>Verification Required:</strong> Contact providers directly to verify current rates, availability, 
            and service terms. Information is subject to change without notice.
          </p>
          <p>
            <strong>No Endorsement:</strong> Listings do not constitute endorsements. ConnectPortal247 is not affiliated 
            with listed providers and receives no compensation for rankings.
          </p>
          <p className="text-xs text-slate-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default function DatabaseProviderResults({ 
  address, 
  zipCode, 
  selectedServices = ['internet'], 
  onBack 
}: DatabaseProviderResultsProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [bundleAnalysis, setBundleAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching providers for ZIP:', zipCode, 'Services:', selectedServices);
        
        const response = await fetch('/api/providers-db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            zipCode,
            services: selectedServices 
          }),
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch providers');
        }

        if (data.success) {
          setProviders(data.providers || []);
          setBundles(data.bundles || []);
          setBundleAnalysis(data.bundleAnalysis);
        } else {
          setProviders([]);
          setBundles([]);
          setBundleAnalysis(null);
        }
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [zipCode, selectedServices]);

  // Group providers by type and sort by overall_score
  const groupedProviders = {
    electricity: providers.filter(p => p.type === 'electricity').sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0)),
    internet: providers.filter(p => p.type === 'internet').sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0)),
    cellular: providers.filter(p => p.type === 'cellular').sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0)),
    waste: providers.filter(p => p.type === 'waste').sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0)),
    water: providers.filter(p => p.type === 'water').sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0)),
    gas: providers.filter(p => p.type === 'gas').sort((a, b) => (b.overall_score || 0) - (a.overall_score || 0))
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'electricity': return '⚡';
      case 'internet': return '📶';
      case 'cellular': return '📱';
      case 'waste': return '🗑️';
      case 'water': return '💧';
      case 'gas': return '🔥';
      default: return '⚡';
    }
  };

  const getTypeTitle = (type: string) => {
    switch (type) {
      case 'electricity': return 'Electricity Providers';
      case 'internet': return 'Internet Providers';
      case 'cellular': return 'Mobile/Cellular Providers';
      case 'waste': return 'Waste Management';
      case 'water': return 'Water Providers';
      case 'gas': return 'Gas Providers';
      default: return 'Providers';
    }
  };

  const getBadge = (score: number, rank: number) => {
    if (rank === 1 && score >= 80) return { text: '🥇 Top Choice', class: 'bg-yellow-100 text-yellow-800' };
    if (rank === 2 && score >= 70) return { text: '🥈 Great Option', class: 'bg-gray-100 text-gray-800' };
    if (rank === 3 && score >= 60) return { text: '🥉 Good Choice', class: 'bg-orange-100 text-orange-800' };
    if (score >= 80) return { text: '⭐ Excellent', class: 'bg-green-100 text-green-800' };
    if (score >= 70) return { text: '✓ Recommended', class: 'bg-blue-100 text-blue-800' };
    return { text: '✓ Available', class: 'bg-slate-100 text-slate-600' };
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-500">☆</span>);
    }
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }
    return stars;
  };

  const renderProviderCard = (provider: Provider, rank: number) => {
    const badge = getBadge(provider.overall_score || 0, rank);
    const hasBundles = provider.bundle_options && Object.keys(provider.bundle_options).length > 0;
    
    return (
      <div key={provider.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">{getTypeIcon(provider.type)}</span>
              <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                {badge.text}
              </span>
            </div>

            {/* Cellular-specific information */}
            {provider.type === 'cellular' && (
              <div className="mb-3 space-y-2">
                {provider.cellular_network && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      📡 {provider.cellular_network} Network
                    </span>
                  </div>
                )}
                
                {provider.requires_internet_subscription && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      ⚠️ Requires Internet Subscription
                    </span>
                  </div>
                )}

                {provider.cellular_plans && (
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Available Plans:</h4>
                    <div className="space-y-1">
                      {Object.entries(provider.cellular_plans).map(([planType, plan]: [string, any]) => (
                        <div key={planType} className="text-sm">
                          <span className="font-medium text-green-700">
                            ${plan.price}{planType.includes('gig') ? '/GB' : '/month'}
                          </span>
                          <span className="text-gray-600 ml-2">- {plan.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bundle Savings Highlight */}
            {hasBundles && (
              <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-600">💰</span>
                  <span className="text-sm font-medium text-green-900">Bundle Savings Available</span>
                </div>
                {provider.bundle_options.internet_bundle && (
                  <div className="text-xs text-green-700">
                    Save ${provider.bundle_options.internet_bundle.monthly_savings}/month with internet bundle
                  </div>
                )}
              </div>
            )}
            
            {provider.rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {renderStars(provider.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {provider.rating}/5.0
                </span>
                {provider.overall_score && (
                  <span className="text-sm text-slate-600 ml-2">
                    Score: {provider.overall_score}/100
                  </span>
                )}
              </div>
            )}
            
            {provider.description && (
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {provider.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4">
              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 text-sm font-medium"
                >
                  <span>📞</span>
                  {provider.phone}
                </a>
              )}
              
              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 text-sm font-medium"
                >
                  <span>🌐</span>
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBundleComparison = () => {
    if (!bundleAnalysis || bundles.length === 0) return null;

    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>📦</span>
          Bundle Deals vs Individual Services
        </h3>
        
        {/* Individual Cost Summary */}
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Separate Providers</h4>
          <div className="space-y-1 text-sm text-gray-600">
            {bundleAnalysis.individualCosts.internet && (
              <div className="flex justify-between">
                <span>Best Internet Provider:</span>
                <span>${bundleAnalysis.individualCosts.internet}/month</span>
              </div>
            )}
            {bundleAnalysis.individualCosts.cellular && (
              <div className="flex justify-between">
                <span>Best Cellular Provider:</span>
                <span>${bundleAnalysis.individualCosts.cellular}/month</span>
              </div>
            )}
            <div className="border-t pt-1 flex justify-between font-semibold text-gray-900">
              <span>Total Monthly Cost:</span>
              <span>${bundleAnalysis.totalIndividual}/month</span>
            </div>
          </div>
        </div>

        {/* Bundle Options */}
        <div className="space-y-3">
          {bundles.slice(0, 3).map((bundle, index) => (
            <div key={bundle.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{bundle.bundle_name}</h4>
                    {index === 0 && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        🥇 Best Deal
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{bundle.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {bundle.services.map((service) => (
                      <span key={service} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {getTypeIcon(service)} {service}
                      </span>
                    ))}
                  </div>

                  {bundle.requirements && (
                    <p className="text-xs text-gray-500">
                      ⚠️ {bundle.requirements}
                    </p>
                  )}
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-green-700">
                    ${bundle.monthly_price}/mo
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    ${bundleAnalysis.totalIndividual}/mo separate
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    Save ${bundle.monthly_savings}/mo
                  </div>
                  <div className="text-xs text-green-600">
                    ${bundle.annual_savings}/year savings
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Get Bundle Quote - Save ${bundle.monthly_savings}/month
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProviderSection = (type: string, typeProviders: Provider[]) => {
    if (typeProviders.length === 0) return null;

    return (
      <div key={type} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">{getTypeIcon(type)}</span>
          <h2 className="text-xl font-bold text-gray-900">{getTypeTitle(type)}</h2>
          <span className="bg-slate-100 text-slate-800 text-sm font-medium px-3 py-1 rounded-full">
            {typeProviders.length} {typeProviders.length === 1 ? 'provider' : 'providers'}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {typeProviders.map((provider, index) => renderProviderCard(provider, index + 1))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-6"
          >
            <span>←</span>
            Back to Search
          </button>
          
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding providers and bundle deals in your area...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-6"
          >
            <span>←</span>
            Back to Search
          </button>
          
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <p className="text-lg font-semibold">Error Loading Providers</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedServicesList = selectedServices.join(', ');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-6"
        >
          <span>←</span>
          Back to Search
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedServices.length > 1 ? 'Bundle Options' : 'Utility Providers'} for {address}
          </h1>
          <p className="text-gray-600">
            ZIP Code: {zipCode} • Services: {selectedServicesList} • Found {providers.length} providers
            {bundles.length > 0 && ` • ${bundles.length} bundle deals available`}
          </p>
        </div>

        {/* Legal Disclaimers */}
        <LegalDisclaimers type="results" />

        {/* Bundle Comparison Section */}
        {renderBundleComparison()}

        {providers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No providers found for the selected services in ZIP code {zipCode}.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              This area may not be in our current service database, or the service combination may not be available.
            </p>
          </div>
        ) : (
          <div>
            {/* Show providers by type, but only for selected services */}
            {selectedServices.map(serviceType => {
              const typeProviders = groupedProviders[serviceType as keyof typeof groupedProviders];
              return renderProviderSection(serviceType, typeProviders);
            })}
            
            <div className="mt-12 bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-slate-800 text-sm mb-3">
                Contact providers directly to compare rates, plans, and availability for your specific address.
                {bundles.length > 0 && " Don't forget to ask about bundle discounts when you call!"}
              </p>
              <p className="text-xs text-slate-600">
                <strong>Disclaimer:</strong> ConnectPortal247 is an independent information service. We are not affiliated with 
                any utility providers and do not receive compensation for recommendations. All provider information should be 
                verified directly with the companies listed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}