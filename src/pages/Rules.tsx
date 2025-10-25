import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Heart, Users, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const Rules = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Quy tắc cộng đồng
            </h1>
            <p className="text-xl text-muted-foreground">
              Hướng dẫn để duy trì môi trường học tập an toàn và tích cực cho tất cả mọi người
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold">1. Tôn trọng và An toàn</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Luôn tôn trọng các thành viên khác trong cộng đồng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Nghiêm cấm quấy rối, bắt nạt hoặc ngôn từ thù địch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Giữ cho nội dung của bạn phù hợp và chuyên nghiệp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Báo cáo mọi hành vi không phù hợp cho quản trị viên</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold">2. Hành vi trong phòng học</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Giữ camera bật và tập trung vào việc học</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Âm thanh luôn tắt - không có ngoại lệ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tránh hành động gây mất tập trung hoặc không phù hợp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sử dụng tính năng chat một cách có trách nhiệm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tôn trọng không gian học tập của người khác</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold">3. Nội dung được chấp nhận</h2>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Chỉ chia sẻ nội dung liên quan đến học tập</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Không spam hoặc quảng cáo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Không chia sẻ thông tin cá nhân hoặc nhạy cảm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tôn trọng bản quyền và sở hữu trí tuệ</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-semibold">4. Hậu quả của vi phạm</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Vi phạm các quy tắc này có thể dẫn đến:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">Lần 1:</span>
                    <span>Cảnh báo và hướng dẫn về quy tắc</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">Lần 2:</span>
                    <span>Tạm ngưng tài khoản 24 giờ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">Lần 3:</span>
                    <span>Tạm ngưng tài khoản 7 ngày</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-destructive">Vi phạm nghiêm trọng:</span>
                    <span>Khóa tài khoản vĩnh viễn</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 bg-primary/10 border-primary/20">
              <h3 className="text-lg font-semibold mb-3">🇻🇳 Được phát triển bởi người Việt</h3>
              <p className="text-muted-foreground mb-4">
                HOCA được tạo ra bởi đội ngũ Việt Nam với tình yêu và hiểu biết về nhu cầu học tập của sinh viên Việt. 
                Chúng tôi cam kết xây dựng một cộng đồng học tập tích cực, hỗ trợ lẫn nhau và phát triển.
              </p>
              <p className="text-muted-foreground">
                Bằng cách tuân thủ các quy tắc này, bạn đang giúp tạo ra một môi trường học tập tốt hơn cho tất cả 
                các thành viên trong cộng đồng. Cảm ơn bạn đã là một phần của HOCA! 🎓
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Có câu hỏi về quy tắc? Liên hệ với chúng tôi qua email
            </p>
            <Link to="/contact">
              <Button className="gradient-primary text-white">
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
