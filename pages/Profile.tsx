import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, LogOut } from 'lucide-react';
import { useAppContext } from '../App';

const Profile: React.FC = () => {
  const { user, updateUser } = useAppContext();
  const [formData, setFormData] = useState({
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateUser({ [name]: value }); // Live update context
  };

  const handleLogout = () => {
    // In a real app, clear tokens. Here we just reload or redirect.
    if(window.confirm('Apakah Anda yakin ingin keluar?')) {
        window.location.href = '/';
        alert("Logout berhasil (Simulasi)");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      
      {/* Header Profile Pic */}
      <div className="flex flex-col items-center">
        <div className="relative group">
           <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden">
             <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
           </div>
           <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors">
             <Camera size={18} />
           </button>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-slate-500">{user.nim} • {user.prodi}</p>
      </div>

      {/* Form Fields */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
         <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-2">Informasi Kontak</h3>
         
         <div className="space-y-1">
           <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email</label>
           <div className="relative">
             <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
             <input 
               type="email" 
               name="email"
               value={formData.email}
               onChange={handleChange}
               className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-700"
             />
           </div>
         </div>

         <div className="space-y-1">
           <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nomor HP</label>
           <div className="relative">
             <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
             <input 
               type="tel" 
               name="phone"
               value={formData.phone}
               onChange={handleChange}
               className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-700"
             />
           </div>
         </div>

         <div className="space-y-1">
           <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Alamat</label>
           <div className="relative">
             <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
             <textarea 
               name="address"
               value={formData.address}
               onChange={handleChange}
               rows={3}
               className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-700 resize-none"
             />
           </div>
         </div>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full py-3.5 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
};

export default Profile;