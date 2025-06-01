
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables } from '@/integrations/supabase/types';

type Conversation = Tables<'conversations'>;
type Message = Tables<'messages'>;

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
    } else {
      setConversations(data || []);
    }
  };

  const createConversation = async (mode: 'public' | 'private') => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        title: 'New Conversation',
        mode
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return null;
    }

    setConversations(prev => [data, ...prev]);
    setCurrentConversation(data);
    setMessages([]);
    return data;
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentConversation || !user) return;

    setLoading(true);

    try {
      const response = await supabase.functions.invoke('chat', {
        body: {
          message: content,
          conversationId: currentConversation.id,
          isPrivateMode: currentConversation.mode === 'private'
        }
      });

      if (response.error) {
        console.error('Error sending message:', response.error);
        return;
      }

      // Reload messages to get the latest conversation
      await loadMessages(currentConversation.id);

      // Update conversation's updated_at timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentConversation.id);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    createConversation,
    setCurrentConversation,
    loadMessages,
    sendMessage,
    loadConversations
  };
}
