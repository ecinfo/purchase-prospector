// src/components/auth/Login.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building, Mail, Lock } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { loginUser, clearError } from "../../store/slices/authSlice";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const fillDemoCredentials = () => {
  //   setFormData({ email: "demo@company.com", password: "password" });
  //   dispatch(clearError());
  // };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 shadow-md dark:bg-indigo-500 rounded-2xl shadow-blue-200/50 dark:shadow-indigo-900/40">
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

              {/* Email */}
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                icon={
                  <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                }
              />

              {/* Password with Toggle */}
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
                  className="absolute text-gray-400 transition dark:text-gray-500 right-3 top-9 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="text-blue-600 border-gray-300 rounded dark:text-blue-400 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    Remember me
                  </span>
                </label>

                <a
                  href="#"
                  className="text-blue-600 dark:text-indigo-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Buttons */}
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>

              {/* <Button
                type="button"
                variant="outline"
                className="w-full dark:border-gray-600"
                onClick={fillDemoCredentials}
                disabled={isLoading}
              >
                Use Demo Credentials
              </Button> */}
            </form>

            {/* Footer Link */}
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

        {/* Demo Info */}
        <div className="text-xs text-center text-gray-500 dark:text-gray-600">
          <p>Demo: demo@company.com / password</p>
        </div>
      </div>
    </div>
  );
};
