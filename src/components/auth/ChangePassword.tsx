import React, { useState } from "react";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changePasswordUser } from "../../store/slices/authSlice";

export const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, token, user } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (!user) {
      alert("User not authenticated");
      return;
    }

    if (!token) {
      alert("Authentication token is missing");
      return;
    }

    const result = await dispatch(
      changePasswordUser({
        username: user.username, // or from auth state
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        token,
      })
    );

    if (changePasswordUser.fulfilled.match(result)) {
      setSuccessMessage("Password updated successfully");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 mx-auto max-w">
      <Card className="border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800/60 backdrop-blur-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-blue-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Change Password
            </h2>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Success message */}
            {successMessage && (
              <div className="p-3 text-sm text-green-600 border border-green-300 rounded-lg bg-green-50 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700">
                {successMessage}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="p-3 text-sm text-red-600 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700">
                {error}
              </div>
            )}

            {/* OLD PASSWORD */}
            <div className="relative">
              <Input
                label="Old Password"
                name="oldPassword"
                type={showOld ? "text" : "password"}
                value={formData.oldPassword}
                onChange={handleChange}
                required
                placeholder="Enter current password"
                icon={
                  <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                }
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute text-gray-400 right-3 top-9 dark:text-gray-500"
              >
                {showOld ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* NEW PASSWORD */}
            <div className="relative">
              <Input
                label="New Password"
                name="newPassword"
                type={showNew ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                required
                placeholder="Enter new password"
                icon={
                  <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                }
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute text-gray-400 right-3 top-9 dark:text-gray-500"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter new password"
                icon={
                  <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute text-gray-400 right-3 top-9 dark:text-gray-500"
              >
                {showConfirm ? (
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
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
