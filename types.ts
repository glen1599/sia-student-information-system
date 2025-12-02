
export interface User {
  name: string;
  nim: string;
  prodi: string;
  semester: number;
  ipk: number;
  sksTotal: number;
  email: string;
  phone: string;
  address: string;
  photoUrl: string;
}

export interface ScheduleItem {
  id: string;
  day: string; // Senin, Selasa, etc.
  startTime: string;
  endTime: string;
  courseName: string;
  room: string;
  lecturer: string;
  color: string;
}

export interface Course {
  code: string;
  name: string;
  sks: number;
  lecturer: string;
  schedule: string;
  semester: number; // Added
  category: 'Wajib' | 'Pilihan'; // Added
}

export interface GradeItem {
  name: string;
  sks: number;
  grade: string; // A, B, C, D, E
  weight: number; // 4, 3, 2, 1, 0
}

export interface SemesterGrade {
  semester: number;
  items: GradeItem[];
  gpa: number;
}

export interface Bill {
  id: string;
  semester: number;
  description: string;
  amount: number;
  status: 'Lunas' | 'Belum Lunas';
  date: string;
}

export interface Letter {
  id: string;
  type: string; // e.g., 'Surat Keterangan Aktif', 'Transkrip'
  date: string;
  status: 'Pending' | 'Diproses' | 'Selesai' | 'Ditolak';
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  category: 'academic' | 'finance' | 'system';
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface AppContextType {
  user: User;
  updateUser: (data: Partial<User>) => void;
  selectedCourses: string[]; // List of Course Codes
  toggleCourseSelection: (code: string) => void;
  bills: Bill[];
  payBill: (id: string) => void;
  letters: Letter[];
  addLetter: (type: string, notes: string) => void;
  notifications: Notification[];
  markAsRead: (id: string) => void;
}
