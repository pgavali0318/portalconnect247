// src/data/providers.ts - Expanded to 14 Major Cities
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
  // EXISTING CITIES (Your current 5)
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
  ],

  // NEW CITIES (Adding 9 more major metros)
  
  'cleveland': [
    {
      id: 'firstenergy-cleveland',
      name: 'FirstEnergy (CEI)',
      type: 'electricity',
      phone: '1-888-544-4877',
      website: 'https://www.firstenergy.com',
      description: 'Electric utility serving Cleveland and northeastern Ohio. Multiple rate plan options and reliable service.',
      priceRange: '$80-115/month',
      connectionTime: '2-4 business days',
      serviceArea: 'Greater Cleveland',
      rating: 3.8
    },
    {
      id: 'spectrum-cleveland',
      name: 'Spectrum',
      type: 'internet',
      phone: '1-855-707-7328',
      website: 'https://www.spectrum.com',
      description: 'High-speed cable internet with no data caps. Strong network coverage throughout Cleveland metro.',
      priceRange: '$50-90/month',
      connectionTime: '5-7 business days',
      serviceArea: 'Cleveland Metro',
      rating: 3.7
    },
    {
      id: 'wm-cleveland',
      name: 'Waste Management',
      type: 'trash',
      phone: '1-800-963-4776',
      website: 'https://www.wm.com',
      description: 'Reliable weekly pickup and recycling services throughout Greater Cleveland with consistent scheduling.',
      priceRange: '$30-40/month',
      connectionTime: 'Next service day',
      serviceArea: 'Greater Cleveland',
      rating: 4.1
    }
  ],

  'cincinnati': [
    {
      id: 'duke-cincinnati',
      name: 'Duke Energy Ohio',
      type: 'electricity',
      phone: '1-800-544-6900',
      website: 'https://www.duke-energy.com',
      description: 'Electric utility serving southwestern Ohio. Green energy programs available and competitive rates.',
      priceRange: '$85-120/month',
      connectionTime: '2-3 business days',
      serviceArea: 'Southwest Ohio',
      rating: 4.0
    },
    {
      id: 'spectrum-cincinnati',
      name: 'Spectrum',
      type: 'internet',
      phone: '1-855-707-7328',
      website: 'https://www.spectrum.com',
      description: 'High-speed cable internet with strong network coverage in Cincinnati metro area.',
      priceRange: '$50-90/month',
      connectionTime: '5-7 business days',
      serviceArea: 'Cincinnati Metro',
      rating: 3.7
    },
    {
      id: 'rumpke-cincinnati',
      name: 'Rumpke',
      type: 'trash',
      phone: '1-800-828-8171',
      website: 'https://www.rumpke.com',
      description: 'Hometown waste service. Serving Cincinnati area for over 85 years with personalized local service.',
      priceRange: '$26-36/month',
      connectionTime: 'Next pickup day',
      serviceArea: 'Cincinnati and Hamilton County',
      rating: 4.2
    }
  ],

  'grand-rapids': [
    {
      id: 'consumers-grandrapids',
      name: 'Consumers Energy',
      type: 'electricity',
      phone: '1-800-477-5050',
      website: 'https://www.consumersenergy.com',
      description: 'Major electric and gas utility serving western and central Michigan with reliable service.',
      priceRange: '$85-125/month',
      connectionTime: '2-3 business days',
      serviceArea: 'West Michigan',
      rating: 4.1
    },
    {
      id: 'spectrum-grandrapids',
      name: 'Spectrum',
      type: 'internet',
      phone: '1-855-707-7328',
      website: 'https://www.spectrum.com',
      description: 'Cable internet with no data caps. Good coverage in Grand Rapids area with reliable speeds.',
      priceRange: '$50-85/month',
      connectionTime: '5-7 business days',
      serviceArea: 'Grand Rapids Metro',
      rating: 3.7
    },
    {
      id: 'republic-grandrapids',
      name: 'Republic Services',
      type: 'trash',
      phone: '1-800-299-4898',
      website: 'https://www.republicservices.com',
      description: 'Comprehensive waste and recycling services throughout West Michigan with reliable pickup.',
      priceRange: '$25-35/month',
      connectionTime: 'Next service day',
      serviceArea: 'West Michigan',
      rating: 4.0
    }
  ],

  'fort-wayne': [
    {
      id: 'im-fortwayne',
      name: 'Indiana Michigan Power (I&M)',
      type: 'electricity',
      phone: '1-800-311-4634',
      website: 'https://www.indianamichiganpower.com',
      description: 'Electric utility serving northeastern Indiana and southwestern Michigan with competitive rates.',
      priceRange: '$75-105/month',
      connectionTime: '2-4 business days',
      serviceArea: 'Northeast Indiana',
      rating: 4.0
    },
    {
      id: 'frontier-fortwayne',
      name: 'Frontier',
      type: 'internet',
      phone: '1-800-921-8101',
      website: 'https://www.frontier.com',
      description: 'DSL and expanding fiber internet services. Growing fiber network in Fort Wayne area.',
      priceRange: '$40-75/month',
      connectionTime: '5-10 business days',
      serviceArea: 'Fort Wayne Metro',
      rating: 3.5
    },
    {
      id: 'redriver-fortwayne',
      name: 'Red River Waste Solutions',
      type: 'trash',
      phone: '1-800-766-4766',
      website: 'https://www.redriverwaste.com',
      description: 'Local waste management company serving northeastern Indiana with personalized service.',
      priceRange: '$24-34/month',
      connectionTime: 'Next service day',
      serviceArea: 'Northeast Indiana',
      rating: 4.1
    }
  ],

  'evansville': [
    {
      id: 'centerpoint-evansville',
      name: 'Vectren (CenterPoint Energy)',
      type: 'electricity',
      phone: '1-800-227-1376',
      website: 'https://www.centerpointenergy.com',
      description: 'Electric and gas utility serving southwestern Indiana with reliable service and competitive rates.',
      priceRange: '$80-115/month',
      connectionTime: '2-4 business days',
      serviceArea: 'Southwest Indiana',
      rating: 4.0
    },
    {
      id: 'att-evansville',
      name: 'AT&T Internet',
      type: 'internet',
      phone: '1-800-288-2020',
      website: 'https://www.att.com',
      description: 'DSL and limited fiber internet. Primary internet provider in Evansville area with expanding coverage.',
      priceRange: '$45-80/month',
      connectionTime: '7-10 business days',
      serviceArea: 'Evansville Metro',
      rating: 3.6
    },
    {
      id: 'republic-evansville',
      name: 'Republic Services',
      type: 'trash',
      phone: '1-800-299-4898',
      website: 'https://www.republicservices.com',
      description: 'Waste and recycling services throughout southern Indiana with reliable pickup schedules.',
      priceRange: '$26-36/month',
      connectionTime: 'Next service day',
      serviceArea: 'Southern Indiana',
      rating: 4.0
    }
  ],

  'lansing': [
    {
      id: 'consumers-lansing',
      name: 'Consumers Energy',
      type: 'electricity',
      phone: '1-800-477-5050',
      website: 'https://www.consumersenergy.com',
      description: 'Primary electric utility serving Lansing and greater mid-Michigan area with reliable power delivery.',
      priceRange: '$82-120/month',
      connectionTime: '2-3 business days',
      serviceArea: 'Mid-Michigan',
      rating: 4.1
    },
    {
      id: 'spectrum-lansing',
      name: 'Spectrum',
      type: 'internet',
      phone: '1-855-707-7328',
      website: 'https://www.spectrum.com',
      description: 'Cable internet provider with reliable service throughout Lansing metro with good speeds.',
      priceRange: '$50-85/month',
      connectionTime: '5-7 business days',
      serviceArea: 'Lansing Metro',
      rating: 3.7
    },
    {
      id: 'granger-lansing',
      name: 'Granger Waste Services',
      type: 'trash',
      phone: '1-800-421-1804',
      website: 'https://www.grangerwaste.com',
      description: 'Local Michigan company providing waste and recycling services since 1933 with excellent customer service.',
      priceRange: '$26-36/month',
      connectionTime: 'Next service day',
      serviceArea: 'Mid-Michigan',
      rating: 4.2
    }
  ],

  'kalamazoo': [
    {
      id: 'consumers-kalamazoo',
      name: 'Consumers Energy',
      type: 'electricity',
      phone: '1-800-477-5050',
      website: 'https://www.consumersenergy.com',
      description: 'Electric utility serving Kalamazoo and southwestern Michigan communities with competitive rates.',
      priceRange: '$80-115/month',
      connectionTime: '2-3 business days',
      serviceArea: 'Southwest Michigan',
      rating: 4.1
    },
    {
      id: 'xfinity-kalamazoo',
      name: 'Xfinity',
      type: 'internet',
      phone: '1-800-934-6489',
      website: 'https://www.xfinity.com',
      description: 'Cable internet with good speeds. Primary provider in Kalamazoo area with reliable service.',
      priceRange: '$50-85/month',
      connectionTime: '7-10 business days',
      serviceArea: 'Kalamazoo Area',
      rating: 3.8
    },
    {
      id: 'republic-kalamazoo',
      name: 'Republic Services',
      type: 'trash',
      phone: '1-800-299-4898',
      website: 'https://www.republicservices.com',
      description: 'Weekly waste and recycling pickup serving Kalamazoo County with reliable scheduling.',
      priceRange: '$25-35/month',
      connectionTime: 'Next service day',
      serviceArea: 'Kalamazoo County',
      rating: 4.0
    }
  ],

  'dayton': [
    {
      id: 'aes-dayton',
      name: 'Dayton Power & Light (AES Ohio)',
      type: 'electricity',
      phone: '1-877-468-8243',
      website: 'https://www.aes-ohio.com',
      description: 'Electric utility serving Dayton and west-central Ohio communities with competitive rates.',
      priceRange: '$82-118/month',
      connectionTime: '2-4 business days',
      serviceArea: 'West-Central Ohio',
      rating: 3.9
    },
    {
      id: 'spectrum-dayton',
      name: 'Spectrum',
      type: 'internet',
      phone: '1-855-707-7328',
      website: 'https://www.spectrum.com',
      description: 'High-speed cable internet. Good coverage across Dayton metro area with reliable speeds.',
      priceRange: '$50-90/month',
      connectionTime: '5-7 business days',
      serviceArea: 'Dayton Metro',
      rating: 3.7
    },
    {
      id: 'rumpke-dayton',
      name: 'Rumpke',
      type: 'trash',
      phone: '1-800-828-8171',
      website: 'https://www.rumpke.com',
      description: 'Regional waste and recycling service with strong presence in Dayton area and reliable pickup.',
      priceRange: '$24-34/month',
      connectionTime: 'Next pickup day',
      serviceArea: 'Dayton and Montgomery County',
      rating: 4.1
    }
  ],

  'south-bend': [
    {
      id: 'im-southbend',
      name: 'Indiana Michigan Power (I&M)',
      type: 'electricity',
      phone: '1-800-311-4634',
      website: 'https://www.indianamichiganpower.com',
      description: 'Electric utility serving South Bend and north-central Indiana region with reliable power delivery.',
      priceRange: '$76-108/month',
      connectionTime: '2-4 business days',
      serviceArea: 'North-Central Indiana',
      rating: 4.0
    },
    {
      id: 'xfinity-southbend',
      name: 'Xfinity',
      type: 'internet',
      phone: '1-800-934-6489',
      website: 'https://www.xfinity.com',
      description: 'Cable internet service with good speeds throughout South Bend area and reliable connectivity.',
      priceRange: '$50-85/month',
      connectionTime: '7-10 business days',
      serviceArea: 'South Bend Area',
      rating: 3.8
    },
    {
      id: 'republic-southbend',
      name: 'Republic Services',
      type: 'trash',
      phone: '1-800-299-4898',
      website: 'https://www.republicservices.com',
      description: 'Reliable waste and recycling pickup serving St. Joseph County with consistent scheduling.',
      priceRange: '$26-36/month',
      connectionTime: 'Next service day',
      serviceArea: 'St. Joseph County',
      rating: 4.0
    }
  ]
};

// Enhanced city detection for all 14 cities
export function detectCity(address: string, zipCode: string): string {
  const addressLower = address.toLowerCase();
  const zip = zipCode.trim();

  // MICHIGAN
  if (addressLower.includes('detroit') || zip.startsWith('48')) {
    return 'detroit';
  }
  if (addressLower.includes('ann arbor') || addressLower.includes('annarbor') || 
      ['48104', '48105', '48108', '48109'].includes(zip)) {
    return 'ann-arbor';
  }
  if (addressLower.includes('grand rapids') || addressLower.includes('grandrapids') || 
      zip.startsWith('495') || zip.startsWith('496')) {
    return 'grand-rapids';
  }
  if (addressLower.includes('lansing') || zip.startsWith('488') || zip.startsWith('489')) {
    return 'lansing';
  }
  if (addressLower.includes('kalamazoo') || zip.startsWith('490')) {
    return 'kalamazoo';
  }

  // OHIO
  if (addressLower.includes('columbus') || zip.startsWith('43')) {
    return 'columbus';
  }
  if (addressLower.includes('cleveland') || zip.startsWith('44')) {
    return 'cleveland';
  }
  if (addressLower.includes('cincinnati') || zip.startsWith('45')) {
    return 'cincinnati';
  }
  if (addressLower.includes('toledo') || zip.startsWith('436')) {
    return 'toledo';
  }
  if (addressLower.includes('dayton') || zip.startsWith('454') || zip.startsWith('453')) {
    return 'dayton';
  }

  // INDIANA
  if (addressLower.includes('indianapolis') || addressLower.includes('indy') || 
      zip.startsWith('46')) {
    return 'indianapolis';
  }
  if (addressLower.includes('fort wayne') || addressLower.includes('fortwayne') || 
      zip.startsWith('467') || zip.startsWith('468')) {
    return 'fort-wayne';
  }
  if (addressLower.includes('evansville') || zip.startsWith('477')) {
    return 'evansville';
  }
  if (addressLower.includes('south bend') || addressLower.includes('southbend') || 
      zip.startsWith('466')) {
    return 'south-bend';
  }

  // Default to Columbus if no match
  return 'columbus';
}

// Get providers for a city
export function getProvidersForCity(city: string): Provider[] {
  return providersByCity[city] || providersByCity['columbus'];
}

// Get city display name
export function getCityDisplayName(city: string): string {
  const cityNames: { [key: string]: string } = {
    'detroit': 'Detroit, MI',
    'ann-arbor': 'Ann Arbor, MI',
    'grand-rapids': 'Grand Rapids, MI',
    'lansing': 'Lansing, MI',
    'kalamazoo': 'Kalamazoo, MI',
    'columbus': 'Columbus, OH',
    'cleveland': 'Cleveland, OH',
    'cincinnati': 'Cincinnati, OH',
    'toledo': 'Toledo, OH',
    'dayton': 'Dayton, OH',
    'indianapolis': 'Indianapolis, IN',
    'fort-wayne': 'Fort Wayne, IN',
    'evansville': 'Evansville, IN',
    'south-bend': 'South Bend, IN'
  };
  
  return cityNames[city] || 'Your Area';
}