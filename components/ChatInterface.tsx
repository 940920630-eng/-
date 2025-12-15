import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { SAMPLE_QUESTIONS } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: '您好！我是您的职称评审助手。我可以为您查询江苏省及各市的职称政策、学历要求、论文规定等。请问有什么可以帮您？',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendMessageToGemini(messages, text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text,
        sources: response.sources
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: '抱歉，系统暂时繁忙，请稍后再试。'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50 relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div>
            <h2 className="text-lg font-bold text-slate-800">智能问答助手</h2>
            <p className="text-xs text-slate-500">基于江苏省/无锡市官方政策库 (Powered by Gemini)</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
            }`}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>

            <div className={`flex flex-col max-w-[85%] md:max-w-[75%]`}>
                <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                    <ReactMarkdown 
                        components={{
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                        }}
                    >
                        {msg.content}
                    </ReactMarkdown>
                </div>

                {/* Sources Display */}
                {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pl-2">
                        <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1">
                            <Info size={12}/> 参考来源:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {msg.sources.map((source, idx) => (
                                <a 
                                    key={idx}
                                    href={source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs bg-white border border-slate-200 text-blue-600 px-2 py-1 rounded hover:bg-slate-50 hover:underline truncate max-w-[200px]"
                                    title={source.title}
                                >
                                    {source.title || '网页链接'}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center">
               <Loader2 className="animate-spin text-slate-400" size={16} />
               <span className="text-xs text-slate-400 ml-2">正在查询政策库...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 md:p-6">
        {/* Quick Questions */}
        {messages.length < 3 && (
            <div className="mb-4 flex flex-wrap gap-2">
                {SAMPLE_QUESTIONS.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-blue-200"
                    >
                        {q}
                    </button>
                ))}
            </div>
        )}

        <div className="relative max-w-5xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="请输入您的问题，例如：申报高级工程师需要发表几篇论文？"
            disabled={isTyping}
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-3 rounded-xl transition-colors shadow-sm"
          >
            {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
            AI回复仅供参考，具体以江苏省人社厅及各市主管部门正式发文为准。
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;