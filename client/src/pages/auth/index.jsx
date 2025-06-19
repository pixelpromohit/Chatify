import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) return toast.error("Email is required.");
    if (!password.length) return toast.error("Password is required.");
    return true;
  };

  const validateSignup = () => {
    if (!email.length) return toast.error("Email is required.");
    if (!password.length) return toast.error("Password is required.");
    if (password !== confirmPassword) return toast.error("Passwords don't match.");
    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        }
      } catch (error) {
        console.error(error);
        // Show backend error message directly to the user
        toast.error(error.response?.data || error.response?.data?.message || "Login failed.");
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Signup failed.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 overflow-y-auto">
      <div className="w-full max-w-xl xl:max-w-4xl h-auto xl:h-[80vh] bg-gray-900 shadow-xl rounded-3xl overflow-hidden grid xl:grid-cols-2 border border-gray-700 text-white">
        <div className="flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 gap-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center gap-2">
              Welcome
              <img src={Victory} alt="Victory" className="h-14" />
            </h1>
            <p className="mt-2 text-sm md:text-base font-medium text-gray-300">
              Fill in your details to get started!
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full max-w-md">
            <TabsList className="flex w-full bg-gray-800 rounded-full p-1">
              <TabsTrigger
                value="login"
                className="w-1/2 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow rounded-full transition-all text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-1/2 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow rounded-full transition-all text-white"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-8 flex flex-col gap-4">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl px-5 py-4 bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl px-5 py-4 bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              />
              <Button
                onClick={handleLogin}
                className="rounded-xl px-5 py-4 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
              >
                Login
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="mt-8 flex flex-col gap-4">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl px-5 py-4 bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl px-5 py-4 bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="rounded-xl px-5 py-4 bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              />
              <Button
                onClick={handleSignup}
                className="rounded-xl px-5 py-4 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
              >
                Signup
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Image Side */}
        <div className="hidden xl:flex justify-center items-center bg-gray-800">
          <img src={Background} alt="Login Illustration" className="max-h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
