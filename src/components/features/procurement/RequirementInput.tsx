// src/components/features/procurement/RequirementInput.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";

interface RequirementInputProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export const RequirementInput: React.FC<RequirementInputProps> = ({
  onNext,
}) => {
  const { state, dispatch } = useProcurement();
  const [requirement, setRequirement] = useState(
    state.currentProject?.requirement.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!requirement.trim()) {
      alert("Please enter a project requirement");
      return;
    }

    dispatch({
      type: "UPDATE_REQUIREMENT",
      payload: {
        ...state.currentProject!.requirement,
        description: requirement,
      },
    });

    onNext();
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Phase 1: Project Input
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Describe your construction requirement in one line
        </p>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input */}
          <div>
            <Input
              label="Construction Requirement"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder="e.g., 30,000 sq.ft residential building in Pune with 50 apartments"
              required
              className="text-sm sm:text-base"
            />
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Be specific about location, size, and type of construction
            </p>
          </div>

          {/* Examples */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-medium text-blue-900 text-sm sm:text-base mb-1 sm:mb-2">
              Examples:
            </h4>
            <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
              <li>
                "25,000 sq.ft commercial complex in Mumbai with retail spaces"
              </li>
              <li>
                "15,000 sq.ft villa project in Pune with 10 luxury villas"
              </li>
              <li>"40,000 sq.ft mixed-use development in Hyderabad"</li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" className="w-full sm:w-auto mt-2">
              Start AI Qualification →
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
