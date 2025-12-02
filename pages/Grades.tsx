import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Award, FileText } from 'lucide-react';
import { GRADES } from '../constants';

const Grades: React.FC = () => {
  // Default to the first (latest) semester open
  const [openSemester, setOpenSemester] = useState<number | null>(GRADES[0]?.semester || null);

  const toggleSemester = (sem: number) => {
    setOpenSemester(openSemester === sem ? null : sem);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50 border-green-200';
      case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
           <h2 className="text-2xl font-bold mb-1">Kartu Hasil Studi</h2>
           <p className="opacity-90">Rekapitulasi nilai akademik per semester.</p>
        </div>
        <Award className="absolute right-4 bottom-4 text-white/20 w-24 h-24 rotate-12" />
      </div>

      <div className="space-y-4">
        {GRADES.map((data) => {
          const isOpen = openSemester === data.semester;
          return (
            <div key={data.semester} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* Accordion Header */}
              <button
                onClick={() => toggleSemester(data.semester)}
                className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isOpen ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                    {data.semester}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">Semester {data.semester}</h3>
                    <p className="text-xs text-slate-500">IP Semester: <span className="font-bold text-slate-700">{data.gpa.toFixed(2)}</span></p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/50">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3">Mata Kuliah</th>
                          <th className="px-4 py-3 text-center">SKS</th>
                          <th className="px-4 py-3 text-center">Nilai</th>
                          <th className="px-4 py-3 text-center">Bobot</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-white transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-700">{item.name}</td>
                            <td className="px-4 py-4 text-center text-slate-600">{item.sks}</td>
                            <td className="px-4 py-4 text-center">
                              <span className={`inline-block w-8 h-8 leading-8 rounded-lg font-bold border ${getGradeColor(item.grade)}`}>
                                {item.grade}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center text-slate-600">{item.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 flex justify-end">
                     <button className="flex items-center text-sm font-medium text-orange-600 hover:text-orange-700">
                        <FileText size={16} className="mr-2" />
                        Download KHS (PDF)
                     </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grades;