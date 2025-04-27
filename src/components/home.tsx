import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { LockIcon, UserIcon, BuildingIcon, ArrowRightIcon } from "lucide-react";

const HomePage = () => {
  const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call to authenticate
      // const response = await fetch(`/api/auth/${userType}/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // if (!response.ok) throw new Error(data.message || 'Authentication failed');

      // Redirect based on user type
      navigate(userType === "admin" ? "/admin/dashboard" : "/brand/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Admin & Brand Portal
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Secure access to manage your platform. Choose your portal type below
            to continue.
          </p>
        </div>

        <Card className="w-full max-w-md mx-auto bg-background shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your portal
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs
              defaultValue="admin"
              value={userType}
              onValueChange={setUserType}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="brand" className="flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4" />
                  Brand
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && (
                      <div className="text-sm text-destructive">{error}</div>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <LockIcon className="h-4 w-4" />
                          Sign in to Admin Portal
                          <ArrowRightIcon className="h-4 w-4 ml-auto" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="brand">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-email">Email</Label>
                      <Input
                        id="brand-email"
                        type="email"
                        placeholder="brand@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-password">Password</Label>
                      <Input
                        id="brand-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && (
                      <div className="text-sm text-destructive">{error}</div>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                          Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <BuildingIcon className="h-4 w-4" />
                          Sign in to Brand Portal
                          <ArrowRightIcon className="h-4 w-4 ml-auto" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 border-t pt-4">
            <div className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </div>
            <div className="text-xs text-center">
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Admin & Brand Portal. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
