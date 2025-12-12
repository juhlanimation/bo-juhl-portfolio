import type { ReactNode } from "react";
import type { PageLayoutSettings } from "./index";

interface Props {
  settings: PageLayoutSettings;
  isSelected?: boolean;
  children?: ReactNode;
}

export function PageLayout({ settings, isSelected, children }: Props) {
  return (
    <div
      style={{
        backgroundColor: settings.backgroundColor,
        maxWidth: settings.maxWidth === "none" ? undefined : settings.maxWidth,
        margin: settings.maxWidth === "none" ? undefined : "0 auto",
      }}
      className={`relative min-h-screen ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      {/* Main content area - no padding, hero goes under navbar */}
      <main>{children}</main>
    </div>
  );
}
