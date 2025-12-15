import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import PolicyLibrary from './components/PolicyLibrary';
import { View } from './types';
import { BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.CHAT);

  const renderContent = () => {
    switch (currentView) {
      case View.CHAT:
        return <ChatInterface />;
      case View.LIBRARY:
        return <PolicyLibrary />;
      case View.GUIDE:
        return (
          <div className="flex-1 bg-slate-50 p-10 flex flex-col items-center justify-center text-slate-500">
            <BookOpen size={64} className="mb-4 text-slate-300" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">评审指南功能开发中</h2>
            <p className="max-w-md text-center">这里将展示详细的申报流程图解和常见错误解析，帮助员工更高效地准备材料。</p>
          </div>
        );
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;