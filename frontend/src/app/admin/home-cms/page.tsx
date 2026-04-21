'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function ManageHomeCMSPage() {
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
      const data = await apiFetch('/home-page');
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
      await apiFetch('/home-page', {
        method: 'PATCH',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Home page configuration saved successfully!');
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
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm min-h-[100px]"
        />
      ) : (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm"
        />
      )}
    </div>
  );

  if (loading) return <div className="p-8">Loading configuration...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20 fade-in">
      <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Home Page</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Update the comprehensive landing page content fields.</p>
        </div>
        <Link href="/" target="_blank" className="text-sm bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors border border-slate-200">
          Preview Live <ExternalLink size={16} />
        </Link>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 animate-in slide-in-from-top-2">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SECTION 1: HERO */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">1</div>
            Hero Section
          </h2>
          <Field label="Hero Title" field="hero_title" placeholder="Transforming Education for a Sustainable Future" />
          <Field label="Hero Subtitle" field="hero_subtitle" placeholder="Empowering Schools..." />
          <Field label="Hero Description" field="hero_description" type="textarea" />
          <div className="grid md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-100 rounded-xl mb-4">
            <Field label="Button 1 Text" field="hero_button_1_text" placeholder="Get Started" />
            <Field label="Button 1 Link" field="hero_button_1_link" placeholder="/about" />
            <Field label="Button 2 Text" field="hero_button_2_text" placeholder="Join Us" />
            <Field label="Button 2 Link" field="hero_button_2_link" placeholder="/contact" />
          </div>
          <Field label="Hero Background Image / Video URL" field="hero_image_url" placeholder="https://" />
        </div>

        {/* SECTION 2: ABOUT / INTRO */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">2</div>
            About Summary
          </h2>
          <Field label="About Title" field="about_title" placeholder="About Green Mentors" />
          <Field label="About Description" field="about_description" type="textarea" />
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Button Text" field="about_button_text" placeholder="Read More" />
            <Field label="Button Link" field="about_button_link" placeholder="/about" />
          </div>
        </div>

        {/* SECTION 3: STATISTICS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">3</div>
            Our Impact Stats
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <Field label="Stat 1 Title" field="stat_1_title" placeholder="Schools Transformed" />
              <Field label="Stat 1 Value" field="stat_1_value" placeholder="8000+" />
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <Field label="Stat 2 Title" field="stat_2_title" placeholder="Educators Trained" />
              <Field label="Stat 2 Value" field="stat_2_value" placeholder="50,000+" />
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <Field label="Stat 3 Title" field="stat_3_title" placeholder="Students Empowered" />
              <Field label="Stat 3 Value" field="stat_3_value" placeholder="10 Million+" />
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <Field label="Stat 4 Title" field="stat_4_title" placeholder="Countries Reached" />
              <Field label="Stat 4 Value" field="stat_4_value" placeholder="45+" />
            </div>
          </div>
        </div>

        {/* SECTION 4: PROGRAMS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">4</div>
            Programs / Services
          </h2>
          <Field label="Section Title" field="programs_title" placeholder="Our Programs" />
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <Field label="Program 1 Title" field="program_1_title" />
              <Field label="Program 1 Description" field="program_1_desc" type="textarea" />
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <Field label="Program 2 Title" field="program_2_title" />
              <Field label="Program 2 Description" field="program_2_desc" type="textarea" />
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <Field label="Program 3 Title" field="program_3_title" />
              <Field label="Program 3 Description" field="program_3_desc" type="textarea" />
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <Field label="Program 4 Title" field="program_4_title" />
              <Field label="Program 4 Description" field="program_4_desc" type="textarea" />
            </div>
          </div>
        </div>

        {/* SECTION 5: WHY CHOOSE US */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">5</div>
            Why Choose Us
          </h2>
          <Field label="Title" field="why_title" />
          <Field label="Description (Bullet points with hyphens)" field="why_description" type="textarea" />
        </div>

        {/* SECTION 6: FIVE ELEMENTS FRAMEWORK */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">6</div>
            Five Elements Framework
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg"><Field label="Soil Title" field="element_soil_title" /><Field label="Soil Desc" field="element_soil_desc" /></div>
            <div className="p-4 bg-slate-50 rounded-lg"><Field label="Water Title" field="element_water_title" /><Field label="Water Desc" field="element_water_desc" /></div>
            <div className="p-4 bg-slate-50 rounded-lg"><Field label="Air Title" field="element_air_title" /><Field label="Air Desc" field="element_air_desc" /></div>
            <div className="p-4 bg-slate-50 rounded-lg"><Field label="Energy Title" field="element_energy_title" /><Field label="Energy Desc" field="element_energy_desc" /></div>
            <div className="p-4 bg-slate-50 rounded-lg md:col-span-2"><Field label="Spaces Title" field="element_spaces_title" /><Field label="Spaces Desc" field="element_spaces_desc" /></div>
          </div>
        </div>

        {/* SECTION 7: EVENTS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">7</div>
            Events & Initiatives
          </h2>
          <Field label="Section Title" field="events_title" />
          <Field label="Description" field="events_description" type="textarea" />
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Button Text" field="events_button_text" />
            <Field label="Button Link" field="events_button_link" />
          </div>
        </div>

        {/* SECTION 8: TESTIMONIALS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">8</div>
            Testimonials
          </h2>
          <Field label="Testimonial Title" field="testimonial_title" />
          <Field label="Quote" field="testimonial_quote" type="textarea" />
          <Field label="Author" field="testimonial_author" />
        </div>

        {/* SECTION 9: CTA */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold">9</div>
            Call To Action
          </h2>
          <Field label="CTA Title" field="cta_title" />
          <Field label="CTA Description" field="cta_description" type="textarea" />
          <div className="grid md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <Field label="Button 1 Text" field="cta_button_1_text" />
            <Field label="Button 1 Link" field="cta_button_1_link" />
            <Field label="Button 2 Text" field="cta_button_2_text" />
            <Field label="Button 2 Link" field="cta_button_2_link" />
          </div>
        </div>

        {/* SECTION 10: SEO */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">10</div>
            SEO Settings
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Meta Title" field="meta_title" />
            <Field label="Meta Keywords" field="meta_keywords" placeholder="keyword1, keyword2" />
          </div>
          <Field label="Meta Description" field="meta_description" type="textarea" />
        </div>

        {/* SECTION 11: STATUS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-black text-slate-800 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center font-bold">11</div>
            Status
          </h2>
          <div className="mb-5 flex flex-col w-64">
            <label className="text-sm font-semibold text-slate-700 mb-2">Publish Status</label>
            <select
              value={formData.status || 'Active'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* FORM CONTROLS */}
        <div className="sticky bottom-4 z-10 flex items-center gap-4 bg-white/80 backdrop-blur-lg p-4 rounded-2xl border border-slate-200 shadow-xl">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-wider rounded-xl hover:bg-slate-800 shadow-sm transition-all active:scale-[0.98]"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>

      </form>
    </div>
  );
}
