import React from 'react';
import Link from 'next/link';
import { ChevronUp, ChevronDown, CheckCircle2, MessageSquare, ArrowLeft, MoreHorizontal, Share, Flag, Bookmark } from 'lucide-react';

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
           <Link href="/community/questions" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Questions
           </Link>
        </div>

        {/* Question Header */}
        <div className="mb-8 border-b border-slate-200 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            How do I implement Framer Motion layout animations with Next.js App Router?
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="font-semibold text-slate-700">alokpatel</span>
            </div>
            <span>Asked 2 hours ago</span>
            <span>Viewed 104 times</span>
          </div>
        </div>

        {/* Question Body */}
        <div className="flex gap-6 mb-12">
          {/* Voting Sidebar */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors focus:ring-2 focus:ring-orange-200">
              <ChevronUp className="w-8 h-8" />
            </button>
            <span className="text-xl font-bold text-slate-700">42</span>
            <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors focus:ring-2 focus:ring-blue-200">
              <ChevronDown className="w-8 h-8" />
            </button>
            <button className="mt-4 p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors" title="Bookmark">
               <Bookmark className="w-5 h-5" />
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow min-w-0">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed mb-8 text-base">
              <p>
                I am migrating an old React app to the Next.js App Router (Next 14). I have a list of cards that I want to animate when an item is removed using Framer Motion's <code>&lt;AnimatePresence&gt;</code>. 
              </p>
              <p>
                The standard entrance/exit animations work perfectly, but the <code>layout</code> animations seem to break entirely when a route transition occurs.
              </p>
              
              <pre className="bg-slate-900 text-slate-50 p-5 rounded-xl overflow-x-auto shadow-inner text-sm font-mono mt-6 mb-6 leading-relaxed">
                <code className="language-tsx">
{`import { motion, AnimatePresence } from 'framer-motion';

export default function CardList({ items }) {
  return (
    <ul className="grid gap-4">
      <AnimatePresence mode="popLayout">
        {items.map(item => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card data={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}`}
                </code>
              </pre>
              
              <p>
                Is there a known issue with the App Router's frozen layout states and Framer Motion's layout engine? What is the recommended workaround?
              </p>
            </div>

            {/* Tags & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                {['react', 'next.js', 'framer-motion'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200/60">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                <button className="hover:text-slate-900 flex items-center gap-1.5 transition-colors"><Share className="w-4 h-4"/> Share</button>
                <button className="hover:text-slate-900 flex items-center gap-1.5 transition-colors"><Flag className="w-4 h-4"/> Report</button>
                <button className="p-1 hover:text-slate-900 transition-colors"><MoreHorizontal className="w-4 h-4"/></button>
              </div>
            </div>
            
            {/* Comments */}
            <div className="mt-8 pl-8 border-l-2 border-slate-200 space-y-4">
               <div className="text-sm text-slate-600 border-b border-slate-100 pb-3">
                  This might be related to the new Template.tsx file pattern. Have you tried wrapping the layout in a Template component? &ndash; <span className="font-medium text-blue-600">sam_dev</span> <span className="text-slate-400">1 hour ago</span>
               </div>
               <button className="text-sm text-slate-400 font-medium hover:text-slate-600 transition-colors">
                  Add a comment...
               </button>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold text-slate-900">3 Answers</h2>
             <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg p-1 text-sm font-medium">
                <button className="px-3 py-1.5 bg-slate-100 text-slate-900 rounded-md">Highest score</button>
                <button className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 rounded-md transition-colors">Newest</button>
             </div>
          </div>

          <div className="space-y-12">
            {/* Answer 1 (Accepted) */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 md:p-8 flex gap-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full opacity-50 pointer-events-none -mr-8 -mt-8" />
              
              {/* Voting */}
              <div className="flex flex-col items-center gap-2 shrink-0 relative z-10">
                <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors">
                  <ChevronUp className="w-8 h-8" />
                </button>
                <span className="text-xl font-bold text-emerald-700">156</span>
                <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                  <ChevronDown className="w-8 h-8" />
                </button>
                <div className="mt-4 flex flex-col items-center">
                   <CheckCircle2 className="w-8 h-8 text-emerald-500 drop-shadow-sm" />
                   <span className="text-[10px] font-bold text-emerald-700 mt-1 uppercase tracking-widest">Accepted</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0 relative z-10">
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed mb-8">
                  <p>
                    Yes, this is a known issue. The Next.js App Router keeps the DOM nodes alive across navigations for layouts, which confuses Framer Motion's layout projection tree.
                  </p>
                  <p>
                    To fix this, you need to use the <code>usePathname</code> hook to force the <code>AnimatePresence</code> to re-evaluate its children when the route changes. You can do this by passing the pathname as a <code>key</code> to a wrapper motion div.
                  </p>
                  <pre className="bg-slate-900 text-slate-50 p-5 rounded-xl overflow-x-auto shadow-inner text-sm font-mono mt-4 mb-4">
                    <code>
{`import { usePathname } from 'next/navigation';

export default function AnimatedLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}`}
                    </code>
                  </pre>
                  <p>This ensures the entire layout tree unmounts and remounts, giving Framer Motion a clean slate to calculate layout transitions.</p>
                </div>
                
                {/* Answer Meta */}
                <div className="flex justify-end pt-4 border-t border-emerald-100/60">
                   <div className="bg-white/60 px-4 py-3 rounded-xl border border-emerald-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shadow-sm">
                        L
                      </div>
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-slate-900">leemartin</span>
                         <span className="text-xs font-medium text-slate-500">Answered 1 hour ago</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Add Answer Form */}
            <div className="pt-12 border-t border-slate-200">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Your Answer</h3>
               <div className="bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all mb-6">
                  {/* Fake Toolbar */}
                  <div className="flex items-center gap-2 p-2 bg-slate-50 border-b border-slate-200 text-slate-400">
                     <div className="w-6 h-6 bg-slate-200 rounded animate-pulse" />
                     <div className="w-6 h-6 bg-slate-200 rounded animate-pulse" />
                     <div className="w-6 h-6 bg-slate-200 rounded animate-pulse" />
                  </div>
                  <textarea 
                     rows={8}
                     className="w-full p-4 focus:outline-none text-slate-700 resize-y"
                     placeholder="Write your answer here..."
                  />
               </div>
               <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-3 shadow-sm transition-all">
                  Post Your Answer
               </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
