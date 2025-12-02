import React, { useState } from 'react';
import { DollarSign, Clock, CheckCircle, CreditCard, X, Copy } from 'lucide-react';
import { useAppContext } from '../App';

const Finance: React.FC = () => {
  const { bills, payBill } = useAppContext();
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const activeBill = bills.find(b => b.status === 'Belum Lunas');

  const handlePayClick = (id: string) => {
    setSelectedBillId(id);
  };

  const handleConfirmPayment = () => {
    if (!selectedBillId) return;
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      payBill(selectedBillId);
      setIsProcessing(false);
      setSelectedBillId(null);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Active Bill Card */}
      <div className="bg-white rounded-3xl p-1 shadow-sm border border-slate-100">
        <div className="bg-slate-900 rounded-[1.4rem] p-6 md:p-10 text-white relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
           <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-orange-500/20 blur-2xl"></div>

           <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
             <div>
                <p className="text-slate-400 font-medium mb-1">Total Tagihan Aktif</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {activeBill 
                    ? `Rp ${activeBill.amount.toLocaleString('id-ID')}`
                    : 'Rp 0'
                  }
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {activeBill ? activeBill.description : 'Tidak ada tagihan aktif'}
                </p>
             </div>
             
             {activeBill && (
               <button 
                 onClick={() => handlePayClick(activeBill.id)}
                 className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all active:scale-95"
               >
                 Bayar Sekarang
               </button>
             )}
           </div>
        </div>
      </div>

      {/* History List */}
      <div>
        <h3 className="font-bold text-lg text-slate-800 mb-4 px-1">Riwayat Pembayaran</h3>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {bills.map((bill, idx) => (
            <div 
              key={bill.id} 
              className={`p-5 flex items-center justify-between hover:bg-slate-50 transition-colors ${idx !== bills.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                   bill.status === 'Lunas' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {bill.status === 'Lunas' ? <CheckCircle size={24} /> : <Clock size={24} />}
                </div>
                <div>
                   <h4 className="font-bold text-slate-800">{bill.description}</h4>
                   <p className="text-sm text-slate-500">{bill.date}</p>
                </div>
              </div>
              <div className="text-right">
                 <p className="font-bold text-slate-800">Rp {bill.amount.toLocaleString('id-ID')}</p>
                 <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                   bill.status === 'Lunas' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                 }`}>
                   {bill.status}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedBillId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-lg">Pembayaran</h3>
               <button onClick={() => setSelectedBillId(null)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            
            <div className="p-6">
               <div className="text-center mb-6">
                 <p className="text-slate-500 text-sm mb-1">Total Pembayaran</p>
                 <h2 className="text-3xl font-bold text-slate-800">Rp {bills.find(b => b.id === selectedBillId)?.amount.toLocaleString('id-ID')}</h2>
               </div>

               <div className="space-y-3 mb-6">
                 <div className="p-4 border border-orange-200 bg-orange-50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="bg-white p-2 rounded-lg"><CreditCard className="text-orange-500" size={20}/></div>
                       <div>
                         <p className="text-xs font-bold text-orange-800 uppercase">Virtual Account</p>
                         <p className="text-sm font-bold text-slate-800">8800 1234 5678 900</p>
                       </div>
                    </div>
                    <button className="text-orange-600 hover:text-orange-700"><Copy size={18}/></button>
                 </div>
                 <p className="text-xs text-center text-slate-400">Pembayaran akan diverifikasi secara otomatis.</p>
               </div>

               <button
                 onClick={handleConfirmPayment}
                 disabled={isProcessing}
                 className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
               >
                 {isProcessing ? (
                   <>
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Memproses...
                   </>
                 ) : 'Konfirmasi Pembayaran'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;