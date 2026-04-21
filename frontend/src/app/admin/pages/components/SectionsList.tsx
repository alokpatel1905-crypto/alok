'use client';

import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { Trash2, ChevronUp, ChevronDown, Plus, Layout, Type, BarChart3, List, MousePointer2 } from 'lucide-react';

const SECTION_TYPES = [
  { key: 'hero', label: 'Hero Section', icon: <Layout size={18} />, default: { title: 'New Hero', description: 'Enter description here...', badgeText: 'Badge Text', ctaLabel: 'Get Started', ctaLink: '#' } },
  { key: 'stats', label: 'Stats Section', icon: <BarChart3 size={18} />, default: { title: 'Our Impact', stats: [{ value: '100+', label: 'Happy Users', icon: 'users' }] } },
  { key: 'cards', label: 'Card Grid', icon: <List size={18} />, default: { title: 'Explore More', cards: [{ title: 'Category 1', items: ['Item 1', 'Item 2'] }] } },
  { key: 'cta', label: 'Call to Action', icon: <MousePointer2 size={18} />, default: { title: 'Ready to join?', description: 'Join our community today.', buttonLabel: 'Join Now', buttonLink: '#' } },
  { key: 'timeline', label: 'Timeline', icon: <Type size={18} />, default: { title: 'Our History', items: [{ year: '2024', title: 'Founded', description: 'We started our journey.' }] } },
];

export function SectionsList({ pageId, initialSections }: { pageId: string, initialSections: any[] }) {
  const [sections, setSections] = useState(initialSections || []);
  const [isSaving, setIsSaving] = useState(false);

  const addSection = async (type: any) => {
    const newSection = {
      pageId,
      sectionKey: type.key,
      content: type.default,
      order: sections.length,
    };

    try {
      const res = await apiFetch('/sections', {
        method: 'POST',
        body: JSON.stringify(newSection),
      });
      setSections([...sections, res]);
    } catch (e) {
      alert('Failed to add section');
    }
  };

  const deleteSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    try {
      await apiFetch(`/sections/${id}`, { method: 'DELETE' });
      setSections(sections.filter(s => s.id !== id));
    } catch (e) {
      alert('Failed to delete section');
    }
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);

    // Persist reorder
    try {
      await apiFetch('/sections/reorder', {
        method: 'POST',
        body: JSON.stringify({ ids: newSections.map(s => s.id) }),
      });
    } catch (e) {
      alert('Failed to reorder sections');
    }
  };

  const updateSectionContent = async (id: string, content: any) => {
    try {
      await apiFetch(`/sections/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ content }),
      });
      setSections(sections.map(s => s.id === id ? { ...s, content } : s));
    } catch (e) {
      alert('Failed to update section content');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
        <h4 className="w-full text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Add New Section</h4>
        {SECTION_TYPES.map(type => (
          <button
            key={type.key}
            onClick={() => addSection(type)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm"
          >
            {type.icon} {type.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={section.id} className="group bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:border-emerald-200 transition-all">
            <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{idx + 1}</span>
                <h5 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  {SECTION_TYPES.find(t => t.key === section.sectionKey)?.label || section.sectionKey}
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="p-2 text-slate-400 hover:text-emerald-600 disabled:opacity-30"><ChevronUp size={20} /></button>
                <button onClick={() => moveSection(idx, 'down')} disabled={idx === sections.length - 1} className="p-2 text-slate-400 hover:text-emerald-600 disabled:opacity-30"><ChevronDown size={20} /></button>
                <button onClick={() => deleteSection(section.id)} className="p-2 text-slate-400 hover:text-red-600 ml-2"><Trash2 size={18} /></button>
              </div>
            </div>

            <div className="space-y-4">
               <textarea
                 value={JSON.stringify(section.content, null, 2)}
                 onChange={(e) => {
                   try {
                     const parsed = JSON.parse(e.target.value);
                     updateSectionContent(section.id, parsed);
                   } catch (err) {} // Wait for valid JSON
                 }}
                 className="w-full h-48 bg-slate-50 border border-slate-100 rounded-2xl p-4 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
               />
               <p className="text-[10px] text-slate-400 font-medium italic">Content for {section.sectionKey} section. Edit JSON above to update.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
