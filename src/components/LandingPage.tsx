
import React from 'react';
import { Bot, MessageSquare, Shield, Zap, ArrowRight, Sparkles, Users, Cpu } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b border-orange-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍝</span>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Pasta
                </span>
                <p className="text-sm text-gray-600">AI Conversation Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <Button onClick={onStartChat} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Open Pasta
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setShowAuthModal(true)} className="text-orange-600 hover:text-orange-700">
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-red-100/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Next-Generation AI Platform</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8">
            Welcome to
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent block">
              Pasta 🍝
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Create, customize, and chat with AI personalities tailored to your needs. 
            Build your own AI assistants with unique characters, personas, and conversation styles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={handleStartChat}
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">50+</div>
              <div className="text-gray-600">AI Models</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">∞</div>
              <div className="text-gray-600">Custom Bots</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Every Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of AI conversation with advanced customization and professional tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Public Mode</h3>
              <p className="text-gray-600 leading-relaxed">
                Access general AI assistance with GPT-3.5 Turbo for FAQs, onboarding, and common questions.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Private Mode</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by Claude 3 Sonnet for enhanced capabilities and personalized assistance with your data.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by OpenRouter APIs with multiple AI models for instant, intelligent responses.
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom AI Bots</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your own AI assistants with unique personalities, characters, and conversation styles.
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced AI Models</h3>
              <p className="text-gray-600 leading-relaxed">
                Access to the latest AI models including GPT-4, Claude, Mistral, and many more cutting-edge options.
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Personas</h3>
              <p className="text-gray-600 leading-relaxed">
                Define detailed character bios, personalities, and conversation patterns for truly unique AI experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Create Your AI Assistant?
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Join thousands of users who are already building amazing AI personalities with Pasta.
          </p>
          <Button
            onClick={handleStartChat}
            variant="secondary"
            size="lg"
            className="text-lg px-8 py-4 bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all"
          >
            Start Building Today
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🍝</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Pasta
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            The future of AI conversation is here. Create, customize, and chat with unlimited possibilities.
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Pasta AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default LandingPage;
