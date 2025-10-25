import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Crown, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Chọn gói của bạn
            </h1>
            <p className="text-xl text-muted-foreground">
              Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng để có thêm tính năng
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="p-6 border-2 hover:shadow-lg transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Miễn phí</h3>
              </div>
              
              <div className="mb-6">
                <div className="text-4xl font-bold">0 VNĐ</div>
                <div className="text-muted-foreground">mãi mãi</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tham gia phòng học công khai</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Bộ hẹn giờ Pomodoro cơ bản</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Theo dõi giờ học</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Bộ đếm chuỗi hàng ngày</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Điều khiển camera & mic</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="font-semibold">Giới hạn:</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span>• Tối đa 3 phiên/ngày</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span>• 5 tin nhắn chat/ngày</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span>• Rời phòng sau 45 phút</span>
                </li>
              </ul>

              <Link to="/auth">
                <Button variant="outline" className="w-full">
                  Bắt đầu
                </Button>
              </Link>
            </Card>

            {/* Premium Monthly */}
            <Card className="p-6 border-2 border-primary hover:shadow-lg transition-smooth relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Phổ biến nhất
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Premium</h3>
              </div>
              
              <div className="mb-6">
                <div className="text-4xl font-bold">79,000 VNĐ</div>
                <div className="text-muted-foreground">mỗi tháng</div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tất cả tính năng Miễn phí</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Báo cáo & thông tin chi tiết AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tạo phòng riêng tư</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Lập lịch phòng ưu tiên</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sao lưu & khôi phục phiên</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Không giới hạn thời gian</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Phân tích nâng cao</span>
                </li>
                <li className="flex items-start gap-2 text-primary font-semibold">
                  <span>• Không giới hạn phiên</span>
                </li>
                <li className="flex items-start gap-2 text-primary font-semibold">
                  <span>• Nghỉ 5 phút sau mỗi 45 phút</span>
                </li>
                <li className="flex items-start gap-2 text-primary font-semibold">
                  <span>• Không bị kick khỏi phòng</span>
                </li>
              </ul>

              <Link to="/auth">
                <Button className="w-full gradient-primary text-white">
                  Nâng cấp ngay
                </Button>
              </Link>
            </Card>

            {/* Premium Yearly */}
            <Card className="p-6 border-2 hover:shadow-lg transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Premium Năm</h3>
              </div>
              
              <div className="mb-6">
                <div className="text-4xl font-bold">790,000 VNĐ</div>
                <div className="text-muted-foreground">mỗi năm</div>
                <div className="text-sm text-primary font-semibold mt-1">
                  Tiết kiệm 158,000 VNĐ (2 tháng miễn phí!)
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tất cả tính năng Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Hỗ trợ ưu tiên</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Truy cập sớm tính năng mới</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Badge sinh viên đặc biệt</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Thời gian dùng thử mở rộng</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tất cả tính năng Premium</span>
                </li>
                <li className="flex items-start gap-2 text-accent font-semibold">
                  <span>✨ Giá trị tốt nhất</span>
                </li>
                <li className="flex items-start gap-2 text-accent font-semibold">
                  <span>✨ Cam kết dài hạn = Giá tốt hơn</span>
                </li>
              </ul>

              <Link to="/auth">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  Nâng cấp năm
                </Button>
              </Link>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Tất cả các gói bao gồm đảm bảo hoàn tiền trong 14 ngày. 
              Không hài lòng? Chúng tôi sẽ hoàn lại tiền, không cần hỏi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
