import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
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
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { confirmPassword, ...payload } = formData;

    const result = await dispatch(registerUser(payload));

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
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 shadow-md rounded-2xl dark:bg-indigo-500">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create Account
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Register to continue
          </p>
        </div>

        <Card className="border border-gray-200 shadow-xl dark:border-gray-700 dark:bg-gray-800/60 backdrop-blur-lg">
          <CardHeader>
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
              Sign Up
            </h2>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700">
                  {error}
                </div>
              )}

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
                label="Phone Number"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                icon={
                  <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
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
                  placeholder="Create a password"
                  required
                  icon={
                    <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 right-3 top-9 hover:text-gray-600"
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
                  className="absolute text-gray-400 right-3 top-9 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Create Account
              </Button>
            </form>

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
