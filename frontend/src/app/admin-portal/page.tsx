'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, School, GraduationCap, Users, ShieldCheck, 
  Trophy, Calendar, Globe, Newspaper, MessageSquare, Award, 
  BarChart3, Settings, LogOut, Bell, Search, Filter, 
  MoreVertical, Plus, Download, Eye, Edit, Trash2, 
  ChevronRight, Menu, X, Check, XCircle, Mail, Phone,
  MapPin, User, Lock, EyeOff, TrendingUp, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';

// --- CONSTANTS & MOCK DATA ---

const COLORS = ['#1a4d2e', '#4ade80', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa'];

const DASHBOARD_STATS = [
  { label: 'Total Green Schools', value: '2,000+', icon: School, color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Total Universities', value: '200+', icon: GraduationCap, color: 'bg-blue-50 text-blue-700' },
  { label: 'Total Teachers', value: '50,000+', icon: Users, color: 'bg-amber-50 text-amber-700' },
  { label: 'Countries Reached', value: '40+', icon: Globe, color: 'bg-purple-50 text-purple-700' },
];

const INITIAL_SCHOOLS = [
  { id: 1, name: 'Delhi Public School', country: 'India', city: 'New Delhi', principal: 'Dr. RK Sharma', email: 'principal@dps.edu.in', phone: '+91 11 2345 6789', level: 'Diamond', date: '2024-05-12', status: 'Active' },
  { id: 2, name: 'GEMS Modern Academy', country: 'UAE', city: 'Dubai', principal: 'Nargish Khambatta', email: 'principal@gems.ae', phone: '+971 4 321 0000', level: 'Gold', date: '2023-11-20', status: 'Active' },
  { id: 3, name: 'Brooklyn Technical High', country: 'USA', city: 'New York', principal: 'David Newman', email: 'dnewman@schools.nyc', phone: '+1 718 858 5150', level: 'Platinum', date: '2024-02-15', status: 'Active' },
  { id: 4, name: 'Eton College', country: 'UK', city: 'Windsor', principal: 'Simon Henderson', email: 'headmaster@etoncollege.org.uk', phone: '+44 1753 370100', level: 'Diamond', date: '2022-09-10', status: 'Expired' },
  { id: 5, name: 'Alliance High School', country: 'Kenya', city: 'Kikuyu', principal: 'William Mwangi', email: 'info@alliance.ac.ke', phone: '+254 20 2012141', level: 'Silver', date: '2024-01-05', status: 'Pending' },
  // ... more added in memory
];

const INITIAL_UNIVERSITIES = [
  { id: 1, name: 'IIT Bombay', country: 'India', type: 'Public', students: '12,000', date: '2024-03-10', status: 'Active' },
  { id: 2, name: 'NYU Tandon', country: 'USA', type: 'Private', students: '8,500', date: '2023-12-05', status: 'Active' },
  { id: 3, name: 'Zayed University', country: 'UAE', type: 'Public', students: '9,000', date: '2024-01-20', status: 'Active' },
];

const INITIAL_TEACHERS = [
  { id: 1, name: 'Ananya Iyer', country: 'India', school: 'DPS New Delhi', level: 'Master', date: '2024-06-01', status: 'Active' },
  { id: 2, name: 'John Doe', country: 'USA', school: 'Brooklyn Tech', level: 'Advanced', date: '2023-09-15', status: 'Active' },
];

const INITIAL_REQUESTS = [
  { id: 1, name: 'Global Academy', institution: 'Green Valley School', type: 'School', country: 'UK', date: '2024-05-20', status: 'Pending' },
  { id: 2, name: 'Sustainable University', institution: 'Eco-U', type: 'University', country: 'Canada', date: '2024-05-18', status: 'Approved' },
  { id: 3, name: 'Nature Primary', institution: 'Wildwood', type: 'School', country: 'Australia', date: '2024-05-15', status: 'Rejected' },
];

const INITIAL_RANKINGS = [
  { id: 1, rank: 1, name: 'IIT Delhi', country: 'India', score: 98.5, year: 2024, region: 'India' },
  { id: 2, rank: 2, name: 'BITS Pilani', country: 'India', score: 96.2, year: 2024, region: 'India' },
  { id: 3, rank: 1, name: 'Khalifa University', country: 'UAE', score: 97.8, year: 2024, region: 'UAE' },
];

const INITIAL_EVENTS = [
  { id: 1, name: 'NYC Green School Conference 2025', date: '2025-09-15', location: 'New York, USA', type: 'Conference', count: 450, status: 'Upcoming' },
  { id: 2, name: 'World Education Forum Davos', date: '2024-01-20', location: 'Davos, Switzerland', type: 'Forum', count: 200, status: 'Past' },
];

const INITIAL_CONTACTS = [
  { id: 1, name: 'Alok Patel', email: 'alok@example.com', org: 'Tech Schools', country: 'India', msg: 'Interested in accreditation for our 5 campuses.', date: '2024-05-21', status: 'New' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@global.org', org: 'Global Edu', country: 'USA', msg: 'Looking for partnership opportunities.', date: '2024-05-20', status: 'Read' },
];

const GROWTH_DATA = [
  { year: '2017', schools: 50, teachers: 1200 },
  { year: '2018', schools: 120, teachers: 3500 },
  { year: '2019', schools: 300, teachers: 8000 },
  { year: '2020', schools: 450, teachers: 12000 },
  { year: '2021', schools: 800, teachers: 20000 },
  { year: '2022', schools: 1200, teachers: 30000 },
  { year: '2023', schools: 1600, teachers: 42000 },
  { year: '2024', schools: 2000, teachers: 50000 },
  { year: '2025', schools: 2400, teachers: 62000 },
  { year: '2026', schools: 2900, teachers: 75000 },
];

const CONTINENT_DATA = [
  { name: 'Asia', value: 850 },
  { name: 'Africa', value: 450 },
  { name: 'Europe', value: 300 },
  { name: 'Americas', value: 350 },
  { name: 'Middle East', value: 150 },
];

// --- HELPER COMPONENTS ---

const Badge = ({ children, variant }: { children: React.ReactNode, variant: string }) => {
  const styles: any = {
    Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Expired: 'bg-slate-100 text-slate-700 border-slate-200',
    Rejected: 'bg-red-100 text-red-700 border-red-200',
    New: 'bg-blue-100 text-blue-700 border-blue-200',
    Read: 'bg-slate-50 text-slate-500 border-slate-100',
    Replied: 'bg-purple-100 text-purple-700 border-purple-200',
    Upcoming: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    Past: 'bg-slate-100 text-slate-500 border-slate-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${styles[variant] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-primary/5"
      >
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-bold text-primary tracking-tight">{title}</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-all text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto">{children}</div>
      </motion.div>
    </div>
  );
};

// --- MAIN PORTAL COMPONENT ---

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Login State
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Data State
  const [schools, setSchools] = useState(INITIAL_SCHOOLS);
  const [universities, setUniversities] = useState(INITIAL_UNIVERSITIES);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [rankings, setRankings] = useState(INITIAL_RANKINGS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEntity, setCurrentEntity] = useState<any>(null);

  useEffect(() => {
    const auth = localStorage.getItem('gm_auth');
    if (auth === 'true') setIsAuthenticated(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@greenmentors.com' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('gm_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('gm_auth');
    setActiveTab('Dashboard');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Schools', icon: School },
    { name: 'Universities', icon: GraduationCap },
    { name: 'Teachers', icon: Users },
    { name: 'Accreditation', icon: ShieldCheck },
    { name: 'Rankings', icon: Trophy },
    { name: 'Events', icon: Calendar },
    { name: 'Networks', icon: Globe },
    { name: 'Media', icon: Newspaper },
    { name: 'Inquiries', icon: MessageSquare },
    { name: 'Awards', icon: Award },
    { name: 'Reports', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
        <Globe className="text-secondary" size={64} />
      </motion.div>
    </div>
  );

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-3xl p-10 relative z-10 border border-primary/5"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl mb-6 rotate-6">
            <Globe size={40} />
          </div>
          <h1 className="text-3xl font-display font-black tracking-tighter text-primary italic leading-none">GREEN <span className="text-secondary">MENTORS</span></h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Administrative Node</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {loginError && <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-3 animate-pulse">
            <XCircle size={16} /> {loginError}
          </div>}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Secure Email</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" 
                placeholder="admin@greenmentors.com"
                className="w-full bg-slate-50 border border-transparent focus:border-primary/20 rounded-2xl pl-16 pr-6 py-5 outline-none transition-all font-bold text-sm"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-transparent focus:border-primary/20 rounded-2xl pl-16 pr-16 py-5 outline-none transition-all font-bold text-sm"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary/95 text-white py-6 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
            Authorize Access
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Powered by Green Mentors Collective &copy; 2026</p>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f5] flex">
      {/* SIDEBAR */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="fixed h-screen z-50 bg-[#1a4d2e] text-white flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-8 flex items-center gap-4 border-b border-white/5 h-24 shrink-0">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <Globe className="text-primary" size={24} />
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col leading-none">
              <span className="font-display font-black text-xl tracking-tighter italic">GREEN</span>
              <span className="font-display font-black text-lg tracking-tighter italic text-secondary -mt-1">MENTORS</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-grow py-6 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-8 py-4 transition-all relative group ${activeTab === item.name ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              {activeTab === item.name && (
                <motion.div layoutId="activeNav" className="absolute left-0 w-1.5 h-8 bg-secondary rounded-r-full shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              )}
              <item.icon size={22} className={activeTab === item.name ? 'text-secondary' : 'group-hover:scale-110 transition-transform'} />
              {isSidebarOpen && <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-4 text-white/40 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-[11px] font-black uppercase tracking-[0.2em]">Logout Protocol</span>}
          </button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT AREA */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        {/* TOP NAVBAR */}
        <header className="h-24 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-primary/5 px-10 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center hover:bg-primary/10 transition-all">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <span>Organization</span>
              <ChevronRight size={14} />
              <span className="text-primary">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative group cursor-pointer">
              <Bell size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary border-2 border-white rounded-full shadow-sm" />
            </div>
            <div className="h-10 w-px bg-slate-100" />
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-widest text-primary">Admin Node 01</p>
                <p className="text-[10px] font-bold text-slate-400">Chief Executive</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'Dashboard' && <DashboardModule />}
              {activeTab === 'Schools' && <EntityModule title="Green Schools" data={schools} setData={setSchools} type="School" />}
              {activeTab === 'Universities' && <EntityModule title="Green Universities" data={universities} setData={setUniversities} type="University" />}
              {activeTab === 'Teachers' && <TeacherModule data={teachers} setData={setTeachers} />}
              {activeTab === 'Accreditation' && <AccreditationModule data={requests} setData={setRequests} />}
              {activeTab === 'Rankings' && <RankingsModule data={rankings} setData={setRankings} />}
              {activeTab === 'Events' && <EventsModule data={events} setData={setEvents} />}
              {activeTab === 'Inquiries' && <InquiriesModule data={contacts} setData={setContacts} />}
              {activeTab === 'Reports' && <ReportsModule />}
              {activeTab === 'Settings' && <SettingsModule />}
              {['Networks', 'Media', 'Awards'].includes(activeTab) && <PlaceholderModule name={activeTab} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* GLOBAL MODALS */}
      <AnimatePresence>
        {modalOpen && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Manage ${activeTab.slice(0, -1)}`}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name / Title</label>
                  <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none font-bold text-sm" placeholder="e.g. Green Valley Academy" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</label>
                  <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none font-bold text-sm" placeholder="e.g. London, UK" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                <textarea rows={4} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none font-bold text-sm resize-none" placeholder="Enter details..." />
              </div>
              <div className="pt-4 flex gap-4">
                <Button className="flex-grow bg-primary hover:bg-secondary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Save Changes</Button>
                <Button variant="outline" onClick={() => setModalOpen(false)} className="px-10 border-primary/10 rounded-2xl font-black uppercase tracking-widest text-xs">Cancel</Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-MODULES ---

function DashboardModule() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Command Overview.</h2>
          <p className="text-slate-400 font-bold italic mt-2">Real-time planetary impact analytics.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white rounded-2xl border border-primary/5 flex items-center gap-3 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Operations</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] border border-primary/5 shadow-premium flex flex-col gap-6 group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{stat.label}</p>
              <h4 className="text-3xl font-display font-black italic tracking-tighter text-primary leading-none">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-primary/5 shadow-premium space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-black italic tracking-tighter text-primary">Growth Trajectory</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Schools</span>
               </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorSchools" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a4d2e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1a4d2e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="schools" stroke="#1a4d2e" strokeWidth={4} fillOpacity={1} fill="url(#colorSchools)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-primary/5 shadow-premium flex flex-col justify-between">
           <h3 className="text-xl font-display font-black italic tracking-tighter text-primary">Global Distro</h3>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={CONTINENT_DATA} innerRadius={60} outerRadius={90} paddingAngle={10} dataKey="value">
                   {CONTINENT_DATA.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="space-y-4">
             {CONTINENT_DATA.map((item, i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.name}</span>
                 </div>
                 <span className="text-xs font-black italic text-primary">{item.value}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Activity Tables */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-premium overflow-hidden">
          <div className="p-8 border-b border-primary/5 flex items-center justify-between">
             <h4 className="text-lg font-display font-black italic tracking-tighter">Recent Requests</h4>
             <button className="text-[10px] font-black uppercase tracking-widest text-secondary">View Hub</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-4">Institution</th>
                  <th className="px-8 py-4">Country</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {INITIAL_REQUESTS.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4">
                       <div className="font-bold text-sm text-primary">{req.institution}</div>
                       <div className="text-[10px] font-bold text-slate-400">{req.type}</div>
                    </td>
                    <td className="px-8 py-4 text-xs font-bold text-slate-500">{req.country}</td>
                    <td className="px-8 py-4"><Badge variant={req.status}>{req.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-premium p-8 space-y-8">
          <h4 className="text-lg font-display font-black italic tracking-tighter">Strategic Roadmap</h4>
          <div className="space-y-6">
            {INITIAL_EVENTS.map((ev) => (
              <div key={ev.id} className="flex gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all">
                  <div className="text-xl font-black italic leading-none">{ev.date.split('-')[2]}</div>
                  <div className="text-[8px] font-black uppercase tracking-widest opacity-40">Sept</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-primary group-hover:text-secondary transition-colors italic">{ev.name}</div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <MapPin size={12} /> {ev.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EntityModule({ title, data, type }: any) {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">{title}.</h2>
          <p className="text-slate-400 font-bold italic mt-2">Managing global {type.toLowerCase()} nodes.</p>
        </div>
        <div className="flex gap-4">
          <Button className="bg-white hover:bg-slate-50 text-primary border-primary/5 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest">Export CSV <Download size={14} className="ml-2" /></Button>
          <Button className="bg-primary hover:bg-secondary text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20">Add {type} <Plus size={16} className="ml-2" /></Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-premium space-y-6">
         <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input className="w-full bg-[#f9f9f9] border-none rounded-2xl pl-16 pr-6 py-4 outline-none font-bold text-sm" placeholder="Search by name, country, or principal..." />
            </div>
            <div className="flex gap-4">
               <div className="px-6 py-4 bg-[#f9f9f9] rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all">
                  <Filter size={16} className="text-slate-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Filters</span>
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-8 py-4">Entity Details</th>
                    <th className="px-8 py-4">Regional Data</th>
                    <th className="px-8 py-4">Personnel</th>
                    <th className="px-8 py-4">Protocol Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-primary/5">
                  {data.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                {type === 'School' ? <School size={20} /> : <GraduationCap size={20} />}
                             </div>
                             <div>
                                <div className="font-bold text-primary italic leading-none mb-1">{item.name}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{type === 'School' ? item.level : item.type} Portal</div>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="text-sm font-bold text-slate-500 italic">{item.country}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">{item.city || 'Global'}</div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="text-sm font-bold text-primary">{item.principal || 'Registrar'}</div>
                          <div className="text-[10px] font-bold text-slate-400">{item.email}</div>
                       </td>
                       <td className="px-8 py-6">
                          <Badge variant={item.status}>{item.status}</Badge>
                          <div className="text-[8px] font-black uppercase tracking-widest text-slate-300 mt-1">Ref: 2024-GM-{item.id}</div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"><Eye size={16} /></button>
                             <button className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100"><Edit size={16} /></button>
                             <button className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"><Trash2 size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function TeacherModule({ data }: any) {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Green Teachers.</h2>
          <p className="text-slate-400 font-bold italic mt-2">Certified sustainability educators network.</p>
        </div>
        <Button className="bg-primary hover:bg-secondary text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20">Certify Teacher <Plus size={16} className="ml-2" /></Button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-premium overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-8 py-4">Educator</th>
                <th className="px-8 py-4">Institution</th>
                <th className="px-8 py-4">Certification</th>
                <th className="px-8 py-4">Date Verified</th>
                <th className="px-8 py-4">Status</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-primary/5">
              {data.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-black italic">{item.name.charAt(0)}</div>
                       <div>
                          <div className="font-bold text-primary italic leading-none">{item.name}</div>
                          <div className="text-[10px] font-bold text-slate-400">{item.country}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500 italic">{item.school}</td>
                  <td className="px-8 py-6">
                     <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-white px-3 py-1 rounded-lg italic">{item.level} Level</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-400">{item.date}</td>
                  <td className="px-8 py-6"><Badge variant={item.status}>{item.status}</Badge></td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}

function AccreditationModule({ data }: any) {
  return (
    <div className="space-y-10">
       <div>
          <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Accreditation Hub.</h2>
          <p className="text-slate-400 font-bold italic mt-2">Managing institutional verification protocols.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Pending Review', 'Awaiting Audit', 'Decision Node'].map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-primary/5 shadow-premium flex flex-col items-center gap-4 group hover:bg-primary transition-all duration-500">
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/40">{cat}</div>
               <div className="text-4xl font-display font-black italic text-primary group-hover:text-white">{Math.floor(Math.random() * 20) + 5}</div>
            </div>
          ))}
       </div>

       <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-premium overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-4">Applicant</th>
                  <th className="px-8 py-4">Institution Info</th>
                  <th className="px-8 py-4">Protocol Date</th>
                  <th className="px-8 py-4">Current Status</th>
                  <th className="px-8 py-4 text-right">Authorization</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-primary/5">
                {data.map((req: any) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                       <div className="font-bold text-primary italic leading-none">{req.name}</div>
                       <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">Auth Signature Required</div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="text-sm font-bold text-slate-500 italic">{req.institution}</div>
                       <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">{req.type} // {req.country}</div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-400">{req.date}</td>
                    <td className="px-8 py-6"><Badge variant={req.status}>{req.status}</Badge></td>
                    <td className="px-8 py-6">
                       <div className="flex justify-end gap-3">
                          <button className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"><Check size={18} /></button>
                          <button className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"><X size={18} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

function RankingsModule({ data }: any) {
  const [activeTab, setActiveTab] = useState('India');
  const filteredData = useMemo(() => data.filter((r: any) => r.region === activeTab), [data, activeTab]);

  return (
    <div className="space-y-10">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Global Rankings.</h2>
            <p className="text-slate-400 font-bold italic mt-2">Verified sustainability performance matrix.</p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest">Update Scores <Plus size={16} className="ml-2" /></Button>
       </div>

       <div className="bg-white rounded-[3rem] p-4 border border-primary/5 shadow-premium flex gap-2">
          {['India', 'UAE', 'USA'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`flex-grow py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              {tab} Registry
            </button>
          ))}
       </div>

       <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-premium overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-4">Global Rank</th>
                  <th className="px-8 py-4">Institution Name</th>
                  <th className="px-8 py-4">Country</th>
                  <th className="px-8 py-4">Resilience Score</th>
                  <th className="px-8 py-4 text-right">Verification Year</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-primary/5">
                {filteredData.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                       <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center font-black italic text-primary group-hover:bg-secondary group-hover:text-primary transition-all">#{item.rank}</div>
                    </td>
                    <td className="px-8 py-6 font-bold text-primary italic">{item.name}</td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-400">{item.country}</td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className="flex-grow bg-slate-100 h-2 rounded-full overflow-hidden max-w-[100px]">
                             <div className="h-full bg-secondary" style={{ width: `${item.score}%` }} />
                          </div>
                          <span className="text-sm font-black italic text-primary">{item.score}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-slate-400">{item.year}</td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

function EventsModule({ data }: any) {
  const [filter, setFilter] = useState('Upcoming');

  return (
    <div className="space-y-10">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Strategic Summits.</h2>
            <p className="text-slate-400 font-bold italic mt-2">Managing the world's leading green education events.</p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Deploy New Summit <Plus size={16} className="ml-2" /></Button>
       </div>

       <div className="flex gap-4 border-b border-primary/5 pb-4">
          {['Upcoming', 'Past'].map((t) => (
            <button 
              key={t}
              onClick={() => setFilter(t)}
              className={`px-8 py-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${filter === t ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
            >
              {t} Summits
              {filter === t && <motion.div layoutId="eventTab" className="absolute bottom-0 left-8 right-8 h-1 bg-secondary rounded-full" />}
            </button>
          ))}
       </div>

       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.filter((e: any) => e.status === filter).map((ev: any) => (
            <motion.div 
              key={ev.id} layout
              className="bg-white rounded-[3rem] border border-primary/5 shadow-premium overflow-hidden group hover:-translate-y-2 transition-all duration-500"
            >
               <div className="h-48 relative overflow-hidden">
                  <img src={ev.image || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80'} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                  <div className="absolute top-6 right-6">
                     <Badge variant={ev.status}>{ev.status}</Badge>
                  </div>
               </div>
               <div className="p-8 space-y-6">
                  <div className="space-y-2">
                     <div className="text-[10px] font-black uppercase tracking-widest text-secondary italic">{ev.type} // Node GM-2025</div>
                     <h3 className="text-xl font-display font-black italic tracking-tighter text-primary leading-tight group-hover:text-secondary transition-colors">{ev.name}</h3>
                  </div>
                  <div className="space-y-3">
                     <div className="flex items-center gap-3 text-xs font-bold text-slate-400 italic">
                        <Calendar size={14} className="text-primary" /> {ev.date}
                     </div>
                     <div className="flex items-center gap-3 text-xs font-bold text-slate-400 italic">
                        <MapPin size={14} className="text-primary" /> {ev.location}
                     </div>
                     <div className="flex items-center gap-3 text-xs font-bold text-slate-400 italic">
                        <Users size={14} className="text-primary" /> {ev.count} Registered
                     </div>
                  </div>
                  <div className="pt-4 flex gap-3">
                     <button className="flex-grow py-4 bg-slate-50 hover:bg-primary hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest">Protocol Stats</button>
                     <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary/10 text-primary hover:bg-secondary transition-all"><Edit size={16} /></button>
                  </div>
               </div>
            </motion.div>
          ))}
       </div>
    </div>
  );
}

function InquiriesModule({ data }: any) {
  return (
    <div className="space-y-10">
       <div>
          <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Global Pulse.</h2>
          <p className="text-slate-400 font-bold italic mt-2">Managing global contact inquiries and strategic leads.</p>
       </div>

       <div className="bg-white rounded-[2.5rem] border border-primary/5 shadow-premium overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-4">Sender Details</th>
                  <th className="px-8 py-4">Organization Node</th>
                  <th className="px-8 py-4">Message Insight</th>
                  <th className="px-8 py-4">Date Logged</th>
                  <th className="px-8 py-4 text-right">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-primary/5">
                {data.map((msg: any) => (
                  <tr key={msg.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                    <td className="px-8 py-6">
                       <div className="font-bold text-primary italic leading-none">{msg.name}</div>
                       <div className="text-[10px] font-bold text-slate-400">{msg.email}</div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="text-sm font-bold text-slate-500 italic leading-none mb-1">{msg.org}</div>
                       <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">{msg.country}</div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="text-sm font-medium text-slate-400 italic line-clamp-1 max-w-[200px]">{msg.msg}</div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-300">{msg.date}</td>
                    <td className="px-8 py-6 text-right"><Badge variant={msg.status}>{msg.status}</Badge></td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

function ReportsModule() {
  return (
    <div className="space-y-10">
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Intelligence.</h2>
            <p className="text-slate-400 font-bold italic mt-2">Deep-dive performance and impact analytics.</p>
          </div>
          <Button className="bg-primary hover:bg-secondary text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Export Intelligence Report <Download size={14} className="ml-2" /></Button>
       </div>

       <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-primary/5 shadow-premium space-y-8">
             <h3 className="text-xl font-display font-black italic tracking-tighter text-primary">Decadal Growth (2017-2026)</h3>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={GROWTH_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="schools" stroke="#1a4d2e" strokeWidth={4} dot={{ fill: '#4ade80', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-primary/5 shadow-premium space-y-8">
             <h3 className="text-xl font-display font-black italic tracking-tighter text-primary">Teachers Trained / Year</h3>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={GROWTH_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                      <Tooltip />
                      <Bar dataKey="teachers" fill="#1a4d2e" radius={[10, 10, 0, 0]} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-primary/5 shadow-premium flex flex-col items-center gap-6">
             <h3 className="text-lg font-display font-black italic tracking-tighter text-primary">Top 10 Reach</h3>
             <div className="w-full space-y-4">
                {['India', 'USA', 'UAE', 'Kenya', 'Canada'].map((c, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>{c}</span>
                        <span>{100 - i * 15}% Synergy</span>
                     </div>
                     <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${100 - i * 15}%` }} />
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-primary/5 shadow-premium flex flex-col justify-center items-center text-center space-y-6">
             <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary">
                <ShieldCheck size={40} />
             </div>
             <h3 className="text-3xl font-display font-black italic tracking-tighter text-primary">Intelligence Node Verified</h3>
             <p className="text-slate-400 font-bold italic max-w-md">All data points are synchronized across the global Green Mentors registry with 256-bit environment encryption.</p>
          </div>
       </div>
    </div>
  );
}

function SettingsModule() {
  return (
    <div className="space-y-12">
       <div>
          <h2 className="text-4xl font-display font-black tracking-tighter italic text-primary leading-none">Protocol Config.</h2>
          <p className="text-slate-400 font-bold italic mt-2">Managing global administrative parameters.</p>
       </div>

       <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
             <div className="p-10 bg-white rounded-[3rem] border border-primary/5 shadow-premium flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary relative group">
                   <User size={64} />
                   <div className="absolute inset-0 bg-primary/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-[2.5rem] cursor-pointer">
                      <Plus size={32} />
                   </div>
                </div>
                <div>
                   <h3 className="text-2xl font-display font-black italic tracking-tighter text-primary">Chief Executive</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Node ID: GM-001</p>
                </div>
                <Button className="w-full bg-primary hover:bg-secondary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Update Profile</Button>
             </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
             <div className="bg-white p-12 rounded-[3rem] border border-primary/5 shadow-premium space-y-10">
                <h3 className="text-2xl font-display font-black italic tracking-tighter text-primary border-b border-primary/5 pb-6">Access Security</h3>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Access</label>
                      <input className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 outline-none font-bold text-sm" defaultValue="admin@greenmentors.com" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Current Access Key</label>
                      <input className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 outline-none font-bold text-sm" type="password" defaultValue="admin123" />
                   </div>
                </div>
                <div className="pt-4">
                   <Button className="bg-primary hover:bg-secondary text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">Rotate Security Keys</Button>
                </div>
             </div>

             <div className="bg-white p-12 rounded-[3rem] border border-primary/5 shadow-premium space-y-10">
                <h3 className="text-2xl font-display font-black italic tracking-tighter text-primary border-b border-primary/5 pb-6">Node Environment</h3>
                <div className="space-y-6">
                   {[
                     { label: 'Real-time Sync', active: true },
                     { label: 'Notification Pulse', active: true },
                     { label: 'Satellite Backup', active: false },
                     { label: 'Encrypted Lead Logging', active: true },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl">
                        <span className="text-sm font-bold italic text-primary">{item.label}</span>
                        <div className={`w-14 h-8 rounded-full transition-all cursor-pointer flex items-center px-1 ${item.active ? 'bg-secondary' : 'bg-slate-200'}`}>
                           <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

function PlaceholderModule({ name }: { name: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 bg-white rounded-[4rem] border border-primary/5 shadow-premium p-20">
       <div className="w-32 h-32 bg-primary/5 rounded-[3rem] flex items-center justify-center text-primary animate-pulse">
          <Globe size={64} />
       </div>
       <div className="space-y-2">
          <h2 className="text-4xl font-display font-black italic tracking-tighter text-primary">{name} Module.</h2>
          <p className="text-slate-400 font-bold italic max-w-md">This high-fidelity intelligence module is currently being synchronized with the global Green Mentors core.</p>
       </div>
       <Button variant="outline" className="rounded-full border-primary/10 px-10 py-6 text-[10px] font-black uppercase tracking-widest">Return to Dashboard</Button>
    </div>
  );
}

const Button = ({ children, className, variant = 'primary', ...props }: any) => {
  const styles: any = {
    primary: 'bg-primary text-white hover:bg-primary/95',
    outline: 'border border-primary/20 text-primary hover:bg-slate-50',
    secondary: 'bg-secondary text-primary hover:bg-secondary/95',
  };
  return (
    <button className={`inline-flex items-center justify-center transition-all active:scale-[0.98] ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

import { cn } from '@/lib/utils';
