import React from "react";
import Logo from "@/components/ui/logo";

const stats = [
  { label: "Assets managed", value: "$2.4B+" },
  { label: "Investors", value: "180K+" },
  { label: "Cryptocurrencies", value: "50+" },
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen max-h-screen w-screen max-w-screen bg-background">
      <div className="relative hidden w-1/2 overflow-hidden bg-surface lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
          }}
        />

        <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-success/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />

        <Logo />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="w-fit rounded-card border border-border bg-background/60 px-5 py-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-foreground-muted">
              BTC/USD
            </p>
            <p className="mt-1 text-2xl font-bold text-success">$67,240.32</p>
            <p className="mt-0.5 text-xs text-success">+2.4% today</p>
          </div>
          <div className="ml-12 w-fit rounded-card border border-border bg-background/60 px-5 py-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-foreground-muted">
              ETH/USD
            </p>
            <p className="mt-1 text-2xl font-bold text-success">$3,482.17</p>
            <p className="mt-0.5 text-xs text-success">+1.1% today</p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-foreground-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <Logo />

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
