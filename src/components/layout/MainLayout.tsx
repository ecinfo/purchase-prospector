// src/components/layout/MainLayout.tsx
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
// import { useApp } from "../../contexts/AppContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  //   const { state } = useApp();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
