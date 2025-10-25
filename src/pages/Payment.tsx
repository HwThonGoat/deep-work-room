import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Crown, Loader2, CreditCard, Sparkles, Star } from "lucide-react";

const Payment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState("");
    const [name, setName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("momo");
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        const planParam = searchParams.get("plan");
        if (planParam) {
            setPlan(planParam);
        } else {
            // Mặc định là premium nếu không có plan parameter
            setPlan("premium");
        }
    }, [searchParams, navigate]);

    const planDetails = {
        premium: {
            name: "Premium",
            price: "79,000 VNĐ",
            duration: "1 tháng",
        },
        yearly: {
            name: "Premium Năm",
            price: "790,000 VNĐ",
            duration: "12 tháng",
        },
        promo: {
            name: "Promo Sinh viên",
            price: "49,000 VNĐ",
            duration: "3 tháng",
        },
    };

    const handlePayment = async () => {
        if (!name.trim()) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập tên của bạn",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/auth");
                return;
            }

            // Update user plan
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + (plan === "promo" ? 3 : 1));

            // Simulate payment success (in real app, you would integrate with payment gateway)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show celebration animation
            setShowCelebration(true);

            toast({
                title: "🎉 Nâng cấp thành công lên " + planDetails[plan as keyof typeof planDetails].name + "!",
                description: "Các tính năng premium của bạn đã được kích hoạt",
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            toast({
                title: "Thanh toán thất bại",
                description: error instanceof Error ? error.message : "Có lỗi xảy ra",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!plan || !planDetails[plan as keyof typeof planDetails]) {
        return null;
    }

    const currentPlan = planDetails[plan as keyof typeof planDetails];

    return (
        <>
            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
                @keyframes sparkle {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
                    50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
                }
            `}</style>
            <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Celebration Animation */}
                {showCelebration && (
                    <div className="fixed inset-0 pointer-events-none z-50">
                        {/* Falling sparkles */}
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute top-0 animate-bounce"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`,
                                    transform: `translateY(-100px)`,
                                    animation: `fall ${3 + Math.random() * 2}s ${Math.random() * 2}s ease-in-out infinite`
                                }}
                            >
                                <Sparkles className={`w-6 h-6 animate-spin ${i % 3 === 0 ? 'text-yellow-400' :
                                    i % 3 === 1 ? 'text-purple-400' : 'text-blue-400'
                                    }`} />
                            </div>
                        ))}
                        {/* Floating stars */}
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={`star-${i}`}
                                className="absolute animate-ping"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${1 + Math.random()}s`
                                }}
                            >
                                <Star className="w-4 h-4 text-purple-400" fill="currentColor" />
                            </div>
                        ))}
                        {/* Success message overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-yellow-50 to-purple-50 backdrop-blur-sm rounded-3xl p-12 text-center animate-pulse border-4 border-gradient-primary shadow-2xl transform scale-110">
                                <div className="relative">
                                    <Crown className="w-20 h-20 text-yellow-500 mx-auto mb-6 animate-bounce" />
                                    <div className="absolute -top-2 -right-2">
                                        <Sparkles className="w-8 h-8 text-purple-500 animate-spin" />
                                    </div>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
                                    🎉 CHÚC MỪNG! 🎉
                                </h2>
                                <p className="text-xl text-purple-600 font-semibold mb-2">Bạn đã nâng cấp thành công!</p>
                                <p className="text-lg text-gray-600 mb-6">Premium features đã được kích hoạt! ✨</p>

                                {/* Floating emojis */}
                                <div className="flex justify-center gap-4 text-3xl mb-4">
                                    <span className="animate-bounce" style={{ animationDelay: "0s" }}>🚀</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>⭐</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>🎯</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>💎</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.8s" }}>🔥</span>
                                </div>

                                <div className="flex justify-center gap-2">
                                    <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" />
                                    <Sparkles className="w-6 h-6 text-purple-500 animate-spin" style={{ animationDelay: "0.5s" }} />
                                    <Sparkles className="w-6 h-6 text-blue-500 animate-spin" style={{ animationDelay: "1s" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Card className="w-full max-w-2xl gradient-card border-border/50 p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                            <Crown className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Hoàn tất nâng cấp</h1>
                            <p className="text-muted-foreground">Bạn chỉ còn một bước nữa để có các tính năng premium</p>
                        </div>
                    </div>

                    {/* Plan Summary */}
                    <Card className="bg-secondary/50 p-6 mb-8 border-border/50">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
                                <p className="text-sm text-muted-foreground">{currentPlan.duration}</p>
                            </div>
                            <div className="text-3xl font-bold">{currentPlan.price}</div>
                        </div>
                        <div className="pt-4 border-t border-border/50">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Thanh toán hôm nay</span>
                                <span className="font-semibold">{currentPlan.price}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Payment Form */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Họ và tên</Label>
                            <Input
                                id="name"
                                placeholder="Nhập họ và tên của bạn"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Phương thức thanh toán</Label>
                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-2 border border-border/50 rounded-lg p-4 hover:bg-secondary/30 transition-smooth cursor-pointer">
                                    <RadioGroupItem value="momo" id="momo" />
                                    <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer flex-1">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                        <span>Ví MoMo</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border border-border/50 rounded-lg p-4 hover:bg-secondary/30 transition-smooth cursor-pointer">
                                    <RadioGroupItem value="zalopay" id="zalopay" />
                                    <Label htmlFor="zalopay" className="flex items-center gap-2 cursor-pointer flex-1">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                        <span>ZaloPay</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border border-border/50 rounded-lg p-4 hover:bg-secondary/30 transition-smooth cursor-pointer">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                        <span>Thẻ tín dụng/Ghi nợ</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="pt-6 space-y-3">
                            <Button
                                onClick={handlePayment}
                                className="w-full gradient-primary shadow-glow text-lg py-6"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    `Thanh toán ${currentPlan.price}`
                                )}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => navigate("/pricing")}
                                className="w-full"
                                disabled={loading}
                            >
                                Quay lại các gói
                            </Button>
                        </div>

                        <p className="text-xs text-center text-muted-foreground">
                            Bằng cách xác nhận thanh toán, bạn đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật của chúng tôi.
                            Gói đăng ký sẽ tự động gia hạn trừ khi bị hủy.
                        </p>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Payment;