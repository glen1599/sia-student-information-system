
import React, { useEffect } from 'react';
import { Bell, Info, AlertTriangle, CreditCard, Check } from 'lucide-react';
import { useAppContext } from '../App';

const Notifications: React.FC = () => {
  const { notifications, markAsRead } = useAppContext();

  useEffect(() => {
    // Mark visible notifications as read after a delay or user interaction in a real app
    // For now, we provide a button to clear/read
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case 'finance': return <CreditCard size={20} className="text-orange-600" />;
      case 'academic': return <Info size={20} className="text-blue-600" />;
      default: return <AlertTriangle size={20} className="text-yellow-600" />;
    }
  };

  const getBgColor = (category: string) => {
    switch (category) {
      case 'finance': return 'bg-orange-100';
      case 'academic': return 'bg-blue-100';
      default: return 'bg-yellow-100';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Notifikasi</h2>
          <div className="bg-white px-3 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-500">
             {notifications.filter(n => !n.isRead).length} Belum dibaca
          </div>
       </div>

       <div className="space-y-3">
          {notifications.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
               <Bell size={48} className="mx-auto text-slate-200 mb-4" />
               <p className="text-slate-400">Tidak ada notifikasi saat ini.</p>
             </div>
          ) : (
            notifications.map((notif) => (
               <div 
                 key={notif.id}
                 onClick={() => markAsRead(notif.id)}
                 className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                    notif.isRead 
                    ? 'bg-white border-slate-100 text-slate-500' 
                    : 'bg-white border-orange-100 shadow-sm ring-1 ring-orange-50'
                 }`}
               >
                  {!notif.isRead && (
                     <span className="absolute top-5 right-5 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  
                  <div className="flex gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getBgColor(notif.category)}`}>
                        {getIcon(notif.category)}
                     </div>
                     <div className="flex-1">
                        <h3 className={`font-bold text-base mb-1 ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
                           {notif.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-2">
                           {notif.message}
                        </p>
                        <p className="text-xs text-slate-400">{notif.date}</p>
                     </div>
                  </div>
               </div>
            ))
          )}
       </div>
    </div>
  );
};

export default Notifications;
