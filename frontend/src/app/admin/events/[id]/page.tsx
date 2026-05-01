'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Building, 
  Users, 
  Mic2, 
  Info, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  UserPlus,
  Mail,
  Phone,
  Settings,
  Activity,
  AlertCircle,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'speakers' | 'registrations'>('details');

  const fetchEvent = async () => {
    try {
      const res = await apiFetch(`/events/${id}`);
      setData(res);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') {
        router.push('/login');
        return;
      }
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const updateRegStatus = async (regId: string, status: string) => {
    try {
      await apiFetch(`/events/registrations/${regId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      fetchEvent();
    } catch (err) {
      console.error(err);
    }
  };

  const removeSpeaker = async (speakerId: string) => {
    if (!confirm('Remove this speaker?')) return;
    try {
      await apiFetch(`/events/speakers/${speakerId}`, {
        method: 'DELETE',
      });
      fetchEvent();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Opening Event Archives...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6">
      <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto border border-red-100">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-black text-foreground tracking-tighter">Access Denied</h2>
      <p className="text-foreground/60 font-medium">{error}</p>
      <Link href="/admin/events" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
        <ArrowLeft size={14} />
        Return to Timeline
      </Link>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Link 
            href="/admin/events" 
            className="flex items-center gap-2 text-primary font-bold text-xs hover:translate-x-[-4px] transition-transform w-fit uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Back to Timeline
          </Link>
          <h1 className="text-4xl font-black text-foreground tracking-tighter leading-none">{data.title}</h1>
          <div className="flex items-center gap-4 text-foreground/40 text-xs font-black uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {new Date(data.startDate).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-water" /> {data.location || 'Global Virtual'}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-primary/10 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm">
            <Edit3 size={16} />
            Edit Profile
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Settings size={16} />
            Configure
          </button>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex items-center gap-2 p-1 bg-primary/5 rounded-2xl border border-primary/10 w-fit">
        {[
          { id: 'details', label: 'Overview', icon: Info },
          { id: 'speakers', label: `Speakers (${data.speakers?.length || 0})`, icon: Mic2 },
          { id: 'registrations', label: `Attendees (${data.registrations?.length || 0})`, icon: Users },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab.id ? "bg-white text-primary shadow-sm" : "text-foreground/40 hover:text-primary"
            )}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-10 space-y-6">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <FileText size={20} />
                </div>
                <h2 className="text-xl font-black text-foreground tracking-tight">Event Synopsis</h2>
              </div>
              <p className="text-foreground/70 font-medium leading-relaxed italic">
                {data.description || 'Our team is still perfecting the narrative for this summit. Check back soon for the full vision.'}
              </p>
            </div>

            {/* Agenda Section */}
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-10 space-y-6">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <div className="w-10 h-10 bg-sun/10 rounded-xl flex items-center justify-center text-sun">
                  <Activity size={20} />
                </div>
                <h2 className="text-xl font-black text-foreground tracking-tight">Strategic Agenda</h2>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/5">
                <pre className="text-foreground/60 text-sm font-medium whitespace-pre-wrap font-sans leading-relaxed">
                  {data.agenda || 'The operational roadmap for this summit is currently being finalized by the organizing committee.'}
                </pre>
              </div>
            </div>
          </div>

          {/* Logistics Sidebar */}
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-8 space-y-8 shadow-premium">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <div className="w-10 h-10 bg-water/10 rounded-xl flex items-center justify-center text-water">
                  <Settings size={20} />
                </div>
                <h2 className="text-xl font-black text-foreground tracking-tight">Logistics</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Commencement', value: new Date(data.startDate).toLocaleString(), icon: Clock, color: 'text-primary' },
                  { label: 'Conclusion', value: data.endDate ? new Date(data.endDate).toLocaleString() : 'Open Ended', icon: Clock, color: 'text-foreground/30' },
                  { label: 'Primary Venue', value: data.location || 'Digital Hub', icon: MapPin, color: 'text-water' },
                  { label: 'Host Entity', value: data.institution?.name || 'Green Mentors Global', icon: Building, color: 'text-sun' },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1.5 flex items-center gap-2">
                      <item.icon size={10} className={item.color} />
                      {item.label}
                    </p>
                    <p className="text-sm font-black text-foreground/70 group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                ))}

                <div className="pt-4">
                  <div className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                    data.status === 'UPCOMING' && "bg-primary/5 text-primary border-primary/10",
                    data.status === 'ONGOING' && "bg-emerald-50 text-emerald-600 border-emerald-100",
                    data.status === 'COMPLETED' && "bg-foreground/5 text-foreground/30 border-foreground/10 grayscale",
                    data.status === 'CANCELLED' && "bg-red-50 text-red-600 border-red-100"
                  )}>
                    <Activity size={12} className={data.status === 'ONGOING' ? 'animate-pulse' : ''} />
                    Current Status: {data.status}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats Sidebar Item */}
            <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-all">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Registration Pulse</p>
                <h4 className="text-3xl font-black text-foreground tracking-tighter">{data.registrations?.length || 0}</h4>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'speakers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
          {data.speakers?.map((s: any) => (
            <div key={s.id} className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-3xl p-8 text-center group hover:shadow-premium transition-all">
              <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-primary/5 relative">
                <Mic2 className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm text-sun border border-primary/5">
                  <Sparkles size={12} />
                </div>
              </div>
              <h3 className="text-lg font-black text-foreground tracking-tight">{s.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-1 mb-6">{s.role || 'Guest Visionary'}</p>
              
              <div className="flex items-center justify-center gap-2">
                <button className="flex-1 px-4 py-2 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Profile
                </button>
                <button 
                  onClick={() => removeSpeaker(s.id)}
                  className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </div>
          ))}
          <button className="bg-white/40 backdrop-blur-sm border border-primary/5 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-foreground/30 hover:text-primary hover:border-primary/20 hover:bg-white/60 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserPlus size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Enlist Speaker</span>
          </button>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary/5 text-foreground/40 text-[11px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">Attendee</th>
                  <th className="px-8 py-6">Credentials</th>
                  <th className="px-8 py-6">Engagement Status</th>
                  <th className="px-8 py-6">Enrolled On</th>
                  <th className="px-8 py-6 text-right">Administrative</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {data.registrations?.map((r: any) => (
                  <tr key={r.id} className="group hover:bg-primary/5 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary/40 font-bold text-xs uppercase">
                          {r.name?.charAt(0)}
                        </div>
                        <span className="text-[15px] font-black text-foreground">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-foreground/60 flex items-center gap-2"><Mail size={12} className="text-primary/30" /> {r.email}</span>
                        {r.phone && <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 flex items-center gap-2"><Phone size={10} className="text-water/30" /> {r.phone}</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border",
                        r.status === 'CONFIRMED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                        r.status === 'PENDING' ? "bg-sun/10 text-sun border-sun/20" :
                        "bg-foreground/5 text-foreground/30 border-foreground/10"
                      )}>
                        {r.status === 'CONFIRMED' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                        {r.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-foreground/40">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select 
                          value={r.status} 
                          onChange={(e) => updateRegStatus(r.id, e.target.value)}
                          className="bg-white border border-primary/10 text-[10px] font-black uppercase tracking-widest py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all cursor-pointer"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirm</option>
                          <option value="ATTENDED">Attended</option>
                          <option value="CANCELLED">Cancel</option>
                        </select>
                        <button className="p-2 text-foreground/20 hover:text-primary transition-colors">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {data.registrations?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-32 text-center">
                      <div className="w-16 h-16 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                        <Users className="w-8 h-8 text-primary/20" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">No Active Registrations</h3>
                      <p className="text-foreground/40 font-medium text-sm italic">The enrollment phase is currently awaiting initial participants.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}