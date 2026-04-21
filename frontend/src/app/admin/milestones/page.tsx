'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Save, ExternalLink, Plus, Trash2, Edit2 } from 'lucide-react';
import Link from 'next/link';

export default function ManageMilestonesPage() {
  const [formData, setFormData] = useState<any>({});
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Local state for adding/editing milestone row inline
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [newMilestone, setNewMilestone] = useState({ year: '', title: '', description: '', order: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pageData, listData] = await Promise.all([
        apiFetch('/milestones/page'),
        apiFetch('/milestones'),
      ]);
      setFormData(pageData || {});
      setMilestones(listData || []);
    } catch (e: any) {
      console.error(e);
      setMessage("Note: Could not load existing configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/milestones/page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Milestones page configuration saved!');
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

  // Milestone Row Operations
  const handleAddMilestone = async () => {
    if (!newMilestone.year || !newMilestone.description) return alert("Year and description required.");
    try {
      const added = await apiFetch('/milestones/add', {
        method: 'POST',
        body: JSON.stringify(newMilestone),
      });
      setMilestones([...milestones, added]);
      setNewMilestone({ year: '', title: '', description: '', order: 0 });
    } catch (e: any) {
      alert("Error adding milestone: " + e.message);
    }
  };

  const handleUpdateMilestone = async (id: string, updatedData: any) => {
    try {
      const res = await apiFetch(`/milestones/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      setMilestones(milestones.map(m => m.id === id ? res : m));
      setEditingMilestoneId(null);
    } catch (e: any) {
      alert("Error updating milestone: " + e.message);
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    if (!confirm("Delete this milestone?")) return;
    try {
      await apiFetch(`/milestones/delete/${id}`, { method: 'DELETE' });
      setMilestones(milestones.filter(m => m.id !== id));
    } catch (e: any) {
      alert("Error deleting milestone: " + e.message);
    }
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
      ) : type === 'checkbox' ? (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData[field] === true || formData[field] === 'true'}
            onChange={(e) => handleChange(field, e.target.checked)}
            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-slate-600">Enable</span>
        </div>
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
          <h1 className="text-2xl font-bold text-slate-900">Manage Milestones Page</h1>
          <p className="text-sm text-slate-500 mt-1">Update timeline and SEO content for the Milestones page.</p>
        </div>
        <Link href="/milestones" target="_blank" className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
          Visit Website <ExternalLink size={14} />
        </Link>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-md font-medium text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSavePage} className="space-y-6">
        
        {/* SECTION 1: BASIC DETAILS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 1: BASIC DETAILS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Page Title" field="page_title" />
            <Field label="Subtitle" field="subtitle" />
          </div>
          <Field label="Intro Description" field="intro_description" type="textarea" />
        </div>

        {/* SECTION 2: MILESTONES LIST (DYNAMIC TABLE) */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3 flex justify-between items-center">
            SECTION 2: MILESTONES TIMELINE
          </h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-600 border-y border-slate-200">
                <tr>
                  <th className="font-semibold p-3 w-20">Order</th>
                  <th className="font-semibold p-3 w-32">Year</th>
                  <th className="font-semibold p-3">Title / Description</th>
                  <th className="font-semibold p-3 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {milestones.length === 0 && (
                  <tr><td colSpan={4} className="p-4 text-center text-slate-400">No milestones added yet.</td></tr>
                )}
                {milestones.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    {editingMilestoneId === m.id ? (
                      <>
                        <td className="p-3"><input type="number" defaultValue={m.order} id={`order_${m.id}`} className="w-full border p-1 rounded" /></td>
                        <td className="p-3"><input type="text" defaultValue={m.year} id={`year_${m.id}`} className="w-full border p-1 rounded" /></td>
                        <td className="p-3">
                          <input type="text" defaultValue={m.title} id={`title_${m.id}`} className="w-full border p-1 rounded mb-1" placeholder="Title (Optional)" />
                          <textarea defaultValue={m.description} id={`desc_${m.id}`} className="w-full border p-1 rounded h-16" placeholder="Description"></textarea>
                        </td>
                        <td className="p-3 text-right">
                          <button type="button" onClick={() => {
                            handleUpdateMilestone(m.id, {
                              order: (document.getElementById(`order_${m.id}`) as HTMLInputElement).value,
                              year: (document.getElementById(`year_${m.id}`) as HTMLInputElement).value,
                              title: (document.getElementById(`title_${m.id}`) as HTMLInputElement).value,
                              description: (document.getElementById(`desc_${m.id}`) as HTMLTextAreaElement).value,
                            });
                          }} className="text-green-600 hover:underline mr-3 text-xs font-bold">Save</button>
                          <button type="button" onClick={() => setEditingMilestoneId(null)} className="text-slate-500 hover:underline text-xs">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3 text-slate-500">{m.order}</td>
                        <td className="p-3 font-bold">{m.year}</td>
                        <td className="p-3">
                          {m.title && <div className="font-semibold text-slate-800 text-xs mb-1 uppercase tracking-wide">{m.title}</div>}
                          <div className="text-slate-600">{m.description}</div>
                        </td>
                        <td className="p-3 text-right flex items-center justify-end gap-2">
                          <button type="button" onClick={() => setEditingMilestoneId(m.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                          <button type="button" onClick={() => handleDeleteMilestone(m.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-y border-slate-200">
                <tr>
                  <td className="p-3"><input type="number" placeholder="0" className="w-full border p-1.5 py-2 rounded text-sm outline-none focus:border-blue-500" value={newMilestone.order} onChange={e => setNewMilestone({...newMilestone, order: Number(e.target.value)})} /></td>
                  <td className="p-3"><input type="text" placeholder="e.g. 2024" className="w-full border p-1.5 py-2 rounded text-sm outline-none focus:border-blue-500" value={newMilestone.year} onChange={e => setNewMilestone({...newMilestone, year: e.target.value})} /></td>
                  <td className="p-3">
                    <input type="text" placeholder="Title (Optional)" className="w-full border p-1.5 rounded text-sm outline-none focus:border-blue-500 mb-1" value={newMilestone.title} onChange={e => setNewMilestone({...newMilestone, title: e.target.value})} />
                    <textarea placeholder="Description" className="w-full border p-1.5 rounded text-sm outline-none focus:border-blue-500 h-10" value={newMilestone.description} onChange={e => setNewMilestone({...newMilestone, description: e.target.value})}></textarea>
                  </td>
                  <td className="p-3 text-right">
                    <button type="button" onClick={handleAddMilestone} className="inline-flex items-center gap-1 bg-slate-900 text-white px-3 py-2 rounded text-xs font-bold hover:bg-slate-800 transition-colors">
                      <Plus size={14}/> Add Row
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* SECTION 3: DESIGN SETTINGS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 3: DESIGN SETTINGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Show Timeline Style" field="show_timeline_style" type="checkbox" />
            <Field label="Show Year Highlight" field="show_year_highlight" type="checkbox" />
          </div>
        </div>

        {/* SECTION 4: CTA SECTION */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 4: CTA SECTION</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="CTA Title" field="cta_title" />
            <Field label="CTA Description" field="cta_description" type="textarea" />
            <Field label="Button Text" field="button_text" />
            <Field label="Button Link" field="button_link" />
          </div>
        </div>

        {/* SECTION 5: SEO SETTINGS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 5: SEO SETTINGS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Meta Title" field="meta_title" />
            <Field label="Meta Keywords" field="meta_keywords" placeholder="keyword1, keyword2, keyword3" />
          </div>
          <Field label="Meta Description" field="meta_description" type="textarea" placeholder="SEO Description (limit to 160 chars)" />
        </div>

        {/* SECTION 6: STATUS */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3">SECTION 6: STATUS</h2>
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
