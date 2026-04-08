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

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:4000/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Monitoring global sustainability education impact.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-600" />
            Last 30 Days
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-600/10 active:scale-95">
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
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            <MoreVertical className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Impact Analytics</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-8">Performance & Engagement</p>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#059669" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorStudents)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Partner Network</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-8">Distribution by Type</p>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {BAR_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">New Institutional Partners</h3>
          <button className="text-emerald-600 text-sm font-bold hover:text-emerald-700 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Institution Name</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">Verification</th>
                <th className="px-8 py-4 text-right">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.overview?.recentInstitutions?.map((inst: any) => (
                <tr key={inst.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shadow-sm">
                        {inst.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">{inst.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500 font-medium">{inst.type}</td>
                  <td className="px-8 py-4 text-sm text-slate-500 font-medium">{inst.country || 'Global'}</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-tight">
                      Verified
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-400 text-right font-medium">{new Date(inst.createdAt).toLocaleDateString()}</td>
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
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-600/5",
    blue: "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-600/5",
    teal: "bg-teal-50 text-teal-600 border-teal-100 shadow-teal-600/5",
    amber: "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-600/5",
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110", colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn("flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg tracking-tight", isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h4>
      </div>
    </div>
  );
}