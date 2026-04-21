'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ManageAccreditationsPage() {
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
      const data = await apiFetch('/accreditation-page');
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
      await apiFetch('/accreditation-page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Accreditation page configuration saved successfully!');
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
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 outline-none text-slate-800 text-sm min-h-[140px]"
        />
      ) : (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 outline-none text-slate-800 text-sm"
        />
      )}
    </div>
  );

  const ProgramBlock = ({ prefix, title }: { prefix: string, title: string }) => (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3 uppercase tracking-wide">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Program Title" field={`${prefix}_title`} />
        <Field label="Program Subtitle" field={`${prefix}_subtitle`} />
      </div>
      <Field label="Program Description" field={`${prefix}_description`} type="textarea" />
      <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded border border-slate-100">
        <div>
          <Field label="Button 1 Text" field={`${prefix}_button_1_text`} />
          <Field label="Button 1 Link" field={`${prefix}_button_1_link`} />
        </div>
        <div>
          <Field label="Button 2 Text" field={`${prefix}_button_2_text`} />
          <Field label="Button 2 Link" field={`${prefix}_button_2_link`} />
        </div>
      </div>
      <div className="mt-6">
        <Field label="Program Image / Logo URL" field={`${prefix}_image`} placeholder="https://" />
      </div>
    </div>
  );

  if (loading) return <div className="p-8">Loading configuration...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Accreditation Page</h1>
          <p className="text-sm text-slate-500 mt-1">Configure the programs and details for the Accreditation hub.</p>
        </div>
        <Link href="/accreditation" target="_blank" className="text-sm text-emerald-600 font-semibold hover:underline flex items-center gap-1">
          Visit Website <ExternalLink size={14} />
        </Link>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-medium text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SECTION 1: BASIC DETAILS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 1: BASIC intro DETAILS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Page Title" field="page_title" />
            <Field label="Subtitle" field="subtitle" />
          </div>
          <Field label="Intro Description" field="intro_description" type="textarea" />
        </div>

        {/* SECTION 2 - 6: PROGRAMS */}
        <ProgramBlock prefix="school" title="SECTION 2: Green School Accreditation" />
        <ProgramBlock prefix="university" title="SECTION 3: Green University Accreditation" />
        <ProgramBlock prefix="teacher" title="SECTION 4: Green Teacher Accreditation" />
        <ProgramBlock prefix="graduate" title="SECTION 5: Green Graduate Accreditation" />
        <ProgramBlock prefix="fellowship" title="SECTION 6: Greening Education Fellowship" />

        {/* SECTION 7: CTA SECTION */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 7: CTA SECTION</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="CTA Title" field="cta_title" />
            <Field label="CTA Description" field="cta_description" type="textarea" />
            <div>
              <Field label="Primary Button Text" field="primary_button_text" />
              <Field label="Primary Button Link" field="primary_button_link" />
            </div>
            <div>
              <Field label="Secondary Button Text" field="secondary_button_text" />
              <Field label="Secondary Button Link" field="secondary_button_link" />
            </div>
          </div>
        </div>

        {/* SECTION 8: SEO SETTINGS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 8: SEO SETTINGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Meta Title" field="meta_title" />
            <Field label="Meta Keywords" field="meta_keywords" placeholder="keyword1, keyword2, keyword3" />
          </div>
          <Field label="Meta Description" field="meta_description" type="textarea" placeholder="SEO Description" />
        </div>

        {/* SECTION 9: STATUS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 9: STATUS</h2>
          <div className="mb-5 flex flex-col w-64">
            <label className="text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select
              value={formData.status || 'Active'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 outline-none text-slate-800 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* FORM CONTROLS */}
        <div className="flex items-center gap-4 pt-4 sticky bottom-6 bg-slate-100/80 backdrop-blur p-4 rounded-2xl border border-slate-200/50 shadow-2xl">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-emerald-700 text-white text-sm font-bold rounded-lg hover:bg-emerald-800 shadow-sm transition-colors w-full md:w-auto text-center"
          >
            {saving ? 'Saving...' : 'Save All Configurations'}
          </button>
          <button type="button" onClick={() => fetchData()} className="px-6 py-3 bg-white text-slate-700 border border-slate-300 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors w-full md:w-auto text-center">
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}
