import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Clock, Zap, Users, TrendingUp, Shield, Facebook, Youtube, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

const Landing = () => {

  // Demo online members count with smooth animation
  const [onlineMembers, setOnlineMembers] = useState(18415);
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineMembers((prev) => {
        let next = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 7);
        if (next < 12000) next = 12000;
        if (next > 20000) next = 20000;
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-accent/10 to-yellow-200 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-100 via-orange-100 to-red-100 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
        </div>
        <div className="container mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/80 shadow backdrop-blur border border-border mx-auto animate-fade-in">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-base font-medium text-green-700 tracking-wide">
              {onlineMembers.toLocaleString()} đang trực tuyến
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-extrabold mb-10 bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent tracking-tight leading-tight md:leading-[1.12] drop-shadow-lg"
            style={{ WebkitTextStroke: '0.5px transparent', overflowWrap: 'anywhere', wordBreak: 'break-word' }}
          >
            Phòng Học Ảo Của Bạn
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-2xl mx-auto font-medium animate-fade-in">
            Tập trung với phòng học video im lặng, hẹn giờ Pomodoro, chuỗi ngày học liên tục và cộng đồng sinh viên năng động.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/auth">
              <Button
                size="lg"
                className="gradient-primary shadow-glow text-lg px-10 py-6 font-bold text-white hover:scale-105 transition-transform duration-200"
              >
                🚀 Bắt đầu học miễn phí
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 font-bold border-2 border-primary/60 hover:bg-primary/10 hover:border-primary/80 transition-colors duration-200"
              >
                Xem các gói
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-base text-muted-foreground font-medium animate-fade-in">
            ✨ Không cần thẻ tín dụng • 🎯 Bắt đầu trong 30 giây
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-white/80 via-yellow-50/80 to-orange-50/80">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight animate-fade-in-up">
            Mọi thứ bạn cần để tập trung
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/60 bg-white/90 rounded-2xl group animate-fade-in">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Video className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Trách nhiệm bằng video</h3>
              <p className="text-muted-foreground text-base font-medium">
                Quan sát người khác đang học trong thời gian thực. Không có âm thanh, chỉ giữ im lặng và tập trung.
              </p>
            </Card>

            <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent/60 bg-white/90 rounded-2xl group animate-fade-in">
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-accent">Chuỗi học</h3>
              <p className="text-muted-foreground text-base font-medium">
                Theo dõi tiến trình hằng ngày và duy trì đà. Xem chuỗi học của bạn tăng lên từng ngày.
              </p>
            </Card>

            <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/60 bg-white/90 rounded-2xl group animate-fade-in">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Hẹn giờ Pomodoro</h3>
              <p className="text-muted-foreground text-base font-medium">
                Phiên tập trung 45 phút tích hợp với nghỉ 5 phút, giúp học bền vững.
              </p>
            </Card>

            <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent/60 bg-white/90 rounded-2xl group animate-fade-in">
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-accent">Tham gia phòng bất kỳ</h3>
              <p className="text-muted-foreground text-base font-medium">
                Chọn từ nhiều phòng học theo môn hoặc tham gia phòng học chung.
              </p>
            </Card>

            <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/60 bg-white/90 rounded-2xl group animate-fade-in">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Chế độ Hình ảnh trong Ảnh</h3>
              <p className="text-muted-foreground text-base font-medium">
                Giữ phòng học hiển thị khi bạn làm việc trong ứng dụng hoặc tab khác.
              </p>
            </Card>

            <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent/60 bg-white/90 rounded-2xl group animate-fade-in">
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-accent">Ưu tiên quyền riêng tư</h3>
              <p className="text-muted-foreground text-base font-medium">
                Mặc định tắt âm thanh. Quyền riêng tư của bạn quan trọng — học tập không gián đoạn.
              </p>
            </Card>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-24 px-4 bg-gradient-to-r from-amber-50/60 via-orange-50/60 to-yellow-50/60">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight animate-fade-in-up">
            HOCA hoạt động như thế nào
          </h2>

          <div className="space-y-10 animate-fade-in">
            <div className="flex gap-7 items-start group">
              <div className="w-14 h-14 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-primary">Chọn phòng học</h3>
                <p className="text-muted-foreground text-base font-medium">
                  Chọn phòng học theo môn học hoặc tâm trạng. Tham gia phòng học chung hoặc chọn phòng chuyên môn.
                </p>
              </div>
            </div>

            <div className="flex gap-7 items-start group">
              <div className="w-14 h-14 rounded-full gradient-accent text-white flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-accent">Bật camera của bạn</h3>
                <p className="text-muted-foreground text-base font-medium">
                  Bật camera (âm thanh vẫn tắt). Quan sát người khác học và tăng trách nhiệm với bản thân.
                </p>
              </div>
            </div>

            <div className="flex gap-7 items-start group">
              <div className="w-14 h-14 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-primary">Bắt đầu phiên học</h3>
                <p className="text-muted-foreground text-base font-medium">
                  Đồng hồ 45 phút sẽ bắt đầu tự động. Tập trung làm việc trong khi những người khác cũng đang học.
                </p>
              </div>
            </div>

            <div className="flex gap-7 items-start group">
              <div className="w-14 h-14 rounded-full gradient-accent text-white flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-accent">Xây dựng chuỗi học</h3>
                <p className="text-muted-foreground text-base font-medium">
                  Hoàn thành phiên học và xem chuỗi ngày của bạn tăng lên. Duy trì thói quen để đạt mục tiêu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-7 tracking-tight">
            Sẵn sàng thay đổi thói quen học tập?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 font-medium">
            Tham gia hàng ngàn sinh viên đang cải thiện khả năng tập trung và đạt mục tiêu cùng HOCA.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary text-white text-lg px-12 h-16 shadow-xl hover:scale-105 hover:shadow-2xl transition-all font-bold">
              Bắt đầu miễn phí
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border bg-white/80 backdrop-blur">
        <div className="container mx-auto text-center text-muted-foreground animate-fade-in">
          <p className="text-2xl font-extrabold text-primary mb-1 tracking-tight">HOCA - Phòng học ảo</p>
          <p className="text-base font-medium mb-1">Địa chỉ: 123 Đường Học Tập, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
          <p className="text-base font-medium mb-2">Liên hệ: +84 123 456 789 | Email: support@hoca.vn</p>
          <div className="flex justify-center gap-5 mt-4">
            <a href="https://www.facebook.com/hoca" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <Facebook className="h-7 w-7 text-blue-600" />
            </a>
            <a href="https://www.youtube.com/hoca" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <Youtube className="h-7 w-7 text-red-600" />
            </a>
            <a href="https://www.linkedin.com/company/hoca" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <Linkedin className="h-7 w-7 text-blue-800" />
            </a>
          </div>
          <p className="text-sm mt-6">&copy; 2025 HOCA. Xây dựng cho sinh viên tập trung khắp mọi nơi.</p>
        </div>
      </footer>
  </div>
  );
};

export default Landing;