import { useEffect, useState } from 'react';
import {
  LayoutDashboard, BookOpen, ShoppingBag, Users, BarChart3, Bell, Search, PlayCircle,
  Sparkles, MessageCircle, Calendar, FileText, Settings, DollarSign, Megaphone,
  Star, CheckCircle2, Clock, ChevronDown, ChevronUp, User, HelpCircle, Gift, LogOut,
  Check, X, Trophy, ArrowRight, ArrowLeft
} from 'lucide-react';
import { API_URL, getEmbedLink, formatMoney } from './utils/helpers';
import { SidebarItem, Modal } from './components/Common';
import StudentView from './pages/StudentView';
import TeacherView from './pages/TeacherView';
import AdminView from './pages/AdminView';
import LandingPage from './pages/LandingPage';

// --- QUIZ COMPONENT GIẢ LẬP (MỚI) ---
// --- BỘ CÂU HỎI CHUẨN MÔN (DATA MỚI) ---
// --- BỘ CÂU HỎI CHUẨN MÔN (DATA MỚI THEO YÊU CẦU) ---
const QUIZ_DATA = {
  // ID 1: Toán 12
  1: [
      { q: "Hàm số y = x^3 - 3x^2 + 2 đồng biến trên khoảng nào?", a: ["(0; 2)", "(-∞; 0) và (2; +∞)", "(-∞; 2)", "(0; +∞)"], correct: 1 },
      { q: "Số điểm cực trị của hàm số y = x^4 - 2x^2 + 1 là?", a: ["1", "2", "3", "0"], correct: 2 },
      { q: "Giá trị lớn nhất của hàm số y = sin(x) + cos(x) là?", a: ["1", "2", "√2", "0"], correct: 2 },
      { q: "Tiệm cận đứng của đồ thị hàm số y = (2x+1)/(x-1) là?", a: ["x = 1", "x = -1", "y = 2", "y = 1"], correct: 0 }
  ],
  // ID 2: Vật Lý 12
  2: [
      { q: "Trong đoạn mạch RLC nối tiếp, hiện tượng cộng hưởng xảy ra khi?", a: ["ZL > ZC", "ZL < ZC", "ZL = ZC", "R = 0"], correct: 2 },
      { q: "Cường độ dòng điện hiệu dụng được tính bằng công thức nào?", a: ["I = I0", "I = I0/2", "I = I0/√2", "I = 2I0"], correct: 2 },
      { q: "Máy biến áp là thiết bị dùng để?", a: ["Biến đổi điện áp xoay chiều", "Biến đổi dòng điện một chiều", "Tạo ra dòng điện", "Lưu trữ điện năng"], correct: 0 }
  ],
  // ID 3: Hóa Học 12
  3: [
      { q: "Este nào sau đây có mùi chuối chín?", a: ["Etyl fomat", "Isoamyl axetat", "Benzyl axetat", "Etyl butirat"], correct: 1 },
      { q: "Chất béo là trieste của axit béo với?", a: ["Etanol", "Metanol", "Glixerol", "Etylen glicol"], correct: 2 },
      { q: "Phản ứng thủy phân chất béo trong môi trường kiềm gọi là?", a: ["Phản ứng este hóa", "Phản ứng xà phòng hóa", "Phản ứng tráng bạc", "Phản ứng cộng H2"], correct: 1 }
  ],
  // ID 4: TOEIC
  4: [
      { q: "The meeting will be held ______ Monday morning.", a: ["in", "at", "on", "by"], correct: 2 },
      { q: "Mr. Smith ______ to the meeting yesterday.", a: ["go", "went", "gone", "goes"], correct: 1 },
      { q: "Please ______ the document attached below.", a: ["find", "look", "watch", "see"], correct: 0 }
  ],
  // ID 5: Toán 9
  5: [
      { q: "Căn bậc hai số học của 9 là?", a: ["3", "-3", "±3", "81"], correct: 0 },
      { q: "Đồ thị hàm số y = ax^2 (a ≠ 0) có dạng là?", a: ["Đường thẳng", "Parabol", "Hyperbol", "Đường tròn"], correct: 1 },
      { q: "Hệ phương trình bậc nhất hai ẩn có thể giải bằng phương pháp nào?", a: ["Thế", "Cộng đại số", "Đồ thị", "Cả 3 cách trên"], correct: 3 }
  ],
  // ID 6: Lập trình Scratch
  6: [
      { q: "Trong Scratch, khối lệnh nào dùng để di chuyển nhân vật?", a: ["Move 10 steps", "Say Hello", "Wait 1 sec", "Turn 15 degrees"], correct: 0 },
      { q: "Để bắt đầu chương trình, ta thường dùng khối lệnh nào?", a: ["When green flag clicked", "When space key pressed", "Forever", "If...then"], correct: 0 },
      { q: "Nhân vật mặc định trong Scratch là con gì?", a: ["Chó", "Mèo", "Chuột", "Chim"], correct: 1 }
  ],
  // ID 7: Tiếng Anh 9
  7: [
      { q: "We wish we ______ a bigger house.", a: ["have", "had", "will have", "has"], correct: 1 },
      { q: "She asked me where I ______ from.", a: ["come", "came", "coming", "comes"], correct: 1 },
      { q: "If I were you, I ______ learn English harder.", a: ["will", "would", "can", "shall"], correct: 1 }
  ]
};
// --- QUIZ COMPONENT GIẢ LẬP (ĐÃ FIX LỖI TỐI MÀU) ---
// --- COMPONENT QUIZ (ĐÃ FIX LỖI TỐI + NHẬN COURSE ID) ---
const QuizSimulator = ({ courseId, onFinish }) => {
  const [step, setStep] = useState('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  
  // Lấy câu hỏi theo ID khóa học, mặc định là Toán (ID 1) nếu không tìm thấy
  const questions = QUIZ_DATA[courseId] || QUIZ_DATA[1]; 

  const handleAnswer = (idx) => {
    if (idx === questions[currentQ].correct) setScore(score + 1);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('result');
      if(onFinish) onFinish();
    }
  };

  if (step === 'start') return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-10 text-center animate-fade-in-up">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6 shadow-sm"><HelpCircle size={40} /></div>
      <h3 className="text-2xl font-black text-slate-800 mb-2">Bài kiểm tra kiến thức</h3>
      <p className="text-slate-500 mb-8 max-w-md">Bài thi gồm {questions.length} câu hỏi trắc nghiệm. Hãy chọn đáp án chính xác nhất.</p>
      <button onClick={() => setStep('playing')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg hover:scale-105 transition-all">Bắt đầu làm bài</button>
    </div>
  );

  if (step === 'result') return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-10 text-center animate-fade-in-up">
      <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-6 shadow-md"><Trophy size={48} /></div>
      <h3 className="text-3xl font-black text-slate-800 mb-2">Kết quả: {score}/{questions.length}</h3>
      <p className="text-slate-500 mb-8 font-medium">
        {score >= questions.length - 1 ? "Xuất sắc! Bạn đã nắm vững kiến thức." : "Hãy ôn tập lại kiến thức nhé!"}
      </p>
      <button onClick={() => { setStep('start'); setScore(0); setCurrentQ(0); }} className="px-6 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Làm lại</button>
    </div>
  );

  return (
    // QUAN TRỌNG: Thêm bg-white ở đây để không bị tối đen
    <div className="w-full h-full bg-white overflow-y-auto custom-scrollbar">
        <div className="max-w-2xl mx-auto p-8 min-h-full flex flex-col justify-center animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Câu hỏi {currentQ + 1}/{questions.length}</span>
            <span className="text-xs font-bold text-indigo-600">Điểm: {score}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">{questions[currentQ].q}</h3>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQ].a.map((ans, i) => (
              <button key={i} onClick={() => handleAnswer(i)} className="p-4 rounded-xl border-2 border-slate-100 text-left font-medium hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold group-hover:bg-indigo-200 group-hover:text-indigo-700">{String.fromCharCode(65+i)}</div>
                {ans}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
};

function App() {
  // 1. QUẢN LÝ USER
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [role, setRole] = useState(currentUser?.role || 'student');
  useEffect(() => {
    if (currentUser) { localStorage.setItem('current_user', JSON.stringify(currentUser)); setRole(currentUser.role); } 
    else { localStorage.removeItem('current_user'); }
  }, [currentUser]);

  const isLoggedIn = !!currentUser;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [page, setPage] = useState('home');
  const [courses, setCourses] = useState([]);
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => { localStorage.setItem('shopping_cart', JSON.stringify(cart)); }, [cart]);

  const [myCourses, setMyCourses] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, users: 0, courses: 0, transactions: [] });

  const [activeModal, setActiveModal] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessonList, setLessonList] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [detailTab, setDetailTab] = useState('intro');

  const [formData, setFormData] = useState({ id: null, title: '', price: '', level: 'cap1', teacher_name: '', description: '', video: '', image: '', lessons: [] });
  const [isLoading, setIsLoading] = useState(false);

  // --- API ---
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/data.php`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
      if (role === 'admin') {
        const resStats = await fetch(`${API_URL}/stats.php`);
        setStats(await resStats.json());
      }
    } catch (e) { console.error(e); }
  }; 
  useEffect(() => { if (isLoggedIn) fetchData(); }, [role, isLoggedIn]);

  const fetchLessons = (courseId, cb) => {
    fetch(`${API_URL}/get_lessons.php?id=${courseId}`)
      .then(r => r.json())
      .then(d => {
        const lessons = Array.isArray(d) ? d : (d.lessons || []);
        setLessonList(lessons);
        if (lessons.length > 0) setCurrentLesson(lessons[0]);
        if (cb) cb(lessons);
      })
      .catch(err => console.error("Lỗi tải bài học:", err));
  };

  // --- HANDLERS LOGIC ---
  const handleNextLesson = () => {
    if (!currentLesson || !lessonList.length) return;
    const idx = lessonList.findIndex(l => l.id === currentLesson.id);
    if (idx !== -1 && idx < lessonList.length - 1) {
        setCurrentLesson(lessonList[idx + 1]);
    } else {
        alert("Chúc mừng! Bạn đã hoàn thành khóa học 🎉");
    }
  };

  const handlePrevLesson = () => {
    if (!currentLesson || !lessonList.length) return;
    const idx = lessonList.findIndex(l => l.id === currentLesson.id);
    if (idx > 0) {
        setCurrentLesson(lessonList[idx - 1]);
    }
  };

  const handleOpenDetail = (course) => {
    setSelectedCourse(course);
    setDetailTab('intro');
    fetchLessons(course.id);
    setActiveModal('detail');
  };

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/auth.php`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });
      const data = await res.json();
      if (data.success) { setCurrentUser(data.user); setShowLoginModal(false); } 
      else { alert("❌ " + data.message); }
    } catch (err) { alert("Lỗi kết nối đến Server!"); }
  };

  const handleLogout = () => { if(confirm("Bạn có chắc muốn đăng xuất?")) { setCurrentUser(null); setPage('home'); } };

  const handleSaveCourse = () => {
      if (!formData.title) { alert("Vui lòng nhập tên khóa học!"); return; }
      setIsLoading(true);
      const url = formData.id ? '/update.php' : '/add.php';
      const payload = {
          ...formData, id: formData.id, price: formData.price ? parseInt(formData.price) : 0,
          teacher_id: currentUser ? currentUser.id : 0, teacher_name: currentUser ? currentUser.full_name : 'Giảng viên',
          video: getEmbedLink(formData.video), image: formData.image || 'https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg'
      };
      fetch(`${API_URL}${url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(r => r.json()).then(d => {
          if (d.success) {
              const cid = formData.id || d.id; 
              if (!cid) { setIsLoading(false); return; }
              fetch(`${API_URL}/save_lessons.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ course_id: cid, lessons: formData.lessons }) })
              .then(() => { alert(formData.id ? "✅ Cập nhật thành công!" : "✅ Tạo khóa học mới thành công!"); setActiveModal(null); fetchData(); });
          } else { alert("Lỗi từ server: " + (d.message || "Không xác định")); }
      }).catch(err => alert("Lỗi kết nối Server!")).finally(() => setIsLoading(false));
  };

  const handlePayment = () => {
    const userId = currentUser ? currentUser.id : 1;
    const total = cart.reduce((t, c) => t + parseInt(c.price), 0);
    fetch(`${API_URL}/buy.php`, { method: 'POST', body: JSON.stringify({ user_id: userId, total: total }) })
      .then(res => res.json()).then(data => {
        if (data.success) { setMyCourses([...myCourses, ...cart]); setCart([]); fetchData(); alert("🎉 Thanh toán thành công!"); setPage('my-learning'); } 
        else alert("Lỗi: " + data.message);
      });
  };

  const handleDeleteCourse = (course) => {
    if (!confirm(`Bạn có chắc muốn xóa khóa học: "${course.title}"?`)) return;
    fetch(`${API_URL}/delete.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: course.id }) })
      .then(res => res.json()).then(data => { if (data.success) { alert("✅ Đã xóa khóa học thành công!"); setCourses(courses.filter(c => c.id !== course.id)); fetchData(); } else alert("❌ Lỗi: " + data.message); });
  };

  // --- RENDER ---
  if (!isLoggedIn) {
    return (
      <>
        <LandingPage onLoginClick={() => setShowLoginModal(true)} />
        {showLoginModal && ( <Modal title="Đăng nhập hệ thống" onClose={() => setShowLoginModal(false)} maxWidth="max-w-md"> <LoginForm onSubmit={handleLogin} /> </Modal> )}
      </>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-5 hidden md:flex z-30 shadow-sm">
        <div className="flex items-center gap-3 mb-10 px-2"><div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${role === 'admin' ? 'bg-slate-900' : role === 'teacher' ? 'bg-purple-600' : 'bg-indigo-600'}`}><BookOpen size={24} /></div><h1 className="text-2xl font-black text-slate-900">StudyHub.</h1></div>
        <nav className="flex-1 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
          {role === 'student' && <><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-4">Học tập</div><SidebarItem id="home" icon={LayoutDashboard} label="Khám phá" active={page === 'home'} onClick={setPage} /><SidebarItem id="ai-planner" icon={Sparkles} label="Lộ trình AI" active={page === 'ai-planner'} onClick={setPage} /><SidebarItem id="my-learning" icon={PlayCircle} label="Góc học tập" active={page === 'my-learning'} onClick={setPage} /><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-6">Cá nhân</div><SidebarItem id="cart" icon={ShoppingBag} label="Balo của bạn" active={page === 'cart'} onClick={setPage} badge={cart.length} /><SidebarItem id="community" icon={Users} label="Cộng đồng" active={page === 'community'} onClick={setPage} /><SidebarItem id="cert" icon={FileText} label="Chứng chỉ" active={page === 'cert'} onClick={setPage} /></>}
          {role === 'teacher' && <><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-4">Giảng dạy</div><SidebarItem id="home" icon={LayoutDashboard} label="Tổng quan" active={page === 'home'} onClick={setPage} /><SidebarItem id="schedule" icon={Calendar} label="Lịch dạy" active={page === 'schedule'} onClick={setPage} /><SidebarItem id="qa" icon={MessageCircle} label="Hỏi đáp" active={page === 'qa'} onClick={setPage} /></>}
          {role === 'admin' && <><div className="text-xs font-black text-slate-400 uppercase tracking-wider px-4 mb-2 mt-4">Quản trị</div><SidebarItem id="home" icon={BarChart3} label="Dashboard" active={page === 'home'} onClick={setPage} /><SidebarItem id="finance" icon={DollarSign} label="Tài chính" active={page === 'finance'} onClick={setPage} /><SidebarItem id="users" icon={Users} label="Người dùng" active={page === 'users'} onClick={setPage} /><SidebarItem id="marketing" icon={Megaphone} label="Marketing" active={page === 'marketing'} onClick={setPage} /><SidebarItem id="settings" icon={Settings} label="Cấu hình" active={page === 'settings'} onClick={setPage} /></>}
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4 group relative">
                <img src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${role}&background=random`} className="w-10 h-10 rounded-full" />
                <div className="flex-1 overflow-hidden"><p className="text-sm font-bold capitalize truncate">{currentUser?.full_name}</p><p className="text-[10px] text-slate-500 uppercase font-bold">{role}</p></div>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Đăng xuất"><LogOut size={18} /></button>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg opacity-50 hover:opacity-100 transition-opacity">
                <button onClick={() => { const u = { id: 1, full_name: 'Bạn Học Sinh', role: 'student', email: 'student@studyhub.vn' }; setCurrentUser(u); setRole('student'); setPage('home'); }} className={`text-[10px] font-bold uppercase py-1 rounded ${role === 'student' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>STU</button>
                <button onClick={() => { const u = { id: 2, full_name: 'Cô Giáo Mai', role: 'teacher', email: 'mai.gv@studyhub.vn' }; setCurrentUser(u); setRole('teacher'); setPage('home'); }} className={`text-[10px] font-bold uppercase py-1 rounded ${role === 'teacher' ? 'bg-white shadow text-purple-600' : 'text-slate-400'}`}>TEA</button>
                <button onClick={() => { const u = { id: 3, full_name: 'Admin Hệ Thống', role: 'admin', email: 'admin@studyhub.vn' }; setCurrentUser(u); setRole('admin'); setPage('home'); }} className={`text-[10px] font-bold uppercase py-1 rounded ${role === 'admin' ? 'bg-white shadow text-slate-900' : 'text-slate-400'}`}>ADM</button>
            </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        <header className="h-20 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20"><div className="flex items-center gap-3 bg-slate-100 px-4 py-2.5 rounded-full w-96"><Search size={18} className="text-slate-400" /><input placeholder="Tìm kiếm..." className="bg-transparent border-none outline-none text-sm w-full" /></div><div className="flex gap-4"><button className="relative p-2.5 bg-white border rounded-full text-slate-600 hover:bg-slate-50"><Bell size={20} /></button></div></header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {role === 'student' && <StudentView currentUser={currentUser} page={page} setPage={setPage} courses={courses} cart={cart} myCourses={myCourses} handleAddToCart={(c) => setCart([...cart, c])} removeFromCart={(i) => setCart(cart.filter((_, idx) => idx !== i))} handlePayment={handlePayment} onOpenDetail={handleOpenDetail} onOpenPromo={() => setActiveModal('promo')} onOpenLearning={(c) => { setSelectedCourse(c); fetchLessons(c.id); setActiveModal('learning'); }} />}
          {role === 'teacher' && <TeacherView currentUser={currentUser} courses={courses} onOpenUpload={() => { setFormData({ id: null, title: '', price: '', level: 'cap1', teacher_name: '', description: '', video: '', image: '', lessons: [] }); setActiveModal('upload'); }} onEditCourse={(c) => { fetchLessons(c.id, (l) => { setFormData({ ...c, lessons: l }); setActiveModal('upload'); }); }} page={page} />}
          {role === 'admin' && <AdminView courses={courses} stats={stats} onDeleteCourse={handleDeleteCourse} page={page} onAddNewCourse={() => { setFormData({ id: null, title: '', price: '', level: 'cap1', teacher_name: '', description: '', video: '', image: '', lessons: [] }); setActiveModal('upload'); }} onEditCourse={(c) => { fetchLessons(c.id, (l) => { setFormData({ ...c, lessons: l }); setActiveModal('upload'); }); }} />}
        </div>
      </main>

      {/* --- MODAL CHI TIẾT KHÓA HỌC --- */}
      {activeModal === 'detail' && selectedCourse && (
        <Modal title="Chi tiết khóa học" onClose={() => setActiveModal(null)} maxWidth="max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            <div className="w-full lg:w-5/12 space-y-6">
              <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative group">
                {(selectedCourse.id == 4 || selectedCourse.id === '4') && (<div className="absolute top-0 right-0 z-10"><div className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl shadow-xl flex items-center gap-2 uppercase tracking-wider"><span className="animate-pulse">🔥</span> BESTSELLER</div></div>)}
                {selectedCourse.video ? <iframe className="w-full h-full" src={getEmbedLink(selectedCourse.video)} frameBorder="0" allowFullScreen></iframe> : <img src={selectedCourse.image} className="w-full h-full object-cover" />}
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedCourse.title}</h2>
                <p className="text-3xl font-black text-indigo-600 mb-4">{parseInt(selectedCourse.price) === 0 ? 'Miễn phí' : formatMoney(selectedCourse.price)}</p>
                <button onClick={() => { setCart([...cart, selectedCourse]); setActiveModal(null); }} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-indigo-600 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"><ShoppingBag size={20} /> Thêm vào giỏ</button>
                <div className="mt-6 space-y-3">
                   <div className="flex justify-between text-sm"><span className="text-slate-500">Giảng viên</span><span className="font-bold">{selectedCourse.teacher_name}</span></div>
                   <div className="flex justify-between text-sm"><span className="text-slate-500">Thời lượng</span><span className="font-bold">{selectedCourse.duration || '20 giờ'}</span></div>
                   <div className="flex justify-between text-sm"><span className="text-slate-500">Cấp độ</span><span className="font-bold uppercase">{selectedCourse.level}</span></div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex border-b border-slate-200 mb-6">
                {[{ id: 'intro', l: 'Giới thiệu' }, { id: 'lessons', l: `Nội dung (${lessonList.length})` }, { id: 'reviews', l: 'Đánh giá' }].map(t => (<button key={t.id} onClick={() => setDetailTab(t.id)} className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${detailTab === t.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>{t.l}</button>))}
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 h-[400px]">
                {detailTab === 'intro' && (<div className="space-y-4 text-slate-600 leading-relaxed"><p className="font-medium text-lg text-slate-800">Bạn sẽ học được gì?</p><ul className="grid grid-cols-1 gap-2 mb-4">{['Nắm vững kiến thức nền tảng.', 'Luyện tập với bộ đề thi thực chiến.', 'Giải đáp thắc mắc trực tiếp cùng giáo viên.', 'Chứng chỉ hoàn thành khóa học.'].map((item, i) => (<li key={i} className="flex gap-2 items-start"><CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" /> <span>{item}</span></li>))}</ul></div>)}
                {detailTab === 'lessons' && (<div className="space-y-3">{lessonList.length === 0 && <p className="text-slate-400 italic">Đang cập nhật nội dung...</p>}{lessonList.map((l, i) => (<div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all cursor-default"><div className="flex gap-3 items-center"><div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">{i + 1}</div><div><p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{l.title}</p><p className="text-xs text-slate-500">{l.type === 'quiz' ? 'Bài kiểm tra' : 'Video bài giảng'} • {l.duration}</p></div></div>{l.type === 'video' ? <PlayCircle size={18} className="text-slate-400" /> : <FileText size={18} className="text-slate-400" />}</div>))}</div>)}
                {detailTab === 'reviews' && (<div className="space-y-4">{[1, 2, 3].map(i => (<div key={i} className="border-b border-slate-100 pb-4"><div className="flex gap-3 items-center mb-2"><div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-xs text-slate-600"><User size={14} /></div><div><p className="font-bold text-sm text-slate-800">Học viên ẩn danh</p><div className="flex text-yellow-400 text-[10px]"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div></div></div><p className="text-sm text-slate-600">Khóa học rất hay, thầy dạy dễ hiểu.</p></div>))}</div>)}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --- MODAL UPLOAD KHÓA HỌC (TEACHER/ADMIN) --- */}
      {activeModal === 'upload' && (
        <Modal title={formData.id ? "Cập nhật nội dung" : "Soạn khóa học mới"} onClose={() => setActiveModal(null)} maxWidth="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {role === 'admin' && (<div className="space-y-2"><label className="text-xs font-black text-indigo-600 uppercase">Phân công Giảng viên</label><input placeholder="Nhập tên giảng viên phụ trách..." value={formData.teacher_name} onChange={e => setFormData({ ...formData, teacher_name: e.target.value })} className="w-full p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl font-bold outline-none focus:ring-2 ring-indigo-500" /></div>)}
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Tên khóa học</label><input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl font-bold outline-none focus:border-slate-400" /></div>
              <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Học phí (VNĐ)</label><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl font-bold outline-none" /></div><div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Cấp độ</label><select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl outline-none font-bold"><option value="cap1">Tiểu học (CAP1)</option><option value="cap2">THCS (CAP2)</option><option value="cap3">THPT (CAP3)</option></select></div></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase">Link Video Giới thiệu</label><input value={formData.video} onChange={e => setFormData({ ...formData, video: e.target.value })} placeholder="Youtube link..." className="w-full p-3 bg-slate-50 border rounded-xl outline-none" /></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col">
              <div className="flex justify-between items-center mb-4"><label className="text-xs font-black text-slate-500 uppercase">Cấu trúc bài giảng ({formData.lessons.length})</label><button onClick={() => setFormData({ ...formData, lessons: [...formData.lessons, { title: '', type: 'video', duration: '15:00' }] })} className="text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-600 transition-colors">+ THÊM BÀI MỚI</button></div>
              <div className="flex-1 overflow-y-auto space-y-3 max-h-[300px] pr-2 custom-scrollbar">
                {formData.lessons.map((l, i) => (<div key={i} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2"><div className="flex gap-2 items-center"><span className="text-[10px] font-black text-slate-400 w-4">{i + 1}</span><input placeholder="Tên bài học..." value={l.title} onChange={e => { const n = [...formData.lessons]; n[i].title = e.target.value; setFormData({ ...formData, lessons: n }); }} className="flex-1 text-sm font-bold outline-none" /><button className="text-slate-300 hover:text-red-500" onClick={() => { const n = [...formData.lessons]; n.splice(i, 1); setFormData({ ...formData, lessons: n }); }}><X size={14} /></button></div><div className="flex gap-4"><select value={l.type} onChange={e => { const n = [...formData.lessons]; n[i].type = e.target.value; setFormData({ ...formData, lessons: n }); }} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded"><option value="video">Video</option><option value="quiz">Quiz</option></select><input placeholder="Thời lượng" value={l.duration} onChange={e => { const n = [...formData.lessons]; n[i].duration = e.target.value; setFormData({ ...formData, lessons: n }); }} className="text-[10px] font-medium text-slate-500 outline-none w-20" /></div></div>))}
              </div>
              <button onClick={handleSaveCourse} disabled={isLoading || !formData.title} className={`mt-6 w-full py-4 rounded-xl font-black text-sm tracking-widest transition-all ${isLoading ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:scale-[1.02]'}`}>{isLoading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN LƯU HỆ THỐNG'}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* --- MODAL HỌC TẬP (MÀN HÌNH HỌC) --- */}
      {/* --- MODAL HỌC TẬP (MÀN HÌNH HỌC) --- */}
      {activeModal === 'learning' && selectedCourse && (
        <Modal title={`Đang học: ${selectedCourse.title}`} onClose={() => setActiveModal(null)} maxWidth="max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 h-[80vh]">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-lg relative group border border-slate-800">
                {currentLesson ? (
                  currentLesson.type === 'quiz' ? (
                    // --- SỬA Ở ĐÂY: Truyền selectedCourse.id vào QuizSimulator ---
                    <QuizSimulator courseId={selectedCourse.id} onFinish={() => handleNextLesson()} />
                  ) : (
                    <iframe className="w-full h-full" src={getEmbedLink(currentLesson.video_url || currentLesson.video)} title="Lesson Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  )
                ) : (<div className="flex items-center justify-center h-full text-white">Chọn một bài học để bắt đầu</div>)}
              </div>
              <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
                <div><h3 className="font-bold text-lg text-slate-800">{currentLesson?.title || 'Chưa chọn bài'}</h3><p className="text-sm text-slate-500">Thời lượng: {currentLesson?.duration}</p></div>
                <div className="flex gap-2">
                    <button onClick={handlePrevLesson} className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-sm text-slate-600 flex items-center gap-1"><ArrowLeft size={16}/> Bài trước</button>
                    <button onClick={handleNextLesson} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-sm text-white flex items-center gap-1">Bài tiếp theo <ArrowRight size={16}/></button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 bg-slate-50"><h4 className="font-bold text-slate-800">Nội dung khóa học</h4><p className="text-xs text-slate-500 mt-1">{lessonList.length} bài học</p></div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {lessonList.map((l, i) => (
                  <div key={i} onClick={() => setCurrentLesson(l)} className={`p-3 rounded-lg cursor-pointer transition-all flex gap-3 items-center ${currentLesson?.id === l.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${currentLesson?.id === l.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{i + 1}</div>
                    <div className="flex-1 min-w-0"><p className={`text-sm font-medium truncate ${currentLesson?.id === l.id ? 'text-indigo-700' : 'text-slate-700'}`}>{l.title}</p><div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">{l.type === 'video' ? <PlayCircle size={10} /> : <HelpCircle size={10} />}<span>{l.duration}</span></div></div>
                    {currentLesson?.id === l.id && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* --- MODAL LOGIN (FORM) --- */}
      {showLoginModal && (
        <Modal title="Đăng nhập hệ thống" onClose={() => setShowLoginModal(false)} maxWidth="max-w-md">
           <LoginForm onSubmit={handleLogin} />
        </Modal>
      )}

    </div>
  );
}

// --- FORM LOGIN ---
const LoginForm = ({ onSubmit }) => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  return (
    <div className="space-y-4 p-4">
      <div><label className="block text-sm font-bold text-slate-700 mb-1">Tài khoản</label><input value={u} onChange={e => setU(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ví dụ: student" autoFocus /></div>
      <div><label className="block text-sm font-bold text-slate-700 mb-1">Mật khẩu</label><input type="password" value={p} onChange={e => setP(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ví dụ: 123" onKeyDown={(e) => e.key === 'Enter' && onSubmit(u, p)} /></div>
      <button onClick={() => onSubmit(u, p)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black shadow-lg hover:bg-indigo-700 transition-all">ĐĂNG NHẬP NGAY</button>
      <p className="text-center text-xs text-slate-400">Gợi ý: student / 123</p>
    </div>
  );
};

export default App;