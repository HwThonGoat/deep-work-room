import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Clock, Zap, Users, TrendingUp, Shield, Facebook, Youtube, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-100/80 via-yellow-100/80 to-red-100/80 pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
            Phòng Học Ảo Của Bạn
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Tập trung với phòng học video im lặng, hẹn giờ Pomodoro và chuỗi ngày học liên tục.
            Tham gia cùng hàng ngàn sinh viên đạt được mục tiêu của họ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button
                size="lg"
                className="gradient-primary shadow-glow text-lg px-8"
              >
                Bắt đầu học miễn phí
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
              >
                Xem các gói
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            ✨ Không cần thẻ tín dụng • 🎯 Bắt đầu trong 30 giây
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Mọi thứ bạn cần để tập trung
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trách nhiệm bằng video</h3>
              <p className="text-muted-foreground">
                Quan sát người khác đang học trong thời gian thực. Không có âm thanh, chỉ giữ im lặng và tập trung.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chuỗi học</h3>
              <p className="text-muted-foreground">
                Theo dõi tiến trình hằng ngày và duy trì đà. Xem chuỗi học của bạn tăng lên từng ngày.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hẹn giờ Pomodoro</h3>
              <p className="text-muted-foreground">
                Phiên tập trung 45 phút tích hợp với nghỉ 5 phút, giúp học bền vững.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tham gia phòng bất kỳ</h3>
              <p className="text-muted-foreground">
                Chọn từ nhiều phòng học theo môn hoặc tham gia phòng học chung.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chế độ Hình ảnh trong Ảnh</h3>
              <p className="text-muted-foreground">
                Giữ phòng học hiển thị khi bạn làm việc trong ứng dụng hoặc tab khác.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ưu tiên quyền riêng tư</h3>
              <p className="text-muted-foreground">
                Mặc định tắt âm thanh. Quyền riêng tư của bạn quan trọng — học tập không gián đoạn.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-50/60 via-orange-50/60 to-yellow-50/60">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            HOCA hoạt động như thế nào
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Chọn phòng học</h3>
                <p className="text-muted-foreground">
                  Chọn phòng học theo môn học hoặc tâm trạng. Tham gia phòng học chung hoặc chọn phòng chuyên môn.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-accent text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Bật camera của bạn</h3>
                <p className="text-muted-foreground">
                  Bật camera (âm thanh vẫn tắt). Quan sát người khác học và tăng trách nhiệm với bản thân.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Bắt đầu phiên học</h3>
                <p className="text-muted-foreground">
                  Đồng hồ 45 phút sẽ bắt đầu tự động. Tập trung làm việc trong khi những người khác cũng đang học.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-accent text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Xây dựng chuỗi học</h3>
                <p className="text-muted-foreground">
                  Hoàn thành phiên học và xem chuỗi ngày của bạn tăng lên. Duy trì thói quen để đạt mục tiêu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Sẵn sàng thay đổi thói quen học tập?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Tham gia hàng ngàn sinh viên đang cải thiện khả năng tập trung và đạt mục tiêu cùng HOCA.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary text-white text-lg px-8 h-14 shadow-smooth hover:shadow-lg transition-smooth">
              Bắt đầu miễn phí
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="text-lg font-semibold">HOCA - Phòng học ảo</p>
          <p className="text-sm">Địa chỉ: 123 Đường Học Tập, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
          <p className="text-sm">Liên hệ: +84 123 456 789 | Email: support@hoca.vn</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://www.facebook.com/hoca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.youtube.com/hoca" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              <Youtube className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/company/hoca" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm mt-4">&copy; 2025 HOCA. Xây dựng cho sinh viên tập trung khắp mọi nơi.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;