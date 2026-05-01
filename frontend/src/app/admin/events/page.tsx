'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Building, 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  XCircle, 
  CheckCircle2,
  Clock,
  Filter,
  MoreVertical,
  CalendarDays,
  Map,
  ArrowRight,
  Activity
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

type Event = {
  id: string;
  title: string;
  startDate: string;
  location?: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  institution?: { name: string };
  createdAt: string;
};

export default function EventsPage() {
  const [data, setData] = useState<{ data: Event[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFetch('/events');
      setData(result);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await apiFetch(`/events/${id}`, {
        method: 'DELETE',
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleCancel(event: Event) {
    const newStatus = event.status === 'CANCELLED' ? 'UPCOMING' : 'CANCELLED';
    try {
      await apiFetch(`/events/${event.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredEvents = data?.data?.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location?.toLowerCase().includes(search.toLowerCase()) ||
    event.institution?.name?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic">Syncing Global Events...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-3">
            <CalendarDays className="w-10 h-10 text-primary" />
            Events Management
          </h1>
          <p className="text-foreground/60 mt-1 font-medium italic">Orchestrating global sustainability summits and institutional gatherings.</p>
        </div>
        <Link 
          href="/admin/events/create"
          className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Schedule Event
        </Link>
      </div>

      {/* Analytics/Summary Cards (Visual only) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming', count: filteredEvents.filter(e => e.status === 'UPCOMING').length, icon: Clock, color: 'text-primary' },
          { label: 'Ongoing', count: filteredEvents.filter(e => e.status === 'ONGOING').length, icon: Activity, color: 'text-emerald-500' },
          { label: 'Completed', count: filteredEvents.filter(e => e.status === 'COMPLETED').length, icon: CheckCircle2, color: 'text-foreground/40' },
          { label: 'Cancelled', count: filteredEvents.filter(e => e.status === 'CANCELLED').length, icon: XCircle, color: 'text-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-md border border-primary/5 p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">{stat.label}</p>
              <h4 className={cn("text-xl font-black mt-1", stat.color)}>{stat.count}</h4>
            </div>
            <stat.icon className={cn("w-5 h-5 opacity-20", stat.color)} />
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
          <input 
            type="text"
            placeholder="Search by title, location or institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-xl border border-primary/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-medium text-sm shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-primary/10 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-foreground/40 text-[11px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Event Details</th>
                <th className="px-8 py-6">Schedule</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6">Host Entity</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredEvents.map((item) => (
                <tr key={item.id} className="group hover:bg-primary/5 transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-[15px] font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mt-1 italic">
                        ID: {item.id.slice(0, 8)}...
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground/60">
                      <Clock size={14} className="text-primary/40" />
                      {new Date(item.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground/60">
                      <MapPin size={14} className="text-water" />
                      {item.location || <span className="italic opacity-40">Virtual Session</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground/60">
                      <Building size={14} className="text-sun" />
                      {item.institution?.name || <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Global HQ</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border",
                      item.status === 'UPCOMING' && "bg-primary/5 text-primary border-primary/10",
                      item.status === 'ONGOING' && "bg-emerald-50 text-emerald-600 border-emerald-100 animate-pulse",
                      item.status === 'COMPLETED' && "bg-foreground/5 text-foreground/40 border-foreground/10 grayscale",
                      item.status === 'CANCELLED' && "bg-red-50 text-red-600 border-red-100 shadow-inner"
                    )}>
                      {item.status === 'UPCOMING' && <Clock size={10} />}
                      {item.status === 'ONGOING' && <Activity size={10} />}
                      {item.status === 'COMPLETED' && <CheckCircle2 size={10} />}
                      {item.status === 'CANCELLED' && <XCircle size={10} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => toggleCancel(item)}
                        title={item.status === 'CANCELLED' ? 'Restore Event' : 'Cancel Event'}
                        className={cn(
                          "p-3 rounded-xl transition-all border shadow-sm",
                          item.status === 'CANCELLED' 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                            : "bg-white/80 text-foreground/40 border-primary/10 hover:text-red-500 hover:border-red-100"
                        )}
                      >
                        {item.status === 'CANCELLED' ? <ArrowRight className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>
                      <Link 
                        href={`/admin/events/${item.id}`}
                        className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/40 hover:text-primary transition-all border border-primary/10 shadow-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/40 hover:text-red-600 transition-all border border-primary/10 shadow-sm hover:border-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-32 text-center">
                    <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-primary/5">
                      <Calendar className="w-10 h-10 text-primary/20" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">No Scheduled Events</h3>
                    <p className="text-foreground/40 font-medium max-w-xs mx-auto text-sm italic">"The best way to predict the future is to create it." - Schedule your first event now.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}