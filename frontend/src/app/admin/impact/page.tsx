'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ManageImpactPage() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/impact-page');
      if (data) setFormData(data);
    } catch (e: any) {
      console.error(e);
      setMessage("Note: Could not load configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/impact-page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Impact page configuration saved successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const Field = ({ label, field, type = 'text', placeholder = '' }: any) => (
    <div className="mb-5 flex flex-col">
      <label className="text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-slate-800 text-sm min-h-[100px]"
        />
      ) : (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-slate-800 text-sm"
        />
      )}
    </div>
  );

  if (loading) return <div className="p-8">Loading configuration...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Impact Page</h1>
          <p className="text-sm text-slate-500 mt-1">Update stats, descriptions, and CTA content for the Impact page.</p>
        </div>
        <Link href="/impact" target="_blank" className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
          Visit Website <ExternalLink size={14} />
        </Link>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-md font-medium text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SECTION 1: BASIC DETAILS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 1: BASIC DETAILS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Page Title" field="title" />
            <Field label="Subtitle" field="subtitle" />
          </div>
          <Field label="Intro Description" field="description" type="textarea" />
        </div>

        {/* SECTION 2: IMPACT STATISTICS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 2: IMPACT STATISTICS</h2>
          <div className="grid md:grid-cols-2 gap-8 border p-6 rounded bg-slate-50 border-slate-200">
            <div>
              <Field label="Stat 1 Title" field="stat1_title" placeholder="e.g., Schools & Universities" />
              <Field label="Stat 1 Value" field="stat1_value" placeholder="e.g., 8000+" />
            </div>
            <div>
              <Field label="Stat 2 Title" field="stat2_title" placeholder="e.g., Educators Trained" />
              <Field label="Stat 2 Value" field="stat2_value" placeholder="e.g., 50,000+" />
            </div>
            <div>
              <Field label="Stat 3 Title" field="stat3_title" placeholder="e.g., Students Empowered" />
              <Field label="Stat 3 Value" field="stat3_value" placeholder="e.g., 10 Million" />
            </div>
            <div>
              <Field label="Stat 4 Title" field="stat4_title" placeholder="e.g., Countries Active" />
              <Field label="Stat 4 Value" field="stat4_value" placeholder="e.g., 45" />
            </div>
          </div>
        </div>

        {/* SECTION 3: VISUAL GRAPHICS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 3: VISUAL GRAPHICS</h2>
          <Field label="Impact Dashboard Graphic URL" field="image" placeholder="https://" />
        </div>

        {/* SECTION 4: WHY GREENING EDUCATION MATTERS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 4: WHY GREENING EDUCATION MATTERS</h2>
          <Field label="Why Title" field="why_title" />
          <Field label="Why Description" field="why_description" type="textarea" />
        </div>

        {/* SECTION 5: IMPACT STORY */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 5: IMPACT STORY</h2>
          <Field label="Story Title" field="story_title" />
          <Field label="Story Description" field="story_description" type="textarea" />
        </div>

        {/* SECTION 6: CTA SECTION */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 6: CTA SECTION</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="CTA Title" field="cta_title" />
            <Field label="CTA Description" field="cta_description" type="textarea" />
            <Field label="Button Text" field="button_text" />
            <Field label="Button Link" field="button_link" />
          </div>
        </div>

        {/* SECTION 7: SEO SETTINGS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 7: SEO SETTINGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Meta Title" field="meta_title" />
            <Field label="Meta Keywords" field="meta_keywords" placeholder="keyword1, keyword2, keyword3" />
          </div>
          <Field label="Meta Description" field="meta_description" type="textarea" placeholder="SEO Description" />
        </div>

        {/* SECTION 8: STATUS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 8: STATUS</h2>
          <div className="mb-5 flex flex-col w-64">
            <label className="text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select
              value={formData.status || 'Active'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-slate-800 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* FORM CONTROLS */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 shadow-sm transition-colors"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
          <button type="button" onClick={() => fetchData()} className="px-6 py-3 bg-white text-slate-700 border border-slate-300 text-sm font-bold rounded-md hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
