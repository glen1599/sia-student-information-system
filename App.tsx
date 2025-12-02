
import React, { createContext, useState, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KRS from './pages/KRS';
import Schedule from './pages/Schedule';
import Grades from './pages/Grades';
import Finance from './pages/Finance';
import Profile from './pages/Profile';
import Services from './pages/Services';
import Notifications from './pages/Notifications';
import { INITIAL_USER, INITIAL_BILLS, AVAILABLE_COURSES, INITIAL_LETTERS, INITIAL_NOTIFICATIONS } from './constants';
import { User, AppContextType, Bill, Letter, Notification } from './types';

// Context Definition
const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(['TI401', 'TI402']);
  const [bills, setBills] = useState<Bill[]>(INITIAL_BILLS);
  const [letters, setLetters] = useState<Letter[]>(INITIAL_LETTERS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const updateUser = (data: Partial<User>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const toggleCourseSelection = (code: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  const payBill = (id: string) => {
    setBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, status: 'Lunas' as const } : bill
    ));
  };

  const addLetter = (type: string, notes: string) => {
    const newLetter: Letter = {
      id: `L-${Date.now()}`,
      type,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes
    };
    setLetters(prev => [newLetter, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  return (
    <AppContext.Provider value={{ 
      user, updateUser, 
      selectedCourses, toggleCourseSelection, 
      bills, payBill,
      letters, addLetter,
      notifications, markAsRead
    }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="krs" element={<KRS />} />
            <Route path="jadwal" element={<Schedule />} />
            <Route path="nilai" element={<Grades />} />
            <Route path="keuangan" element={<Finance />} />
            <Route path="layanan" element={<Services />} />
            <Route path="notifikasi" element={<Notifications />} />
            <Route path="profil" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
