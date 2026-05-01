'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  School, 
  BookOpen, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

const CHART_DATA = [
  { name: 'Jan', students: 4000, revenue: 2400 },
  { name: 'Feb', students: 3000, revenue: 1398 },
  { name: 'Mar', students: 2000, revenue: 9800 },
  { name: 'Apr', students: 2780, revenue: 3908 },
  { name: 'May', students: 1890, revenue: 4800 },
  { name: 'Jun', students: 2390, revenue: 3800 },
  { name: 'Jul', students: 3490, revenue: 4300 },
];

const BAR_DATA = [
  { name: 'Schools', value: 45 },
  { name: 'Colleges', value: 32 },
  { name: 'Universities', value: 18 },
  { name: 'Organizations', value: 24 },
];

import { apiFetch } from '@/lib/api';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/admin/dashboard')
      .then((res) => {
        setData(res.stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
          <p className="text-foreground/60 mt-1 text-sm font-medium">Monitoring global sustainability education impact.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-primary/10 px-4 py-2 rounded-xl text-sm font-semibold text-foreground/80 shadow-sm">
            <Calendar className="w-4 h-4 text-primary" />
            Last 30 Days
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/10 active:scale-95">
            Download Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={data?.overview?.totalUsers || '12,482'} 
          trend="+12.5%" 
          isUp={true} 
          icon={Users}
          color="emerald"
        />
        <StatCard 
          title="Active Courses" 
          value={data?.programs?.published || '84'} 
          trend="+4.2%" 
          isUp={true} 
          icon={BookOpen}
          color="blue"
        />
        <StatCard 
          title="Institutions" 
          value={data?.overview?.totalInstitutions || '156'} 
          trend="-1.8%" 
          isUp={false} 
          icon={School}
          color="teal"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${(data?.analytics?.totalRevenue || 0).toLocaleString()}`} 
          trend="+8.1%" 
          isUp={true} 
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            <MoreVertical className="w-5 h-5 text-foreground/40 cursor-pointer hover:text-foreground/80 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">Impact Analytics</h3>
          <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-8">Performance & Engagement</p>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#064E3B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#064E3B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#064E3B10" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#0F172A60', fontSize: 12, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#0F172A60', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #064E3B10', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#064E3B" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorStudents)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 shadow-premium">
          <h3 className="text-lg font-bold text-foreground mb-1">Partner Network</h3>
          <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-8">Distribution by Type</p>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={BAR_DATA} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#0F172A60', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: '#064E3B05' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #064E3B10', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {BAR_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4ADE80' : '#0EA5E9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-premium overflow-hidden">
        <div className="p-6 border-b border-primary/5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">New Institutional Partners</h3>
          <button className="text-primary text-sm font-bold hover:text-primary/80 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-primary/5 text-foreground/60 text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Institution Name</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">Verification</th>
                <th className="px-8 py-4 text-right">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {data?.overview?.recentInstitutions?.map((inst: any) => (
                <tr key={inst.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shadow-sm">
                        {inst.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{inst.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-foreground/60 font-medium">{inst.type}</td>
                  <td className="px-8 py-4 text-sm text-foreground/60 font-medium">{inst.country || 'Global'}</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-flora/20 text-primary border border-flora/30 uppercase tracking-tight">
                      Verified
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-foreground/40 text-right font-medium">{new Date(inst.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isUp, icon: Icon, color }: any) {
  const colorMap: any = {
    emerald: "bg-primary/10 text-primary border-primary/20 shadow-premium",
    blue: "bg-water/10 text-water border-water/20 shadow-premium",
    teal: "bg-flora/20 text-primary border-flora/30 shadow-premium",
    amber: "bg-sun/10 text-sun border-sun/20 shadow-premium",
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-primary/10 p-6 rounded-2xl shadow-premium hover:shadow-3d hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110", colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn("flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg tracking-tight", isUp ? "bg-flora/20 text-primary" : "bg-red-50 text-red-600")}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-foreground/40 text-[11px] font-bold uppercase tracking-widest mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-foreground tracking-tight">{value}</h4>
      </div>
    </div>
  );
}