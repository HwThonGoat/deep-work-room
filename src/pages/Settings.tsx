import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  }, [navigate]);

  const fetchProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || "");

      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (data) {
        setFullName(data.full_name || "");
      }
    } catch (error) {
      const typedError = error as { message: string };
      console.error("Error fetching profile:", typedError.message);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    fetchProfile();
  }, [checkAuth, fetchProfile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      const typedError = error as { message: string };
      toast({
        title: "Error",
        description: typedError.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-8 text-primary drop-shadow-sm tracking-tight text-center">Cài đặt</h1>

        <Card className="shadow-xl border-2 border-primary/20 bg-white/95 mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary mb-1">Cài đặt hồ sơ</CardTitle>
            <CardDescription className="text-base text-muted-foreground">Cập nhật thông tin cá nhân của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-semibold">Họ và tên</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Họ và tên"
                  className="mt-1 text-base px-4 py-2 border-2 border-primary/20 rounded-lg focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted mt-1 text-base px-4 py-2 border-2 border-primary/20 rounded-lg"
                />
                <p className="text-sm text-muted-foreground">Email không thể thay đổi</p>
              </div>

              <Button
                type="submit"
                className="gradient-primary text-white font-bold px-8 py-2 shadow-md"
                disabled={loading}
              >
                {loading ? "Đang cập nhật..." : "Cập nhật hồ sơ"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-2 border-primary/10 bg-white/95 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary mb-1">Giao diện</CardTitle>
            <CardDescription className="text-base text-muted-foreground">Tùy chọn giao diện của bạn được lưu tự động</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground">
              Sử dụng công tắc giao diện trên thanh điều hướng để chuyển giữa chế độ sáng và tối.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
