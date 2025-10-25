import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Moon, Sun, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-smooth hover:opacity-80">
          <img src={logo} alt="HOCA Logo" className="h-16 w-16" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">HOCA</span>
            <span className="text-sm font-bold text-orange-500 animate-pulse">🔥 Bật Cam Bật Mode Học</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-smooth"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Trang chủ</Button>
              </Link>
              <Link to="/streak">
                <Button variant="ghost">Chuỗi học tập</Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="ghost">Xếp hạng</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="ghost">Gói</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost">Cài đặt</Button>
              </Link>
              <Link to="/rules">
                <Button variant="ghost">Quy tắc</Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost">Đăng nhập</Button>
              </Link>
              <Link to="/auth">
                <Button className="gradient-primary text-white">Bắt đầu</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
