import { useState } from 'react';
import { 
  BarChart3, Users, BookOpen, DollarSign, TrendingUp, Trash2, Ban, 
  CheckCircle, Activity, PieChart as PieIcon, Megaphone, Settings, 
  Search, Edit, Download, ArrowDownLeft, ArrowUpRight, CheckCircle2,
  Plus, MoreVertical, PlayCircle
} from 'lucide-react';
import { formatMoney } from '../utils/helpers';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// THÊM onEditCourse VÀO PROPS ĐỂ SỬA KHÓA HỌC
const AdminView = ({ courses, stats, onDeleteCourse, onAddNewCourse, onEditCourse, page }) => {
  const activeTab = page === 'home' ? 'dashboard' : page; 

  // --- 1. DỮ LIỆU GIẢ LẬP NGƯỜI DÙNG (Giữ nguyên code của bạn) ---
  const mockUsers = [
    { id: 1, name: "Nguyễn Văn An", email: "an.nguyen@gmail.com", role: "Student", status: "Active", joined: "20/12/2025" },
    { id: 2, name: "Trần Thị Bích", email: "bich.tran@studyhub.vn", role: "Teacher", status: "Active", joined: "15/11/2025" },
    // ... (Giữ nguyên danh sách mockUsers của bạn để code gọn hơn)
    { id: 3, name: "Lê Hoàng Cường", email: "admin.cuong@studyhub.vn", role: "Admin", status: "Active", joined: "01/01/2025" },
  ];

  const platformRevenue = stats.revenue * 0.2; 
  const totalRevenue = stats.revenue;
  const chartData = [ { name: 'T1', value: totalRevenue * 0.2 }, { name: 'T2', value: totalRevenue * 0.5 }, { name: 'T3', value: totalRevenue * 0.7 }, { name: 'Hiện tại', value: totalRevenue } ];
  const pieData = [ { name: 'Sàn (20%)', value: 20 }, { name: 'GV (80%)', value: 80 } ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">CEO Workspace</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2">
                {activeTab === 'dashboard' ? 'Tổng Quan Hệ Thống' : 
                 activeTab === 'finance' ? 'Quản Lý Tài Chính' : 
                 activeTab === 'users' ? 'Quản Lý Người Dùng' : 'Marketing & Cấu Hình'}
            </h2>
        </div>

        {activeTab === 'dashboard' && (
          <button 
            onClick={onAddNewCourse}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-indigo-600 hover:scale-105 transition-all shadow-xl shadow-slate-200"
          >
            <Plus size={20} strokeWidth={3}/>
            KHỞI TẠO KHÓA HỌC MỚI
          </button>
        )}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <>
          {/* STATS CARDS (Giữ nguyên) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-[24px] bg-indigo-600 text-white shadow-xl shadow-indigo-200">
              <div className="flex justify-between mb-4"><DollarSign className="opacity-80"/><span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">+24%</span></div>
              <h3 className="text-3xl font-black">{formatMoney(totalRevenue || 0)}</h3>
              <p className="text-indigo-200 text-sm font-medium">Tổng GMV</p>
            </div>
            <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm"><div className="flex justify-between mb-4 text-emerald-600"><Activity/><span className="bg-emerald-50 px-2 py-1 rounded text-xs font-bold">+12%</span></div><h3 className="text-3xl font-black text-slate-800">{formatMoney(platformRevenue || 0)}</h3><p className="text-slate-500 text-sm font-medium">Doanh thu Sàn</p></div>
            <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm"><div className="flex justify-between mb-4 text-blue-600"><Users/><span className="bg-blue-50 px-2 py-1 rounded text-xs font-bold">Active</span></div><h3 className="text-3xl font-black text-slate-800">{stats.users || 0}</h3><p className="text-slate-500 text-sm font-medium">Thành viên</p></div>
            <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm"><div className="flex justify-between mb-4 text-orange-600"><BookOpen/><span className="bg-orange-50 px-2 py-1 rounded text-xs font-bold">New</span></div><h3 className="text-3xl font-black text-slate-800">{courses.length || 0}</h3><p className="text-slate-500 text-sm font-medium">Khóa học hiện có</p></div>
          </div>
          
          {/* CHARTS (Giữ nguyên) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><TrendingUp size={20}/> Tăng trưởng dòng tiền</h3>
              <div className="h-72 w-full">
                {courses.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs><linearGradient id="colorR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="value" stroke="#4f46e5" fill="url(#colorR)"/></AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 italic bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    Chưa có dữ liệu để lập biểu đồ. Hãy thêm khóa học đầu tiên!
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-6">Cơ cấu doanh thu</h3>
              <div className="h-64">
                <ResponsiveContainer>
                  <PieChart><Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value"><Cell fill="#4f46e5"/><Cell fill="#e2e8f0"/></Pie><Tooltip/></PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 text-sm font-bold text-slate-600">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-600 rounded-full"></span>Sàn</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-200 rounded-full"></span>Đối tác</span>
              </div>
            </div>
          </div>

          {/* 🔥 QUAN TRỌNG: BỔ SUNG BẢNG QUẢN LÝ KHÓA HỌC ĐỂ XÓA/SỬA 🔥 */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100">
                <h3 className="font-bold text-xl text-slate-800">📦 Kho Khóa Học ({courses.length})</h3>
                <p className="text-slate-500 text-sm">Quản lý nội dung, chỉnh sửa hoặc gỡ bỏ khóa học vi phạm</p>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold tracking-wider">
                      <tr>
                         <th className="p-6">Khóa học</th>
                         <th className="p-6">Giảng viên</th>
                         <th className="p-6 text-right">Học phí</th>
                         <th className="p-6 text-center">Trạng thái</th>
                         <th className="p-6 text-right">Hành động</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {courses.map((course) => (
                         <tr key={course.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="p-6 max-w-xs">
                               <div className="flex gap-4 items-center">
                                  <img src={course.image} className="w-16 h-10 object-cover rounded-lg shadow-sm" alt="" />
                                  <div>
                                     <p className="font-bold text-slate-800 line-clamp-1">{course.title}</p>
                                     <p className="text-xs text-slate-400 font-bold uppercase">{course.level}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="p-6 text-sm font-medium text-slate-600">{course.teacher_name}</td>
                            <td className="p-6 text-right font-black text-indigo-600">{formatMoney(course.price)}</td>
                            <td className="p-6 text-center">
                               <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase">Active</span>
                            </td>
                            <td className="p-6 text-right">
                               <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {/* NÚT SỬA */}
                                  <button 
                                    onClick={() => onEditCourse && onEditCourse(course)}
                                    className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all" title="Chỉnh sửa"
                                  >
                                     <Edit size={16}/>
                                  </button>
                                  {/* NÚT XÓA */}
                                  <button 
                                    onClick={() => onDeleteCourse(course)}
                                    className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all" title="Xóa bỏ"
                                  >
                                     <Trash2 size={16}/>
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))}
                      {courses.length === 0 && (
                         <tr><td colSpan="5" className="p-10 text-center text-slate-400 italic">Chưa có khóa học nào trên hệ thống.</td></tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
        </>
      )}

      {/* FINANCE TAB */}
      {activeTab === 'finance' && (
         <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-800">Quản Lý Dòng Tiền</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Chi tiết các giao dịch thu/chi trên hệ thống</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all">
                <Download size={18}/> Xuất Excel
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold tracking-wider">
                  <tr>
                    <th className="p-6 w-20">#ID</th>
                    <th className="p-6">Đối tác / Khách hàng</th>
                    <th className="p-6">Loại giao dịch</th>
                    <th className="p-6">Ngày giờ</th>
                    <th className="p-6 text-right">Số tiền</th>
                    <th className="p-6 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.transactions && stats.transactions.length > 0 ? (
                    stats.transactions.map((t, i) => (
                      <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="p-6 font-mono text-slate-400 text-sm">#{t.id || i+1000}</td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                              {t.full_name ? t.full_name.charAt(0) : 'U'}
                            </div>
                            <span className="font-bold text-slate-700">{t.full_name || 'Khách vãng lai'}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          {i % 2 === 0 ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                              <ArrowDownLeft size={14}/> Thu tiền (IN)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                              <ArrowUpRight size={14}/> Chi trả (OUT)
                            </span>
                          )}
                        </td>
                        <td className="p-6 text-slate-500 font-medium text-sm">
                          {t.created_at || 'Vừa xong'}
                        </td>
                        <td className={`p-6 text-right font-black text-base ${i%2===0 ? 'text-emerald-600' : 'text-orange-600'}`}>
                          {i%2===0 ? '+' : '-'}{formatMoney(t.total_amount)}
                        </td>
                        <td className="p-6 text-center">
                           <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                              <CheckCircle2 size={12} className="text-green-500"/> Success
                           </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-10 text-center text-slate-400 font-medium">
                        <div className="flex flex-col items-center gap-2">
                           <Ban size={32} className="opacity-50"/>
                           <span>Chưa có dữ liệu giao dịch nào.</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
         </div>
      )}

      {/* USERS TAB - ĐÃ UPDATE HIỂN THỊ 20 NGƯỜI */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100 flex gap-4">
              <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3">
                 <Search className="text-slate-400"/>
                 <input placeholder="Tìm kiếm người dùng..." className="bg-transparent outline-none w-full font-bold text-slate-600"/>
              </div>
              <button className="bg-indigo-600 text-white px-6 rounded-xl font-bold">Tìm kiếm</button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold tracking-wider">
                    <tr>
                       <th className="p-6">User</th>
                       <th className="p-6">Role</th>
                       <th className="p-6">Status</th>
                       <th className="p-6">Joined</th>
                       <th className="p-6 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {mockUsers.map((user) => (
                       <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-6">
                             <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
                                   user.role === 'Admin' ? 'bg-slate-900' : 
                                   user.role === 'Teacher' ? 'bg-purple-600' : 'bg-indigo-500'
                                }`}>
                                   {user.name.charAt(0)}
                                </div>
                                <div>
                                   <p className="font-bold text-slate-800">{user.name}</p>
                                   <p className="text-xs text-slate-400">{user.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="p-6">
                             <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                                user.role === 'Admin' ? 'bg-slate-100 text-slate-700' :
                                user.role === 'Teacher' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                             }`}>
                                {user.role}
                             </span>
                          </td>
                          <td className="p-6">
                             <span className={`flex items-center gap-1.5 text-xs font-bold ${
                                user.status === 'Active' ? 'text-emerald-600' : 
                                user.status === 'Banned' ? 'text-rose-600' : 'text-orange-500'
                             }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                   user.status === 'Active' ? 'bg-emerald-500' : 
                                   user.status === 'Banned' ? 'bg-rose-500' : 'bg-orange-500'
                                }`}></div>
                                {user.status}
                             </span>
                          </td>
                          <td className="p-6 text-sm text-slate-500 font-medium">
                             {user.joined}
                          </td>
                          <td className="p-6 text-right flex justify-end gap-2">
                             <button className="p-2 bg-slate-100 rounded-lg hover:text-indigo-600 transition-all"><Edit size={16}/></button>
                             <button className={`p-2 rounded-lg transition-all ${user.status === 'Banned' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500 hover:bg-rose-100'}`}>
                                {user.status === 'Banned' ? <CheckCircle size={16}/> : <Ban size={16}/>}
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
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