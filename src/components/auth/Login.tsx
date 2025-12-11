// src/components/auth/Login.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building, User, Lock } from "lucide-react";

import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { loginUser, clearError } from "../../store/slices/authSlice";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);
  console.log("Auth User in Login Component:", user);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));
    console.log("Login result:", result);
    console.log("Redux auth state:", store.getState().auth);
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 shadow-md rounded-2xl dark:bg-indigo-500">
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to your AgentProcure account
          </p>
        </div>

        {/* Card */}
        <Card className="border border-gray-200 shadow-xl dark:border-gray-700 dark:bg-gray-800/60 backdrop-blur-lg">
          <CardHeader>
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
              Sign In
            </h2>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error */}
              {error && (
                <div className="p-3 text-sm text-red-600 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700">
                  {error}
                </div>
              )}

              {/* Username (no regex, no email type) */}
              <Input
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                icon={
                  <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                }
              />

              {/* Password */}
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  icon={
                    <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 right-3 top-9 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 dark:text-indigo-400 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
