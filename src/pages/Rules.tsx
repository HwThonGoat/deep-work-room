import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Heart, Users, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const Rules = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      <div className="pt-36 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-5 text-primary tracking-tight drop-shadow-lg animate-fade-in-up">
              Quy tắc cộng đồng
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold max-w-2xl mx-auto animate-fade-in">
              Hướng dẫn để duy trì môi trường học tập an toàn và tích cực cho tất cả mọi người
            </p>
          </div>

          <div className="space-y-12 animate-fade-in">
            <Card className="p-10 shadow-2xl border-2 border-primary/30 bg-white/95 rounded-2xl hover:shadow-amber-200/40 transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">1. Tôn trọng & An toàn</h2>
              </div>
              <ul className="space-y-4 text-lg text-muted-foreground font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Luôn tôn trọng các thành viên khác trong cộng đồng</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Nghiêm cấm quấy rối, bắt nạt hoặc ngôn từ thù địch</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Giữ cho nội dung của bạn phù hợp và chuyên nghiệp</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Báo cáo mọi hành vi không phù hợp cho quản trị viên</span>
                </li>
              </ul>
            </Card>

            <Card className="p-10 shadow-2xl border-2 border-accent/30 bg-white/95 rounded-2xl hover:shadow-orange-200/40 transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-accent tracking-tight">2. Hành vi trong phòng học</h2>
              </div>
              <ul className="space-y-4 text-lg text-muted-foreground font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Giữ camera bật và tập trung vào việc học</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Âm thanh luôn tắt - không có ngoại lệ</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Tránh hành động gây mất tập trung hoặc không phù hợp</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Sử dụng tính năng chat một cách có trách nhiệm</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Tôn trọng không gian học tập của người khác</span>
                </li>
              </ul>
            </Card>

            <Card className="p-10 shadow-2xl border-2 border-primary/30 bg-white/95 rounded-2xl hover:shadow-amber-200/40 transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">3. Nội dung được chấp nhận</h2>
              </div>
              <ul className="space-y-4 text-lg text-muted-foreground font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Chỉ chia sẻ nội dung liên quan đến học tập</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Không spam hoặc quảng cáo</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Không chia sẻ thông tin cá nhân hoặc nhạy cảm</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Tôn trọng bản quyền và sở hữu trí tuệ</span>
                </li>
              </ul>
            </Card>

            <Card className="p-10 shadow-2xl border-2 border-accent/30 bg-white/95 rounded-2xl hover:shadow-orange-200/40 transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg">
                  <AlertCircle className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-accent tracking-tight">4. Hậu quả của vi phạm</h2>
              </div>
              <div className="space-y-5 text-lg text-muted-foreground font-medium">
                <p>
                  Vi phạm các quy tắc này có thể dẫn đến:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="font-semibold text-primary">Lần 1:</span>
                    <span>Cảnh báo và hướng dẫn về quy tắc</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-semibold text-primary">Lần 2:</span>
                    <span>Tạm ngưng tài khoản 24 giờ</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-semibold text-primary">Lần 3:</span>
                    <span>Tạm ngưng tài khoản 7 ngày</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-semibold text-destructive">Vi phạm nghiêm trọng:</span>
                    <span>Khóa tài khoản vĩnh viễn</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 md:p-10 bg-primary/10 border-primary/20 shadow-xl rounded-2xl animate-fade-in">
              <h3 className="text-2xl font-extrabold mb-4 text-primary tracking-tight">🇻🇳 Được phát triển bởi người Việt</h3>
              <p className="text-lg text-muted-foreground mb-4 font-medium">
                HOCA được tạo ra bởi đội ngũ Việt Nam với tình yêu và hiểu biết về nhu cầu học tập của sinh viên Việt. 
                Chúng tôi cam kết xây dựng một cộng đồng học tập tích cực, hỗ trợ lẫn nhau và phát triển.
              </p>
              <p className="text-lg text-muted-foreground font-medium">
                Bằng cách tuân thủ các quy tắc này, bạn đang giúp tạo ra một môi trường học tập tốt hơn cho tất cả 
                các thành viên trong cộng đồng. Cảm ơn bạn đã là một phần của HOCA! 🎓
              </p>
            </Card>
          </div>

          <div className="mt-20 text-center animate-fade-in">
            <p className="text-lg text-muted-foreground mb-5 font-medium">
              Có câu hỏi về quy tắc? Liên hệ với chúng tôi qua email
            </p>
            <Link to="/contact">
              <Button className="gradient-primary text-white font-bold px-10 py-3 text-lg shadow-lg hover:scale-105 transition-transform">
                Liên hệ hỗ trợ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
