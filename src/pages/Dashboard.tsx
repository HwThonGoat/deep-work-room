import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Clock, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  current_streak: number;
  longest_streak: number;
  total_study_time: number;
}

interface Room {
  id: string;
  name: string;
  category: string;
  description: string;
  online?: number; // demo field
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };

    checkAuth();
    fetchProfile();
    fetchRooms();
  }, [navigate]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

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

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("name");

      if (error) throw error;
      // Add demo online number for each room
      const demoRooms = (data || []).map((room: Room, idx: number) => ({
        ...room,
        online: 50 + ((idx * 37) % 300), // demo: 50-349 online
      }));
      setRooms(demoRooms);
    } catch (error) {
      const typedError = error as { message: string };
      console.error("Error fetching rooms:", typedError.message);
    }
  };

  const handleJoinRoom = (roomId: string, roomName: string) => {
    navigate(`/room/${roomId}`, { state: { roomName } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Quick Stats Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold mb-2 text-primary drop-shadow-sm tracking-tight">Trang chủ</h1>
          <p className="text-lg text-muted-foreground font-medium">Chọn một phòng và bắt đầu học cùng mọi người</p>
        </div>

        {/* Compact Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Link to="/streak">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary/60 bg-white/90 dark:bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-md">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{profile?.current_streak || 7}</p>
                  <p className="text-sm text-muted-foreground font-semibold">Chuỗi ngày học</p>
                </div>
              </div>
            </Card>
          </Link>

          <Card className="p-6 shadow-lg border-2 border-transparent hover:border-accent/60 bg-white/90 dark:bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 shadow-md">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">{profile?.total_study_time || 30}</p>
                <p className="text-sm text-muted-foreground font-semibold">Tổng số phút</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg border-2 border-transparent hover:border-primary/60 bg-white/90 dark:bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-md">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">{Math.floor((profile?.total_study_time || 90) / 45)}</p>
                <p className="text-sm text-muted-foreground font-semibold">Số phiên học</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Rooms Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
              <Video className="h-7 w-7 text-primary" /> Phòng học
            </h2>
            <Button className="gradient-primary text-white px-8 py-3 text-lg font-bold shadow-md" onClick={() => navigate("/create-room")}>Tạo phòng</Button>
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Tìm kiếm phòng theo tên hoặc ID..."
              className="w-full p-3 border-2 border-primary/20 rounded-xl text-base focus:outline-none focus:border-primary shadow-sm"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm === "") {
                  fetchRooms(); // Reload all rooms when search term is cleared
                } else {
                  setRooms((prevRooms) =>
                    prevRooms.filter((room) =>
                      room.name.toLowerCase().includes(searchTerm) || room.id.toLowerCase().includes(searchTerm)
                    )
                  );
                }
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.length === 0 ? (
              <Card className="col-span-full p-8 text-center text-lg text-muted-foreground font-semibold bg-white/80 dark:bg-card shadow-md">
                Không có phòng nào đang hoạt động.
              </Card>
            ) : (
              rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary/60 bg-white/95 dark:bg-card group relative">
                  <div className="p-7 pb-5 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-md">
                        <Video className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold mb-1 truncate text-primary group-hover:underline">{room.name}</h3>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muted/80 text-muted-foreground mr-2">
                          {room.category}
                        </span>
                      </div>
                    </div>
                    {/* Online people demo */}
                    <div className="flex items-center gap-2 mb-2 ml-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="font-semibold text-base text-gray-700">{room.online} online</span>
                      <span className="text-gray-400 cursor-pointer" title="Số người đang online trong phòng này">&#9432;</span>
                    </div>
                    <p className="text-base text-muted-foreground mb-5 line-clamp-2 flex-1">{room.description}</p>
                    <Button
                      onClick={() => handleJoinRoom(room.id, room.name)}
                      className="w-full gradient-primary text-white hover:opacity-90 font-bold text-lg py-3 shadow-md mt-auto"
                    >
                      Vào phòng
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
