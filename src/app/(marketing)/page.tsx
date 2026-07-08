import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Placeholder landing page — confirms the theme, navbar/footer shell, and
 * UI primitives render correctly together. Replace with real marketing
 * content once copy and layout are decided.
 */
export default function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-32 text-center">
      <Badge variant="primary">Component preview</Badge>
      <h1
        className="text-5xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {siteConfig.name}
      </h1>
      <p className="max-w-md text-foreground-muted">
        {siteConfig.description}
      </p>
      <div className="flex gap-3">
        <Button size="lg">Get started</Button>
        <Button variant="secondary" size="lg">
          View markets
        </Button>
      </div>
      <div className="mt-8 flex gap-4 text-sm">
        <Badge variant="success">▲ 4.32%</Badge>
        <Badge variant="danger">▼ 1.08%</Badge>
      </div>
    </div>
  );
}
