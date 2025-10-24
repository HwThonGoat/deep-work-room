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
    checkAuth();
    fetchProfile();
    fetchRooms();
  }, []);

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
    } catch (error: any) {
      console.error("Error fetching profile:", error);
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
    } catch (error: any) {
      console.error("Error fetching rooms:", error);
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
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Stats Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Your Study Dashboard</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 shadow-smooth border-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold">{profile?.current_streak || 0} days</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-smooth border-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Longest Streak</p>
                  <p className="text-3xl font-bold">{profile?.longest_streak || 0} days</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-smooth border-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Study Time</p>
                  <p className="text-3xl font-bold">{profile?.total_study_time || 0} mins</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Rooms Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Study Rooms</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room.id} className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Video className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted">
                      {room.category}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleJoinRoom(room.id, room.name)}
                  className="w-full gradient-primary text-white"
                >
                  Join Room
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
