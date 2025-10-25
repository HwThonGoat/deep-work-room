import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Calendar, Trophy, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Profile {
  current_streak: number;
  longest_streak: number;
  total_study_time: number;
}

const Streak = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
    fetchProfile();
  }, [checkAuth]);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("current_streak, longest_streak, total_study_time")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      const typedError = error as { message: string };
      console.error("Error fetching profile:", typedError.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải số liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Chuỗi học của bạn</h1>
          <p className="text-muted-foreground mb-8">Tiếp tục duy trì! Kiên trì là chìa khoá dẫn tới thành công.</p>
          
          {/* Main Streak Display */}
          <Card className="p-8 mb-8 text-center shadow-lg border-2 border-primary/20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary mb-4">
              <Flame className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-6xl font-bold mb-2 text-primary">{profile?.current_streak || 0}</h2>
            <p className="text-xl text-muted-foreground">Chuỗi ngày</p>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-smooth">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-accent" />
                </div>
                  <h3 className="font-semibold">Chuỗi dài nhất</h3>
              </div>
              <p className="text-3xl font-bold">{profile?.longest_streak || 0}</p>
              <p className="text-sm text-muted-foreground">days</p>
            </Card>

            <Card className="p-6 shadow-smooth">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Tổng thời gian học</h3>
              </div>
              <p className="text-3xl font-bold">{profile?.total_study_time || 0}</p>
              <p className="text-sm text-muted-foreground">phút</p>
            </Card>

            <Card className="p-6 shadow-smooth">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">Số phiên</h3>
              </div>
              <p className="text-3xl font-bold">{Math.floor((profile?.total_study_time || 0) / 45)}</p>
              <p className="text-sm text-muted-foreground">completed</p>
            </Card>
          </div>

          {/* Motivation Message */}
          <Card className="p-6 gradient-primary text-white">
            <h3 className="text-xl font-semibold mb-2">Tiếp tục cố gắng! 🎉</h3>
            <p className="mb-4">
              {profile?.current_streak === 0 
                ? "Bắt đầu chuỗi học hôm nay bằng cách hoàn thành một phiên học!"
                : profile?.current_streak < 7
                ? `Bạn đang làm rất tốt! Chỉ còn ${7 - (profile?.current_streak || 0)} ngày nữa để đạt 1 tuần!`
                : "Quá tuyệt! Bạn đang xây dựng thói quen học tập bền vững."}
            </p>
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Bắt đầu học
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Streak;
