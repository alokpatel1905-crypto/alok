import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Bold, Italic, Link as LinkIcon, Code, List, Image as ImageIcon, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AskQuestionPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
           <Link href="/community/questions" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Questions
           </Link>
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ask a public question</h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-8 space-y-8">
              
              {/* Title Section */}
              <div className="space-y-2">
                 <label htmlFor="title" className="block text-sm font-bold text-slate-900">
                    Title
                 </label>
                 <p className="text-xs text-slate-500">
                    Be specific and imagine you're asking a question to another person.
                 </p>
                 <input 
                    type="text" 
                    id="title"
                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    className="w-full text-lg px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-300 font-medium"
                 />
              </div>

              {/* Body Section */}
              <div className="space-y-2">
                 <label className="block text-sm font-bold text-slate-900">
                    What are the details of your problem?
                 </label>
                 <p className="text-xs text-slate-500">
                    Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                 </p>
                 
                 {/* Markdown Editor Mock */}
                 <div className="border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
                       <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><Bold className="w-4 h-4" /></button>
                       <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><Italic className="w-4 h-4" /></button>
                       <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><LinkIcon className="w-4 h-4" /></button>
                       <div className="w-px h-4 bg-slate-300 mx-1" />
                       <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><Code className="w-4 h-4" /></button>
                       <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><ImageIcon className="w-4 h-4" /></button>
                       <div className="w-px h-4 bg-slate-300 mx-1" />
                       <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><List className="w-4 h-4" /></button>
                    </div>
                    <textarea 
                       rows={12}
                       className="w-full p-4 focus:outline-none text-slate-700 resize-y min-h-[200px]"
                       placeholder="Provide a minimal, reproducible example..."
                    />
                 </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                 <label htmlFor="tags" className="block text-sm font-bold text-slate-900">
                    Tags
                 </label>
                 <p className="text-xs text-slate-500">
                    Add up to 5 tags to describe what your question is about.
                 </p>
                 <div className="relative border border-slate-300 rounded-xl px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all flex flex-wrap gap-2 items-center">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded border border-slate-200 flex items-center gap-1">
                       next.js <button className="hover:text-red-500 ml-1">&times;</button>
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded border border-slate-200 flex items-center gap-1">
                       react <button className="hover:text-red-500 ml-1">&times;</button>
                    </span>
                    <input 
                       type="text" 
                       id="tags"
                       placeholder="e.g. (typescript django string)"
                       className="flex-grow focus:outline-none min-w-[150px] text-sm"
                    />
                 </div>
              </div>

           </div>
           
           {/* Footer Action */}
           <div className="bg-slate-50 p-6 border-t border-slate-200 flex items-center justify-between">
              <Button variant="outline" className="border-none text-slate-500 hover:bg-slate-200 rounded-xl">
                 Discard draft
              </Button>
              <div className="flex gap-4">
                 <button className="text-sm font-medium text-slate-500 flex items-center gap-1 hover:text-slate-900">
                   <HelpCircle className="w-4 h-4" /> Formatting Help
                 </button>
                 <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm px-8">
                    Post your question
                 </Button>
              </div>
           </div>
        </div>

        {/* Writing Tips Sidebar/Bottom Info */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
           <h4 className="font-semibold text-blue-900 mb-2">Tips for getting good answers</h4>
           <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
              <li>Make sure your question hasn't been asked already</li>
              <li>Keep your question short and to the point</li>
              <li>Provide code snippets formatted properly using Markdown</li>
              <li>Describe what you've already tried</li>
           </ul>
        </div>

      </div>
    </div>
  );
}
