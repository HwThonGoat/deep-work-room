import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Clock, Zap, Users, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Study Together,
            <br />
            Stay Focused
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join silent video rooms with students worldwide. Build study streaks, stay accountable, and achieve your goals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/auth">
              <Button size="lg" className="gradient-primary text-white text-lg px-8 h-14 shadow-smooth hover:shadow-lg transition-smooth">
                Start Studying Now
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Focus
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Accountability</h3>
              <p className="text-muted-foreground">
                See others studying in real-time. No audio, just silent focus and presence.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Streaks</h3>
              <p className="text-muted-foreground">
                Track daily progress and build momentum. Watch your streak grow day by day.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pomodoro Timer</h3>
              <p className="text-muted-foreground">
                Built-in 45-minute focus sessions with 5-minute breaks for sustainable studying.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Any Room</h3>
              <p className="text-muted-foreground">
                Choose from multiple study rooms by subject or join the general study hall.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Picture-in-Picture</h3>
              <p className="text-muted-foreground">
                Keep the study room visible while working in other apps or tabs.
              </p>
            </Card>

            <Card className="p-6 shadow-smooth hover:shadow-lg transition-smooth border-2">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Audio off by default. Your privacy matters. Study without distractions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How HOCA Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Room</h3>
                <p className="text-muted-foreground">
                  Select a study room based on your subject or mood. Join the general study hall or pick a specialized room.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-accent text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Turn On Your Camera</h3>
                <p className="text-muted-foreground">
                  Enable your camera (audio stays off). See others studying and feel the accountability boost.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Start Your Session</h3>
                <p className="text-muted-foreground">
                  The 45-minute timer begins automatically. Focus on your work while others do the same.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full gradient-accent text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Build Your Streak</h3>
                <p className="text-muted-foreground">
                  Complete your session and watch your daily streak grow. Stay consistent and reach your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who are building better focus and achieving their goals with HOCA.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary text-white text-lg px-8 h-14 shadow-smooth hover:shadow-lg transition-smooth">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 HOCA. Built for focused students everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
