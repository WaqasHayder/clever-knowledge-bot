
import React from 'react';
import { Bot, MessageSquare, Shield, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';
import { useState } from 'react';

interface LandingPageProps {
  onStartChat: () => void;
}

const LandingPage = ({ onStartChat }: LandingPageProps) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartChat = () => {
    if (user) {
      onStartChat();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      onStartChat();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ChatBot AI
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Welcome, {user.email}</span>
                  <Button onClick={onStartChat}>
                    Go to Chat
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Your Intelligent
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              AI Assistant
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of AI conversation. Get instant answers, creative solutions, 
            and intelligent assistance with our advanced chatbot powered by cutting-edge AI models.
          </p>
          
          <Button
            onClick={handleStartChat}
            size="lg"
            className="text-lg px-8 py-4"
          >
            Start Chatting Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features for Every Need
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Public Mode</h3>
              <p className="text-gray-600 leading-relaxed">
                Access general AI assistance with GPT-3.5 Turbo for FAQs, onboarding, and common questions.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Private Mode</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by Claude 3 Sonnet for enhanced capabilities and personalized assistance with your data.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by OpenRouter APIs with multiple AI models for instant, intelligent responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Conversations?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of users who are already experiencing the future of AI assistance.
          </p>
          <Button
            onClick={handleStartChat}
            variant="secondary"
            size="lg"
            className="text-lg px-8 py-4"
          >
            Try It Free Today
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default LandingPage;
