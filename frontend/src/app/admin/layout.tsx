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
  PieChart,
  Globe,
  Image,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';

const SIDEBAR_ITEMS: any[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', roles: ['ANY'] },
  { 
    name: 'Pages', 
    icon: FileText, 
    roles: ['ANY'],
    subItems: [
      { name: 'Home CMS', href: '/admin/home-cms' },
      { name: 'About CMS', href: '/admin/about-cms' },
      { name: 'Impact CMS', href: '/admin/impact-cms' },
      { name: 'Accreditation CMS', href: '/admin/accreditations-cms' },
      { name: 'Rankings CMS', href: '/admin/rankings-cms' },
      { name: 'Events CMS', href: '/admin/events-cms' },
      { name: 'Awards CMS', href: '/admin/awards-cms' },
      { name: 'Networks CMS', href: '/admin/networks-cms' },
      { name: 'Support CMS', href: '/admin/support-cms' },
      { name: 'Contact CMS', href: '/admin/contact-cms' },
      { name: 'Media CMS', href: '/admin/media-cms' },
      { name: 'Milestones CMS', href: '/admin/milestones-cms' },
      { name: 'All Dynamic Pages', href: '/admin/pages' },
    ]
  },
  { name: 'Analytics', icon: PieChart, href: '/admin/analytics', roles: ['ANY'] },
  { name: 'User Management', icon: Users, href: '/admin/users', roles: ['ANY'] },
  { name: 'Institutions', icon: School, href: '/admin/institutions', roles: ['ANY'] },
  { name: 'Accreditations', icon: ShieldCheck, href: '/admin/accreditations', roles: ['ANY'] },
  { name: 'Rankings', icon: Trophy, href: '/admin/rankings', roles: ['ANY'] },
  { name: 'Events', icon: Calendar, href: '/admin/events', roles: ['ANY'] },
  { name: 'Publications', icon: Globe, href: '/admin/publications', roles: ['ANY'] },
  { name: 'Media Gallery', icon: Image, href: '/admin/media', roles: ['ANY'] },
  { name: 'Communications', icon: Bell, href: '/admin/communications', roles: ['ANY'] },
  { name: 'SEO & Meta', icon: Search, href: '/admin/seo', roles: ['ANY'] },
  { name: 'Security Logs', icon: FileText, href: '/admin/security', roles: ['ANY'] },
  { name: 'Audit Submissions', icon: ClipboardList, href: '/admin/audit-submissions', roles: ['ANY'] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Administrator');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
        setUserName(payload.name || payload.email?.split('@')[0] || 'User');
        fetchNotifications();
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await apiFetch('/notifications');
      if (data) setNotifications(data.slice(0, 5));
    } catch (e) {
      // Fallback for demo if endpoint fails
      setNotifications([
        { id: 1, title: 'New Accreditation Request', time: '2 mins ago', type: 'alert' },
        { id: 2, title: 'System Update Completed', time: '1 hour ago', type: 'info' },
        { id: 3, title: 'New User Registered', time: '3 hours ago', type: 'user' }
      ]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const filteredItems = SIDEBAR_ITEMS.filter(item => 
    item.roles.includes('ANY') || (userRole && item.roles.includes(userRole))
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    filteredItems.forEach(item => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ name: item.name, href: item.href || '#', icon: item.icon });
      }
      if (item.subItems) {
        item.subItems.forEach((sub: any) => {
          if (sub.name.toLowerCase().includes(query.toLowerCase())) {
            results.push({ name: `${item.name} > ${sub.name}`, href: sub.href, icon: item.icon });
          }
        });
      }
    });
    setSearchResults(results.slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-[#f6faf5] text-foreground selection:bg-primary/10">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-full border-r border-primary/10 bg-white/95 shadow-sm backdrop-blur-xl transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center gap-3 p-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <span className="text-lg font-bold tracking-normal text-foreground">
                GM PORTAL
              </span>
            )}
          </Link>
        </div>

        <nav className="mt-3 space-y-1 overflow-y-auto px-3 pb-24">
          {filteredItems.map((item) => {
            if (item.subItems) {
              const isSubActive = item.subItems.some((sub: any) => pathname.startsWith(sub.href));
              return (
                <details key={item.name} open={isSubActive || undefined} className="group">
                  <summary className={cn("flex cursor-pointer list-none items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                      isSubActive ? "bg-primary/5 text-primary font-semibold" : "text-foreground/60 hover:bg-primary/5 hover:text-foreground")}>
                    <item.icon className={cn("w-5 h-5", isSubActive ? "text-primary" : "group-hover:text-primary/70")} />
                    {isSidebarOpen && <span className="text-[14px] flex-1">{item.name}</span>}
                    {isSidebarOpen && (
                       <svg className="w-4 h-4 ml-auto rotate-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                    )}
                  </summary>
                  {isSidebarOpen && (
                    <div className="ml-9 mt-1 flex flex-col space-y-1 border-l border-primary/10 pl-3">
                      {item.subItems.map((sub: any) => (
                        <Link key={sub.name} href={sub.href} className={cn("rounded-md px-3 py-2 text-[13px] transition-colors", pathname === sub.href ? "bg-primary/5 text-primary font-semibold" : "text-foreground/60 hover:bg-primary/5 hover:text-foreground")}>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </details>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                  isActive 
                    ? "bg-primary/5 text-primary font-semibold" 
                    : "text-foreground/60 hover:bg-primary/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-primary/70")} />
                {isSidebarOpen && <span className="text-[14px]">{item.name}</span>}
                {isActive && isSidebarOpen && <div className="ml-auto w-1.5 h-5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-primary/10">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/40 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-primary/10 bg-white/90 px-8 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-primary/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-64 rounded-lg border border-primary/10 bg-primary/5 py-1.5 pl-10 pr-4 text-sm transition-all placeholder:text-foreground/40 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-primary/10 rounded-xl shadow-premium p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  {searchResults.map((result, idx) => (
                    <Link 
                      key={idx} 
                      href={result.href}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-primary/5 rounded-lg transition-colors group/res"
                    >
                      <result.icon size={14} className="text-primary/40 group-hover/res:text-primary" />
                      <span className="text-[12px] font-medium text-foreground/70 group-hover/res:text-foreground">{result.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="group relative cursor-pointer rounded-lg p-2 transition-colors hover:bg-primary/5"
              >
                <Bell className={cn("w-5 h-5 transition-colors", isNotificationsOpen ? "text-primary" : "text-foreground/40 group-hover:text-primary")} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7CB87A] rounded-full border-2 border-white" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setIsNotificationsOpen(false)} />
                  <div className="absolute top-full right-0 w-80 mt-2 bg-white border border-primary/10 rounded-2xl shadow-premium p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Recent Alerts</h3>
                      <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full">New</span>
                    </div>
                    <div className="space-y-2">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-3 hover:bg-primary/5 rounded-xl transition-all cursor-pointer group/notif">
                          <p className="text-[11px] font-bold text-foreground leading-tight mb-1 group-hover/notif:text-primary transition-colors">{notif.title}</p>
                          <p className="text-[9px] font-medium text-foreground/30 italic">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-lg transition-all">
                      View All Protocols
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-primary/10 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-none mb-1">{userName}</p>
                <p className="text-[10px] text-primary uppercase tracking-wider font-bold">{userRole?.replace('_', ' ') || 'Authenticating...'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/10 p-0.5 border border-primary/20">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="mx-auto max-w-[1440px] p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
