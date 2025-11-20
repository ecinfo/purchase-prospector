// src/components/common/EditableField.tsx
import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import { Button } from "../ui/Button";

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  type?: "text" | "textarea";
  className?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  type = "text",
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className={`flex items-center group ${className}`}>
        <span className="mr-2">{value}</span>
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
        >
          <Edit2 className="h-3 w-3 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {type === "textarea" ? (
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
        />
      )}
      <Button size="sm" onClick={handleSave}>
        <Check className="h-3 w-3" />
      </Button>
      <Button size="sm" variant="outline" onClick={handleCancel}>
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};
