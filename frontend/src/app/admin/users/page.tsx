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
  UserCheck,
  ShieldCheck,
  Zap,
  Globe,
  Settings,
  X,
  ChevronRight,
  Fingerprint,
  Activity,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';

const ROLES = [
  { id: 'SUPER_ADMIN', label: 'Super Admin', color: 'text-sun bg-sun/10 border-sun/20', icon: ShieldCheck },
  { id: 'PROGRAM_MANAGER', label: 'Program Manager', color: 'text-primary bg-primary/10 border-primary/20', icon: Zap },
  { id: 'RANKING_REVIEWER', label: 'Ranking Reviewer', color: 'text-water bg-water/10 border-water/20', icon: Globe },
  { id: 'CONTENT_EDITOR', label: 'Content Editor', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', icon: Award },
  { id: 'INSTITUTION_USER', label: 'Institution User', color: 'text-foreground/40 bg-foreground/5 border-foreground/10', icon: Users },
];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New User Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CONTENT_EDITOR'
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/users');
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsCreating(true);

    try {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      });
      setIsModalOpen(false);
      setNewUser({ name: '', email: '', password: '', role: 'CONTENT_EDITOR' });
      fetchUsers();
    } catch (error: any) {
      setFormError(error.message || 'Failed to create user');
    } finally {
      setIsCreating(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await apiFetch(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleActive = async (user: any) => {
    try {
      await apiFetch(`/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this user? This action cannot be undone.')) return;
    try {
      await apiFetch(`/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic">Syncing Member Directory...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-primary" />
            Personnel Directory
          </h1>
          <p className="text-foreground/60 mt-1 font-medium italic">Control platform security and assign administrative privileges.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 group"
        >
          <UserPlus size={20} className="group-hover:translate-x-1 transition-transform" />
          Enlist Member
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or institutional email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-xl border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold shadow-sm placeholder:text-foreground/20"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-primary/10 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-foreground/40 text-[11px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Member Identity</th>
                <th className="px-8 py-6">Security Role</th>
                <th className="px-8 py-6">Access Status</th>
                <th className="px-8 py-6">Enrollment</th>
                <th className="px-8 py-6 text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredUsers.map((user) => {
                const roleData = ROLES.find(r => r.id === user.role) || ROLES[4];
                const RoleIcon = roleData.icon;
                
                return (
                  <tr key={user.id} className="group hover:bg-primary/5 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-primary/10 border border-primary/10 group-hover:scale-105 transition-transform">
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                              alt="Avatar" 
                            />
                          </div>
                          {user.isActive && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-white animate-pulse" />
                          )}
                        </div>
                        <div>
                          <p className="text-[15px] font-black text-foreground group-hover:text-primary transition-colors tracking-tight">{user.name}</p>
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-foreground/30 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="relative inline-block w-full max-w-[180px]">
                        <select 
                          value={user.role} 
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={cn(
                            "w-full border py-2 pl-3 pr-8 rounded-xl text-[10px] font-black uppercase tracking-widest appearance-none cursor-pointer focus:outline-none transition-all",
                            roleData.color
                          )}
                        >
                          {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                        </select>
                        <RoleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => toggleActive(user)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border shadow-sm",
                          user.isActive 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                            : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                        )}
                      >
                        {user.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {user.isActive ? 'Active' : 'Suspended'}
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-1 italic">Genesis</span>
                        <span className="text-sm font-bold text-foreground/60">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button 
                          className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/40 hover:text-primary transition-all border border-primary/10 shadow-sm"
                          title="Security Config"
                        >
                          <Lock className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/40 hover:text-red-600 transition-all border border-primary/10 shadow-sm hover:border-red-100"
                          title="Revoke Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-32 text-center">
            <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-primary/5">
              <Users className="w-12 h-12 text-primary/20" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Member Not Found</h3>
            <p className="text-foreground/40 font-medium max-w-xs mx-auto text-sm italic">"The power of a network is the diversity of its participants." - Invite a new member now.</p>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="px-10 py-6 bg-primary/5 flex items-center justify-between border-t border-primary/5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 italic">
            Secure Database: <span className="text-primary ml-2">{users.length} Records Verified</span>
          </p>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-white/60 border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground/20 cursor-not-allowed shadow-sm transition-all">Prev</button>
            <button className="px-6 py-2 bg-white/60 border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-all shadow-sm active:scale-95">Next</button>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-primary/10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            {/* Modal Header */}
            <div className="bg-primary/5 px-10 py-8 border-b border-primary/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-foreground tracking-tighter flex items-center gap-3">
                  <UserPlus className="w-6 h-6 text-primary" />
                  Enlist Member
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-1 italic">Initiate new personnel access protocol.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-3 hover:bg-primary/5 rounded-2xl text-foreground/20 hover:text-primary transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-10 space-y-8">
              {formError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-shake">
                  <AlertCircle size={20} />
                  <p className="text-xs font-bold">{formError}</p>
                </div>
              )}
              
              <div className="grid gap-8">
                {/* Name */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                    <Fingerprint size={12} />
                    Full Legal Identity
                  </label>
                  <input 
                    required
                    type="text" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
                    placeholder="e.g. Dr. Sarah Jenkins"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                    <Mail size={12} />
                    Institutional Email
                  </label>
                  <input 
                    required
                    type="email" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
                    placeholder="sarah@institution.edu"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                    <Lock size={12} />
                    Temporary Access Key
                  </label>
                  <input 
                    required
                    type="password" 
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>

                {/* Role */}
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                    <Shield size={12} />
                    Security Clearance
                  </label>
                  <div className="relative">
                    <select 
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-black uppercase tracking-widest appearance-none cursor-pointer"
                    >
                      {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                    </select>
                    <ChevronRight size={18} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-foreground/20 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-foreground/60 transition-all active:scale-95"
                >
                  Abort
                </button>
                <button 
                  type="submit"
                  disabled={isCreating}
                  className="flex-[2] px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 group"
                >
                  {isCreating ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Finalise Enlistment
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}