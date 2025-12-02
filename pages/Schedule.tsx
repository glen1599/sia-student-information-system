
import React from 'react';
import { MapPin, User, Clock } from 'lucide-react';
import { SCHEDULES } from '../constants';

const Schedule: React.FC = () => {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  // Helper to get sorted schedules for a specific day
  const getSchedulesForDay = (day: string) => {
    return SCHEDULES
      .filter(s => s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Jadwal Kuliah Mingguan</h2>
           <p className="text-slate-500 text-sm">Semester Ganjil 2023/2024</p>
        </div>
      </div>

      {/* Full Table/Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in">
        {days.map((day) => {
          const daySchedules = getSchedulesForDay(day);
          const isToday = days[new Date().getDay() - 1] === day;

          return (
            <div 
              key={day} 
              className={`flex flex-col rounded-2xl border overflow-hidden h-full ${
                isToday 
                  ? 'bg-orange-50/50 border-orange-200 ring-1 ring-orange-200 shadow-md' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Day Header */}
              <div className={`p-3 text-center font-bold border-b ${
                isToday ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-700'
              }`}>
                {day}
              </div>

              {/* Schedule List */}
              <div className="flex-1 p-2 space-y-2 min-h-[150px]">
                {daySchedules.length > 0 ? (
                  daySchedules.map((schedule) => (
                    <div 
                      key={schedule.id}
                      className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all group relative overflow-hidden"
                    >
                       <div className={`absolute left-0 top-0 bottom-0 w-1 ${schedule.color.split(' ')[0].replace('bg-', 'bg-')}`}></div>
                       
                       <div className="pl-2">
                         <div className="flex items-center text-xs font-bold text-slate-500 mb-1">
                           <Clock size={12} className="mr-1" />
                           {schedule.startTime} - {schedule.endTime}
                         </div>
                         <h4 className="font-bold text-slate-800 text-sm leading-tight mb-2 group-hover:text-orange-600 transition-colors">
                           {schedule.courseName}
                         </h4>
                         
                         <div className="space-y-1">
                            <div className="flex items-center text-xs text-slate-500">
                               <MapPin size={10} className="mr-1.5 text-slate-400" />
                               {schedule.room}
                            </div>
                            <div className="flex items-center text-xs text-slate-500">
                               <User size={10} className="mr-1.5 text-slate-400" />
                               <span className="truncate">{schedule.lecturer}</span>
                            </div>
                         </div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 py-8">
                    <span className="text-2xl font-bold opacity-20">-</span>
                    <span className="text-xs">Libur</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
