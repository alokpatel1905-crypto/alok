'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  School, 
  ArrowLeft, 
  Edit3, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Trophy, 
  FileText, 
  Download, 
  ExternalLink,
  ShieldCheck,
  User,
  Calendar,
  Building2,
  ChevronRight,
  Clock,
  Sparkles,
  Search,
  Activity,
  Zap
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function InstitutionProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch(`/institutions/${id}`);
        setData(res);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, router]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic tracking-tighter">Syncing Entity Profile...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto py-20 text-center space-y-6 bg-white/60 backdrop-blur-xl border border-red-100 rounded-[2.5rem] p-12">
      <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto border border-red-100">
        <XCircle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-black text-foreground tracking-tighter">Access Protocol Failed</h2>
      <p className="text-foreground/60 font-medium italic">"{error}"</p>
      <Link href="/admin/institutions" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} />
        Return to Network
      </Link>
    </div>
  );

  if (!data) return (
    <div className="text-center py-20 italic text-foreground/40">
      <School size={48} className="mx-auto mb-4 opacity-10" />
      Entity record not found in the global database.
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Link 
            href="/admin/institutions" 
            className="flex items-center gap-2 text-primary font-bold text-xs hover:translate-x-[-4px] transition-transform w-fit uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Back to Partners
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-tr from-primary/10 to-water/10 flex items-center justify-center text-primary font-black text-2xl shadow-premium border border-primary/5">
              {data.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-black text-foreground tracking-tighter leading-none">{data.name}</h1>
              <div className="flex items-center gap-3 text-foreground/40 text-[10px] font-black uppercase tracking-widest mt-2">
                <span className="bg-water/10 text-water px-2 py-0.5 rounded-lg border border-water/10">{data.type}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-primary/40" /> {data.city}, {data.country}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/institutions/edit/${id}`} 
            className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm group"
          >
            <Edit3 size={16} className="group-hover:rotate-12 transition-transform" />
            Modify Profile
          </Link>
          <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <ShieldCheck size={16} />
            Verify Entity
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Genesis Info */}
        <div className="space-y-8">
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-10 space-y-8 shadow-premium">
            <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
              <Sparkles className="text-sun" size={20} />
              <h2 className="text-xl font-black text-foreground tracking-tight">Genesis Info</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Institutional Email', value: data.email || 'None Provided', icon: Mail, color: 'text-primary' },
                { label: 'Direct Frequency', value: data.phone || 'None Provided', icon: Phone, color: 'text-water' },
                { label: 'Official Portal', value: data.website, icon: Globe, color: 'text-sun', isLink: true },
                { label: 'Location Hub', value: `${data.city || ''}, ${data.country || ''}`, icon: MapPin, color: 'text-foreground/20' },
                { label: 'Network Status', value: data.isActive ? 'OPERATIONAL' : 'OFFLINE', icon: Activity, color: data.isActive ? 'text-emerald-500' : 'text-red-500' },
              ].map((item, i) => (
                <div key={i} className="group">
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1.5 flex items-center gap-2">
                    <item.icon size={10} className={item.color} />
                    {item.label}
                  </p>
                  {item.isLink && data.website ? (
                    <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-primary flex items-center gap-1.5 hover:translate-x-1 transition-transform">
                      {data.website.replace('https://', '')}
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <p className="text-sm font-black text-foreground/70">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Account Management Sidebar Card */}
          <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground tracking-tight">Entity Lead</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Managed Account</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/60 rounded-2xl border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1">Primary Liaison</p>
                <p className="text-sm font-bold text-foreground/70">{data.managedBy?.name || 'Unassigned'}</p>
                <p className="text-xs font-medium text-foreground/40 mt-1 italic">{data.managedBy?.email || 'N/A'}</p>
              </div>
              <button className="w-full py-3 bg-white border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                Reassign Custody
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area: Strategic Tracking */}
        <div className="lg:col-span-2 space-y-8">
          {/* Accreditation Tracking */}
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
            <div className="p-10 border-b border-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-water/10 rounded-2xl flex items-center justify-center text-water shadow-sm">
                  <Award size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tighter">Accreditation Ledger</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Verified Academic Certifications</p>
                </div>
              </div>
              <button className="p-3 bg-primary/5 hover:bg-primary/10 rounded-xl text-primary transition-all">
                <Plus size={20} />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/5 text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-10 py-5">Certification</th>
                    <th className="px-10 py-5">Engagement</th>
                    <th className="px-10 py-5">Expiration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {data.accreditations?.map((acc: any) => (
                    <tr key={acc.id} className="group hover:bg-primary/5 transition-all">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-water/5 flex items-center justify-center text-water">
                            <ShieldCheck size={16} />
                          </div>
                          <span className="text-[14px] font-black text-foreground tracking-tight">{acc.title}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border",
                          acc.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          acc.status === 'PENDING' ? "bg-sun/10 text-sun border-sun/20" :
                          "bg-red-50 text-red-600 border-red-100"
                        )}>
                          {acc.status === 'APPROVED' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                          {acc.status}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground/40">
                          <Calendar size={12} className="text-primary/20" />
                          {acc.expiryDate ? new Date(acc.expiryDate).toLocaleDateString() : 'Continuous'}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!data.accreditations || data.accreditations.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-10 py-20 text-center text-foreground/20 italic text-sm">
                        No accreditation protocols recorded for this entity.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ranking Performance */}
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
            <div className="p-10 border-b border-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sun/10 rounded-2xl flex items-center justify-center text-sun shadow-sm">
                  <Trophy size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tighter">Global Performance</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Competitive Ranking History</p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/5 text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-10 py-5">Metric Category</th>
                    <th className="px-10 py-5">Global Rank</th>
                    <th className="px-10 py-5">Protocol Year</th>
                    <th className="px-10 py-5">Validated Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {data.rankings?.map((rank: any) => (
                    <tr key={rank.id} className="group hover:bg-primary/5 transition-all">
                      <td className="px-10 py-6">
                        <span className="text-[14px] font-black text-foreground tracking-tight">{rank.category}</span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 font-black text-sun">
                          <Award size={14} />
                          #{rank.rank}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-bold text-foreground/60">{rank.year}</td>
                      <td className="px-10 py-6">
                        <div className="inline-flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-lg text-xs font-black text-primary border border-primary/10">
                          <Zap size={10} />
                          {rank.score || '0.00'}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!data.rankings || data.rankings.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center text-foreground/20 italic text-sm">
                        No performance metrics validated for this entity.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Digital Artifacts (Documents) */}
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-10 space-y-8 shadow-premium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tighter">Digital Artifacts</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Secure Asset Repository</p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-white border border-primary/10 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm">
                Upload Asset
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.documents?.map((doc: any) => (
                <div key={doc.id} className="bg-primary/5 border border-primary/10 rounded-2xl p-6 group hover:bg-primary/10 transition-all cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download size={16} className="text-primary" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-black text-foreground tracking-tight truncate">{doc.title}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mt-1">{doc.category}</p>
                      <a 
                        href={doc.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest mt-4 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Secure Access
                        <ChevronRight size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              {(!data.documents || data.documents.length === 0) && (
                <div className="md:col-span-2 py-12 text-center text-foreground/20 italic text-sm border border-dashed border-primary/10 rounded-2xl">
                  Digital vault is empty. No artifacts uploaded for this entity.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Plus = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
);