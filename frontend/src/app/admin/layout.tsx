'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  School, 
  Trophy, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Bell, 
  Search, 
  LogOut, 
  Menu, 
  X,
  PieChart,
  Globe,
  Settings,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', roles: ['ANY'] },
  { name: 'Analytics', icon: PieChart, href: '/admin/analytics', roles: ['SUPER_ADMIN', 'PROGRAM_MANAGER'] },
  { name: 'User Management', icon: Users, href: '/admin/users', roles: ['SUPER_ADMIN'] },
  { name: 'Institutions', icon: School, href: '/admin/institutions', roles: ['SUPER_ADMIN', 'PROGRAM_MANAGER', 'CONTENT_EDITOR'] },
  { name: 'Accreditations', icon: ShieldCheck, href: '/admin/accreditations', roles: ['ANY'] },
  { name: 'Rankings', icon: Trophy, href: '/admin/rankings', roles: ['ANY'] },
  { name: 'Events', icon: Calendar, href: '/admin/events', roles: ['ANY'] },
  { name: 'Publications', icon: Globe, href: '/admin/publications', roles: ['ANY'] },
  { name: 'Media Gallery', icon: Image, href: '/admin/media', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'] },
  { name: 'Communications', icon: Bell, href: '/admin/communications', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'] },
  { name: 'SEO & Meta', icon: Search, href: '/admin/seo', roles: ['SUPER_ADMIN', 'CONTENT_EDITOR'] },
  { name: 'Security Logs', icon: FileText, href: '/admin/security', roles: ['SUPER_ADMIN'] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Administrator');
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
        setUserName(payload.name || payload.email?.split('@')[0] || 'User');
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const filteredItems = SIDEBAR_ITEMS.filter(item => 
    item.roles.includes('ANY') || (userRole && item.roles.includes(userRole))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-emerald-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-50 shadow-sm",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight text-slate-800">
                GM PORTAL
              </span>
            )}
          </Link>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                  isActive 
                    ? "bg-emerald-50 text-emerald-700 font-semibold" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-600" : "group-hover:text-slate-700")} />
                {isSidebarOpen && <span className="text-[14px]">{item.name}</span>}
                {isActive && isSidebarOpen && <div className="ml-auto w-1.5 h-5 rounded-full bg-emerald-500" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        {/* Top Navbar */}
        <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700 leading-none mb-1">{userName}</p>
                <p className="text-[10px] text-emerald-600 uppercase tracking-wider font-bold">{userRole?.replace('_', ' ') || 'Authenticating...'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-100 p-0.5 border border-emerald-200">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}