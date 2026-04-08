'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  MoreHorizontal, 
  Shield, 
  UserPlus, 
  Search, 
  Filter,
  Trash2,
  Lock,
  CheckCircle2,
  XCircle,
  Mail,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ROLES = [
  { id: 'SUPER_ADMIN', label: 'Super Admin', color: 'text-purple-600 bg-purple-50' },
  { id: 'PROGRAM_MANAGER', label: 'Program Manager', color: 'text-blue-600 bg-blue-50' },
  { id: 'RANKING_REVIEWER', label: 'Ranking Reviewer', color: 'text-amber-600 bg-amber-50' },
  { id: 'CONTENT_EDITOR', label: 'Content Editor', color: 'text-emerald-600 bg-emerald-50' },
  { id: 'INSTITUTION_USER', label: 'Institution User', color: 'text-slate-600 bg-slate-50' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:4000/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(Array.isArray(res) ? res : []);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://127.0.0.1:4000/users/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) fetchUsers();
  };

  const toggleActive = async (user: any) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://127.0.0.1:4000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ isActive: !user.isActive }),
    });
    if (res.ok) fetchUsers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this user? This action cannot be undone.')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://127.0.0.1:4000/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchUsers();
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <UserCheck className="w-7 h-7 text-emerald-600" />
            User Management
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Control system access and assign administrative roles.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-600/10 active:scale-95">
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all text-slate-700 shadow-sm placeholder:text-slate-400"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Full Profile</th>
                <th className="px-8 py-5">Access Permission</th>
                <th className="px-8 py-5">Current Status</th>
                <th className="px-8 py-5">Registration</th>
                <th className="px-8 py-5 text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/30 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                          className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" 
                          alt="Avatar" 
                        />
                        {user.isActive && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{user.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="relative inline-block w-full max-w-[160px]">
                      <select 
                        value={user.role} 
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 cursor-pointer hover:border-emerald-500/30 transition-all appearance-none uppercase tracking-tight"
                      >
                        {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <MoreHorizontal className="w-3 h-3" />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <button 
                      onClick={() => toggleActive(user)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all",
                        user.isActive 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100" 
                          : "bg-red-50 text-red-700 border border-red-100 hover:bg-red-100"
                      )}
                    >
                      {user.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {user.isActive ? 'Active' : 'Suspended'}
                    </button>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Joined On</p>
                    <p className="text-sm text-slate-600 font-bold tracking-tight">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                      <button 
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-slate-100"
                        title="Edit Permissions"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2.5 bg-red-50 hover:bg-red-100 rounded-xl text-red-400 hover:text-red-600 transition-all border border-red-100"
                        title="Terminate Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-24 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No personnel records found</p>
          </div>
        )}

        <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
            Total Database Records: <span className="text-slate-900 ml-1">{users.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed shadow-sm">Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}