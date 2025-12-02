
import React, { useState, useMemo } from 'react';
import { Check, Save, Search, Filter, BookOpen, Clock, Trash2, Plus, AlertCircle, Sparkles } from 'lucide-react';
import { useAppContext } from '../App';
import { AVAILABLE_COURSES } from '../constants';

const KRS: React.FC = () => {
  const { selectedCourses, toggleCourseSelection } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');

  // Logic & Calculations
  const maxSks = 24;
  
  const selectedCourseDetails = useMemo(() => {
     return AVAILABLE_COURSES.filter(c => selectedCourses.includes(c.code));
  }, [selectedCourses]);

  const totalSks = selectedCourseDetails.reduce((acc, c) => acc + c.sks, 0);
  const isOverLimit = totalSks > maxSks;
  const usagePercentage = Math.min((totalSks / maxSks) * 100, 100);

  const filteredCourses = useMemo(() => {
    return AVAILABLE_COURSES.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSemester = selectedSemester === 'all' || course.semester === selectedSemester;
      return matchesSearch && matchesSemester;
    });
  }, [searchQuery, selectedSemester]);

  const handleSave = () => {
    if (isOverLimit) return;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 h-full">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 animate-fade-in">
        <div>
           <h2 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
             <span className="bg-orange-100 p-2 rounded-xl text-orange-600"><BookOpen size={24}/></span>
             Rencana Studi
           </h2>
           <p className="text-slate-500 mt-1 ml-14">Pilih dan atur mata kuliah semester ini.</p>
        </div>
        
        {/* Status Bar (Desktop) */}
        <div className="hidden md:flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total SKS</span>
              <div className="flex items-baseline gap-1">
                 <span className={`text-2xl font-bold ${isOverLimit ? 'text-red-500' : 'text-slate-800'}`}>{totalSks}</span>
                 <span className="text-slate-400 font-medium">/ 24</span>
              </div>
           </div>
           <div className="w-px h-10 bg-slate-200"></div>
           <button
              onClick={handleSave}
              disabled={isOverLimit}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center ${
                isOverLimit 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105 active:scale-95'
              }`}
            >
              {isSaved ? <Check size={18} className="mr-2" /> : <Save size={18} className="mr-2" />}
              {isSaved ? 'Tersimpan' : 'Simpan KRS'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Catalog */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Search & Filters */}
           <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-2 sticky top-[73px] z-10">
              <div className="relative flex-1">
                 <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18}/>
                 <input 
                   type="text" 
                   placeholder="Cari mata kuliah, kode, atau dosen..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-700 font-medium"
                 />
              </div>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter size={16} className="text-slate-500" />
                 </div>
                 <select 
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="h-full pl-10 pr-8 py-3 rounded-xl bg-slate-50 text-slate-700 font-bold border border-transparent hover:bg-slate-100 focus:border-orange-500 outline-none appearance-none cursor-pointer"
                 >
                    <option value="all">Semua Sem.</option>
                    <option value="3">Semester 3</option>
                    <option value="5">Semester 5</option>
                    <option value="7">Semester 7</option>
                 </select>
              </div>
           </div>

           {/* Course Grid */}
           <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-lg px-1 flex items-center gap-2">
                 Mata Kuliah Tersedia
                 <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{filteredCourses.length}</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => {
                       const isSelected = selectedCourses.includes(course.code);
                       return (
                          <div 
                             key={course.code}
                             className={`group relative bg-white p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                                isSelected 
                                ? 'border-orange-500 ring-1 ring-orange-500 shadow-orange-100' 
                                : 'border-slate-100 hover:border-orange-200'
                             }`}
                          >
                             {/* Header Card */}
                             <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-2">
                                   <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                                      {course.code}
                                   </span>
                                   <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                      course.category === 'Wajib' 
                                      ? 'bg-orange-50 text-orange-700 border-orange-100' 
                                      : 'bg-blue-50 text-blue-700 border-blue-100'
                                   }`}>
                                      {course.category}
                                   </span>
                                </div>
                                <span className="font-bold text-lg text-slate-800">{course.sks} SKS</span>
                             </div>

                             <h4 className="font-bold text-slate-800 text-lg leading-tight mb-4 group-hover:text-orange-600 transition-colors">
                                {course.name}
                             </h4>

                             {/* Metadata */}
                             <div className="space-y-2 text-sm text-slate-500 mb-5">
                                <div className="flex items-center gap-2">
                                   <Clock size={14} className="text-slate-400"/>
                                   <span>{course.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <span className="w-3.5 h-3.5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">D</span>
                                   <span className="truncate">{course.lecturer}</span>
                                </div>
                             </div>

                             {/* Action Button */}
                             <button
                                onClick={() => toggleCourseSelection(course.code)}
                                className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                   isSelected 
                                   ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100' 
                                   : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
                                }`}
                             >
                                {isSelected ? (
                                   <><Trash2 size={16}/> Batal Ambil</>
                                ) : (
                                   <><Plus size={16}/> Ambil Mata Kuliah</>
                                )}
                             </button>
                          </div>
                       );
                    })
                 ) : (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                       <Search size={48} className="mb-4 opacity-20"/>
                       <p className="font-medium">Tidak ada mata kuliah yang ditemukan.</p>
                       <p className="text-sm mt-1">Coba ubah kata kunci atau filter semester.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Summary / Cart */}
        <div className="lg:col-span-1">
           <div className="sticky top-[90px] space-y-4">
              
              {/* SKS Widget */}
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                 <div className="p-5 bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex justify-between items-center">
                       <div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Kuota SKS</p>
                          <h3 className="text-3xl font-bold">{totalSks} <span className="text-lg text-slate-500 font-medium">/ {maxSks}</span></h3>
                       </div>
                       <div className="w-12 h-12 rounded-full border-4 border-slate-700 flex items-center justify-center text-xs font-bold relative">
                          {Math.round(usagePercentage)}%
                       </div>
                    </div>
                 </div>
                 
                 {/* Progress Bar */}
                 <div className="h-2 w-full bg-slate-100">
                    <div 
                      className={`h-full transition-all duration-500 ${isOverLimit ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                 </div>

                 {isOverLimit && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-bold flex items-center gap-2">
                       <AlertCircle size={14}/> Kelebihan {totalSks - maxSks} SKS! Kurangi muatan.
                    </div>
                 )}

                 {/* Selected List */}
                 <div className="p-4 max-h-[400px] overflow-y-auto">
                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center justify-between">
                       Draf KRS Anda
                       <span className="text-xs font-normal text-slate-400">{selectedCourseDetails.length} Matkul</span>
                    </h4>
                    
                    {selectedCourseDetails.length > 0 ? (
                       <div className="space-y-2">
                          {selectedCourseDetails.map(c => (
                             <div key={c.code} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-orange-200 hover:bg-white transition-colors">
                                <div className="flex-1 min-w-0 pr-2">
                                   <p className="font-bold text-slate-700 text-sm truncate">{c.name}</p>
                                   <p className="text-xs text-slate-500">{c.code} • {c.sks} SKS</p>
                                </div>
                                <button 
                                   onClick={() => toggleCourseSelection(c.code)}
                                   className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                   <Trash2 size={14}/>
                                </button>
                             </div>
                          ))}
                       </div>
                    ) : (
                       <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl">
                          <Sparkles size={24} className="mx-auto mb-2 opacity-30"/>
                          Belum ada mata kuliah dipilih.
                       </div>
                    )}
                 </div>

                 {/* Mobile Save Button (Duplicate logic for sticky access) */}
                 <div className="p-4 border-t border-slate-100 md:hidden">
                    <button
                       onClick={handleSave}
                       disabled={isOverLimit}
                       className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center ${
                          isOverLimit 
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                       }`}
                    >
                       {isSaved ? 'Berhasil Disimpan!' : 'Simpan Rencana Studi'}
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
      
      {/* Toast Notification */}
      {isSaved && (
         <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up border border-slate-700">
            <div className="bg-green-500 p-1 rounded-full"><Check size={14} className="text-white"/></div>
            <div>
               <h4 className="font-bold text-sm">KRS Berhasil Disimpan</h4>
               <p className="text-xs text-slate-400">Data telah dikirim ke dosen wali.</p>
            </div>
         </div>
      )}

    </div>
  );
};

export default KRS;
