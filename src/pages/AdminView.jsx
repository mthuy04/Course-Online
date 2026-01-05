import { useState } from 'react';
import { BarChart3, Users, BookOpen, DollarSign, TrendingUp, Trash2, Ban, CheckCircle, Activity, PieChart as PieIcon, Megaphone, Settings, Search, Edit } from 'lucide-react';
import { formatMoney } from '../utils/helpers';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const AdminView = ({ courses, stats, onDeleteCourse, page }) => {
  // Biến page được truyền từ App.jsx xuống để điều khiển Tab
  const activeTab = page === 'home' ? 'dashboard' : page; 

  const platformRevenue = stats.revenue * 0.2; 
  const totalRevenue = stats.revenue;
  const chartData = [ { name: 'T1', value: totalRevenue * 0.2 }, { name: 'T2', value: totalRevenue * 0.5 }, { name: 'T3', value: totalRevenue * 0.7 }, { name: 'Hiện tại', value: totalRevenue } ];
  const pieData = [ { name: 'Sàn (20%)', value: 20 }, { name: 'GV (80%)', value: 80 } ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      {/* HEADER */}
      <div className="flex justify-between items-end bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div><span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">CEO Workspace</span><h2 className="text-4xl font-black text-slate-900 mt-2">{activeTab === 'dashboard' ? 'Tổng Quan Hệ Thống' : activeTab === 'finance' ? 'Quản Lý Tài Chính' : activeTab === 'users' ? 'Quản Lý Người Dùng' : 'Marketing & Cấu Hình'}</h2></div>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-[24px] bg-indigo-600 text-white shadow-xl shadow-indigo-200"><div className="flex justify-between mb-4"><DollarSign className="opacity-80"/><span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">+24%</span></div><h3 className="text-3xl font-black">{formatMoney(totalRevenue)}</h3><p className="text-indigo-200 text-sm font-medium">Tổng GMV</p></div>
            <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm"><div className="flex justify-between mb-4 text-emerald-600"><Activity/><span className="bg-emerald-50 px-2 py-1 rounded text-xs font-bold">+12%</span></div><h3 className="text-3xl font-black text-slate-800">{formatMoney(platformRevenue)}</h3><p className="text-slate-500 text-sm font-medium">Doanh thu Sàn (Net)</p></div>
            <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm"><div className="flex justify-between mb-4 text-blue-600"><Users/><span className="bg-blue-50 px-2 py-1 rounded text-xs font-bold">Active</span></div><h3 className="text-3xl font-black text-slate-800">{stats.users || 1240}</h3><p className="text-slate-500 text-sm font-medium">Thành viên</p></div>
            <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm"><div className="flex justify-between mb-4 text-orange-600"><BookOpen/><span className="bg-orange-50 px-2 py-1 rounded text-xs font-bold">New</span></div><h3 className="text-3xl font-black text-slate-800">{courses.length}</h3><p className="text-slate-500 text-sm font-medium">Khóa học</p></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-200"><h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><TrendingUp size={20}/> Tăng trưởng dòng tiền</h3><div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="colorR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="value" stroke="#4f46e5" fill="url(#colorR)"/></AreaChart></ResponsiveContainer></div></div>
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200"><h3 className="font-bold text-slate-800 mb-6">Cơ cấu doanh thu</h3><div className="h-64"><ResponsiveContainer><PieChart><Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value"><Cell fill="#4f46e5"/><Cell fill="#e2e8f0"/></Pie><Tooltip/></PieChart></ResponsiveContainer></div><div className="flex justify-center gap-4 text-sm font-bold text-slate-600"><span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-600 rounded-full"></span>Sàn</span><span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-200 rounded-full"></span>Đối tác</span></div></div>
          </div>
        </>
      )}

      {/* FINANCE TAB */}
      {activeTab === 'finance' && (
         <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-6">Lịch sử giao dịch & Dòng tiền</h3>
            <div className="space-y-4">
               {stats.transactions && stats.transactions.map((t,i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
                     <div className="flex gap-4 items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${i%2===0?'bg-green-100 text-green-600':'bg-orange-100 text-orange-600'}`}>{i%2===0?'IN':'OUT'}</div>
                        <div><p className="font-bold text-slate-900 text-lg">{i%2===0 ? 'Nhận tiền từ' : 'Thanh toán cho'} {t.full_name}</p><p className="text-sm text-slate-500 font-medium">{t.created_at}</p></div>
                     </div>
                     <span className={`font-black text-xl ${i%2===0?'text-green-600':'text-orange-600'}`}>{i%2===0?'+':'-'}{formatMoney(t.total_amount)}</span>
                  </div>
               ))}
               {!stats.transactions.length && <p className="text-slate-400 text-center py-10 font-bold">Chưa có giao dịch nào.</p>}
            </div>
         </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100 flex gap-4"><div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3"><Search className="text-slate-400"/><input placeholder="Tìm kiếm người dùng..." className="bg-transparent outline-none w-full font-bold text-slate-600"/></div><button className="bg-indigo-600 text-white px-6 rounded-xl font-bold">Tìm kiếm</button></div>
           <table className="w-full text-left"><thead className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold tracking-wider"><tr><th className="p-6">User</th><th className="p-6">Role</th><th className="p-6">Status</th><th className="p-6 text-right">Action</th></tr></thead><tbody className="divide-y divide-slate-100"><tr className="hover:bg-slate-50"><td className="p-6 font-bold text-slate-800">Nguyễn Văn A</td><td className="p-6"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">Student</span></td><td className="p-6 text-green-600 font-bold">Active</td><td className="p-6 text-right flex justify-end gap-2"><button className="p-2 bg-slate-100 rounded-lg hover:text-indigo-600"><Edit size={16}/></button><button className="p-2 bg-slate-100 rounded-lg text-rose-500 hover:bg-rose-100"><Ban size={16}/></button></td></tr></tbody></table>
        </div>
      )}

      {/* MARKETING TAB */}
      {activeTab === 'marketing' && (
         <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"><h3 className="font-bold text-slate-800 mb-4">Chiến dịch đang chạy</h3><div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 mb-4"><div className="flex justify-between mb-2"><span className="font-bold text-indigo-700">Back to School</span><span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Active</span></div><p className="text-sm text-indigo-600">Giảm 20% toàn bộ khóa học THPT</p></div><button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800">+ Tạo chiến dịch mới</button></div>
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"><h3 className="font-bold text-slate-800 mb-4">Mã giảm giá (Coupons)</h3><div className="space-y-2">{['STUDY2025', 'WELCOME'].map(c => (<div key={c} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl"><span className="font-mono font-bold text-slate-700">{c}</span><span className="text-xs text-slate-400">100/500 lượt dùng</span></div>))}</div></div>
         </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
         <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Cấu hình hệ thống</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center p-4 border rounded-2xl"><div><h4 className="font-bold">Chế độ bảo trì</h4><p className="text-sm text-slate-500">Tạm dừng truy cập người dùng</p></div><div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div></div></div>
               <div className="flex justify-between items-center p-4 border rounded-2xl"><div><h4 className="font-bold">Cho phép đăng ký mới</h4><p className="text-sm text-slate-500">Mở cổng đăng ký tài khoản</p></div><div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div></div></div>
            </div>
         </div>
      )}
    </div>
  );
};
export default AdminView;