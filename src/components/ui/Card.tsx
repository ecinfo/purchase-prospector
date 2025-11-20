// src/components/ui/Card.tsx
import React from "react";

interface CustomCardProps {
  padding?: "sm" | "md" | "lg" | "none";
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

// 👇 Extend native div props (includes onClick, style, id, etc.)
export type CardProps = CustomCardProps & React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  hover = false,
  ...rest // ⬅️ now accepts onClick & others
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const baseClasses = hover ? "card-hover" : "card";

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${className}`}
      {...rest} // ⬅️ apply onClick and any div props
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);
