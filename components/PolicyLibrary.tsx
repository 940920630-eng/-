import React, { useState } from 'react';
import { MOCK_POLICIES, CATEGORY_ICONS } from '../constants';
import { Search, FileText, ChevronRight } from 'lucide-react';
import { PolicyDocument } from '../types';

const PolicyLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(MOCK_POLICIES.map(p => p.category)))];

  const filteredPolicies = MOCK_POLICIES.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">政策文件库</h2>
          <p className="text-slate-500">收录江苏省及各市最新工程师职称评审资格条件及管理办法。</p>
        </header>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="搜索政策标题、关键字..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? '全部' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  {CATEGORY_ICONS[policy.category] || <FileText size={24} />}
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                  {policy.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {policy.title}
              </h3>
              
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                {policy.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-50">
                <div className="flex gap-3">
                  <span>{policy.department}</span>
                  <span>{policy.publishDate}</span>
                </div>
                {policy.link && (
                    <a 
                        href={policy.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        查看原文 <ChevronRight size={12} />
                    </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPolicies.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p>未找到相关政策文件。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyLibrary;