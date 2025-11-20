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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">
          Phase 1: Project Input
        </h2>
        <p className="text-gray-600">
          Describe your construction requirement in one line
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Construction Requirement"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder="e.g., 30,000 sq.ft residential building in Pune with 50 apartments"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Be specific about location, size, and type of construction
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Examples:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                "25,000 sq.ft commercial complex in Mumbai with retail spaces"
              </li>
              <li>
                "15,000 sq.ft villa project in Pune with 10 luxury villas"
              </li>
              <li>"40,000 sq.ft mixed-use development in Hyderabad"</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Start AI Qualification →
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
