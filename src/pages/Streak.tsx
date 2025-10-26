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
      <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-background text-foreground">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải số liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-2 text-primary drop-shadow-sm tracking-tight text-center">Chuỗi học của bạn</h1>
          <p className="text-lg text-muted-foreground mb-10 text-center font-medium">Tiếp tục duy trì! Kiên trì là chìa khoá dẫn tới thành công.</p>

          {/* Main Streak Display */}
          <Card className="p-10 mb-10 text-center shadow-xl border-2 border-primary/30 bg-white/90 dark:bg-card animate-fade-in">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-primary shadow-lg mb-5 animate-bounce-slow">
              <Flame className="h-14 w-14 text-white" />
            </div>
            <h2 className="text-7xl font-extrabold mb-2 text-primary drop-shadow">{profile?.current_streak || 7}</h2>
            <p className="text-2xl text-muted-foreground font-semibold">Chuỗi ngày</p>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <Card className="p-7 shadow-lg border-2 border-transparent hover:border-accent/40 bg-white/90 dark:bg-card transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Chuỗi dài nhất</h3>
              </div>
              <p className="text-4xl font-bold text-accent">{profile?.longest_streak || 10}</p>
              <p className="text-base text-muted-foreground">ngày</p>
            </Card>

            <Card className="p-7 shadow-lg border-2 border-transparent hover:border-primary/40 bg-white/90 dark:bg-card transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Tổng thời gian học</h3>
              </div>
              <p className="text-4xl font-bold text-primary">{profile?.total_study_time || 1450}</p>
              <p className="text-base text-muted-foreground">phút</p>
            </Card>

            <Card className="p-7 shadow-lg border-2 border-transparent hover:border-yellow-400/40 bg-white/90 dark:bg-card transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-semibold text-lg">Số phiên</h3>
              </div>
              <p className="text-4xl font-bold text-yellow-500">{Math.floor((profile?.total_study_time || 1450) / 45)}</p>
              <p className="text-base text-muted-foreground">phiên hoàn thành</p>
            </Card>
          </div>

          {/* Motivation Message */}
          <Card className="p-8 bg-primary text-primary-foreground shadow-xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-2">Tiếp tục cố gắng! 🎉</h3>
            <p className="mb-5 text-lg font-medium">
              {profile?.current_streak === 0 
                ? "Bắt đầu chuỗi học hôm nay bằng cách hoàn thành một phiên học!"
                : profile?.current_streak < 7
                ? `Bạn đang làm rất tốt! Chỉ còn ${7 - (profile?.current_streak || 0)} ngày nữa để đạt 1 tuần!`
                : "Quá tuyệt! Bạn đang xây dựng thói quen học tập bền vững."}
            </p>
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-3 text-lg shadow-md dark:bg-background dark:text-primary dark:hover:bg-muted"
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
