import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, VideoOff, X, Maximize2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleAvatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/65.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/77.jpg',
];

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const roomName = location.state?.roomName || "Phòng học";

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [aiFocus, setAiFocus] = useState<string | null>(null);
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [isChatBoxMaximized, setIsChatBoxMaximized] = useState(false);
  const [members, setMembers] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };

    const checkPremium = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("current_streak, longest_streak, total_study_time")
        .eq("id", user.id)
        .single();
      // Adapted logic: Removed `is_premium` reference
      setIsPremium(false); // Default to false since column is missing
    };

    checkAuth();
    checkPremium();
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [navigate]);

  useEffect(() => {
    if (!id) return;
    
    const roomChannel = supabase.channel(`room:${id}`)
      .on('presence', { event: 'sync' }, () => {
        const state = roomChannel.presenceState();
        setMembers(Object.keys(state).length);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await roomChannel.track({
              user_id: user.id,
              online_at: new Date().toISOString(),
            });
          }
        }
      });

    return () => {
      supabase.removeChannel(roomChannel);
    };
  }, [id]);

  const completeSession = useCallback(async () => {
    if (!sessionId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("study_sessions")
        .update({
          completed: true,
          ended_at: new Date().toISOString(),
          duration_minutes: 45,
        })
        .eq("id", sessionId);

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
    } catch (error) {
      const typedError = error as { message: string };
      console.error("Error completing session:", typedError.message);
    }
  }, [sessionId]);

  const handleTimerComplete = useCallback(async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!isBreak) {
      setIsBreak(true);
      setTimeRemaining(5 * 60);

      if (sessionId) {
        await completeSession();
      }
    } else {
      setIsBreak(false);
      setTimeRemaining(45 * 60);
      setSessionStarted(false);
    }
  }, [isBreak, sessionId, completeSession]);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleTimerComplete();
          return isBreak ? 45 * 60 : 5 * 60;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isBreak, handleTimerComplete]);

  useEffect(() => {
    if (sessionStarted && !timerRef.current) {
      startTimer();
    }
  }, [sessionStarted, startTimer]);

  useEffect(() => {
    if (!sessionStarted) return;
    const interval = setInterval(() => {
      const focusStates = [
        "Bạn đang tập trung tốt!",
        "Có vẻ bạn đang mất tập trung...",
        "Hãy nhìn vào màn hình nhé!",
        "Tuyệt vời, tiếp tục nhé!"
      ];
      setAiFocus(focusStates[Math.floor(Math.random() * focusStates.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, [sessionStarted]);

  // Real-time chat subscription
  useEffect(() => {
    if (!id) return;

    const chatChannel = supabase
      .channel(`chat:${id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${id}`,
        },
        async (payload) => {
          const newMessage = payload.new as any;
          const { data: { user } } = await supabase.auth.getUser();
          
          // Only add message if it's not from current user (to avoid duplicates)
          if (newMessage.user_id !== user?.id) {
            // Fetch user email for display
            const { data: profile } = await supabase
              .from('profiles')
              .select('email')
              .eq('id', newMessage.user_id)
              .single();
            
            setMessages((prev) => [
              ...prev,
              { user: profile?.email || 'User', text: newMessage.message },
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatChannel);
    };
  }, [id]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !id) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Add message locally first for immediate feedback
      setMessages((prev) => [...prev, { user: user?.email || "You", text: chatInput }]);
      
      // Save to database (will trigger real-time event for other users)
      await supabase.from('chat_messages').insert({
        room_id: id,
        user_id: user.id,
        message: chatInput,
      });

      setChatInput("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi tin nhắn.",
        variant: "destructive",
      });
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
        title: "Bắt đầu phiên học!",
        description: "Đồng hồ tập trung 45 phút đã bắt đầu.",
      });
    } catch (error) {
      const typedError = error as { message: string };
      console.error("Error starting session:", typedError.message);
      toast({
        title: "Lỗi",
        description: "Không thể bắt đầu phiên học.",
        variant: "destructive",
      });
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
      const typedError = error as { message: string };
      console.error("Error accessing camera:", typedError.message);
      toast({
        title: "Lỗi camera",
        description: "Không thể truy cập camera. Vui lòng kiểm tra quyền.",
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
        const typedError = error as { message: string };
        console.error("Error enabling PiP:", typedError.message);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Break completion modal (premium users get a special screen)
  if (isBreak && timeRemaining === 0) {
    if (isPremium) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4 p-8 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-accent mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Nghỉ giải lao Premium!</h2>
            <p className="text-muted-foreground mb-8">
              Là người dùng premium, bạn được nghỉ lâu hơn, không quảng cáo và nhận mẹo học tập độc quyền!
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
                Bắt đầu phiên mới
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                Quay lại bảng điều khiển
              </Button>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4 p-8 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-accent mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Nghỉ giải lao hoàn tất!</h2>
            <p className="text-muted-foreground mb-8">
              Tuyệt vời! Bạn đã hoàn thành một phiên học. Hãy thư giãn nhé.
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
                Bắt đầu phiên mới
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                Quay lại bảng điều khiển
              </Button>
            </div>
          </Card>
        </div>
      );
    }
  }

  const toggleChatBox = () => {
    setIsChatBoxVisible((prev) => !prev);
    setIsChatBoxMaximized(false);
  } 

  const maximizeChatBox = () => {
    setIsChatBoxMaximized((prev) => !prev);
  } 

  // Sample avatars for demo
  const sampleAvatars = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/65.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/men/77.jpg',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{roomName}</h1>
            <p className="text-sm text-muted-foreground">
              {isBreak ? "🧘 Nghỉ giải lao - Thư giãn" : `📚 Phiên tập trung - ${members} thành viên đang học`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${isBreak ? "gradient-accent text-white" : "gradient-primary text-white"
              }`}>
              {formatTime(timeRemaining)}
            </div>
            {/* Removed duplicate chat button here */}
            <Button variant="ghost" size="icon" onClick={handleLeaveRoom}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Chat Box */}
          {isChatBoxVisible && (
            <div
              className={`fixed bottom-8 right-8 z-50 flex flex-col items-end ${isChatBoxMaximized ? 'w-full h-[calc(100%-5rem)] left-0 top-20 right-0 bottom-0' : 'w-[380px] max-w-full'} transition-all duration-300`}
            >
              <Card className={`flex flex-col bg-white/95 shadow-2xl border-2 border-primary rounded-2xl ${isChatBoxMaximized ? 'h-full' : 'h-[500px]'} w-full animate-fade-in`}>
                <div className="flex items-center justify-between px-4 py-2 border-b bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 rounded-t-2xl">
                  <span className="font-bold text-lg text-primary flex items-center gap-2">💬 Chat nhóm</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={maximizeChatBox} className="hover:bg-orange-100">
                      <Maximize2 className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleChatBox} className="hover:bg-orange-100">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div ref={chatBoxRef} className="flex-1 overflow-y-auto px-4 py-2 bg-white/80 custom-scrollbar">
                  {messages.length === 0 ? (
                    <p className="text-muted-foreground text-base text-center font-medium mt-10">Chưa có tin nhắn nào.</p>
                  ) : (
                    messages.map((msg, idx) => (
                      <div key={idx} className="mb-3 flex items-start gap-2">
                        <span className="font-semibold text-primary whitespace-nowrap">{msg.user}:</span>
                        <span className="bg-muted/60 px-3 py-1 rounded-xl text-base shadow-sm">{msg.text}</span>
                      </div>
                    ))
                  )}
                </div>
                <form className="flex gap-2 px-4 py-3 border-t bg-white/90 rounded-b-2xl" onSubmit={handleSendMessage}>
                  <input
                    className="flex-1 border-2 border-primary/40 rounded-lg px-3 py-2 text-base focus:outline-none focus:border-primary bg-white"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    autoFocus
                  />
                  <Button type="submit" className="gradient-primary text-white font-bold px-6 py-2 text-base shadow-md">Gửi</Button>
                </form>
              </Card>
            </div>
          )}

          {/* Status Message */}
          {isBreak && (
            <Card className="mb-6 p-4 gradient-accent text-white text-center">
              <p className="text-lg font-semibold">Nghỉ giải lao! Hãy vươn vai, uống nước hoặc thư giãn mắt.</p>
            </Card>
          )}

          {/* AI Focus Detection */}
          {aiFocus && (
            <Card className="mb-4 p-3 flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400">
              <Sparkles className="text-yellow-500" />
              <span className="font-medium">AI Tập trung:</span>
              <span>{aiFocus}</span>
            </Card>
          )}

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* User's Video */}

            <Card className="relative aspect-video overflow-hidden bg-card shadow-xl border-2 border-primary/60 hover:border-primary/80 transition-all group">
              {cameraEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                ></video>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted/60 rounded-lg">
                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-off" className="h-16 w-16 mb-2 opacity-60" />
                  <p className="text-base text-muted-foreground font-semibold">Tắt camera</p>
                </div>
              )}
              <div className="absolute bottom-3 left-3 bg-primary/90 px-4 py-1 rounded-full text-sm font-semibold text-white shadow-md">
                Bạn
              </div>
            </Card>

            {/* Simulated Other Users */}
            {sampleAvatars.map((avatar, i) => (
              <Card key={i} className="relative aspect-video overflow-hidden bg-card shadow-xl border-2 border-muted/40 group">
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted/40 rounded-lg">
                  {i === 2 ? (
                    <div className="flex flex-col items-center">
                      <VideoOff className="h-14 w-14 mb-2 text-muted-foreground opacity-60" />
                      <p className="text-base text-muted-foreground font-semibold">Đã tắt camera</p>
                    </div>
                  ) : (
                    <img src={avatar} alt={`user${i}`} className="h-20 w-20 rounded-full object-cover border-4 border-primary/30 shadow-lg mb-2 group-hover:scale-105 transition-transform duration-300" />
                  )}
                  <p className="text-xs text-muted-foreground font-medium">Học viên {i + 1}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-2">
            <Button
              size="lg"
              variant={cameraEnabled ? "destructive" : "default"}
              onClick={toggleCamera}
              className={!cameraEnabled ? "gradient-primary text-white hover:opacity-90 font-bold px-8 py-3 text-lg shadow-lg" : "font-bold px-8 py-3 text-lg shadow-lg"}
            >
              {cameraEnabled ? (
                <>
                  <VideoOff className="mr-2 h-5 w-5" />
                  Tắt camera
                </>
              ) : (
                <>
                  <Video className="mr-2 h-5 w-5" />
                  Bật camera
                </>
              )}
            </Button>

            {cameraEnabled && (
              <Button size="lg" variant="outline" onClick={enablePiP} className="border-2 font-bold px-8 py-3 text-lg shadow-lg">
                <Maximize2 className="mr-2 h-5 w-5" />
                Chế độ Picture-in-Picture
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              onClick={toggleChatBox}
              className="border-2 font-bold px-8 py-3 text-lg shadow-lg gradient-primary text-white hover:opacity-90"
            >
              💬 Chat nhóm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;