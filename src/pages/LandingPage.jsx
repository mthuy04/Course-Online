import { Sparkles, ChevronRight, CheckCircle, PlayCircle, Star, Users } from 'lucide-react';

const LandingPage = ({ onLoginClick }) => {
  return (
    <div className="bg-white font-sans text-slate-800 h-screen overflow-y-auto">
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden bg-slate-900 pt-16 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="mb-8 flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-indigo-300 backdrop-blur-sm">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm font-bold">Nền tảng học tập số 1 Việt Nam</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl mb-6">
            Khơi dậy tiềm năng <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Chinh phục tri thức</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl">
            StudyHub cung cấp lộ trình học tập cá nhân hóa từ Tiểu học đến Trung học phổ thông. Công nghệ AI giúp bạn học nhanh hơn, nhớ lâu hơn.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={onLoginClick} className="rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-500/30 hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center gap-2">
              Bắt đầu học ngay <ChevronRight />
            </button>
            <button className="text-sm font-bold leading-6 text-white flex items-center gap-2 hover:text-indigo-300 transition-colors">
              <PlayCircle /> Xem Video giới thiệu
            </button>
          </div>
        </div>
      </div>

      {/* 2. STATS SECTION */}
      <div className="-mt-16 relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 rounded-[32px] bg-white p-10 shadow-2xl shadow-slate-200 lg:grid-cols-3 border border-slate-100">
          {[
            { label: 'Học viên tin dùng', value: '1.2 Triệu', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Khóa học chất lượng', value: '5,000+', icon: PlayCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
            { label: 'Đánh giá 5 sao', value: '98%', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={32} />
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WHY CHOOSE US */}
      <div className="py-24 sm:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-bold leading-7 text-indigo-600 uppercase tracking-wider">Tại sao chọn StudyHub?</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Hệ sinh thái giáo dục toàn diện</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                { title: 'Lộ trình AI cá nhân hóa', desc: 'Hệ thống tự động phân tích điểm mạnh yếu để gợi ý bài học phù hợp nhất.' },
                { title: 'Đội ngũ giáo viên Top 1%', desc: 'Tuyển chọn từ các trường Đại học và THPT chuyên hàng đầu Việt Nam.' },
                { title: 'Học mọi lúc mọi nơi', desc: 'Nền tảng đa thiết bị, hỗ trợ học tập trên Web, Mobile và Tablet.' },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-start bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                  <div className="rounded-xl bg-indigo-600/10 p-3 text-indigo-600 mb-6">
                    <CheckCircle size={28} />
                  </div>
                  <dt className="text-xl font-bold leading-7 text-slate-900 mb-2">{feature.title}</dt>
                  <dd className="leading-7 text-slate-600">{feature.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <span className="text-2xl font-black text-slate-900">StudyHub.</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">© 2026 StudyHub Education Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;