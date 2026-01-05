import { useState } from 'react';
import { Plus, Edit, Video, Users, Star, Wallet, Calendar, MessageCircle, FileText, CheckCircle, Clock } from 'lucide-react';
import { formatMoney } from '../utils/helpers';

const TeacherView = ({ courses, onOpenUpload, onEditCourse, page }) => {
  const activeTab = page === 'home' ? 'overview' : page;
  const myRevenue = courses.reduce((sum, c) => sum + parseInt(c.price), 0) * 0.8;

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div className="flex justify-between items-end">
        <div><h2 className="text-3xl font-black text-slate-800">Cổng Đối Tác 🎓</h2><p className="text-slate-500 font-medium">Quản lý giảng dạy và thu nhập.</p></div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="col-span-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-[32px] shadow-xl flex justify-between items-center"><div><p className="text-indigo-100 font-bold uppercase mb-2">Số dư khả dụng</p><h3 className="text-5xl font-black">{formatMoney(myRevenue)}</h3></div><button className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all">Rút tiền ngay</button></div>
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">1,204</h3><p className="text-xs text-slate-500 font-bold uppercase">Học viên</p></div></div>
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-amber-50 text-amber-500 rounded-2xl"><Star size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">4.9/5</h3><p className="text-xs text-slate-500 font-bold uppercase">Đánh giá</p></div></div>
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3 bg-rose-50 text-rose-500 rounded-2xl"><MessageCircle size={28}/></div><div><h3 className="text-2xl font-black text-slate-800">12</h3><p className="text-xs text-slate-500 font-bold uppercase">Câu hỏi mới</p></div></div>
        </div>
      )}

      {/* LICH DAY (MỚI) */}
      {activeTab === 'schedule' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Calendar className="text-indigo-600"/> Lịch livestream / Dạy trực tuyến</h3>
            <div className="space-y-4">
               {[1,2,3].map(i => (
                  <div key={i} className="flex items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                     <div className="flex-col flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-2xl font-bold text-slate-700 mr-6"><span>T2</span><span className="text-2xl text-indigo-600">2{i}</span></div>
                     <div className="flex-1">
                        <div className="flex gap-2 mb-1"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">Sắp diễn ra</span><span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-bold">Zoom</span></div>
                        <h4 className="font-bold text-slate-800 text-lg">Giải đề thi thử THPTQG đợt {i} - Chuyên đề Hàm số</h4>
                        <p className="text-sm text-slate-500 font-medium flex items-center gap-2 mt-1"><Clock size={16}/> 20:00 - 21:30</p>
                     </div>
                     <button className="px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700">Vào lớp ngay</button>
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* HOI DAP (MỚI) */}
      {activeTab === 'qa' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Hỏi đáp với học viên</h3>
            <div className="space-y-6">
               {[1,2].map(i => (
                  <div key={i} className="p-6 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all">
                     <div className="flex gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">SV</div>
                        <div><p className="font-bold text-slate-800">Nguyễn Văn Em</p><p className="text-xs text-slate-400 font-bold">2 giờ trước • Bài: Khảo sát hàm số</p></div>
                     </div>
                     <p className="text-slate-700 ml-14 mb-4 leading-relaxed font-medium">Thầy ơi cho em hỏi câu 5 trong bài tập về nhà, tại sao đạo hàm chỗ này lại ra âm được ạ? Em tính mãi vẫn ra dương.</p>
                     <div className="ml-14 flex gap-3"><input className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-200 outline-none" placeholder="Viết câu trả lời..." /><button className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800">Gửi</button></div>
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};
export default TeacherView;