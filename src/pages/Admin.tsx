import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  Shield, 
  TrendingUp,
  ArrowLeft,
  UserCheck,
  UserX
} from "lucide-react";

interface User {
  id: string;
  email: string;
  full_name: string;
  subscription_plan: string;
  current_streak: number;
  total_study_time: number;
  created_at: string;
}

interface Room {
  id: string;
  name: string;
  category: string;
  is_private: boolean;
  is_active: boolean;
  created_at: string;
}

interface Message {
  id: string;
  message: string;
  created_at: string;
  room_id: string;
  user_id: string;
}

interface Stats {
  totalUsers: number;
  activeRooms: number;
  totalMessages: number;
  totalStudyTime: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeRooms: 0,
    totalMessages: 0,
    totalStudyTime: 0
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to access admin panel");
        navigate("/auth");
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError || !roleData) {
        toast.error("Access denied: Admin privileges required");
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      await fetchData();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch users
      const { data: usersData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (usersData) setUsers(usersData);

      // Fetch rooms
      const { data: roomsData } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (roomsData) setRooms(roomsData);

      // Fetch recent messages
      const { data: messagesData } = await supabase
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (messagesData) setMessages(messagesData);

      // Calculate stats
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: roomCount } = await supabase
        .from("rooms")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      const { count: messageCount } = await supabase
        .from("chat_messages")
        .select("*", { count: "exact", head: true });

      const { data: studyData } = await supabase
        .from("profiles")
        .select("total_study_time");

      const totalTime = studyData?.reduce((acc, curr) => acc + (curr.total_study_time || 0), 0) || 0;

      setStats({
        totalUsers: userCount || 0,
        activeRooms: roomCount || 0,
        totalMessages: messageCount || 0,
        totalStudyTime: Math.round(totalTime / 60)
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load admin data");
    }
  };

  const toggleRoomStatus = async (roomId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("rooms")
        .update({ is_active: !currentStatus })
        .eq("id", roomId);

      if (error) throw error;

      toast.success(`Room ${!currentStatus ? "activated" : "deactivated"}`);
      fetchData();
    } catch (error) {
      console.error("Error toggling room:", error);
      toast.error("Failed to update room status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading admin panel...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">Manage and moderate your platform</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 dark:bg-card border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-card border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Active Rooms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.activeRooms}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-card border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Total Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalMessages}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-card border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalStudyTime}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-white/90 dark:bg-card border shadow-sm">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-white/90 dark:bg-card border-none shadow-lg">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Streak</TableHead>
                        <TableHead>Study Time</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>{user.full_name || "N/A"}</TableCell>
                          <TableCell>
                            <Badge variant={user.subscription_plan === "free" ? "secondary" : "default"}>
                              {user.subscription_plan}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.current_streak} days</TableCell>
                          <TableCell>{Math.round(user.total_study_time / 60)}h</TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms">
            <Card className="bg-white/90 dark:bg-card border-none shadow-lg">
              <CardHeader>
                <CardTitle>Room Management</CardTitle>
                <CardDescription>Monitor and moderate study rooms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell className="font-medium">{room.name}</TableCell>
                          <TableCell>{room.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {room.is_private ? "Private" : "Public"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={room.is_active ? "default" : "secondary"}>
                              {room.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(room.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleRoomStatus(room.id, room.is_active)}
                            >
                              {room.is_active ? (
                                <>
                                  <UserX className="h-4 w-4 mr-1" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  Activate
                                </>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="bg-white/90 dark:bg-card border-none shadow-lg">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Monitor chat activity across all rooms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-lg border bg-background/50 dark:bg-background/20"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Room ID: {msg.room_id.slice(0, 8)}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
