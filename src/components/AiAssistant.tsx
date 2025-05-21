
import { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useApp } from '@/context/AppContext';

type Message = {
  role: 'assistant' | 'user';
  content: string;
};

const AI_RESPONSES = [
  "I've noticed you have several OpenAI keys. Would you like me to group them?",
  "Your API keys are properly organized. Good security practice!",
  "Remember to rotate your API keys regularly for better security.",
  "I can help you search for specific API keys. Just ask me!",
  "Would you like me to suggest a better naming convention for your keys?",
  "I notice you have unused API keys. Should I recommend cleanup options?",
];

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your API key assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { apiKeys, categories, copyApiKey, selectedCategory, setSelectedCategory } = useApp();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Occasionally send proactive messages
  useEffect(() => {
    if (isOpen && messages.length > 0 && messages.length < 3) {
      const timer = setTimeout(() => {
        const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
        setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Process user message and generate response
    setTimeout(() => {
      let response = "I'm processing your request...";
      
      // Simple NLP-like pattern matching
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('show') && lowerInput.includes('key')) {
        const categoryMatches = categories
          .filter(cat => lowerInput.includes(cat.name.toLowerCase()))
          .map(cat => cat.id);
        
        if (categoryMatches.length > 0) {
          setSelectedCategory(categoryMatches[0]);
          response = `Here are the ${categories.find(c => c.id === categoryMatches[0])?.name} keys!`;
        } else {
          setSelectedCategory(null);
          response = "I've displayed all your API keys for you.";
        }
      } 
      else if (lowerInput.includes('copy') && lowerInput.includes('key')) {
        const keyMatches = apiKeys.filter(key => 
          lowerInput.includes(key.name.toLowerCase()) || 
          lowerInput.includes(key.displayName.toLowerCase())
        );
        
        if (keyMatches.length > 0) {
          copyApiKey(keyMatches[0].key);
          response = `I've copied the ${keyMatches[0].displayName} key to your clipboard!`;
        } else {
          response = "I couldn't find that specific API key. Could you be more specific?";
        }
      }
      else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! How can I assist with your API keys today?";
      }
      else if (lowerInput.includes('thank')) {
        response = "You're welcome! I'm here to help manage your API keys efficiently.";
      }
      else {
        response = "I'm still learning to understand different requests. Try asking me to show or copy specific API keys!";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 600);
  };

  return (
    <>
      {/* Floating bot button */}
      <Button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 rounded-full w-10 h-10 p-0 shadow-lg bg-brand-purple hover:bg-brand-purple-dark"
        size="icon"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-background border border-white/20 rounded-lg shadow-xl overflow-hidden flex flex-col animate-fade-in">
          <div className="bg-brand-purple/20 p-2 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center">
              <Bot className="h-4 w-4 mr-2 text-brand-purple" />
              <h3 className="text-sm font-medium">API Key Assistant</h3>
            </div>
            <Sparkles className="h-3 w-3 text-brand-purple animate-pulse" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-2 rounded-lg text-xs ${
                    msg.role === 'user' 
                      ? 'bg-brand-purple/30 rounded-tr-none' 
                      : 'bg-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-2 border-t border-white/10 flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your API keys..."
              className="text-xs bg-white/5 border-white/10"
            />
            <Button type="submit" size="sm" className="ml-1 h-8">Send</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
