"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Logo from "@/components/ui/logo";
import MobileDrawer from "@/components/dashboard/mobile-drawer";

const MobileTopBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
        <Logo />
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-surface-elevated cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default MobileTopBar;
