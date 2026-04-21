'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { ExternalLink, Lightbulb } from 'lucide-react';
import Link from 'next/link';

const EXAMPLE_DATA = {
  page_title: 'Contact Us',
  subtitle: 'Let\'s Connect for Sustainable Education',
  intro_description: 'Green Mentors welcomes inquiries from institutions, educators, partners, media, and supporters working toward sustainability and responsible education systems worldwide.',

  form_title: 'Send Us a Message',
  show_name: true,
  show_email: true,
  show_phone: false,
  show_organization: false,
  show_subject: true,
  show_message: true,
  button_text: 'Submit Inquiry',
  success_message: 'Thank you for contacting Green Mentors. Our team will respond shortly.',

  email_general: 'hello@greenmentors.org',
  email_partnership: 'partnerships@greenmentors.org',
  email_media: 'media@greenmentors.org',
  email_events: 'events@greenmentors.org',
  phone: '+91-XXXXXXXXXX',
  address: 'Global initiative with presence across multiple countries, with roots in India.',
  response_time: 'We aim to respond within 2–3 business days.',

  facebook: 'https://facebook.com/greenmentors',
  linkedin: 'https://linkedin.com/company/greenmentors',
  twitter: 'https://twitter.com/greenmentors',
  instagram: 'https://instagram.com/greenmentors',

  who_title: 'Who Can Reach Out',
  who_description: '- Schools and Universities for accreditation and rankings\n- Educators for programs and recognition\n- Media for interviews and coverage\n- Partners and sponsors for collaboration\n- Students and graduates for participation',

  global_title: 'A Global Mission',
  global_description: 'Green Mentors operates across multiple countries and territories, connecting institutions, educators, and leaders worldwide to drive sustainability in education.',

  faq_q1: 'How long does it take to get a response?',
  faq_a1: 'We typically respond within 2–3 business days.',
  faq_q2: 'Can institutions request partnerships?',
  faq_a2: 'Yes, institutions can contact us for collaboration and partnership opportunities.',

  cta_title: 'Start the Conversation',
  cta_description: 'Connect with Green Mentors and explore collaboration for sustainability-led education.',
  cta_button_text: 'Send Inquiry',
  cta_button_link: '/contact',

  meta_title: 'Contact Green Mentors | Sustainability in Education',
  meta_keywords: 'contact green mentors, education partnership contact, sustainability inquiry',
  meta_description: 'Contact Green Mentors for partnerships, accreditation, events, and sustainability-led education initiatives.',
  status: 'Active',
};

export default function ManageContactPage() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/contact-page');
      if (data) setFormData(data);
    } catch (e: any) {
      console.error(e);
      setMessage('Note: Could not load configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/contact-page/update', { method: 'POST', body: JSON.stringify(formData) });
      setMessage('✅ Contact page configuration saved successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const loadExample = () => {
    setFormData(EXAMPLE_DATA);
    setMessage('📋 Example data loaded! Review and click Save to apply.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const Field = ({ label, field, type = 'text', placeholder = '' }: any) => (
    <div className="mb-5 flex flex-col">
      <label className="text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea value={formData[field] || ''} onChange={(e) => handleChange(field, e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none text-slate-800 text-sm min-h-[120px]" />
      ) : (
        <input type={type} value={formData[field] || ''} onChange={(e) => handleChange(field, e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none text-slate-800 text-sm" />
      )}
    </div>
  );

  const ToggleField = ({ label, field }: { label: string; field: string }) => (
    <div className="mb-4 flex items-center gap-3">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={formData[field] ?? true}
          onChange={(e) => handleChange(field, e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
      </label>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );

  if (loading) return <div className="p-8">Loading configuration...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Contact Page</h1>
          <p className="text-sm text-slate-500 mt-1">Configure contact form, details, and page settings.</p>
        </div>
        <Link href="/contact" target="_blank" className="text-sm text-amber-600 font-semibold hover:underline flex items-center gap-1">
          Visit Website <ExternalLink size={14} />
        </Link>
        <button type="button" onClick={loadExample} className="px-4 py-2 bg-amber-100 text-amber-700 border border-amber-300 text-sm font-semibold rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2">
          <Lightbulb size={14} />
          Example
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-md font-medium text-sm">{message}</div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: BASIC DETAILS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 1: BASIC DETAILS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Page Title" field="page_title" />
            <Field label="Subtitle" field="subtitle" />
          </div>
          <Field label="Intro Description" field="intro_description" type="textarea" />
        </div>

        {/* SECTION 2: CONTACT FORM SETTINGS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-amber-500">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 2: CONTACT FORM SETTINGS</h2>
          <Field label="Form Title" field="form_title" />
          <div className="bg-slate-50 p-6 rounded border border-slate-200 mb-6">
            <h3 className="font-semibold text-slate-700 mb-4">Form Fields (Toggle to enable/disable)</h3>
            <ToggleField label="Show Name Field" field="show_name" />
            <ToggleField label="Show Email Field" field="show_email" />
            <ToggleField label="Show Phone Field" field="show_phone" />
            <ToggleField label="Show Organization Field" field="show_organization" />
            <ToggleField label="Show Subject Field" field="show_subject" />
            <ToggleField label="Show Message Field" field="show_message" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Submit Button Text" field="button_text" />
          </div>
          <Field label="Success Message" field="success_message" type="textarea" />
        </div>

        {/* SECTION 3: CONTACT DETAILS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 3: CONTACT DETAILS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="General Email" field="email_general" placeholder="hello@example.com" />
            <Field label="Partnership Email" field="email_partnership" placeholder="partnerships@example.com" />
            <Field label="Media Email" field="email_media" placeholder="media@example.com" />
            <Field label="Events Email" field="email_events" placeholder="events@example.com" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Phone Number" field="phone" />
            <Field label="Response Time" field="response_time" />
          </div>
          <Field label="Office Address" field="address" type="textarea" />
        </div>

        {/* SECTION 4: SOCIAL LINKS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 4: SOCIAL LINKS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Facebook" field="facebook" placeholder="https://facebook.com/..." />
            <Field label="LinkedIn" field="linkedin" placeholder="https://linkedin.com/company/..." />
            <Field label="Twitter" field="twitter" placeholder="https://twitter.com/..." />
            <Field label="Instagram" field="instagram" placeholder="https://instagram.com/..." />
          </div>
        </div>

        {/* SECTION 5: WHO CAN CONTACT */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 5: WHO CAN CONTACT</h2>
          <Field label="Section Title" field="who_title" />
          <Field label="Description (use hyphens for bullets)" field="who_description" type="textarea" />
        </div>

        {/* SECTION 6: GLOBAL PRESENCE */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 6: GLOBAL PRESENCE</h2>
          <Field label="Section Title" field="global_title" />
          <Field label="Description" field="global_description" type="textarea" />
        </div>

        {/* SECTION 7: FAQ */}
        <div className="bg-slate-50 p-8 rounded-lg shadow-sm border border-slate-200 border-dashed border-2">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 7: FAQ</h2>
          <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow-sm border border-slate-100">
            <Field label="Question 1" field="faq_q1" />
            <Field label="Answer 1" field="faq_a1" type="textarea" />
            <Field label="Question 2" field="faq_q2" />
            <Field label="Answer 2" field="faq_a2" type="textarea" />
          </div>
        </div>

        {/* SECTION 8: CTA */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 8: CALL TO ACTION</h2>
          <Field label="CTA Title" field="cta_title" />
          <Field label="CTA Description" field="cta_description" type="textarea" />
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Button Text" field="cta_button_text" />
            <Field label="Button Link" field="cta_button_link" />
          </div>
        </div>

        {/* SECTION 9: SEO */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 9: SEO SETTINGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Meta Title" field="meta_title" />
            <Field label="Meta Keywords" field="meta_keywords" placeholder="keyword1, keyword2" />
          </div>
          <Field label="Meta Description" field="meta_description" type="textarea" />
        </div>

        {/* SECTION 10: STATUS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 10: STATUS</h2>
          <div className="mb-5 flex flex-col w-64">
            <label className="text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select value={formData.status || 'Active'} onChange={(e) => handleChange('status', e.target.value)} className="px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none text-slate-800 text-sm">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* FORM CONTROLS */}
        <div className="flex items-center gap-4 pt-4 sticky bottom-6 bg-slate-100/80 backdrop-blur p-4 rounded-2xl border border-slate-200/50 shadow-2xl z-50">
          <button type="submit" disabled={saving} className="px-8 py-3 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700 shadow-sm transition-colors w-full md:w-auto text-center">
            {saving ? 'Saving...' : 'Save Contact Configurations'}
          </button>
          <button type="button" onClick={() => fetchData()} className="px-6 py-3 bg-white text-slate-700 border border-slate-300 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors w-full md:w-auto text-center">
            Reset
          </button>
          <button type="button" onClick={async () => {
            if (confirm('Are you sure you want to delete the Contact page configuration? This action cannot be undone.')) {
              try {
                setSaving(true);
                await apiFetch('/contact-page/delete', { method: 'DELETE' });
                setMessage('🗑️ Contact page configuration deleted.');
                setFormData({});
              } catch (err: any) {
                alert('Failed to delete: ' + err.message);
              } finally {
                setSaving(false);
              }
            }
          }} className="px-6 py-3 bg-red-600 text-white border border-red-700 hover:bg-red-700 rounded-lg text-sm font-bold transition-colors">
            Delete Contact Page
          </button>
        </div>
      </form>
    </div>
  );
}
