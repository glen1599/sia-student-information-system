
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Award, DollarSign, MapPin, ChevronRight, User, FileText } from 'lucide-react';
import { useAppContext } from '../App';
import { SCHEDULES } from '../constants';

const Dashboard: React.FC = () => {
  const { user } = useAppContext();

  // Get current day name in Indonesian
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const today = days[new Date().getDay()];
  
  // Filter schedule for today
  const todaySchedule = SCHEDULES.filter(s => s.day === today);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      
      {/* Student Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-200">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg overflow-hidden shrink-0">
             <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-orange-100 font-medium tracking-wide">{user.nim}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
               <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-sm">
                  {user.prodi}
               </div>
               <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-sm">
                  Semester {user.semester}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
           <div className="absolute top-2 right-2 text-green-500 bg-green-50 p-1.5 rounded-lg">
             <Award size={18} />
           </div>
           <span className="text-slate-500 text-sm mb-1">IPK Global</span>
           <span className="text-3xl font-bold text-slate-800">{user.ipk.toFixed(2)}</span>
           <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden">
             <div className="bg-green-500 h-full rounded-full" style={{ width: `${(user.ipk / 4) * 100}%` }}></div>
           </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
           <div className="absolute top-2 right-2 text-blue-500 bg-blue-50 p-1.5 rounded-lg">
             <BookOpen size={18} />
           </div>
           <span className="text-slate-500 text-sm mb-1">SKS Tempuh</span>
           <span className="text-3xl font-bold text-slate-800">{user.sksTotal}</span>
           <span className="text-xs text-slate-400 mt-1">dari 144 SKS</span>
        </div>
      </div>

      {/* Quick Menu */}
      <h3 className="font-bold text-lg text-slate-800 px-1">Menu Cepat</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { to: '/krs', label: 'Rencana Studi', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { to: '/jadwal', label: 'Jadwal Kuliah', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
          { to: '/nilai', label: 'Kartu Hasil', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
          { to: '/keuangan', label: 'Keuangan', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-50' },
          { to: '/layanan', label: 'Layanan Surat', icon: FileText, color: 'text-teal-600', bg: 'bg-teal-50' },
        ].map((item, idx) => (
          <Link 
            key={idx} 
            to={item.to}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
              <item.icon size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700 text-center">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">Jadwal Hari Ini</h3>
          <span className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{today}</span>
        </div>
        <div className="p-0">
          {todaySchedule.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {todaySchedule.map((s) => (
                <div key={s.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center group">
                  <div className="flex flex-col items-center mr-4 min-w-[3.5rem]">
                    <span className="text-sm font-bold text-slate-800">{s.startTime}</span>
                    <span className="text-xs text-slate-400">{s.endTime}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">{s.courseName}</h4>
                    <div className="flex items-center text-xs text-slate-500 mt-1 space-x-3">
                      <span className="flex items-center"><MapPin size={12} className="mr-1" /> {s.room}</span>
                      <span className="flex items-center"><User size={12} className="mr-1" /> {s.lecturer}</span>
                    </div>
                  </div>
                  <div className={`w-1.5 h-10 rounded-full ${s.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-300">
                <Calendar size={24} />
              </div>
              <p className="text-slate-500">Tidak ada jadwal kuliah hari ini.</p>
              <p className="text-xs text-slate-400 mt-1">Gunakan waktu ini untuk istirahat atau belajar mandiri.</p>
            </div>
          )}
        </div>
        <div className="p-3 bg-slate-50 border-t border-slate-100">
          <Link to="/jadwal" className="flex items-center justify-center text-sm font-medium text-orange-600 hover:text-orange-700">
            Lihat Jadwal Lengkap <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
