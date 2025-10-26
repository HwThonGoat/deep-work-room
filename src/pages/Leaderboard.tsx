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

const sampleStreakLeaders: LeaderboardUser[] = [
  { id: '1', full_name: 'Nguyễn Văn A', avatar_url: '', current_streak: 21, total_study_time: 1200 },
  { id: '2', full_name: 'Trần Thị B', avatar_url: '', current_streak: 18, total_study_time: 950 },
  { id: '3', full_name: 'Lê Văn C', avatar_url: '', current_streak: 15, total_study_time: 800 },
  { id: '4', full_name: 'Phạm Minh D', avatar_url: '', current_streak: 12, total_study_time: 700 },
  { id: '5', full_name: 'Hoàng Thị E', avatar_url: '', current_streak: 10, total_study_time: 600 },
];
const sampleTimeLeaders: LeaderboardUser[] = [
  { id: '6', full_name: 'Nguyễn Văn F', avatar_url: '', current_streak: 8, total_study_time: 2000 },
  { id: '7', full_name: 'Trần Thị G', avatar_url: '', current_streak: 7, total_study_time: 1800 },
  { id: '8', full_name: 'Lê Văn H', avatar_url: '', current_streak: 6, total_study_time: 1600 },
  { id: '9', full_name: 'Phạm Minh I', avatar_url: '', current_streak: 5, total_study_time: 1400 },
  { id: '10', full_name: 'Hoàng Thị K', avatar_url: '', current_streak: 4, total_study_time: 1200 },
];

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
      // fetchLeaderboards();
      setStreakLeaders(sampleStreakLeaders);
      setTimeLeaders(sampleTimeLeaders);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

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
        <Card key={user.id} className={`p-6 flex items-center gap-6 rounded-xl shadow-md border-2 transition-all duration-300 hover:scale-[1.02] hover:border-primary/80 bg-white/90 ${
          index < 3 ? 'border-primary/70 bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50' : ''
        }`}>
          <div className="flex flex-col items-center w-16">
            <div className="text-3xl font-bold mb-1">
              {getRankIcon(index)}
            </div>
            <Avatar className="h-12 w-12 border-2 border-primary/60">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="gradient-primary text-white text-lg">
                {user.full_name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-lg text-primary mb-1">{user.full_name || "Người dùng ẩn danh"}</div>
            <div className="text-base text-muted-foreground flex items-center gap-2">
              {type === 'streak' ? (
                <>
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="font-medium">{user.current_streak} ngày chuỗi</span>
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{formatTime(user.total_study_time)} học tập</span>
                </>
              )}
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
