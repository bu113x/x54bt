import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import SmartsuppWidget from "@/components/support/smartsupp-widget";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
      <SmartsuppWidget />
    </div>
  );
};

export default DashboardLayout;
