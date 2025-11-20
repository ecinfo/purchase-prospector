// src/components/common/ConfirmationModal.tsx
import React from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "warning" | "success";
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}) => {
  const Icon = type === "warning" ? AlertTriangle : CheckCircle;
  const iconColor = type === "warning" ? "text-yellow-500" : "text-green-500";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <Icon className={`h-12 w-12 mx-auto mb-4 ${iconColor}`} />
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex space-x-3 justify-center">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            loading={loading}
            variant={type === "warning" ? "secondary" : "primary"}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
