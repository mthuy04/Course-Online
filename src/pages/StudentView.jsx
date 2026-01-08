import { useState } from 'react';
import { 
  Plus, Users, PlayCircle, BookOpen, Trash2, ChevronRight, 
  Sparkles, CheckCircle2, Calendar, Trophy, Clock, 
  MessageSquare, Award, Download, Heart, Share2, Eye, 
  TrendingUp, Zap, ShieldCheck, Gift, Target, BrainCircuit, DollarSign, ShoppingBag
} from 'lucide-react';
import { formatMoney } from '../utils/helpers';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- COMPONENTS CON (Định nghĩa ngay trong file theo ý bạn) ---
// --- SỬA COMPONENT NÀY Ở ĐẦU FILE (KHOẢNG DÒNG 13) ---
const CourseCard3D = ({ course, onAction, onDetail }) => (
  <div onClick={() => onDetail(course)} className="group relative bg-white rounded-[24px] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.2)] transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
    <div className="relative h-48 overflow-hidden flex-shrink-0">
      <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
      
      {/* Badge Cấp độ (Giữ nguyên) */}
      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-lg">
        {course.level === 'cap1' ? 'Tiểu học' : course.level === 'cap2' ? 'THCS' : 'THPT'}
      </span>

      {(course.id == 4 || course.id === '4') && (
        <div className="absolute top-0 right-0 z-10">
            <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1 uppercase tracking-wider">
                <span className="animate-pulse">🔥</span> BESTSELLER
            </div>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-[1px]">
        <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-xl transform scale-90 group-hover:scale-100 transition-transform"><Eye size={18}/> Xem ngay</button>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg flex items-center gap-1"><Clock size={12}/> {course.duration || '20h'}</span>
        <span className="text-amber-500 text-xs font-black flex items-center gap-1">★ 4.9</span>
      </div>
      <h3 className="text-base font-black text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors flex-1">{course.title}</h3>
      <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1"><Users size={14}/> {course.teacher_name}</p>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
        <p className="text-lg font-black text-indigo-600">{formatMoney(course.price)}</p>
        <button onClick={(e) => { e.stopPropagation(); onAction(course); }} className="p-2.5 rounded-xl bg-slate-900 text-white shadow-lg hover:bg-indigo-600 transition-all hover:scale-105 active:scale-95"><Plus size={18}/></button>
      </div>
    </div>
  </div>
);

const HomeDashboard = ({ onAction }) => {
  // (Biến data cũ không dùng nữa, bạn có thể xóa dòng này: const data = ...)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

      {/* --- BANNER MARKETING MỚI Ở ĐÂY --- */}
      <div className="lg:col-span-2 bg-gradient-to-r from-rose-500 to-orange-500 p-8 rounded-[32px] text-white shadow-xl shadow-rose-200/50 relative overflow-hidden flex items-center">
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="flex-1 relative z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4 backdrop-blur-md border border-white/20"><Gift size={14} /> Ưu đãi giới hạn</span>
          <h3 className="text-3xl font-black mb-3 leading-tight">Combo Bứt Phá Điểm Số: <br/> Mua 2 Tặng 1</h3>
          <p className="text-rose-100 mb-6 max-w-md font-medium">Áp dụng cho các khóa Toán, Lý, Anh THPT. Nắm chắc kiến thức nền tảng và luyện đề chuyên sâu.</p>
          <button 
           onClick={() => {
            console.log("Đã bấm nút!");
            if (onAction) onAction();
            else console.log("Lỗi: onAction bị null");
            }}
           className="bg-white text-rose-600 px-6 py-3 rounded-xl font-black shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2">Nhận ưu đãi ngay <ChevronRight size={18}/></button>
        </div>
        <div className="hidden lg:block relative z-10 rotate-[-15deg] translate-y-6 translate-x-6"><Target size={140} className="text-white/80" strokeWidth={1.5} /></div>
        
      </div>
      <div className="bg-gradient-to-b from-indigo-600 to-violet-700 p-6 rounded-[32px] text-white shadow-lg shadow-indigo-200">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Trophy size={20} className="text-yellow-300"/> Bảng vàng thành tích</h3>
        <div className="space-y-4">
          {[{n:'Lê Văn A',p:'2400 XP',r:1},{n:'Trần Thị B',p:'2150 XP',r:2},{n:'Nguyễn C',p:'1900 XP',r:3},{n:'Bạn (Tôi)',p:'1200 XP',r:15}].map((u,i)=>(
            <div key={i} className={`flex items-center justify-between p-3 rounded-2xl ${u.r===15?'bg-white/20 border border-white/30':'bg-white/10'}`}>
              <div className="flex items-center gap-3"><span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${u.r<=3?'bg-yellow-400 text-yellow-900':'bg-slate-700 text-slate-300'}`}>{u.r}</span><span className="font-bold text-sm">{u.n}</span></div><span className="text-xs font-bold text-indigo-200">{u.p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN VIEW ---
const StudentView = ({ page, setPage, courses, cart, myCourses, handleAddToCart, handlePayment, removeFromCart, onOpenDetail, onOpenLearning, onOpenPromo }) => {
  const [aiStep, setAiStep] = useState(0); 
  const [aiTarget, setAiTarget] = useState(''); 
  const [filter, setFilter] = useState('all');

  const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.level === filter);

  // 1. HOME
  if (page === 'home') return (
    <div className="space-y-10 animate-fade-in-up pb-10">
      <div className="relative overflow-hidden rounded-[40px] bg-slate-900 text-white shadow-2xl shadow-indigo-900/40 p-12 flex flex-col justify-center min-h-[320px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2942&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-slate-900/90 to-transparent"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex gap-2"><span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 backdrop-blur-md rounded-full text-xs font-bold text-yellow-300 border border-yellow-500/30"><Zap size={14}/> FLASH SALE 50%</span><span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 backdrop-blur-md rounded-full text-xs font-bold text-indigo-300 border border-indigo-500/30"><Sparkles size={14}/> AI PLANNER 2.0</span></div>
          <h1 className="text-5xl font-black leading-tight">Học tập <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Không Giới Hạn</span></h1>
          <p className="text-slate-300 text-lg max-w-xl">Nền tảng giáo dục K12 hàng đầu Việt Nam. Lộ trình cá nhân hóa, cam kết điểm số.</p>
          <button onClick={() => setPage('ai-planner')} className="w-fit px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-2"><Sparkles size={20} className="text-indigo-600"/> Lập Lộ Trình AI Ngay</button>
        </div>
      </div>

      <HomeDashboard />

      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
           <div><h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">Khóa học nổi bật <span className="text-2xl animate-bounce">🔥</span></h2></div>
           <div className="flex gap-2">{[{id:'all',l:'Tất cả'},{id:'cap1',l:'Tiểu học'},{id:'cap2',l:'THCS'},{id:'cap3',l:'THPT'}].map(t=>(<button key={t.id} onClick={()=>setFilter(t.id)} className={`px-6 py-2.5 rounded-xl border font-bold transition-all ${filter===t.id?'bg-slate-900 text-white border-slate-900':'border-slate-200 text-slate-600 hover:bg-slate-100'}`}>{t.l}</button>))}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredCourses.map(c => (<CourseCard3D key={c.id} course={c} onAction={handleAddToCart} onDetail={onOpenDetail} />))}</div>
      </div>
    </div>
  );

  // 2. AI PLANNER
  if (page === 'ai-planner') return (
    <div className="max-w-4xl mx-auto animate-fade-in-up py-10">
      {aiStep===0 && <div className="text-center space-y-8 py-10"><div className="w-28 h-28 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600 shadow-xl"><BrainCircuit size={56}/></div><h2 className="text-4xl font-black text-slate-800">StudyHub AI Assistant</h2><p className="text-slate-500 text-lg max-w-lg mx-auto font-medium">Chào bạn! Hãy cho mình biết mục tiêu hiện tại của bạn là gì để mình thiết kế lộ trình nhé?</p><button onClick={()=>setAiStep(1)} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-indigo-700 transition-all">Bắt đầu tư vấn</button></div>}
      {aiStep===1 && <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100"><h3 className="text-2xl font-black text-slate-800 mb-8">Mục tiêu chính của bạn là gì?</h3><div className="grid grid-cols-1 gap-4">
          {[
              {id:'matgoc', t:'Em bị mất gốc kiến thức', d:'Cần lộ trình lấy lại căn bản nhanh chóng.'},
              {id:'daihoc', t:'Ôn thi Đại học / Chuyển cấp', d:'Mục tiêu 9+ các môn Toán, Lý, Anh.'},
              {id:'nangcao', t:'Bồi dưỡng học sinh giỏi', d:'Muốn thử sức với các bài toán khó.'}
          ].map(opt=>(
             <button key={opt.id} onClick={()=>{setAiTarget(opt.id); setAiStep(2)}} className="flex items-center gap-6 p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all group text-left">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${opt.id==='matgoc'?'bg-orange-100 text-orange-600':opt.id==='daihoc'?'bg-red-100 text-red-600':'bg-blue-100 text-blue-600'}`}><Target size={24}/></div>
                <div><h4 className="font-bold text-lg text-slate-800 group-hover:text-indigo-700">{opt.t}</h4><p className="text-slate-500 text-sm">{opt.d}</p></div>
             </button>
          ))}
      </div></div>}
      {aiStep===2 && <div className="space-y-8 animate-fade-in-up">
           <div className="bg-emerald-50 p-6 rounded-[24px] border border-emerald-100 flex items-center gap-5 shadow-sm"><div><h3 className="text-xl font-bold text-emerald-800">Đã thiết lập lộ trình!</h3><p className="text-emerald-600">Dựa trên mục tiêu của bạn, đây là các khóa học và lịch trình tối ưu nhất.</p></div></div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl"><h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg"><Calendar size={24} className="text-indigo-600"/> Lịch học đề xuất</h4><div className="space-y-4">{['Thứ 2 - 19:00 (Toán)', 'Thứ 4 - 19:00 (Lý)', 'Thứ 6 - 20:00 (Hóa)'].map((d,i)=>(<div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700">{d}</div>))}</div></div>
              <div className="lg:col-span-2 space-y-6">
                 <h4 className="font-bold text-slate-800 text-xl flex items-center gap-2"><BookOpen className="text-indigo-600"/> Khóa học cần thiết</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {courses.filter(c => aiTarget === 'daihoc' ? c.level === 'cap3' : c.level === 'cap2').slice(0, 2).map(c => (
                        <CourseCard3D key={c.id} course={c} onAction={handleAddToCart} onDetail={onOpenDetail} />
                    ))}
                 </div>
              </div>
           </div>
           <button onClick={()=>setAiStep(0)} className="text-slate-400 font-bold text-sm hover:text-slate-600 underline text-center w-full block">Làm lại</button>
        </div>}
    </div>
  );

// 3. MY LEARNING
  if (page === 'my-learning') {
    // Dữ liệu giả lập cho biểu đồ
    const activityData = [
      {name:'T2', h:2}, {name:'T3', h:4}, {name:'T4', h:1}, 
      {name:'T5', h:5}, {name:'T6', h:8}, {name:'T7', h:6}, {name:'CN', h:3}
    ];

    return (
      <div className="space-y-8 animate-fade-in-up pb-10">
        <h2 className="text-3xl font-black text-slate-800">Góc học tập</h2>
        
        {/* --- PHẦN 1: 4 SỐ LIỆU (HÀNG NGANG TRÊN CÙNG) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-center hover:shadow-md transition-all">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Khóa đang học</p>
                <h3 className="text-3xl font-black text-indigo-600">{myCourses.length}</h3>
            </div>
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-center hover:shadow-md transition-all">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Giờ đã học</p>
                <h3 className="text-3xl font-black text-emerald-600">12.5h</h3>
            </div>
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-center hover:shadow-md transition-all">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Bài tập xong</p>
                <h3 className="text-3xl font-black text-orange-500">24</h3>
            </div>
            <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-center hover:shadow-md transition-all">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Điểm TB</p>
                <h3 className="text-3xl font-black text-blue-600">8.8</h3>
            </div>
        </div>

        {/* --- PHẦN 2: BIỂU ĐỒ (NẰM NGANG BÊN DƯỚI) --- */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                    <TrendingUp size={24} className="text-indigo-600"/> Biểu đồ chăm chỉ
                </h3>
                {/* Chú thích nhỏ */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                       <span className="text-xs text-slate-500 font-bold">Giờ học thực tế</span>
                    </div>
                </div>
            </div>
            
            {/* Vùng chứa biểu đồ - Tăng chiều cao lên h-80 cho hoành tráng */}
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} barSize={40}>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 14, fill: '#94a3b8', fontWeight: 'bold'}} 
                            dy={10}
                        />
                        <Tooltip 
                            cursor={{fill: '#f8fafc', radius: 12}} 
                            contentStyle={{borderRadius:'16px', border:'none', boxShadow:'0 10px 30px -10px rgba(0,0,0,0.15)', padding: '12px 20px'}}
                            itemStyle={{fontWeight: 'bold', color: '#1e293b'}}
                        />
                        <Bar dataKey="h" radius={[8,8,8,8]}>
                            {activityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 4 ? '#4f46e5' : '#e2e8f0'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* --- PHẦN 3: DANH SÁCH KHÓA HỌC (GIỮ NGUYÊN) --- */}
        <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <PlayCircle className="text-indigo-600"/> Tiếp tục học
            </h3>
            {myCourses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold text-lg">Bạn chưa đăng ký khóa học nào.</p>
                    <button onClick={()=>setPage('home')} className="mt-4 text-indigo-600 font-bold hover:underline">Tìm khóa học ngay</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {myCourses.map(c => (
                        <div key={c.id} className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-lg hover:shadow-xl transition-all group cursor-pointer" onClick={() => onOpenLearning(c)}>
                            <div className="relative overflow-hidden rounded-2xl mb-4 h-40">
                                <img src={c.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white"><PlayCircle size={32} /></span>
                                </div>
                            </div>
                            <h3 className="text-lg font-black text-slate-800 mb-1 line-clamp-1">{c.title}</h3>
                            <div className="flex justify-between items-center mt-3">
                                <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                                    <div className="h-full bg-indigo-500 w-1/3"></div>
                                </div>
                                <span className="text-xs font-bold text-slate-400">30%</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    );
  }


// 4. CART
  if (page === 'cart') {
    // Tính toán các chỉ số tài chính
    const totalAmount = cart.reduce((t, c) => t + parseInt(c.price), 0);
    const totalItems = cart.length;
    const avgPrice = totalItems > 0 ? totalAmount / totalItems : 0;
    
    // Giả lập ngân sách tháng (ví dụ 5 triệu) để hiện thanh tiến độ
    const budget = 5000000; 
    const percentUsed = Math.min((totalAmount / budget) * 100, 100);

    return (
      <div className="max-w-7xl mx-auto animate-fade-in-up py-10 space-y-8">
        
        {/* --- PHẦN 1: DASHBOARD TÀI CHÍNH (MỚI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Thẻ 1: Số lượng khóa */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <BookOpen size={32} />
                </div>
                <div>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Số lượng khóa</p>
                    <h3 className="text-3xl font-black text-slate-800">{totalItems} <span className="text-lg text-slate-400 font-medium">khóa</span></h3>
                </div>
                <div className="absolute -right-6 -bottom-6 text-blue-50 opacity-50"><BookOpen size={100}/></div>
            </div>

            {/* Thẻ 2: Tổng đầu tư */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 rounded-[24px] shadow-lg text-white flex items-center gap-5 relative overflow-hidden">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                    <DollarSign size={32} />
                </div>
                <div className="relative z-10">
                    <p className="text-indigo-100 font-bold text-xs uppercase tracking-wider">Tổng đầu tư tri thức</p>
                    <h3 className="text-3xl font-black">{formatMoney(totalAmount)}</h3>
                </div>
                {/* Hiệu ứng background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            </div>

            {/* Thẻ 3: Trung bình chi phí */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden group">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <TrendingUp size={32} />
                </div>
                <div>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Trung bình / khóa</p>
                    <h3 className="text-2xl font-black text-slate-800">{formatMoney(avgPrice)}</h3>
                </div>
                <div className="absolute -right-6 -bottom-6 text-emerald-50 opacity-50"><TrendingUp size={100}/></div>
            </div>
        </div>

        {/* --- PHẦN 2: DANH SÁCH & THANH TOÁN --- */}
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShoppingBag className="text-indigo-600"/> Chi tiết giỏ hàng
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Cột trái: Danh sách sản phẩm */}
            <div className="w-full lg:w-3/4 space-y-4">
                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <ShoppingBag size={40}/>
                        </div>
                        <p className="text-slate-500 font-bold text-lg">Giỏ hàng đang trống trơn.</p>
                        <p className="text-slate-400 text-sm mb-6">Hãy đầu tư cho bản thân ngay hôm nay!</p>
                        <button onClick={()=>setPage('home')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">Khám phá khóa học</button>
                    </div>
                ) : (
                    cart.map((c, i) => (
                        <div key={i} className="flex gap-6 p-4 bg-white rounded-[24px] border border-slate-100 shadow-sm items-center hover:shadow-md transition-all group">
                            <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 relative">
                                <img src={c.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-lg font-black text-slate-900 mb-1 truncate pr-4">{c.title}</h4>
                                    <button onClick={() => removeFromCart(i)} className="text-slate-400 hover:text-rose-500 transition-colors p-1"><Trash2 size={18}/></button>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold uppercase">{c.level}</span>
                                    <span>• {c.teacher_name}</span>
                                </div>
                                <p className="text-indigo-600 font-black text-lg">{formatMoney(c.price)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Cột phải: Thanh toán (Sticky) */}
            {cart.length > 0 && (
              <div className="w-full lg:w-1/4 h-fit">
                  <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-6">
                      <h3 className="text-xl font-black text-slate-900 mb-6">Tổng kết đơn hàng</h3>
                      
                      {/* Visual: Thanh ngân sách giả lập */}
                      <div className="mb-6">
                          <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                              <span>Hạn mức đầu tư tháng</span>
                              <span>{Math.round(percentUsed)}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000" style={{width: `${percentUsed}%`}}></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 italic text-right">Giả lập ngân sách 5.000.000đ</p>
                      </div>

                      <div className="space-y-3 mb-8 border-t border-dashed border-slate-200 pt-4">
                        <div className="flex justify-between text-slate-600 font-medium text-sm"><span>Tạm tính</span><span>{formatMoney(totalAmount)}</span></div>
                        <div className="flex justify-between text-emerald-600 font-medium text-sm"><span>Khuyến mãi</span><span>-0 đ</span></div>
                        <div className="border-t border-slate-100 pt-3 flex justify-between items-center"><span className="text-slate-900 font-black text-lg">Tổng cộng</span><span className="text-2xl font-black text-indigo-600">{formatMoney(totalAmount)}</span></div>
                      </div>
                      
                      <button onClick={handlePayment} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-indigo-600 hover:scale-[1.02] transition-all flex justify-center gap-2 items-center">
                          Thanh toán <CheckCircle2 size={20}/>
                      </button>
                      <div className="mt-4 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                           {/* Icon giả lập các phương thức thanh toán */}
                           <div className="w-8 h-5 bg-blue-600 rounded"></div>
                           <div className="w-8 h-5 bg-yellow-500 rounded"></div>
                           <div className="w-8 h-5 bg-slate-800 rounded"></div>
                      </div>
                      <p className="text-xs text-slate-400 text-center mt-2 font-medium flex justify-center gap-1"><ShieldCheck size={14}/> Bảo mật thanh toán SSL</p>
                  </div>
              </div>
            )}
        </div>
      </div>
    );
  }

  // 5. COMMUNITY
  if (page === 'community') return (<div className="max-w-4xl mx-auto animate-fade-in-up pb-10"><div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 rounded-[32px] text-white shadow-xl mb-8"><h2 className="text-3xl font-black mb-2">Cộng đồng Học sinh 🌏</h2><p className="opacity-90">Hỏi bài, chia sẻ kinh nghiệm học tập.</p></div><div className="space-y-6">{[1,2,3].map(i => (<div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm"><div className="flex gap-4 items-start"><img src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm"/><div className="flex-1"><div className="flex justify-between items-start mb-2"><div><h4 className="font-bold text-slate-900">Học sinh {i}</h4><p className="text-xs text-slate-500">2 giờ trước</p></div></div><p className="text-slate-700 mb-4 leading-relaxed">Bài toán này khó quá, có ai giúp mình giải câu 5 đề thi thử không ạ?</p><div className="flex gap-4 border-t border-slate-50 pt-4"><button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 font-bold text-sm"><Heart size={18}/> 12</button><button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm"><MessageSquare size={18}/> 3 bình luận</button></div></div></div></div>))}</div></div>);

  // 6. CERTIFICATES
  if (page === 'cert') return (<div className="animate-fade-in-up pb-10"><div className="mb-8"><h2 className="text-3xl font-black text-slate-800 mb-2">Chứng chỉ của tôi 🏅</h2><p className="text-slate-600 font-medium italic">"Tri thức là sức mạnh. Chúc mừng bạn đã hoàn thành chặng đường này!" 🚀</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[1].map(i => (<div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg flex gap-6 items-center"><div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center"><Award size={40}/></div><div className="flex-1"><h4 className="text-xl font-black text-slate-900 mb-1">Hoàn thành khóa học Toán 12</h4><p className="text-sm text-slate-500 mb-4">Cấp ngày: 20/12/2025</p><button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800"><Download size={16}/> Tải PDF</button></div></div>))}</div></div>);

  return null;
};
export default StudentView;