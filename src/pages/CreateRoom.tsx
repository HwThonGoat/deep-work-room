import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Video, Users, Globe, BookOpen, Calculator, Brain, Palette, Music, Code, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";

const CreateRoom = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    // Form state
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const categories = [
        { value: "general", label: "Học chung", icon: BookOpen },
        { value: "math", label: "Toán học", icon: Calculator },
        { value: "science", label: "Khoa học", icon: Brain },
        { value: "language", label: "Ngoại ngữ", icon: Globe },
        { value: "art", label: "Nghệ thuật", icon: Palette },
        { value: "music", label: "Âm nhạc", icon: Music },
        { value: "programming", label: "Lập trình", icon: Code },
        { value: "exam", label: "Ôn thi", icon: BookOpen },
        { value: "casual", label: "Học nhẹ", icon: Coffee },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!roomName.trim()) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập tên phòng",
                variant: "destructive",
            });
            return;
        }

        if (!category) {
            toast({
                title: "Lỗi",
                description: "Vui lòng chọn danh mục",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/auth");
                return;
            }

            // Create room with all required fields for RLS policy
            const { data: room, error } = await supabase
                .from("rooms")
                .insert({
                    name: roomName.trim(),
                    description: description.trim() || null,
                    category: category,
                    created_by: user.id,
                    is_private: false,
                    max_participants: 20,
                    is_active: true,
                })
                .select()
                .single();

            if (error) throw error;

            toast({
                title: "🎉 Tạo phòng thành công!",
                description: `Phòng "${roomName}" đã được tạo và sẵn sàng sử dụng`,
            });

            // Redirect to the newly created room
            navigate(`/room/${room.id}`, { state: { roomName: room.name } });

        } catch (error) {
            console.error("Error creating room:", error);
            toast({
                title: "Tạo phòng thất bại",
                description: error instanceof Error ? error.message : "Có lỗi xảy ra khi tạo phòng",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const selectedCategoryData = categories.find(cat => cat.value === category);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/dashboard")}
                        className="mb-4 hover:bg-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại Dashboard
                    </Button>

                    <div className="text-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                            <Video className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                            Tạo phòng học mới
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Tạo một không gian học tập riêng với các tùy chỉnh phù hợp với nhu cầu của bạn
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Basic Info */}
                        <Card className="p-6 shadow-smooth border-2">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Thông tin cơ bản
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="roomName">Tên phòng *</Label>
                                    <Input
                                        id="roomName"
                                        placeholder="Nhập tên phòng học..."
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        maxLength={50}
                                        disabled={loading}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {roomName.length}/50 ký tự
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="description">Mô tả phòng</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Mô tả ngắn về phòng học (tùy chọn)..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        maxLength={200}
                                        rows={3}
                                        disabled={loading}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {description.length}/200 ký tự
                                    </p>
                                </div>

                                <div>
                                    <Label>Danh mục *</Label>
                                    <Select value={category} onValueChange={setCategory} disabled={loading}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn danh mục phòng học" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => {
                                                const IconComponent = cat.icon;
                                                return (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        <div className="flex items-center gap-2">
                                                            <IconComponent className="w-4 h-4" />
                                                            {cat.label}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Category Preview */}
                                {selectedCategoryData && (
                                    <div className="p-4 bg-muted/50 rounded-lg border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                                                <selectedCategoryData.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{selectedCategoryData.label}</p>
                                                <p className="text-sm text-muted-foreground">Danh mục đã chọn</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Right Column - Settings */}
                        <Card className="p-6 shadow-smooth border-2">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Cài đặt phòng
                            </h2>

                            <div className="space-y-6">
                                {/* Thông báo tính năng sẽ có */}
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h3 className="font-medium text-blue-900 mb-2">🚀 Tính năng sắp có</h3>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• Thiết lập số người tối đa</li>
                                        <li>• Tùy chỉnh thời gian học & nghỉ</li>
                                        <li>• Phòng riêng tư với mật khẩu</li>
                                        <li>• Bật/tắt tính năng chat</li>
                                    </ul>
                                </div>

                                {/* Temporary info */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm">Số người tối đa</span>
                                        </div>
                                        <span className="text-sm font-medium">Không giới hạn</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm">Trạng thái</span>
                                        </div>
                                        <span className="text-sm font-medium">Phòng công khai</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Video className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm">Thời gian học</span>
                                        </div>
                                        <span className="text-sm font-medium">45 phút</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Submit Button */}
                    <Card className="mt-8 p-6 shadow-smooth border-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Sẵn sàng tạo phòng?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Phòng sẽ được tạo và bạn sẽ được chuyển vào ngay lập tức
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/dashboard")}
                                    disabled={loading}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    className="gradient-primary text-white min-w-[120px]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Đang tạo...
                                        </div>
                                    ) : (
                                        "Tạo phòng"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;