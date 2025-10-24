import { useEffect, useState } from "react";
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

  useEffect(() => {
    checkAuth();
    fetchProfile();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Your Study Streak</h1>
          <p className="text-muted-foreground mb-8">Keep up the great work! Consistency is key to success.</p>
          
          {/* Main Streak Display */}
          <Card className="p-8 mb-8 text-center shadow-lg border-2 border-primary/20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary mb-4">
              <Flame className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-6xl font-bold mb-2 text-primary">{profile?.current_streak || 0}</h2>
            <p className="text-xl text-muted-foreground">Day Streak</p>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-smooth">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">Longest Streak</h3>
              </div>
              <p className="text-3xl font-bold">{profile?.longest_streak || 0}</p>
              <p className="text-sm text-muted-foreground">days</p>
            </Card>

            <Card className="p-6 shadow-smooth">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Total Study Time</h3>
              </div>
              <p className="text-3xl font-bold">{profile?.total_study_time || 0}</p>
              <p className="text-sm text-muted-foreground">minutes</p>
            </Card>

            <Card className="p-6 shadow-smooth">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">Sessions</h3>
              </div>
              <p className="text-3xl font-bold">{Math.floor((profile?.total_study_time || 0) / 45)}</p>
              <p className="text-sm text-muted-foreground">completed</p>
            </Card>
          </div>

          {/* Motivation Message */}
          <Card className="p-6 gradient-primary text-white">
            <h3 className="text-xl font-semibold mb-2">Keep Going! 🎉</h3>
            <p className="mb-4">
              {profile?.current_streak === 0 
                ? "Start your streak today by completing a study session!"
                : profile?.current_streak < 7
                ? `You're on fire! Just ${7 - (profile?.current_streak || 0)} more days to reach a week!`
                : "Amazing dedication! You're building a strong study habit."}
            </p>
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Studying
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Streak;
