import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { SparklesIcon } from './Icons';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const GeminiChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'أهلاً بك! أنا مساعدك الذكي في سوق الفلاح. كيف يمكنني خدمتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const initializeChat = () => {
    if (!chatRef.current) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            chatRef.current = ai.chats.create({
              model: 'gemini-2.5-flash',
              config: {
                systemInstruction: 'You are a friendly and helpful assistant for an e-commerce platform called "Souk Al-Fellah" (The Farmer\'s Market). This platform connects farmers, wholesalers, retailers, transporters, and customers. Your answers should be in Arabic. Be concise and helpful.',
              },
            });
        } catch (error) {
            console.error("Failed to initialize Gemini Chat:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: 'عذراً، حدث خطأ أثناء تهيئة المساعد الذكي. يرجى المحاولة مرة أخرى لاحقاً.' }]);
        }
    }
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
          initializeChat();
      }
      
      if (!chatRef.current) {
          throw new Error("Chat not initialized");
      }

      const response = await chatRef.current.sendMessage({ message: input });
      const botMessage: Message = { sender: 'bot', text: response.text };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: Message = { sender: 'bot', text: 'عذراً، لم أتمكن من معالجة طلبك الآن. حاول مرة أخرى.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-transform transform hover:scale-110 z-40"
        aria-label="افتح المساعد الذكي"
      >
        <SparklesIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 h-[60vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
          <header className="bg-primary-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-bold text-lg">المساعد الذكي</h3>
            <button onClick={() => setIsOpen(false)} className="font-bold text-2xl leading-none">&times;</button>
          </header>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl p-3 max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 rounded-xl p-3 max-w-xs">
                      <p className="text-sm animate-pulse">...</p>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسأل أي شيء..."
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <button type="submit" className="bg-primary-600 text-white font-bold p-3 rounded-full mr-2 disabled:bg-gray-400" disabled={isLoading || !input.trim()}>
                أرسل
              </button>
            </div>
          </form>
        </div>
      )}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};