// src/components/auth/Register.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Building,
  User,
  Mail,
  Lock,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registerUser, clearError } from "../../store/slices/authSlice";

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    role: "purchase_manager" as "purchase_manager" | "project_manager",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      dispatch(clearError());
      alert("Passwords do not match");
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    const result = await dispatch(registerUser(registerData));

    if (registerUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            Get Started
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create your AgentProcure account
          </p>
        </div>

        {/* Card */}
        <Card className="border border-gray-200 shadow-xl dark:border-gray-700 dark:bg-gray-800/60 backdrop-blur-lg">
          <CardHeader>
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
              Sign Up
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

              <Input
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                icon={
                  <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                }
              />

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

              <Input
                label="Company Name"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
                required
                icon={
                  <Briefcase className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                }
              />

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-indigo-400"
                  required
                >
                  <option value="purchase_manager">Purchase Manager</option>
                  <option value="project_manager">Project Manager</option>
                </select>
              </div>

              {/* Password */}
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

              {/* Confirm Password */}
              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  icon={
                    <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute text-gray-400 transition dark:text-gray-500 right-3 top-9 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Terms */}
              <div className="flex items-start text-sm">
                <input
                  type="checkbox"
                  required
                  className="mt-1 text-blue-600 border-gray-300 rounded dark:text-indigo-400 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-indigo-400"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-indigo-400 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-indigo-400 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </div>

              {/* Button */}
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Create Account
              </Button>
            </form>

            {/* Footer Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 dark:text-indigo-400 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
