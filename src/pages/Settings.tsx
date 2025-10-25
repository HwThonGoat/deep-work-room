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
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-2xl">
  <h1 className="text-4xl font-bold mb-8">Cài đặt</h1>

        <Card className="shadow-smooth">
          <CardHeader>
            <CardTitle>Cài đặt hồ sơ</CardTitle>
            <CardDescription>
              Cập nhật thông tin cá nhân của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Họ và tên"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground">
                  Email không thể thay đổi
                </p>
              </div>

              <Button
                type="submit"
                className="gradient-primary text-white"
                disabled={loading}
              >
                {loading ? "Đang cập nhật..." : "Cập nhật hồ sơ"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-smooth mt-6">
          <CardHeader>
            <CardTitle>Giao diện</CardTitle>
            <CardDescription>
              Tùy chọn giao diện của bạn được lưu tự động
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sử dụng công tắc giao diện trên thanh điều hướng để chuyển giữa chế độ sáng và tối.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
