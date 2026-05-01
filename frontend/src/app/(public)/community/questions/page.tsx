import React from 'react';
import Link from 'next/link';
import { MessageCircle, Check, Search, Filter, ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data
const MOCK_QUESTIONS = [
  {
    id: 1,
    title: 'How do I implement Framer Motion layout animations with Next.js App Router?',
    summary: 'I am trying to animate a list of cards when an item is removed. The standard AnimatePresence works, but layout animations seem to break during route transitions.',
    votes: 42,
    answers: 3,
    views: 104,
    tags: ['react', 'next.js', 'framer-motion'],
    author: 'alokpatel',
    time: '2 hours ago',
    isAnswered: true
  },
  {
    id: 2,
    title: 'Tailwind CSS container queries not working in nested flexboxes',
    summary: 'When using @container on a parent div, the @md:grid-cols-2 class on the child doesn\'t seem to apply if the parent itself is a flex item.',
    votes: 15,
    answers: 0,
    views: 89,
    tags: ['css', 'tailwind'],
    author: 'sarah_dev',
    time: '5 hours ago',
    isAnswered: false
  },
  {
    id: 3,
    title: 'Best approach for handling Stripe Webhooks in NestJS?',
    summary: 'Looking for architectural advice. Should the webhook endpoint go directly into the BillingService, or should it emit an event to a dedicated WebhookHandler module?',
    votes: 89,
    answers: 5,
    views: 412,
    tags: ['nestjs', 'stripe', 'architecture'],
    author: 'tech_lead',
    time: '1 day ago',
    isAnswered: true
  }
];

export default function QuestionsDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Community Discussions</h1>
            <p className="text-slate-500 mt-1">Ask questions, find answers, and collaborate with the community.</p>
          </div>
          <Link href="/community/questions/ask">
            <Button variant="primary" className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm rounded-xl px-6 py-2.5">
              Ask Question
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search questions..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                 <button className="px-4 py-2 bg-slate-100 text-slate-900 font-medium text-sm rounded-lg whitespace-nowrap">Newest</button>
                 <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-medium text-sm rounded-lg transition-colors whitespace-nowrap">Active</button>
                 <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-medium text-sm rounded-lg transition-colors whitespace-nowrap">Unanswered</button>
                 <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-auto">
                    <Filter className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {MOCK_QUESTIONS.map((q) => (
                <Link key={q.id} href={`/community/questions/${q.id}`} className="block group hover:bg-slate-50/80 transition-colors p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    
                    {/* Stats Block (Left Side) */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 text-sm shrink-0 sm:w-24 pt-1">
                      <div className="text-slate-900 font-medium flex items-center gap-1.5">
                        <ArrowUpCircle className="w-4 h-4 text-slate-400" /> {q.votes} votes
                      </div>
                      <div className={`font-medium flex items-center gap-1.5 px-2 py-1 rounded-md ${q.isAnswered ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-500'}`}>
                        {q.isAnswered ? <Check size={14}/> : <MessageCircle size={14} className="opacity-50"/>} {q.answers} answers
                      </div>
                      <div className="text-slate-400 hidden sm:block">{q.views} views</div>
                    </div>
                    
                    {/* Content Block */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 tracking-tight leading-snug">
                        {q.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {q.summary}
                      </p>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {q.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Author/Time */}
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                           <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
                             {q.author.charAt(0).toUpperCase()}
                           </div>
                           <span className="font-medium text-slate-700">{q.author}</span>
                           <span>asked {q.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Mock */}
            <div className="flex justify-center pt-4">
               <div className="flex gap-1">
                  <button className="px-3 py-1 border border-slate-200 text-slate-400 rounded-md bg-white opacity-50 cursor-not-allowed">Prev</button>
                  <button className="px-3 py-1 border border-slate-900 bg-slate-900 text-white rounded-md font-medium">1</button>
                  <button className="px-3 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md font-medium transition-colors">2</button>
                  <button className="px-3 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md font-medium transition-colors">3</button>
                  <button className="px-3 py-1 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-md font-medium transition-colors">Next</button>
               </div>
            </div>
            
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['react', 'next.js', 'typescript', 'tailwind', 'nestjs', 'prisma', 'architecture'].map(tag => (
                     <Link key={tag} href="#" className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200 transition-colors">
                        {tag}
                     </Link>
                  ))}
                </div>
             </div>

             <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <h3 className="font-semibold text-emerald-900 mb-2">Community Guidelines</h3>
                <p className="text-sm text-emerald-800/80 leading-relaxed mb-4">
                  Be descriptive in your titles. Provide code snippets to reproduce errors. Be respectful to fellow developers.
                </p>
                <Link href="#" className="text-emerald-700 text-sm font-medium hover:underline">
                  Read full rules &rarr;
                </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
