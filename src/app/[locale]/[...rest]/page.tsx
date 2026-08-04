import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-background px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">404</h1>
      <p className="text-sm text-foreground-muted">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
