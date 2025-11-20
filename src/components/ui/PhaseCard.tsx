// src/components/ui/PhaseCard.tsx
import React from "react";
import { Card, CardContent } from "./Card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface PhaseCardProps {
  phase: {
    number: number;
    title: string;
    description: string;
  };
  status: "completed" | "current" | "upcoming";
  onClick?: () => void;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  status,
  onClick,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "current":
        return <Clock className="h-6 w-6 text-blue-500" />;
      case "upcoming":
        return <AlertCircle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50";
      case "current":
        return "border-blue-200 bg-blue-50";
      case "upcoming":
        return "border-gray-200 bg-gray-50";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "completed":
        return "text-green-700";
      case "current":
        return "text-blue-700";
      case "upcoming":
        return "text-gray-500";
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${getStatusColor()} ${
        status === "current" ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  status === "completed"
                    ? "bg-green-100 text-green-600"
                    : status === "current"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {phase.number}
              </div>
              <h3 className={`font-semibold ${getTextColor()}`}>
                {phase.title}
              </h3>
            </div>
            <p className={`text-sm ${getTextColor()} ml-11`}>
              {phase.description}
            </p>
          </div>
          <div className="ml-4">{getStatusIcon()}</div>
        </div>
      </CardContent>
    </Card>
  );
};
