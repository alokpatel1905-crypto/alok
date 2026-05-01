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

const SIDEBAR_ITEMS: any[] = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', roles: ['ANY'] },
  { 
    name: 'Pages', 
    icon: FileText, 
    roles: ['ANY'],
    subItems: [
      { name: 'Home CMS', href: '/admin/home-cms' },
      { name: 'About Us', href: '/admin/about' },
      { name: 'Impact', href: '/admin/impact' },
      { name: 'Accreditation CMS', href: '/admin/accreditations-cms' },
      { name: 'Rankings CMS', href: '/admin/rankings-cms' },
      { name: 'Events CMS', href: '/admin/events-cms' },
      { name: 'Awards CMS', href: '/admin/awards-cms' },
      { name: 'Networks CMS', href: '/admin/networks-cms' },
      { name: 'Support CMS', href: '/admin/support-cms' },
      { name: 'Contact CMS', href: '/admin/contact-cms' },
      { name: 'Media CMS', href: '/admin/media-cms' },
      { name: 'Milestones', href: '/admin/milestones' },
      { name: 'Contact Us', href: '/admin/pages/contact' },
      { name: 'Gallery', href: '/admin/pages/gallery' },
      { name: 'Blog', href: '/admin/pages/blog' },
      { name: 'Dynamic Pages', href: '/admin/pages' }
    ]
  },
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-primary/10 transition-all duration-300 z-50 shadow-sm",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight text-foreground">
                GM PORTAL
              </span>
            )}
          </Link>
        </div>

        <nav className="mt-4 px-3 space-y-1">
          {filteredItems.map((item) => {
            if (item.subItems) {
              const isSubActive = item.subItems.some((sub: any) => pathname.startsWith(sub.href));
              return (
                <details key={item.name} open={isSubActive || undefined} className="group">
                  <summary className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer list-none", 
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
                    <div className="mt-1 ml-9 pl-3 border-l border-primary/10 flex flex-col space-y-1">
                      {item.subItems.map((sub: any) => (
                        <Link key={sub.name} href={sub.href} className={cn("px-3 py-2 rounded-lg text-[13px] transition-colors", pathname === sub.href ? "bg-primary/5 text-primary font-semibold" : "text-foreground/60 hover:text-foreground hover:bg-primary/5")}>
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
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
            className="w-full flex items-center gap-3 px-3 py-2.5 text-foreground/40 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        {/* Top Navbar */}
        <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-primary/10 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-primary/5 rounded-lg text-foreground/60 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="bg-primary/5 border border-primary/10 rounded-lg py-1.5 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-foreground/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group">
              <Bell className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-flora rounded-full border-2 border-white" />
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
        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}