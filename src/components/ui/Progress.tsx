// src/components/ui/Progress.tsx
import React from "react";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  showLabel?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  className = "",
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const variantClasses = {
    default: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        {showLabel && (
          <>
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">
              {percentage.toFixed(0)}%
            </span>
          </>
        )}
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`rounded-full transition-all duration-300 ${variantClasses[variant]} ${sizeClasses[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
