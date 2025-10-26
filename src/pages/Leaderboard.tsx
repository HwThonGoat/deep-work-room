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
    <div className="space-y-6">
      {users.map((user, index) => (
        <Card
          key={user.id}
          className={`p-8 flex items-center gap-8 rounded-2xl shadow-xl border-2 transition-all duration-300 hover:scale-[1.025] hover:border-primary/80 bg-white/90 dark:bg-card ${
            index < 3 ? 'border-primary/80 bg-gradient-to-r from-yellow-100 via-orange-50 to-amber-100 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-amber-900/20 shadow-amber-200/40' : ''
          } animate-fade-in`}
        >
          <div className="flex flex-col items-center w-20">
            <div className="text-4xl font-extrabold mb-2 drop-shadow">
              {getRankIcon(index)}
            </div>
            <Avatar className="h-16 w-16 border-2 border-primary/70 shadow-md">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="gradient-primary text-white text-2xl">
                {user.full_name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="font-bold text-2xl text-primary mb-2 tracking-tight">
              {user.full_name || "Người dùng ẩn danh"}
            </div>
            <div className="text-lg text-muted-foreground flex items-center gap-3 font-semibold">
              {type === 'streak' ? (
                <>
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span>{user.current_streak} ngày chuỗi</span>
                </>
              ) : (
                <>
                  <Clock className="h-6 w-6 text-primary" />
                  <span>{formatTime(user.total_study_time)} học tập</span>
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
    <div className="min-h-screen bg-orange-50 dark:bg-background text-foreground">
      <Navbar />
      <div className="pt-32 pb-24 px-4 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="rounded-full bg-white/80 shadow-lg p-4 mb-2 border-2 border-primary/20">
                <Trophy className="h-16 w-16 text-primary drop-shadow-lg" />
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold text-primary tracking-tight drop-shadow-lg text-center leading-tight">
                Bảng xếp hạng
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-muted-foreground font-semibold text-center max-w-xl">
              Top người học chăm chỉ nhất trong cộng đồng HOCA
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-white/90 dark:bg-card rounded-3xl shadow-2xl border-2 border-primary/10">
            <Tabs defaultValue="streak" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10 rounded-xl shadow-lg bg-white/80">
                <TabsTrigger
                  value="streak"
                  className="flex items-center gap-2 text-base md:text-lg font-bold py-4 px-2 whitespace-nowrap min-w-0 text-center justify-center transition-colors duration-300
                    data-[state=active]:text-primary data-[state=active]:fill-primary"
                  style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
                >
                  <TrendingUp className="h-5 w-5 transition-colors duration-300 group-data-[state=active]:text-primary text-muted-foreground" />
                  <span className="truncate">Top Chuỗi học tập</span>
                </TabsTrigger>
                <TabsTrigger
                  value="time"
                  className="flex items-center gap-2 text-base md:text-lg font-bold py-4 px-2 whitespace-nowrap min-w-0 text-center justify-center transition-colors duration-300
                    data-[state=active]:text-primary data-[state=active]:fill-primary"
                  style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
                >
                  <Clock className="h-5 w-5 transition-colors duration-300 group-data-[state=active]:text-primary text-muted-foreground" />
                  <span className="truncate">Top Thời gian học</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="streak" className="transition-all duration-400 ease-in-out opacity-100 animate-tabfadein">
                {streakLeaders.length === 0 ? (
                  <Card className="p-10 text-center bg-white/90 shadow-xl">
                    <p className="text-muted-foreground text-lg font-medium">
                      Chưa có dữ liệu. Hãy là người đầu tiên!
                    </p>
                  </Card>
                ) : (
                  <LeaderboardList users={streakLeaders} type="streak" />
                )}
              </TabsContent>

              <TabsContent value="time" className="transition-all duration-400 ease-in-out opacity-100 animate-tabfadein">
                {timeLeaders.length === 0 ? (
                  <Card className="p-10 text-center bg-white/90 shadow-xl">
                    <p className="text-muted-foreground text-lg font-medium">
                      Chưa có dữ liệu. Hãy là người đầu tiên!
                    </p>
                  </Card>
                ) : (
                  <LeaderboardList users={timeLeaders} type="time" />
                )}
              </TabsContent>
            </Tabs>
          </Card>

          <div className="mt-14 p-8 bg-muted/40 rounded-2xl shadow-lg text-center max-w-2xl mx-auto">
            <h3 className="font-bold text-lg mb-3 text-primary">💡 Mẹo để lên top:</h3>
            <ul className="text-muted-foreground space-y-2 text-base font-medium">
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
