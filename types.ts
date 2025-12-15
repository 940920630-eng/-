import React from 'react';

export enum View {
  CHAT = 'CHAT',
  LIBRARY = 'LIBRARY',
  GUIDE = 'GUIDE'
}

export interface Source {
  title: string;
  url: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  isLoading?: boolean;
  sources?: Source[];
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  department: string;
  description: string;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}