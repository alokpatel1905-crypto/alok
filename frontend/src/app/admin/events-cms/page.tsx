'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ManageEventsPage() {
  const [formData, setFormData] = useState<any>({ upcoming_events: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/events-page');
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
      await apiFetch('/events-page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Events page configuration saved successfully!');
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

  const handleUpcomingEventChange = (index: number, field: string, value: string) => {
    const list = [...(formData.upcoming_events || [])];
    list[index] = { ...list[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, upcoming_events: list }));
  };

  const addUpcomingEvent = () => {
    setFormData((prev: any) => ({
      ...prev,
      upcoming_events: [...(prev.upcoming_events || []), { name: '', location: '', date: '', description: '', link: '' }]
    }));
  };

  const removeUpcomingEvent = (index: number) => {
    const list = [...(formData.upcoming_events || [])];
    list.splice(index, 1);
    setFormData((prev: any) => ({ ...prev, upcoming_events: list }));
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

  const EventBlock = ({ prefix, title }: { prefix: string, title: string }) => (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6 border-l-4 border-l-blue-600">
      <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3 uppercase tracking-wide">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Event Title" field={`${prefix}_title`} />
        <Field label="Event Subtitle" field={`${prefix}_subtitle`} />
      </div>
      <Field label="Event Description" field={`${prefix}_description`} type="textarea" />
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Location" field={`${prefix}_location`} />
        <Field label="Date" field={`${prefix}_date`} />
      </div>
      <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded border border-slate-100 mt-4">
        <div>
          <Field label="Button 1 Text" field={`${prefix}_button1_text`} />
          <Field label="Button 1 Link" field={`${prefix}_button1_link`} />
        </div>
        <div>
          <Field label="Button 2 Text" field={`${prefix}_button2_text`} />
          <Field label="Button 2 Link" field={`${prefix}_button2_link`} />
        </div>
      </div>
      <div className="mt-6">
        <Field label="Event Image / Logo URL" field={`${prefix}_image`} placeholder="https://" />
      </div>
    </div>
  );

  if (loading) return <div className="p-8">Loading configuration...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Events Page</h1>
          <p className="text-sm text-slate-500 mt-1">Configure global hub events and dynamic upcoming timelines.</p>
        </div>
        <Link href="/events" target="_blank" className="text-sm text-emerald-600 font-semibold hover:underline flex items-center gap-1">
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
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 1: BASIC INTRO DETAILS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Page Title" field="page_title" />
            <Field label="Subtitle" field="subtitle" />
          </div>
          <Field label="Intro Description" field="intro_description" type="textarea" />
        </div>

        {/* SECTION 2 - 5: CORE EVENTS */}
        <EventBlock prefix="event1" title="SECTION 2: NYC Green School Conference" />
        <EventBlock prefix="event2" title="SECTION 3: NYC Children’s Climate Conference" />
        <EventBlock prefix="event3" title="SECTION 4: World Education Forum – Davos" />
        <EventBlock prefix="event4" title="SECTION 5: Global Green Mentors Conference" />

        {/* SECTION 6: UPCOMING EVENTS ARRAY */}
        <div className="bg-slate-50 p-8 rounded-lg shadow-sm border border-slate-200 border-dashed border-2">
          <div className="flex justify-between items-center border-b pb-3 mb-6">
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">SECTION 6: UPCOMING EVENTS TIMELINE</h2>
            <button type="button" onClick={addUpcomingEvent} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2 transition-colors">
              <Plus size={16} /> Add Event
            </button>
          </div>
          
          {(formData.upcoming_events || []).length === 0 && (
            <p className="text-slate-500 text-sm italic">No upcoming events scheduled. Click 'Add Event' above.</p>
          )}

          <div className="space-y-4 shadow-inner">
            {(formData.upcoming_events || []).map((ev: any, index: number) => (
              <div key={index} className="bg-white border border-slate-200 shadow-sm rounded-lg p-6 relative">
                <button type="button" onClick={() => removeUpcomingEvent(index)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-full transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="mb-4">
                    <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full">EVENT 0{index + 1}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Event Name</label>
                    <input type="text" value={ev.name} onChange={(e) => handleUpcomingEventChange(index, 'name', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded text-sm outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                    <input type="text" value={ev.location} onChange={(e) => handleUpcomingEventChange(index, 'location', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded text-sm outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                    <input type="text" value={ev.date} onChange={(e) => handleUpcomingEventChange(index, 'date', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Short Description (Optional)</label>
                    <textarea value={ev.description} onChange={(e) => handleUpcomingEventChange(index, 'description', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded text-sm outline-none focus:border-emerald-500 min-h-[60px]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Register Link (Optional)</label>
                    <input type="text" value={ev.link} onChange={(e) => handleUpcomingEventChange(index, 'link', e.target.value)} className="w-full mt-1 px-3 py-2 border rounded text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: WHY ATTEND */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 7: WHY ATTEND EVENTS</h2>
          <Field label="Why Title" field="why_title" />
          <Field label="Why Description" field="why_description" type="textarea" />
        </div>

        {/* SECTION 8: CTA SECTION */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 8: CALL TO ACTION</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="CTA Title" field="cta_title" />
            <Field label="CTA Description" field="cta_description" type="textarea" />
            <Field label="Button Text" field="button_text" />
            <Field label="Button Link" field="button_link" />
          </div>
        </div>

        {/* SECTION 9: SEO SETTINGS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 9: SEO SETTINGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Meta Title" field="meta_title" />
            <Field label="Meta Keywords" field="meta_keywords" placeholder="keyword1, keyword2, keyword3" />
          </div>
          <Field label="Meta Description" field="meta_description" type="textarea" placeholder="SEO Description" />
        </div>

        {/* SECTION 10: STATUS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 10: STATUS</h2>
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
        <div className="flex items-center gap-4 pt-4 sticky bottom-6 bg-slate-100/80 backdrop-blur p-4 rounded-2xl border border-slate-200/50 shadow-2xl z-50">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-emerald-700 text-white text-sm font-bold rounded-lg hover:bg-emerald-800 shadow-sm transition-colors w-full md:w-auto text-center"
          >
            {saving ? 'Saving...' : 'Save Events Configurations'}
          </button>
          <button type="button" onClick={() => fetchData()} className="px-6 py-3 bg-white text-slate-700 border border-slate-300 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors w-full md:w-auto text-center">
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}
