import React from 'react';
import { View } from '../types';
import { MessageSquare, Book, HelpCircle, FileText, ExternalLink } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  
  const navItemClass = (view: View) => `
    flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors rounded-lg mb-1
    ${currentView === view ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
  `;

  return (
    <div className="w-64 bg-slate-900 h-screen flex flex-col flex-shrink-0 border-r border-slate-700">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
            <FileText className="text-blue-400" size={24} />
            <h1 className="text-xl font-bold text-white tracking-tight">职称智库</h1>
        </div>
        <p className="text-xs text-slate-400 pl-8">江苏工程师评审助手</p>
      </div>

      <nav className="flex-1 px-3">
        <div 
          onClick={() => onChangeView(View.CHAT)}
          className={navItemClass(View.CHAT)}
        >
          <MessageSquare size={18} />
          <span className="font-medium">智能问答</span>
        </div>

        <div 
          onClick={() => onChangeView(View.LIBRARY)}
          className={navItemClass(View.LIBRARY)}
        >
          <Book size={18} />
          <span className="font-medium">政策文件库</span>
        </div>

        <div 
          onClick={() => onChangeView(View.GUIDE)}
          className={navItemClass(View.GUIDE)}
        >
          <HelpCircle size={18} />
          <span className="font-medium">评审指南</span>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 uppercase font-semibold mb-3">常用链接</p>
        <a 
            href="http://hrss.wuxi.gov.cn/ztzl/zyjsryfwzl/zgtj/index.shtml" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-2"
        >
            <ExternalLink size={14} />
            无锡人社局政策
        </a>
        <a 
            href="http://jshrss.jiangsu.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
            <ExternalLink size={14} />
            江苏人社厅官网
        </a>
      </div>
    </div>
  );
};

export default Sidebar;