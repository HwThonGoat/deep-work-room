import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, VideoOff, X, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const roomName = location.state?.roomName || "Study Room";
  
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkAuth();
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (sessionStarted && !timerRef.current) {
      startTimer();
    }
  }, [sessionStarted]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimerComplete();
          return isBreak ? 45 * 60 : 5 * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimerComplete = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (!isBreak) {
      // Work session completed
      setIsBreak(true);
      setTimeRemaining(5 * 60);
      
      // Update session in database
      if (sessionId) {
        await completeSession();
      }
    } else {
      // Break completed
      setIsBreak(false);
      setTimeRemaining(45 * 60);
      setSessionStarted(false);
    }
  };

  const startSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("study_sessions")
        .insert({
          user_id: user.id,
          room_name: roomName,
          duration_minutes: 0,
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;
      
      setSessionId(data.id);
      setSessionStarted(true);
      
      toast({
        title: "Session started!",
        description: "45-minute focus timer is running.",
      });
    } catch (error: any) {
      console.error("Error starting session:", error);
      toast({
        title: "Error",
        description: "Failed to start session.",
        variant: "destructive",
      });
    }
  };

  const completeSession = async () => {
    if (!sessionId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update session
      await supabase
        .from("study_sessions")
        .update({
          completed: true,
          ended_at: new Date().toISOString(),
          duration_minutes: 45,
        })
        .eq("id", sessionId);

      // Update profile streak
      const { data: profile } = await supabase
        .from("profiles")
        .select("current_streak, longest_streak, total_study_time, last_session_date")
        .eq("id", user.id)
        .single();

      if (profile) {
        const today = new Date().toISOString().split("T")[0];
        const lastSession = profile.last_session_date;
        const newStreak = lastSession === today ? profile.current_streak : profile.current_streak + 1;
        
        await supabase
          .from("profiles")
          .update({
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, profile.longest_streak),
            total_study_time: profile.total_study_time + 45,
            last_session_date: today,
          })
          .eq("id", user.id);
      }
    } catch (error: any) {
      console.error("Error completing session:", error);
    }
  };

  const toggleCamera = async () => {
    if (cameraEnabled) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      setCameraEnabled(true);
      
      if (!sessionStarted) {
        await startSession();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraEnabled(false);
  };

  const handleLeaveRoom = () => {
    stopCamera();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    navigate("/dashboard");
  };

  const enablePiP = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      try {
        await videoRef.current.requestPictureInPicture();
      } catch (error) {
        console.error("Error enabling PiP:", error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Break completion modal
  if (isBreak && timeRemaining === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 p-8 text-center shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-accent mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Break Complete!</h2>
          <p className="text-muted-foreground mb-8">
            Great job! You've completed a study session. Take your time to relax.
          </p>
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full gradient-primary text-white"
              onClick={() => {
                setIsBreak(false);
                setTimeRemaining(45 * 60);
                setSessionStarted(false);
                startTimer();
              }}
            >
              Start Another Session
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{roomName}</h1>
            <p className="text-sm text-muted-foreground">
              {isBreak ? "🧘 Break Time - Relax" : "📚 Focus Session"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${
              isBreak ? "gradient-accent text-white" : "gradient-primary text-white"
            }`}>
              {formatTime(timeRemaining)}
            </div>
            <Button variant="ghost" size="icon" onClick={handleLeaveRoom}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Status Message */}
          {isBreak && (
            <Card className="mb-6 p-4 gradient-accent text-white text-center">
              <p className="text-lg font-semibold">Take a break! Stretch, grab water, or rest your eyes.</p>
            </Card>
          )}
          
          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* User's Video */}
            <Card className="relative aspect-video overflow-hidden bg-card shadow-smooth border-2 hover:border-primary/50 transition-smooth">
              {cameraEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <VideoOff className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Camera Off</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-3 left-3 bg-primary/90 px-3 py-1 rounded-full text-xs font-medium text-white">
                You
              </div>
            </Card>

            {/* Simulated Other Users */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="relative aspect-video overflow-hidden bg-card shadow-smooth border-2">
                <div className="w-full h-full flex items-center justify-center bg-muted/30">
                  <div className="text-center opacity-40">
                    <Video className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Student {i}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              variant={cameraEnabled ? "destructive" : "default"}
              onClick={toggleCamera}
              className={!cameraEnabled ? "gradient-primary text-white hover:opacity-90" : ""}
            >
              {cameraEnabled ? (
                <>
                  <VideoOff className="mr-2 h-5 w-5" />
                  Turn Off Camera
                </>
              ) : (
                <>
                  <Video className="mr-2 h-5 w-5" />
                  Turn On Camera
                </>
              )}
            </Button>

            {cameraEnabled && (
              <Button size="lg" variant="outline" onClick={enablePiP} className="border-2">
                <Maximize2 className="mr-2 h-5 w-5" />
                Picture-in-Picture
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
