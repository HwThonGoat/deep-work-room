import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Clock, Zap, Users, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Học cùng nhau,
            <br />
            Giữ vững tập trung
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tham gia phòng video im lặng cùng sinh viên trên toàn thế giới. Xây dựng chuỗi học, giữ trách nhiệm và đạt được mục tiêu của bạn.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/auth">
              <Button size="lg" className="gradient-primary text-white text-lg px-8 h-14 shadow-smooth hover:shadow-lg transition-smooth">
                Bắt đầu học ngay
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                Tìm hiểu thêm
              </Button>
            </Link>
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
      <section className="py-20 px-4 bg-muted/30">
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
          <p>&copy; 2025 HOCA. Built for focused students everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;