"use client";

import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import MobileTopBar from "@/components/dashboard/mobile-top-bar";
import MobileTabBar from "@/components/dashboard/mobile-tab-bar";
import PageTransition from "@/components/layout/page-transition";
import SmartsuppWidget from "@/components/support/smartsupp-widget";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileTopBar />

        <main className="flex-1 overflow-y-auto px-4 py-6 pb-28 md:px-8 md:py-8 md:pb-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>

      <MobileTabBar />
      <SmartsuppWidget />
    </div>
  );
};

export default DashboardLayout;
