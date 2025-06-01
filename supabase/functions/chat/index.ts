
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    const { message, conversationId, isPrivateMode } = await req.json()

    // Save user message to database
    const { data: messageData, error: messageError } = await supabaseClient
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content: message,
        role: 'user'
      })
      .select()
      .single()

    if (messageError) {
      console.error('Error saving message:', messageError)
      return new Response('Error saving message', { status: 500, headers: corsHeaders })
    }

    // Get conversation history for context
    const { data: messages } = await supabaseClient
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    // Prepare messages for OpenRouter
    const chatMessages = messages?.map(msg => ({
      role: msg.role,
      content: msg.content
    })) || []

    // Call OpenRouter API
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENROUTER_API_KEY')}`,
        'Content-Type': 'application/json',
        'X-Title': 'ChatBot AI'
      },
      body: JSON.stringify({
        model: isPrivateMode ? 'anthropic/claude-3-sonnet' : 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: isPrivateMode 
              ? 'You are a helpful AI assistant with access to the user\'s private knowledge base. Provide detailed and personalized responses.'
              : 'You are a helpful AI assistant. Provide helpful and informative responses to user questions.'
          },
          ...chatMessages
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text()
      console.error('OpenRouter API error:', errorText)
      return new Response('AI service error', { status: 500, headers: corsHeaders })
    }

    const aiResponse = await openRouterResponse.json()
    const aiMessage = aiResponse.choices[0].message.content

    // Save AI response to database
    const { error: aiMessageError } = await supabaseClient
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content: aiMessage,
        role: 'assistant',
        model: isPrivateMode ? 'anthropic/claude-3-sonnet' : 'openai/gpt-3.5-turbo'
      })

    if (aiMessageError) {
      console.error('Error saving AI message:', aiMessageError)
    }

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response('Internal server error', { status: 500, headers: corsHeaders })
  }
})
