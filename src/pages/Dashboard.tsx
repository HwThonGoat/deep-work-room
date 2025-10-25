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
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setRooms(data || []);
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
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Quick Stats Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Trang chủ</h1>
          <p className="text-muted-foreground">Chọn một phòng và bắt đầu học cùng mọi người</p>
        </div>
        
        {/* Compact Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Link to="/streak">
            <Card className="p-4 shadow-smooth hover:shadow-md transition-smooth cursor-pointer border-2 hover:border-primary/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile?.current_streak || 0}</p>
                  <p className="text-xs text-muted-foreground">Chuỗi ngày học</p>
                </div>
              </div>
            </Card>
          </Link>

          <Card className="p-4 shadow-smooth border-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profile?.total_study_time || 0}</p>
                <p className="text-xs text-muted-foreground">Tổng số phút</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-smooth border-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.floor((profile?.total_study_time || 0) / 45)}</p>
                <p className="text-xs text-muted-foreground">Số phiên học</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Rooms Section */}
        <div>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Phòng học</h2>
            <Button className="gradient-primary text-white" onClick={() => navigate("/create-room")}>Tạo phòng</Button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm phòng theo tên hoặc ID..."
              className="w-full p-2 border rounded-md"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <Card key={room.id} className="overflow-hidden shadow-smooth hover:shadow-lg transition-smooth border-2 hover:border-primary/50">
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 truncate">{room.name}</h3>
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-muted">
                        {room.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{room.description}</p>
                  <Button
                    onClick={() => handleJoinRoom(room.id, room.name)}
                    className="w-full gradient-primary text-white hover:opacity-90"
                  >
                    Join Room
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
