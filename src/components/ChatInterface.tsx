
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ModeToggle from './ModeToggle';
import AuthModal from './AuthModal';
import { Settings, User, LogOut, MessageSquare, Plus, Bot } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useConversations } from '@/hooks/useConversations';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ChatInterface = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, signOut, loading: authLoading } = useAuth();
  const { 
    currentConversation, 
    messages, 
    loading: chatLoading, 
    createConversation, 
    sendMessage,
    loadMessages
  } = useConversations();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && !currentConversation) {
      // Create initial conversation when user logs in
      createConversation('public');
    }
  }, [user, currentConversation, createConversation]);

  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation.id);
      setIsPrivateMode(currentConversation.mode === 'private');
    }
  }, [currentConversation, loadMessages]);

  const handleSendMessage = async (messageText: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!currentConversation) {
      const newConversation = await createConversation(isPrivateMode ? 'private' : 'public');
      if (!newConversation) {
        toast({
          title: "Error",
          description: "Failed to create conversation",
          variant: "destructive",
        });
        return;
      }
    }

    await sendMessage(messageText);
  };

  const handleModeToggle = async (isPrivate: boolean) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsPrivateMode(isPrivate);
    // Create new conversation with the selected mode
    await createConversation(isPrivate ? 'private' : 'public');
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "See you later! 👋",
      description: "You have been signed out successfully.",
    });
  };

  const handleNewConversation = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    await createConversation(isPrivateMode ? 'private' : 'public');
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">🍝</span>
          </div>
          <div className="text-lg text-gray-600">Loading Pasta...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50/30 via-white to-red-50/30">
      {/* Header */}
      <div className="border-b border-orange-200 bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">🍝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Pasta
              </h1>
              <p className="text-sm text-gray-600">AI Conversation Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ModeToggle isPrivateMode={isPrivateMode} onToggle={handleModeToggle} />
            
            {user && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewConversation}
                className="flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            )}
            
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
              >
                <User className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mode Info Banner */}
      {isPrivateMode && user && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200 p-3">
          <p className="text-sm text-purple-800 text-center flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Private Mode: Your conversations are secure and can access your custom knowledge base
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!user && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl">🍝</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Welcome to Pasta
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your AI-powered conversation platform. Sign in to start chatting with advanced AI assistants.
            </p>
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Sign In to Start Chatting
            </Button>
          </div>
        )}

        {user && messages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Start a New Conversation</h2>
            <p className="text-gray-600 mb-4">
              You're in <span className="font-semibold text-orange-600">{isPrivateMode ? 'Private' : 'Public'}</span> mode. 
              Send a message to begin chatting!
            </p>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-sm text-gray-700">
                💡 <strong>Tip:</strong> Try asking about anything - from general questions to creative writing!
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.role === 'user'}
            timestamp={new Date(message.created_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          />
        ))}
        
        {chatLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl px-6 py-4 max-w-[80%] border border-orange-200">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={chatLoading} />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default ChatInterface;
