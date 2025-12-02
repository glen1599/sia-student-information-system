
import React, { useState } from 'react';
import { FileText, Plus, Clock, CheckCircle, XCircle, FilePlus, ChevronRight } from 'lucide-react';
import { useAppContext } from '../App';

const Services: React.FC = () => {
  const { letters, addLetter } = useAppContext();
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [selectedType, setSelectedType] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const letterTypes = [
    'Surat Keterangan Mahasiswa Aktif',
    'Transkrip Nilai Sementara',
    'Surat Pengantar Magang',
    'Surat Cuti Akademik',
    'Surat Keterangan Lulus',
    'Validasi KRS Manual'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      addLetter(selectedType, notes);
      setIsSubmitting(false);
      setActiveTab('history');
      setSelectedType('');
      setNotes('');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Selesai': return 'bg-green-100 text-green-700 border-green-200';
      case 'Ditolak': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Selesai': return <CheckCircle size={16} />;
      case 'Ditolak': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Layanan Administrasi</h2>
           <p className="text-slate-500">Ajukan surat resmi dan pantau statusnya secara real-time.</p>
        </div>
        <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-xl flex items-center font-medium">
           <FileText className="mr-2" size={20} />
           {letters.filter(l => l.status === 'Pending').length} Sedang Diproses
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-fit">
        <button 
          onClick={() => setActiveTab('create')}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'create' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Ajukan Surat
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'history' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Riwayat Pengajuan
        </button>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'create' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* List of Types */}
            <div className="md:col-span-2 space-y-4">
               <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-lg text-slate-800 mb-4">Pilih Jenis Layanan</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {letterTypes.map((type, idx) => (
                       <button
                         key={idx}
                         onClick={() => setSelectedType(type)}
                         className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                           selectedType === type 
                           ? 'bg-orange-50 border-orange-200 text-orange-700 ring-1 ring-orange-200' 
                           : 'bg-white border-slate-100 hover:border-orange-100 hover:shadow-sm'
                         }`}
                       >
                         <span className="font-medium text-sm">{type}</span>
                         <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedType === type ? 'opacity-100' : ''}`} />
                       </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Form */}
            <div className="md:col-span-1">
               <div className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-full ${!selectedType ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                  <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                    <FilePlus size={20} className="mr-2 text-orange-500"/> Detail Pengajuan
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                       <label className="text-xs font-bold text-slate-500 uppercase">Jenis Surat</label>
                       <p className="font-medium text-slate-800 mt-1">{selectedType || '-'}</p>
                     </div>
                     
                     <div>
                       <label className="text-xs font-bold text-slate-500 uppercase">Keperluan / Catatan</label>
                       <textarea 
                         className="w-full mt-2 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
                         rows={4}
                         placeholder="Contoh: Untuk persyaratan beasiswa Djarum..."
                         value={notes}
                         onChange={(e) => setNotes(e.target.value)}
                         required
                       ></textarea>
                     </div>

                     <div className="pt-4 border-t border-slate-100">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex justify-center items-center"
                        >
                          {isSubmitting ? (
                            <span className="animate-pulse">Mengirim...</span>
                          ) : (
                            <>
                              <Plus size={18} className="mr-2" />
                              Ajukan Sekarang
                            </>
                          )}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {letters.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                  <p className="text-slate-400">Belum ada riwayat pengajuan surat.</p>
               </div>
            ) : (
               letters.map(letter => (
                 <div key={letter.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                          <FileText size={24} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-800">{letter.type}</h4>
                          <p className="text-sm text-slate-500 mt-1">{letter.notes || 'Tidak ada catatan.'}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                             <span>ID: {letter.id}</span>
                             <span>•</span>
                             <span>{letter.date}</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center sm:items-start">
                       <span className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(letter.status)}`}>
                          <span className="mr-1.5">{getStatusIcon(letter.status)}</span>
                          {letter.status}
                       </span>
                    </div>
                 </div>
               ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
