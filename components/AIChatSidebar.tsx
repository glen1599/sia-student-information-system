
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { useAppContext } from '../App';

interface AIChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatSidebar: React.FC<AIChatSidebarProps> = ({ isOpen, onClose }) => {
  const { user, bills, selectedCourses } = useAppContext();
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user'|'bot'}>>([
    { id: '1', text: `Halo ${user.name.split(' ')[0]}! 👋 Saya SIA Assistant. Ada yang bisa saya bantu terkait jadwal, nilai, atau tagihan?`, sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI Response Logic
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = userMsg.text.toLowerCase();

      if (lowerInput.includes('halo') || lowerInput.includes('hi') || lowerInput.includes('pagi')) {
        botResponse = "Halo! Semoga harimu menyenangkan. Mau cek jadwal kuliah hari ini?";
      } 
      else if (lowerInput.includes('jadwal') || lowerInput.includes('kuliah')) {
        botResponse = "Untuk jadwal lengkap silakan cek menu Jadwal di sidebar kiri. Hari ini kamu memiliki 2 mata kuliah.";
      }
      else if (lowerInput.includes('nilai') || lowerInput.includes('ipk') || lowerInput.includes('khs')) {
        botResponse = `IPK Global kamu saat ini adalah ${user.ipk}. Pertahankan prestasimu ya! 🎓`;
      }
      else if (lowerInput.includes('tagihan') || lowerInput.includes('bayar') || lowerInput.includes('keuangan') || lowerInput.includes('biaya')) {
        const unpaid = bills.find(b => b.status === 'Belum Lunas');
        if (unpaid) {
          botResponse = `Kamu memiliki tagihan ${unpaid.description} sebesar Rp ${unpaid.amount.toLocaleString('id-ID')} yang belum lunas.`;
        } else {
          botResponse = "Hebat! Tidak ada tagihan aktif saat ini. Semua pembayaran sudah lunas.";
        }
      }
      else if (lowerInput.includes('krs') || lowerInput.includes('sks')) {
        botResponse = `Kamu telah mengambil ${selectedCourses.length} mata kuliah. Jangan lupa simpan KRS sebelum batas waktu berakhir.`;
      }
      else {
        botResponse = "Maaf, saya belum mengerti. Coba tanya tentang 'Jadwal', 'Nilai', 'Tagihan', atau 'KRS'.";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[350px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-100 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 flex justify-between items-center text-white shadow-md">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">SIA Assistant</h3>
              <p className="text-[10px] text-orange-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === 'user' ? 'bg-orange-100' : 'bg-white'
              }`}>
                {msg.sender === 'user' ? <UserIcon size={14} className="text-orange-600"/> : <Sparkles size={14} className="text-orange-500"/>}
              </div>
              
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles size={14} className="text-orange-500"/>
               </div>
               <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                 <div className="flex gap-1">
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="flex gap-2 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanya sesuatu..."
              className="flex-1 pl-4 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm transition-all"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-2 top-2 p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 transition-colors shadow-sm"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            AI dapat membuat kesalahan. Cek kembali informasi penting.
          </p>
        </div>
      </div>
    </>
  );
};

export default AIChatSidebar;
