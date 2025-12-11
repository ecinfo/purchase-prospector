// src/components/layout/MainLayout.tsx
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 bg-white dark:bg-gray-900">
        <Header />

        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
          {/* This is where page content renders */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
