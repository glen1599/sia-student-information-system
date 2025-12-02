
import { User, ScheduleItem, Course, SemesterGrade, Bill, Letter, Notification } from './types';

export const INITIAL_USER: User = {
  name: "Rizky Fajar",
  nim: "21501099",
  prodi: "Teknik Informatika",
  semester: 5,
  ipk: 3.75,
  sksTotal: 110,
  email: "rizky.fajar@student.univ.ac.id",
  phone: "0812-3456-7890",
  address: "Jl. Merdeka No. 45, Bandung",
  photoUrl: "https://picsum.photos/200/200"
};

export const SCHEDULES: ScheduleItem[] = [
  { id: '1', day: 'Senin', startTime: '08:00', endTime: '10:30', courseName: 'Pemrograman Web Lanjut', room: 'Lab Kom 1', lecturer: 'Dr. Budi Santoso', color: 'bg-blue-100 text-blue-700' },
  { id: '2', day: 'Senin', startTime: '13:00', endTime: '15:30', courseName: 'Kecerdasan Buatan', room: 'R. 305', lecturer: 'Prof. Siti Aminah', color: 'bg-purple-100 text-purple-700' },
  { id: '3', day: 'Selasa', startTime: '09:00', endTime: '11:30', courseName: 'Basis Data Terdistribusi', room: 'Lab Kom 2', lecturer: 'Andi Wijaya, M.Kom', color: 'bg-green-100 text-green-700' },
  { id: '4', day: 'Rabu', startTime: '08:00', endTime: '10:30', courseName: 'Jaringan Komputer', room: 'Lab Jaringan', lecturer: 'Eko Prasetyo, M.T.', color: 'bg-orange-100 text-orange-700' },
  { id: '5', day: 'Kamis', startTime: '10:00', endTime: '12:30', courseName: 'Manajemen Proyek TI', room: 'R. 402', lecturer: 'Rina Kartika, M.M.', color: 'bg-pink-100 text-pink-700' },
  { id: '6', day: 'Jumat', startTime: '13:30', endTime: '16:00', courseName: 'Etika Profesi', room: 'Aula B', lecturer: 'Dr. H. Ahmad', color: 'bg-gray-100 text-gray-700' },
];

export const AVAILABLE_COURSES: Course[] = [
  { code: 'TI401', name: 'Pemrograman Mobile', sks: 3, lecturer: 'Dedi Kurniawan, M.Kom', schedule: 'Senin, 08:00', semester: 5, category: 'Wajib' },
  { code: 'TI402', name: 'Cloud Computing', sks: 3, lecturer: 'Fajar Nugraha, M.T.', schedule: 'Selasa, 10:00', semester: 5, category: 'Wajib' },
  { code: 'TI403', name: 'Keamanan Siber', sks: 3, lecturer: 'Budi Santoso, Ph.D', schedule: 'Rabu, 13:00', semester: 5, category: 'Pilihan' },
  { code: 'TI404', name: 'Data Mining', sks: 3, lecturer: 'Siti Aminah, M.Kom', schedule: 'Kamis, 08:00', semester: 5, category: 'Pilihan' },
  { code: 'TI405', name: 'Internet of Things', sks: 2, lecturer: 'Andi Wijaya, M.Kom', schedule: 'Jumat, 09:00', semester: 5, category: 'Wajib' },
  { code: 'TI406', name: 'Game Development', sks: 3, lecturer: 'Eko Prasetyo, M.T.', schedule: 'Senin, 13:00', semester: 5, category: 'Pilihan' },
  { code: 'TI407', name: 'Sistem Pakar', sks: 3, lecturer: 'Rina Kartika, M.T.', schedule: 'Selasa, 13:00', semester: 7, category: 'Pilihan' },
  { code: 'TI408', name: 'Riset Operasi', sks: 2, lecturer: 'Dr. Ahmad', schedule: 'Rabu, 10:00', semester: 3, category: 'Wajib' },
  { code: 'TI409', name: 'Technopreneurship', sks: 2, lecturer: 'Wawan Setiawan, M.B.A.', schedule: 'Kamis, 13:00', semester: 5, category: 'Wajib' },
  { code: 'TI410', name: 'Blockchain Dasar', sks: 3, lecturer: 'Satria Baja, M.Kom', schedule: 'Jumat, 13:30', semester: 7, category: 'Pilihan' },
  { code: 'TI411', name: 'UI/UX Design', sks: 3, lecturer: 'Linda Sari, M.Ds', schedule: 'Kamis, 10:00', semester: 5, category: 'Wajib' },
];

export const GRADES: SemesterGrade[] = [
  {
    semester: 4,
    gpa: 3.80,
    items: [
      { name: 'Struktur Data', sks: 3, grade: 'A', weight: 4 },
      { name: 'Aljabar Linear', sks: 3, grade: 'B', weight: 3 },
      { name: 'Sistem Operasi', sks: 3, grade: 'A', weight: 4 },
      { name: 'Interaksi Manusia Komputer', sks: 3, grade: 'A', weight: 4 },
      { name: 'Bahasa Inggris II', sks: 2, grade: 'A', weight: 4 },
    ]
  },
  {
    semester: 3,
    gpa: 3.65,
    items: [
      { name: 'Algoritma Pemrograman', sks: 4, grade: 'A', weight: 4 },
      { name: 'Matematika Diskrit', sks: 3, grade: 'B', weight: 3 },
      { name: 'Basis Data', sks: 4, grade: 'B', weight: 3 },
      { name: 'Arsitektur Komputer', sks: 3, grade: 'A', weight: 4 },
    ]
  },
  {
    semester: 2,
    gpa: 3.70,
    items: [
      { name: 'Kalkulus II', sks: 3, grade: 'B', weight: 3 },
      { name: 'Fisika Dasar', sks: 3, grade: 'A', weight: 4 },
      { name: 'Pengantar TI', sks: 2, grade: 'A', weight: 4 },
    ]
  }
];

export const INITIAL_BILLS: Bill[] = [
  { id: 'INV-001', semester: 5, description: 'UKT Semester 5', amount: 5500000, status: 'Belum Lunas', date: '2023-08-01' },
  { id: 'INV-002', semester: 4, description: 'UKT Semester 4', amount: 5500000, status: 'Lunas', date: '2023-02-01' },
  { id: 'INV-003', semester: 3, description: 'UKT Semester 3', amount: 5250000, status: 'Lunas', date: '2022-08-01' },
];

export const INITIAL_LETTERS: Letter[] = [
  { id: 'L-001', type: 'Surat Keterangan Mahasiswa Aktif', date: '2023-09-10', status: 'Selesai', notes: 'Untuk keperluan beasiswa' },
  { id: 'L-002', type: 'Transkrip Nilai Sementara', date: '2023-10-05', status: 'Pending', notes: 'Magang Kampus Merdeka' },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'N-1', title: 'Batas Pembayaran UKT', message: 'Pembayaran UKT Semester 5 berakhir pada tanggal 20 Agustus 2023.', date: '2 Hari yang lalu', category: 'finance', isRead: false },
  { id: 'N-2', title: 'Perwalian Dimulai', message: 'Segera lakukan konsultasi dengan dosen wali untuk pengisian KRS.', date: '1 Hari yang lalu', category: 'academic', isRead: false },
  { id: 'N-3', title: 'Jadwal Kuliah Berubah', message: 'Mata kuliah Pemrograman Web Lanjut pindah ke Lab 3.', date: 'Baru saja', category: 'academic', isRead: false },
];
