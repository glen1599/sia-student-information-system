
import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Calendar, Award, DollarSign, User, Bell, FileText, MessageCircle } from 'lucide-react';
import { useAppContext } from '../App';
import AIChatSidebar from './AIChatSidebar';

const Layout: React.FC = () => {
  const { user, notifications } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/krs', label: 'KRS', icon: BookOpen },
    { path: '/jadwal', label: 'Jadwal', icon: Calendar },
    { path: '/nilai', label: 'Nilai', icon: Award },
    { path: '/keuangan', label: 'Keuangan', icon: DollarSign },
    { path: '/layanan', label: 'Layanan', icon: FileText },
  ];

  // Logic to determine greeting
  const hour = new Date().getHours();
  let greeting = 'Selamat Pagi';
  if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
  else if (hour >= 18) greeting = 'Selamat Malam';

  const firstName = user.name.split(' ')[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 z-30 shadow-sm">
        <div className="p-6 flex items-center space-x-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-orange-200 shadow-md">
            S
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-500">
            SIA Kampus
          </span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-semibold shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              <item.icon size={20} className={location.pathname === item.path ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600"} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <NavLink
             to="/profil"
             className={({ isActive }) =>
               `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 mt-4 group ${
                 isActive
                   ? 'bg-orange-50 text-orange-600 font-semibold shadow-sm'
                   : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
               }`
             }
          >
            <User size={20} className={location.pathname === '/profil' ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600"} />
            <span>Profil Saya</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative transition-all duration-300">
        
        {/* Top Bar (Sticky) */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 py-4 md:px-8 flex justify-between items-center supports-[backdrop-filter]:bg-white/60">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{greeting},</span>
            <h1 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">{firstName} 👋</h1>
          </div>
          
          <div className="flex items-center gap-3">
             {/* Chat Toggle Button (Visible on Desktop Header usually, but we use FAB for main interaction) */}
             <button 
                onClick={() => setIsChatOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold hover:bg-orange-100 transition-colors"
             >
                <MessageCircle size={18} />
                <span className="hidden lg:inline">AI Assistant</span>
             </button>

             <button 
               onClick={() => navigate('/notifikasi')}
               className="relative p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
             >
               <Bell size={22} />
               {unreadCount > 0 && (
                 <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
               )}
             </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          <Outlet />
        </div>

        {/* Floating Chat Button (FAB) */}
        {!isChatOpen && (
           <button
             onClick={() => setIsChatOpen(true)}
             className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
           >
             <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
             <span className="absolute -top-1 -right-1 flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-white"></span>
             </span>
           </button>
        )}

      </main>

      {/* AI Chat Sidebar */}
      <AIChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe pt-2 px-6 z-30 flex justify-between items-center h-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 relative ${
                isActive ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                 <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-200" />
                 <span className="text-[10px] font-medium">{item.label}</span>
                 {isActive && (
                    <span className="absolute -top-2 w-8 h-1 bg-orange-500 rounded-b-full"></span>
                 )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
