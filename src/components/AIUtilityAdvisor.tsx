// src/components/AIUtilityAdvisor.tsx
// Complete fixed version - no syntax errors

'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  providerRecommendations?: any[];
  bundleOptions?: any[];
}

interface ChatbotProps {
  userLocation?: string;
  onProviderSelect?: (provider: any) => void;
  onBundleSelect?: (bundle: any) => void;
}

export default function AIUtilityAdvisor({ 
  userLocation, 
  onProviderSelect, 
  onBundleSelect 
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI utility advisor. I can help you find the best internet, cellular, electricity, and waste management providers in your area. What's your ZIP code or address?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationHistory: messages,
          userProfile,
          userLocation
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          providerRecommendations: data.providerRecommendations,
          bundleOptions: data.bundleOptions
        };

        setMessages(prev => [...prev, assistantMessage]);
        
        if (data.userProfileUpdate) {
          setUserProfile((prev: any) => ({ ...prev, ...data.userProfileUpdate }));
        }
      } else {
        throw new Error(data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble right now. Please try asking your question again, or you can browse providers directly using the search above.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const renderMessage = (message: Message) => (
    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        message.role === 'user' 
          ? 'bg-slate-700 text-white' 
          : 'bg-white border border-gray-200 text-gray-900'
      }`}>
        {message.role === 'assistant' && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🤖</span>
            <span className="text-xs font-medium text-gray-500">AI Advisor</span>
          </div>
        )}
        
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        
        {/* Provider Recommendations */}
        {message.providerRecommendations && message.providerRecommendations.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-medium text-gray-600 mb-2">Recommended Providers:</div>
            {message.providerRecommendations.slice(0, 3).map((provider, index) => (
              <div key={provider.id} className="bg-gray-50 rounded p-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{provider.name}</div>
                    <div className="text-gray-600">{provider.type} • Score: {provider.overall_score}/100</div>
                  </div>
                  <button
                    onClick={() => onProviderSelect?.(provider)}
                    className="bg-slate-700 text-white px-2 py-1 rounded text-xs hover:bg-slate-800"
                  >
                    View Details
                  </button>
                </div>
                {index === 0 && (
                  <div className="text-xs text-green-600 mt-1">🥇 Best match for your needs</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bundle Options */}
        {message.bundleOptions && message.bundleOptions.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-medium text-gray-600 mb-2">Bundle Deals:</div>
            {message.bundleOptions.slice(0, 2).map((bundle, index) => (
              <div key={bundle.id} className="bg-green-50 border border-green-200 rounded p-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{bundle.bundle_name}</div>
                    <div className="text-green-700">Save ${bundle.monthly_savings}/month</div>
                  </div>
                  <button
                    onClick={() => onBundleSelect?.(bundle)}
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );

  const quickQuestions = [
    "Find internet providers in my area",
    "What's the best bundle deal for internet + mobile?",
    "Show me the cheapest electricity provider",
    "I need reliable internet for working from home"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-700 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <span className="hidden md:block text-sm font-medium">Ask AI Advisor</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-96 h-96 flex flex-col">
      {/* Header */}
      <div className="bg-slate-700 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <div>
            <div className="font-medium">AI Utility Advisor</div>
            <div className="text-xs text-slate-200">Powered by ConnectPortal247</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-200 hover:text-white text-xl"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map(renderMessage)}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="p-3 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-2">Quick questions:</div>
          <div className="space-y-1">
            {quickQuestions.slice(0, 2).map((question, index) => (
              <button
                key={index}
                onClick={() => sendMessage(question)}
                className="w-full text-left text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about utilities, bundles, or pricing..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="bg-slate-700 text-white px-3 py-2 rounded-lg hover:bg-slate-800 disabled:bg-gray-400 transition-colors"
          >
            <span className="text-sm">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}