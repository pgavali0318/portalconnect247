// src/data/providers.ts
export interface Provider {
  id: string;
  name: string;
  type: 'electricity' | 'internet' | 'trash';
  phone: string;
  website: string;
  description: string;
  priceRange: string;
  connectionTime: string;
  serviceArea: string;
  rating: number;
}

export const providersByCity: { [key: string]: Provider[] } = {
  'detroit': [
    {
      id: 'dte-detroit',
      name: 'DTE Energy',
      type: 'electricity',
      phone: '1-800-477-4747',
      website: 'https://www.dteenergy.com',
      description: 'Primary electric utility serving southeastern Michigan with smart grid technology and renewable energy options.',
      priceRange: '$90-135/month',
      connectionTime: '2-3 business days',
      serviceArea: 'Detroit Metro Area',
      rating: 4.2
    },
    {
      id: 'xfinity-detroit',
      name: 'Xfinity',
      type: 'internet',
      phone: '1-800-934-6489',
      website: 'https://www.xfinity.com',
      description: 'High-speed cable internet up to 1200 Mbps. Widely available across Metro Detroit with reliable service.',
      priceRange: '$55-95/month',
      connectionTime: '7-10 business days',
      serviceArea: 'Detroit and Suburbs',
      rating: 3.8
    },
    {
      id: 'wm-detroit',
      name: 'Waste Management',
      type: 'trash',
      phone: '1-800-963-4776',
      website: 'https://www.wm.com',
      description: 'Weekly trash and recycling pickup with reliable scheduling. Serves most Detroit metro communities.',
      priceRange: '$28-38/month',
      connectionTime: 'Next service day',
      serviceArea: 'Metro Detroit',
      rating: 4.1
    }
  ],

  'columbus': [
    {
      id: 'aep-columbus',
      name: 'AEP Ohio',
      type: 'electricity',
      phone: '1-800-672-2231',
      website: 'https://www.aepohio.com',
      description: 'Primary electric utility for central Ohio with competitive rates and reliable service. Multiple rate plan options.',
      priceRange: '$75-110/month',
      connectionTime: '1-3 business days',
      serviceArea: 'Central Ohio',
      rating: 4.0
    },
    {
      id: 'spectrum-columbus',
      name: 'Spectrum',
      type: 'internet',
      phone: '1-855-707-7328',
      website: 'https://www.spectrum.com',
      description: 'Cable internet with no data caps and speeds up to 1000 Mbps. Excellent coverage in Columbus metro area.',
      priceRange: '$45-85/month',
      connectionTime: '5-7 business days',
      serviceArea: 'Columbus Metro',
      rating: 3.7
    },
    {
      id: 'rumpke-columbus',
      name: 'Rumpke',
      type: 'trash',
      phone: '1-800-828-8171',
      website: 'https://www.rumpke.com',
      description: 'Regional waste and recycling services. Local Ohio company with personalized service for over 85 years.',
      priceRange: '$22-32/month',
      connectionTime: 'Next pickup day',
      serviceArea: 'Columbus and Franklin County',
      rating: 4.2
    }
  ],

  'indianapolis': [
    {
      id: 'ipl-indianapolis',
      name: 'Indianapolis Power & Light',
      type: 'electricity',
      phone: '1-317-261-8222',
      website: 'https://www.indianapolispowerandlight.com',
      description: 'Primary electric utility serving Indianapolis and surrounding counties with reliable power delivery.',
      priceRange: '$78-108/month',
      connectionTime: '2-4 business days',
      serviceArea: 'Indianapolis Metro',
      rating: 4.1
    },
    {
      id: 'xfinity-indianapolis',
      name: 'Xfinity',
      type: 'internet',
      phone: '1-800-934-6489',
      website: 'https://www.xfinity.com',
      description: 'Cable internet with speeds up to 1200 Mbps and extensive coverage across Indianapolis metropolitan area.',
      priceRange: '$55-95/month',
      connectionTime: '7-10 business days',
      serviceArea: 'Indianapolis and Suburbs',
      rating: 3.8
    },
    {
      id: 'republic-indianapolis',
      name: 'Republic Services',
      type: 'trash',
      phone: '1-800-299-4898',
      website: 'https://www.republicservices.com',
      description: 'Weekly trash and recycling pickup serving Indianapolis metro area with reliable scheduling.',
      priceRange: '$28-38/month',
      connectionTime: 'Next service day',
      serviceArea: 'Indianapolis Metro',
      rating: 4.0
    }
  ],

  'ann-arbor': [
    {
      id: 'dte-annarbor',
      name: 'DTE Energy',
      type: 'electricity',
      phone: '1-800-477-4747',
      website: 'https://www.dteenergy.com',
      description: 'Reliable electric service for Ann Arbor and surrounding Washtenaw County with green energy options.',
      priceRange: '$88-130/month',
      connectionTime: '2-3 business days',
      serviceArea: 'Ann Arbor and Washtenaw County',
      rating: 4.2
    },
    {
      id: 'xfinity-annarbor',
      name: 'Xfinity',
      type: 'internet',
      phone: '1-800-934-6489',
      website: 'https://www.xfinity.com',
      description: 'High-speed cable internet with excellent coverage throughout Ann Arbor. Great for students and professionals.',
      priceRange: '$55-90/month',
      connectionTime: '5-7 business days',
      serviceArea: 'Ann Arbor City',
      rating: 3.9
    },
    {
      id: 'recycle-annarbor',
      name: 'Recycle Ann Arbor',
      type: 'trash',
      phone: '1-734-971-7400',
      website: 'https://www.recycleannarbor.org',
      description: 'Local waste and recycling service with environmental focus and excellent customer service.',
      priceRange: '$30-40/month',
      connectionTime: 'Next service day',
      serviceArea: 'Ann Arbor City',
      rating: 4.5
    }
  ],

  'toledo': [
    {
      id: 'firstenergy-toledo',
      name: 'Toledo Edison (FirstEnergy)',
      type: 'electricity',
      phone: '1-888-544-4877',
      website: 'https://www.firstenergy.com',
      description: 'Electric utility serving Toledo and northwestern Ohio region with multiple rate plan options.',
      priceRange: '$78-110/month',
      connectionTime: '3-5 business days',
      serviceArea: 'Toledo and Lucas County',
      rating: 3.9
    },
    {
      id: 'buckeye-toledo',
      name: 'Buckeye Broadband',
      type: 'internet',
      phone: '1-419-724-9800',
      website: 'https://www.buckeyebroadband.com',
      description: 'Local cable and internet provider with fast speeds and excellent local customer service in Toledo area.',
      priceRange: '$45-80/month',
      connectionTime: '3-5 business days',
      serviceArea: 'Toledo Metro',
      rating: 4.3
    },
    {
      id: 'republic-toledo',
      name: 'Republic Services',
      type: 'trash',
      phone: '1-800-299-4898',
      website: 'https://www.republicservices.com',
      description: 'Comprehensive waste management services throughout Lucas County with reliable pickup schedules.',
      priceRange: '$28-38/month',
      connectionTime: 'Next service day',
      serviceArea: 'Toledo and Lucas County',
      rating: 4.0
    }
  ]
};

// Helper function to detect city from address/ZIP
export function detectCity(address: string, zipCode: string): string {
  const addressLower = address.toLowerCase();
  const zip = zipCode.trim();

  // Detroit area
  if (addressLower.includes('detroit') || zip.startsWith('48')) {
    return 'detroit';
  }
  
  // Columbus area  
  if (addressLower.includes('columbus') || zip.startsWith('43')) {
    return 'columbus';
  }
  
  // Indianapolis area
  if (addressLower.includes('indianapolis') || addressLower.includes('indy') || zip.startsWith('46')) {
    return 'indianapolis';
  }
  
  // Ann Arbor area
  if (addressLower.includes('ann arbor') || addressLower.includes('annarbor') || zip === '48104' || zip === '48105' || zip === '48108') {
    return 'ann-arbor';
  }
  
  // Toledo area
  if (addressLower.includes('toledo') || zip.startsWith('436')) {
    return 'toledo';
  }

  // Default to Columbus if no match
  return 'columbus';
}

// Helper function to get providers for a city
export function getProvidersForCity(city: string): Provider[] {
  return providersByCity[city] || providersByCity['columbus'];
}

// Helper function to get city display name
export function getCityDisplayName(city: string): string {
  const cityNames: { [key: string]: string } = {
    'detroit': 'Detroit, MI',
    'columbus': 'Columbus, OH', 
    'indianapolis': 'Indianapolis, IN',
    'ann-arbor': 'Ann Arbor, MI',
    'toledo': 'Toledo, OH'
  };
  
  return cityNames[city] || 'Your Area';
}