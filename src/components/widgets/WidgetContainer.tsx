import type { ReactNode } from "react";

interface WidgetContainerProps {
  children: ReactNode;
}

export default function WidgetContainer({ children }: WidgetContainerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
