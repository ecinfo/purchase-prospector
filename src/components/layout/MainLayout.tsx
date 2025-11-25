// src/components/layout/MainLayout.tsx
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 bg-white dark:bg-gray-900">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="h-full bg-gray-50 dark:bg-gray-900">{children}</div>
        </main>
      </div>
    </div>
  );
};
