// src/app/api/ai-chat/route.ts
// AI-powered utility advisor API

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// You'll need to add this to your .env.local file
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface UserProfile {
  zipCode?: string;
  address?: string;
  householdSize?: number;
  budget?: {
    internet?: number;
    cellular?: number;
    electricity?: number;
    total?: number;
  };
  workFromHome?: boolean;
  internetUsage?: 'light' | 'moderate' | 'heavy';
  priorities?: string[];
  currentProviders?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, userProfile, userLocation } = await request.json();

    // Extract information from user message
    const extractedInfo = extractUserInfo(message, userProfile);
    const updatedProfile = { ...userProfile, ...extractedInfo };

    // Get relevant provider data if we have location
    let providers = [];
    let bundles = [];
    
    if (updatedProfile.zipCode) {
      try {
        const { data: providerData } = await supabase
          .from('providers')
          .select('*')
          .contains('service_areas', [updatedProfile.zipCode])
          .order('overall_score', { ascending: false });
        
        providers = providerData || [];

        const { data: bundleData } = await supabase
          .from('service_bundles')
          .select('*')
          .order('monthly_savings', { ascending: false });
        
        bundles = bundleData || [];
      } catch (error) {
        console.error('Database error:', error);
      }
    }

    // Generate AI response
    const aiResponse = await generateAIResponse({
      userMessage: message,
      conversationHistory,
      userProfile: updatedProfile,
      providers,
      bundles
    });

    // Find provider recommendations based on conversation
    const providerRecommendations = getProviderRecommendations(
      message,
      updatedProfile,
      providers
    );

    // Find bundle recommendations
    const bundleOptions = getBundleRecommendations(
      message,
      updatedProfile,
      bundles
    );

    return NextResponse.json({
      success: true,
      response: aiResponse,
      providerRecommendations,
      bundleOptions,
      userProfileUpdate: extractedInfo
    });

  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process request',
        response: "I'm sorry, I'm having trouble right now. Please try again or browse providers directly."
      },
      { status: 500 }
    );
  }
}

function extractUserInfo(message: string, currentProfile: UserProfile): Partial<UserProfile> {
  const updates: Partial<UserProfile> = {};
  
  // Extract ZIP code
  const zipMatch = message.match(/\b\d{5}\b/);
  if (zipMatch) {
    updates.zipCode = zipMatch[0];
  }

  // Extract budget information
  const budgetMatch = message.match(/\$(\d+)/);
  if (budgetMatch && message.toLowerCase().includes('budget')) {
    const amount = parseInt(budgetMatch[1]);
    if (message.toLowerCase().includes('internet')) {
      updates.budget = { ...currentProfile.budget, internet: amount };
    } else if (message.toLowerCase().includes('total')) {
      updates.budget = { ...currentProfile.budget, total: amount };
    }
  }

  // Extract household size
  const householdMatch = message.match(/(\d+)\s+(people|person|family)/i);
  if (householdMatch) {
    updates.householdSize = parseInt(householdMatch[1]);
  }

  // Extract work from home
  if (message.toLowerCase().includes('work from home') || 
      message.toLowerCase().includes('remote work') ||
      message.toLowerCase().includes('home office')) {
    updates.workFromHome = true;
  }

  // Extract internet usage patterns
  if (message.toLowerCase().includes('streaming') || 
      message.toLowerCase().includes('gaming') ||
      message.toLowerCase().includes('video calls')) {
    updates.internetUsage = 'heavy';
  } else if (message.toLowerCase().includes('basic') || 
             message.toLowerCase().includes('email')) {
    updates.internetUsage = 'light';
  }

  // Extract priorities
  const priorities = [];
  if (message.toLowerCase().includes('cheap') || 
      message.toLowerCase().includes('budget') ||
      message.toLowerCase().includes('affordable')) {
    priorities.push('price');
  }
  if (message.toLowerCase().includes('reliable') || 
      message.toLowerCase().includes('dependable')) {
    priorities.push('reliability');
  }
  if (message.toLowerCase().includes('fast') || 
      message.toLowerCase().includes('speed')) {
    priorities.push('speed');
  }
  
  if (priorities.length > 0) {
    updates.priorities = priorities;
  }

  return updates;
}

async function generateAIResponse({
  userMessage,
  conversationHistory,
  userProfile,
  providers,
  bundles
}: {
  userMessage: string;
  conversationHistory: any[];
  userProfile: UserProfile;
  providers: any[];
  bundles: any[];
}): Promise<string> {
  
  // If no OpenAI API key, use rule-based responses
  if (!OPENAI_API_KEY) {
    return generateRuleBasedResponse(userMessage, userProfile, providers, bundles);
  }

  try {
    const systemPrompt = `You are an expert utility advisor for ConnectPortal247. You help users find the best electricity, internet, cellular, and waste management providers in their area.

Your personality: Friendly, knowledgeable, and helpful. Always explain your reasoning clearly.

Current user profile: ${JSON.stringify(userProfile)}
Available providers: ${providers.length} providers in their area
Available bundles: ${bundles.length} bundle deals

Guidelines:
1. Ask clarifying questions to understand their needs
2. Recommend specific providers with clear reasoning
3. Highlight bundle savings opportunities when relevant  
4. Keep responses conversational and helpful
5. If they ask about pricing, mention they should verify with providers directly
6. Focus on their priorities (price, speed, reliability, etc.)

Provider data: ${JSON.stringify(providers.slice(0, 10))}
Bundle data: ${JSON.stringify(bundles.slice(0, 5))}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // More cost-effective model
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: 'user', content: userMessage }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Invalid OpenAI response');
    }

  } catch (error) {
    console.error('OpenAI API Error:', error);
    return generateRuleBasedResponse(userMessage, userProfile, providers, bundles);
  }
}

function generateRuleBasedResponse(
  message: string, 
  profile: UserProfile, 
  providers: any[], 
  bundles: any[]
): string {
  const lowerMessage = message.toLowerCase();

  // ZIP code request
  if (!profile.zipCode && (lowerMessage.includes('zip') || /\d{5}/.test(message))) {
    const zipMatch = message.match(/\b\d{5}\b/);
    if (zipMatch) {
      return `Great! I found ${providers.length} providers in ZIP code ${zipMatch[0]}. What type of service are you looking for? I can help with:\n\n📶 Internet service\n📱 Mobile/cellular plans\n⚡ Electricity providers\n🗑️ Waste management\n📦 Bundle deals (save $10-30/month)`;
    }
    return "I'd be happy to help! What's your ZIP code so I can find providers in your area?";
  }

  // Internet requests
  if (lowerMessage.includes('internet') || lowerMessage.includes('wifi') || lowerMessage.includes('broadband')) {
    const internetProviders = providers.filter(p => p.type === 'internet').slice(0, 3);
    if (internetProviders.length > 0) {
      let response = "Here are the top internet providers in your area:\n\n";
      internetProviders.forEach((provider, index) => {
        const badge = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        response += `${badge} **${provider.name}** (Score: ${provider.overall_score}/100)\n`;
        response += `${provider.description}\n\n`;
      });
      
      if (profile.workFromHome) {
        response += "Since you work from home, I'd especially recommend fiber or cable internet for reliable video calls. ";
      }
      
      response += "Would you like details about any of these providers?";
      return response;
    }
  }

  // Cellular requests
  if (lowerMessage.includes('mobile') || lowerMessage.includes('cell') || lowerMessage.includes('phone')) {
    const cellularProviders = providers.filter(p => p.type === 'cellular').slice(0, 3);
    if (cellularProviders.length > 0) {
      let response = "Here are your cellular options:\n\n";
      cellularProviders.forEach((provider, index) => {
        response += `📱 **${provider.name}**\n`;
        if (provider.cellular_network) {
          response += `Network: ${provider.cellular_network}\n`;
        }
        if (provider.requires_internet_subscription) {
          response += `⚠️ Requires internet subscription\n`;
        }
        response += `${provider.description}\n\n`;
      });
      
      const internetCellularBundles = bundles.filter(b => 
        b.services.includes('internet') && b.services.includes('cellular')
      );
      
      if (internetCellularBundles.length > 0) {
        response += `💰 **Bundle Opportunity**: Save $${internetCellularBundles[0].monthly_savings}/month by bundling internet + mobile!`;
      }
      
      return response;
    }
  }

  // Bundle requests
  if (lowerMessage.includes('bundle') || lowerMessage.includes('package') || lowerMessage.includes('save')) {
    if (bundles.length > 0) {
      let response = "Here are the best bundle deals in your area:\n\n";
      bundles.slice(0, 3).forEach((bundle, index) => {
        const badge = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        response += `${badge} **${bundle.bundle_name}**\n`;
        response += `💰 Save $${bundle.monthly_savings}/month ($${bundle.annual_savings}/year)\n`;
        response += `Services: ${bundle.services.join(' + ')}\n`;
        response += `${bundle.description}\n\n`;
      });
      return response;
    }
  }

  // Budget requests
  if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
    const budgetProviders = providers
      .sort((a, b) => b.price_score - a.price_score)
      .slice(0, 3);
    
    if (budgetProviders.length > 0) {
      let response = "Here are the most budget-friendly options:\n\n";
      budgetProviders.forEach((provider, index) => {
        response += `💰 **${provider.name}** (Price Score: ${provider.price_score}/100)\n`;
        response += `${provider.description}\n\n`;
      });
      return response;
    }
  }

  // Default response
  if (!profile.zipCode) {
    return "Hi! I'm your AI utility advisor. I can help you find the best internet, cellular, electricity, and waste management providers in your area, plus identify bundle savings opportunities. What's your ZIP code?";
  }

  return `I can help you with:\n\n📶 Internet providers (${providers.filter(p => p.type === 'internet').length} options)\n📱 Mobile/cellular plans (${providers.filter(p => p.type === 'cellular').length} options)\n⚡ Electricity providers (${providers.filter(p => p.type === 'electricity').length} options)\n🗑️ Waste management (${providers.filter(p => p.type === 'waste').length} options)\n📦 Bundle deals (${bundles.length} available)\n\nWhat would you like to explore?`;
}

function getProviderRecommendations(
  message: string,
  profile: UserProfile,
  providers: any[]
): any[] {
  const lowerMessage = message.toLowerCase();
  
  // Determine service type
  let serviceType = '';
  if (lowerMessage.includes('internet') || lowerMessage.includes('wifi')) {
    serviceType = 'internet';
  } else if (lowerMessage.includes('mobile') || lowerMessage.includes('cell')) {
    serviceType = 'cellular';
  } else if (lowerMessage.includes('electric')) {
    serviceType = 'electricity';
  } else if (lowerMessage.includes('waste') || lowerMessage.includes('trash')) {
    serviceType = 'waste';
  }

  if (!serviceType) return [];

  let relevantProviders = providers.filter(p => p.type === serviceType);

  // Apply user preferences
  if (profile.priorities?.includes('price')) {
    relevantProviders = relevantProviders.sort((a, b) => b.price_score - a.price_score);
  } else if (profile.priorities?.includes('reliability')) {
    relevantProviders = relevantProviders.sort((a, b) => b.rating - a.rating);
  } else {
    relevantProviders = relevantProviders.sort((a, b) => b.overall_score - a.overall_score);
  }

  return relevantProviders.slice(0, 3);
}

function getBundleRecommendations(
  message: string,
  profile: UserProfile,
  bundles: any[]
): any[] {
  const lowerMessage = message.toLowerCase();
  
  if (!lowerMessage.includes('bundle') && 
      !lowerMessage.includes('package') && 
      !lowerMessage.includes('save') &&
      !(lowerMessage.includes('internet') && lowerMessage.includes('mobile'))) {
    return [];
  }

  // Sort bundles by savings
  return bundles
    .sort((a, b) => b.monthly_savings - a.monthly_savings)
    .slice(0, 2);
}