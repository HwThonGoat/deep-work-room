import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Crown, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-orange-50 dark:bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary dark:text-primary">
              Chọn gói của bạn
            </h1>
            <p className="text-xl text-muted-foreground">
              Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng để có thêm tính năng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto md:mt-0 mt-8">
            <Card className="relative flex flex-col p-6 border-4 border-primary hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group bg-white/80 dark:bg-card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Miễn phí</h3>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-extrabold text-primary drop-shadow-lg">
                  0 VNĐ
                </div>
                <div className="text-muted-foreground font-medium">
                  Trọn đời
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-base">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Giới hạn 45 phút/lần, 3 lần/ngày
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Pomodoro cơ bản
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Chuỗi học tập cơ bản
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Rớt chuỗi (xem quảng cáo)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Giao diện sáng/tối
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Báo cáo năng lực cá nhân (cơ bản)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  AI chống nội dung độc hại
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Phòng học riêng (tối đa 2 phòng)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Nhắc nhở nghỉ ngơi – động viên
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Gamification (thành tích cơ bản)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Minh bạch tính năng (nếu mời bạn)
                </li>
              </ul>
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all duration-300"
                >
                  Bắt đầu
                </Button>
              </Link>
              <div className="absolute top-4 right-4 bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-500 font-semibold shadow-sm">
                Cơ bản
              </div>
            </Card>

            {/* Premium Weekly */}
            <Card className="relative flex flex-col p-6 border-4 border-primary shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 group bg-white/90 h-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-white px-5 py-1 rounded-full text-base font-bold shadow-lg animate-bounce">
                Mới!
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-accent">Premium Tuần</h3>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-extrabold text-accent drop-shadow-lg">
                  49.000 <span className="text-lg font-medium text-muted-foreground">VNĐ/tuần</span>
                </div>
                <div className="text-muted-foreground font-medium">
                  Trải nghiệm Premium linh hoạt, huỷ bất cứ lúc nào
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-base">
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Không giới hạn, tuỳ chỉnh Pomodoro</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Tất cả tính năng Miễn phí</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Chuỗi học tập nâng cao (thưởng, huy hiệu, BXH)</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Rớt chuỗi không cần xem quảng cáo (bonus streak)</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>AI phân tích xao nhãng (trực tiếp, báo thống kê)</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Background khi học (chỉ dùng thư viện nền)</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Báo cáo năng lực cá nhân nâng cao</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Phòng học riêng (giới hạn 10 phòng)</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Phân tích nâng cao, không giới hạn phiên</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Nghỉ 5 phút sau mỗi 45 phút</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Không bị kick khỏi phòng</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Nhắc nhở nghỉ ngơi – động viên</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Gamification nâng cao</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Minh bạch tính năng</li>
              </ul>
              <Link to="/payment?plan=weekly">
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all duration-300"
                >
                  Nâng cấp tuần
                </Button>
              </Link>
              <div className="absolute top-4 right-4 bg-accent/90 text-xs px-3 py-1 rounded-full text-white font-semibold shadow-sm">
                Linh hoạt
              </div>
            </Card>

            <Card className="relative flex flex-col p-6 border-4 border-primary shadow-xl hover:shadow-2xl hover:scale-[1.06] transition-all duration-300 group bg-white/90 dark:bg-card z-10 h-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-1 rounded-full text-base font-bold shadow-lg animate-bounce">
                Phổ biến nhất
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-primary">Premium Tháng</h3>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-extrabold text-primary drop-shadow-lg">
                  99.000{" "}
                  <span className="text-lg font-medium text-muted-foreground">
                    VNĐ/tháng
                  </span>
                </div>
                <div className="text-muted-foreground font-medium">
                  Thanh toán hàng tháng, huỷ bất cứ lúc nào
                </div>
              </div>
              <ul className="space-y-2 mb-6 text-base">
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Không giới hạn, tuỳ chỉnh Pomodoro
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Tất cả tính năng Miễn phí
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Chuỗi học tập nâng cao (thưởng, huy hiệu, BXH)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Rớt chuỗi không cần xem quảng cáo (bonus streak)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  AI phân tích xao nhãng (trực tiếp, báo thống kê)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Background khi học (thư viện nền + upload nền riêng)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Báo cáo năng lực cá nhân nâng cao
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Phòng học riêng không giới hạn (công cụ chat, chia sẻ tài liệu)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Phân tích nâng cao, không giới hạn phiên
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Nghỉ 5 phút sau mỗi 45 phút
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Không bị kick khỏi phòng
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Nhắc nhở nghỉ ngơi – động viên
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Gamification nâng cao
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  Minh bạch tính năng
                </li>
              </ul>
              <Link to="/payment?plan=premium">
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all duration-300"
                >
                  Nâng cấp ngay
                </Button>
              </Link>
              <div className="absolute top-4 right-4 bg-primary/90 text-xs px-3 py-1 rounded-full text-white font-semibold shadow-sm">
                Khuyên dùng
              </div>
            </Card>

            <Card className="relative flex flex-col p-6 border-4 border-primary hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group bg-white/80 dark:bg-card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-accent">Premium Năm</h3>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-extrabold text-accent drop-shadow-lg">
                  129.000 <span className="text-lg font-medium text-muted-foreground">VNĐ/năm</span>
                </div>
                <div className="text-muted-foreground font-medium">Tiết kiệm 20% so với gói tháng</div>
                <div className="text-sm text-accent font-semibold mt-1">✨ Giá trị tốt nhất, cam kết dài hạn</div>
              </div>
              <ul className="space-y-2 mb-6 text-base">
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Tất cả tính năng Premium (gói Tháng)</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Hỗ trợ ưu tiên</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Truy cập sớm tính năng mới</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Badge sinh viên đặc biệt</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Thời gian dùng thử mở rộng</li>
                <li className="flex items-center gap-2"><span className="text-lg">💎</span>Giá trị tốt nhất, cam kết dài hạn</li>
              </ul>
              <Link to="/payment?plan=yearly">
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all duration-300"
                >
                  Nâng cấp năm
                </Button>
              </Link>
              <div className="absolute top-4 right-4 bg-accent/90 text-xs px-3 py-1 rounded-full text-white font-semibold shadow-sm">
                Tiết kiệm nhất
              </div>
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
