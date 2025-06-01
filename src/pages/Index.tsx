
import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <ChatInterface />;
  }

  return <LandingPage onStartChat={() => setShowChat(true)} />;
};

export default Index;
