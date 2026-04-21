'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Save, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ManageAboutPage() {
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
      const data = await apiFetch('/about-page'); // Our new explicit route
      if (data) {
        setFormData(data);
      }
    } catch (e: any) {
      console.error(e);
      setMessage("Note: Starting fresh. No existing data found.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/about-page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ About page updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
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
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none text-slate-800 text-sm min-h-[120px]"
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
          <h1 className="text-2xl font-bold text-slate-900">Manage About Page</h1>
          <p className="text-sm text-slate-500 mt-1">Update all content for the public About page here.</p>
        </div>
        <Link href="/about" target="_blank" className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
          Visit Website <ExternalLink size={14} />
        </Link>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-md font-medium text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SECTION 1: BASIC CONTENT */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 1: BASIC CONTENT</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Section Name" field="section_name" />
            <Field label="Page Title" field="page_title" />
          </div>
          <Field label="Short Subtitle" field="short_subtitle" />
          <Field label="Main Description" field="main_description" type="textarea" />
        </div>

        {/* SECTION 2: FEATURE IMAGE */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 2: FEATURE IMAGE</h2>
          <Field label="About Page Image URL" field="about_image" placeholder="https://" />
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Image Alt Text" field="image_alt" />
            <Field label="Image Caption" field="image_caption" />
          </div>
        </div>

        {/* SECTION 3: OUR VISION */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 3: OUR VISION</h2>
          <Field label="Vision Title" field="vision_title" />
          <Field label="Vision Description" field="vision_description" type="textarea" />
        </div>

        {/* SECTION 4: LEADERSHIP */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 4: LEADERSHIP</h2>
          <Field label="Leadership Title" field="leadership_title" />
          
          <div className="bg-slate-50 p-6 rounded-md border border-slate-200 mb-6">
            <h3 className="font-semibold text-slate-700 mb-4">Founder Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Founder Name" field="founder_name" />
              <Field label="Founder Designation" field="founder_designation" />
              <Field label="Founder Image URL" field="founder_image" placeholder="https://" />
              <Field label="Founder Profile Link" field="founder_profile_link" placeholder="https://" />
            </div>
            <Field label="Founder Description" field="founder_description" type="textarea" />
          </div>

          <div className="bg-slate-50 p-6 rounded-md border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4">Partners (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Partner 1 Name" field="partner_1_name" />
              <Field label="Partner 1 Link" field="partner_1_link" placeholder="https://" />
              <Field label="Partner 2 Name" field="partner_2_name" />
              <Field label="Partner 2 Link" field="partner_2_link" placeholder="https://" />
              <Field label="Partner 3 Name" field="partner_3_name" />
              <Field label="Partner 3 Link" field="partner_3_link" placeholder="https://" />
            </div>
          </div>
        </div>

        {/* SECTION 5: ORGANIZATION HISTORY / GROWTH */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 5: ORGANIZATION HISTORY / GROWTH</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Founded Year" field="founded_year" />
            <Field label="Countries Count" field="countries_count" />
          </div>
          <Field label="Growth Description" field="growth_description" type="textarea" />
          <Field label="History Notes" field="history_notes" type="textarea" />
        </div>

        {/* SECTION 6: OUR APPROACH */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 6: OUR APPROACH</h2>
          <Field label="Approach Title" field="approach_title" />
          <Field label="Approach Description" field="approach_description" type="textarea" />
        </div>

        {/* SECTION 7: FIVE ELEMENTS FRAMEWORK */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 7: FIVE ELEMENTS FRAMEWORK</h2>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="border-l-4 border-amber-600 pl-4 py-2"><Field label="Soil Title" field="soil_title" /><Field label="Soil Description" field="soil_description" /></div>
            <div className="border-l-4 border-blue-500 pl-4 py-2"><Field label="Water Title" field="water_title" /><Field label="Water Description" field="water_description" /></div>
            <div className="border-l-4 border-cyan-400 pl-4 py-2"><Field label="Air Title" field="air_title" /><Field label="Air Description" field="air_description" /></div>
            <div className="border-l-4 border-yellow-400 pl-4 py-2"><Field label="Energy Title" field="energy_title" /><Field label="Energy Description" field="energy_description" /></div>
            <div className="border-l-4 border-green-500 pl-4 py-2 md:col-span-2 w-1/2"><Field label="Spaces Title" field="spaces_title" /><Field label="Spaces Description" field="spaces_description" /></div>
          </div>
        </div>

        {/* SECTION 8: CTA / BUTTON */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 8: CTA / BUTTON</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Button Text" field="button_text" />
            <Field label="Button Link" field="button_link" />
            <Field label="Secondary Button Text" field="secondary_button_text" />
            <Field label="Secondary Button Link" field="secondary_button_link" />
          </div>
        </div>

        {/* SECTION 9: SEO SETTINGS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 9: SEO SETTINGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Meta Title" field="meta_title" />
            <Field label="Meta Keywords" field="meta_keywords" placeholder="keyword1, keyword2, keyword3" />
          </div>
          <Field label="Meta Description" field="meta_description" type="textarea" placeholder="SEO Description (limit to 160 chars)" />
        </div>

        {/* SECTION 10: STATUS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 10: STATUS</h2>
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
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => fetchData()} className="px-6 py-3 bg-white text-slate-700 border border-slate-300 text-sm font-bold rounded-md hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
