import React, { useState, useRef, useEffect } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Download, 
  Eye, 
  EyeOff, 
  Trash2, 
  Plus, 
  Move,
  Undo,
  Check
} from 'lucide-react';

// Types for our canvas elements
interface CanvasElement {
  id: string;
  type: 'text' | 'sticker';
  content: string | React.ReactNode;
  x: number;
  y: number;
  color?: string;
  fontSize?: number;
  bg?: string;
}

const TEMPLATES = [
  { id: 't1', name: 'Solid Orange', bg: 'bg-gradient-to-br from-orange-500 to-orange-600' },
  { id: 't2', name: 'Midnight', bg: 'bg-slate-900' },
  { id: 't3', name: 'Clean White', bg: 'bg-white' },
  { id: 't4', name: 'Soft Blue', bg: 'bg-blue-50' },
  { id: 't5', name: 'Campus Event', bg: 'bg-gradient-to-tr from-orange-100 via-white to-blue-50' },
];

const STICKERS = ['🎓', '📅', '📍', '📢', '✅', '⭐', '🔥', '💻', '🎉', '🏆'];

const PosterMaker: React.FC = () => {
  const [elements, setElements] = useState<CanvasElement[]>([
    { id: '1', type: 'text', content: 'Judul Acara', x: 50, y: 100, color: '#1e293b', fontSize: 24 }
  ]);
  const [background, setBackground] = useState(TEMPLATES[3].bg); // Default to a lighter one for better contrast initially
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  
  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ id: string, startX: number, startY: number, initX: number, initY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // --- Actions ---

  const addText = () => {
    const newId = Date.now().toString();
    setElements([...elements, { 
      id: newId, 
      type: 'text', 
      content: 'Teks Baru', 
      x: 50, 
      y: 200, 
      color: '#1e293b', 
      fontSize: 20 
    }]);
    setSelectedId(newId);
  };

  const addSticker = (emoji: string) => {
    const newId = Date.now().toString();
    setElements([...elements, { 
      id: newId, 
      type: 'sticker', 
      content: emoji, 
      x: 100, 
      y: 200, 
      fontSize: 48 
    }]);
    setSelectedId(newId);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedId(null);
  };

  // --- Drag Logic ---

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (isPreview) return;
    e.stopPropagation();
    e.preventDefault();
    const el = elements.find(item => item.id === id);
    if (!el) return;

    setSelectedId(id);
    setIsDragging(true);
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: el.x,
      initY: el.y
    };
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !dragRef.current || !canvasRef.current) return;
      
      const { startX, startY, initX, initY } = dragRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      updateElement(dragRef.current.id, {
        x: initX + dx,
        y: initY + dy
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const selectedElement = elements.find(el => el.id === selectedId);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] max-w-6xl mx-auto gap-6 relative">
      
      {/* Header Tools */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
           <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
             <Palette size={20}/>
           </div>
           Studio Poster
        </h2>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsPreview(!isPreview)}
             className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-colors border ${
                isPreview 
                ? 'bg-orange-50 text-orange-700 border-orange-200' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
             }`}
           >
             {isPreview ? <EyeOff size={18}/> : <Eye size={18}/>}
             <span className="hidden sm:inline">{isPreview ? 'Edit' : 'Preview'}</span>
           </button>
           <button 
             className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95"
             onClick={() => alert('Simulasi: Poster berhasil disimpan ke galeri!')}
           >
             <Download size={18}/>
             <span className="hidden sm:inline">Simpan</span>
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative shadow-inner">
           
           <div 
             ref={canvasRef}
             className={`relative w-[320px] h-[480px] sm:w-[360px] sm:h-[540px] md:w-[420px] md:h-[630px] shadow-2xl transition-all duration-300 ${background} overflow-hidden`}
             onClick={() => setSelectedId(null)}
           >
              {elements.map(el => (
                <div
                  key={el.id}
                  onPointerDown={(e) => handlePointerDown(e, el.id)}
                  style={{
                    position: 'absolute',
                    left: el.x,
                    top: el.y,
                    color: el.color,
                    fontSize: el.fontSize,
                    cursor: isPreview ? 'default' : 'move',
                    touchAction: 'none',
                    userSelect: 'none',
                    transform: selectedId === el.id && !isPreview ? 'scale(1.05)' : 'scale(1)',
                    zIndex: selectedId === el.id ? 10 : 1
                  }}
                  className={`
                    transition-transform p-3 rounded-xl
                    ${selectedId === el.id && !isPreview 
                      ? 'ring-2 ring-orange-500 ring-offset-2 bg-orange-500/10 border border-dashed border-orange-300' 
                      : 'hover:bg-black/5 border border-transparent'}
                  `}
                >
                  {el.type === 'sticker' ? (
                     <div className="leading-none filter drop-shadow-sm">{el.content}</div>
                  ) : (
                     <div className="font-bold leading-tight whitespace-pre-wrap drop-shadow-sm">{el.content}</div>
                  )}
                </div>
              ))}
              
              {!isPreview && elements.length === 0 && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400/80 pointer-events-none p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-200/50 flex items-center justify-center mb-4">
                        <Move size={32} className="opacity-50"/>
                    </div>
                    <p className="font-semibold text-lg text-slate-600">Canvas Kosong</p>
                    <p className="text-sm">Pilih template atau tambahkan elemen dari menu.</p>
                 </div>
              )}
           </div>

        </div>

        {/* Sidebar / Bottom Tools (Adaptive) */}
        {!isPreview && (
          <div className="flex flex-col gap-5 bg-white p-5 rounded-3xl shadow-xl border border-slate-100 w-full md:w-80 overflow-y-auto z-10 md:static absolute bottom-0 max-h-[50vh] md:max-h-full">
             
             {/* Dynamic Properties or Main Tools */}
             {selectedElement ? (
               <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 text-lg">Edit Elemen</h3>
                    <button onClick={() => setSelectedId(null)} className="text-sm font-medium text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg transition-colors">Selesai</button>
                  </div>

                  {selectedElement.type === 'text' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teks</label>
                        <input 
                          type="text" 
                          value={selectedElement.content as string}
                          onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Warna</label>
                        <div className="flex flex-wrap gap-2">
                          {['#ffffff', '#0f172a', '#334155', '#f97316', '#ef4444', '#3b82f6', '#10b981', '#f59e0b'].map(c => (
                            <button
                              key={c}
                              onClick={() => updateElement(selectedElement.id, { color: c })}
                              className={`w-9 h-9 rounded-full border border-slate-200 shadow-sm flex items-center justify-center transition-transform hover:scale-110 ${
                                selectedElement.color === c ? 'ring-2 ring-offset-2 ring-orange-500 scale-110' : ''
                              }`}
                              style={{ backgroundColor: c }}
                            >
                                {selectedElement.color === c && (c === '#ffffff' ? <Check size={14} className="text-slate-800"/> : <Check size={14} className="text-white"/>)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ukuran</label>
                        <span className="text-xs font-bold text-slate-700">{selectedElement.fontSize}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="12" 
                      max="120" 
                      value={selectedElement.fontSize}
                      onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => deleteElement(selectedElement.id)}
                      className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
                    >
                      <Trash2 size={18}/> Hapus Elemen
                    </button>
                  </div>
               </div>
             ) : (
               <div className="space-y-6 animate-fade-in">
                  
                  {/* Template Selector */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Background</h3>
                    <div className="flex md:grid md:grid-cols-2 gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar">
                      {TEMPLATES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setBackground(t.bg)}
                          className={`flex-shrink-0 w-24 h-20 md:w-auto md:h-20 rounded-xl ${t.bg} border transition-all shadow-sm ${
                            background === t.bg 
                            ? 'border-orange-500 ring-2 ring-orange-500/30 scale-[0.98]' 
                            : 'border-slate-200 hover:border-orange-300'
                          }`}
                          title={t.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Add Content */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tambah Konten</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={addText}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl hover:bg-orange-50 transition-all border border-slate-200 hover:border-orange-200 shadow-sm group"
                      >
                        <div className="p-2 bg-slate-100 rounded-full mb-2 group-hover:bg-white group-hover:text-orange-500 transition-colors">
                            <Type size={20} className="text-slate-600 group-hover:text-orange-500"/>
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-orange-700">Teks</span>
                      </button>
                      <button 
                        onClick={() => document.getElementById('sticker-picker')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl hover:bg-orange-50 transition-all border border-slate-200 hover:border-orange-200 shadow-sm group"
                      >
                        <div className="p-2 bg-slate-100 rounded-full mb-2 group-hover:bg-white group-hover:text-orange-500 transition-colors">
                             <ImageIcon size={20} className="text-slate-600 group-hover:text-orange-500"/>
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-orange-700">Stiker</span>
                      </button>
                    </div>
                  </div>

                  {/* Sticker Quick Pick */}
                  <div id="sticker-picker">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Koleksi Stiker</h3>
                    <div className="grid grid-cols-5 gap-2">
                       {STICKERS.map(s => (
                         <button 
                           key={s}
                           onClick={() => addSticker(s)}
                           className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-orange-200 hover:shadow-md hover:scale-110 transition-all cursor-pointer"
                         >
                           {s}
                         </button>
                       ))}
                    </div>
                  </div>
               </div>
             )}
          </div>
        )}

      </div>
    </div>
  );
};

export default PosterMaker;