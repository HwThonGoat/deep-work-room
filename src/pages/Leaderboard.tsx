import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Clock, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardUser {
  id: string;
  full_name: string;
  avatar_url: string;
  current_streak: number;
  total_study_time: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [streakLeaders, setStreakLeaders] = useState<LeaderboardUser[]>([]);
  const [timeLeaders, setTimeLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchLeaderboards();
    };
    checkAuth();
  }, [navigate]);

  const fetchLeaderboards = async () => {
    try {
      // Top streak users
      const { data: streakData, error: streakError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, current_streak, total_study_time")
        .order("current_streak", { ascending: false })
        .limit(10);

      if (streakError) throw streakError;
      setStreakLeaders(streakData || []);

      // Top study time users
      const { data: timeData, error: timeError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, current_streak, total_study_time")
        .order("total_study_time", { ascending: false })
        .limit(10);

      if (timeError) throw timeError;
      setTimeLeaders(timeData || []);
    } catch (error) {
      console.error("Error fetching leaderboards:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const LeaderboardList = ({ users, type }: { users: LeaderboardUser[], type: 'streak' | 'time' }) => (
    <div className="space-y-4">
      {users.map((user, index) => (
        <Card key={user.id} className={`p-4 transition-smooth hover:shadow-lg ${
          index < 3 ? 'border-2 border-primary/50' : ''
        }`}>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold w-12 text-center">
              {getRankIcon(index)}
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="gradient-primary text-white">
                {user.full_name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-semibold">{user.full_name || "Người dùng ẩn danh"}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                {type === 'streak' ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>{user.current_streak} ngày chuỗi</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{formatTime(user.total_study_time)} học tập</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải bảng xếp hạng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Bảng xếp hạng
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Top người học chăm chỉ nhất trong cộng đồng HOCA
            </p>
          </div>

          <Tabs defaultValue="streak" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="streak" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Top Chuỗi học tập
              </TabsTrigger>
              <TabsTrigger value="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Top Thời gian học
              </TabsTrigger>
            </TabsList>

            <TabsContent value="streak">
              {streakLeaders.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Chưa có dữ liệu. Hãy là người đầu tiên!
                  </p>
                </Card>
              ) : (
                <LeaderboardList users={streakLeaders} type="streak" />
              )}
            </TabsContent>

            <TabsContent value="time">
              {timeLeaders.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Chưa có dữ liệu. Hãy là người đầu tiên!
                  </p>
                </Card>
              ) : (
                <LeaderboardList users={timeLeaders} type="time" />
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-2">💡 Mẹo để lên top:</h3>
            <ul className="text-muted-foreground space-y-1 text-sm">
              <li>• Học đều đặn mỗi ngày để duy trì chuỗi</li>
              <li>• Hoàn thành đầy đủ các phiên 45 phút</li>
              <li>• Nâng cấp Premium để có không giới hạn phiên học</li>
              <li>• Tham gia cộng đồng và thúc đẩy lẫn nhau</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
