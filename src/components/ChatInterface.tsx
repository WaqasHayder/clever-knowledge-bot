
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ModeToggle from './ModeToggle';
import AuthModal from './AuthModal';
import { Settings, User, LogOut, MessageSquare } from 'lucide-react';
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
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">ChatBot AI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ModeToggle isPrivateMode={isPrivateMode} onToggle={handleModeToggle} />
            
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2"
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
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 p-3">
          <p className="text-sm text-purple-800 text-center">
            🔒 Private Mode: Your conversations are secure and can access your custom knowledge base
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!user && (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome to ChatBot AI</h2>
            <p className="text-gray-500 mb-4">Sign in to start chatting with our AI assistant</p>
            <Button onClick={() => setShowAuthModal(true)}>
              Sign In to Start Chatting
            </Button>
          </div>
        )}

        {user && messages.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Start a Conversation</h2>
            <p className="text-gray-500">
              You're in {isPrivateMode ? 'Private' : 'Public'} mode. Send a message to begin!
            </p>
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
            <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
