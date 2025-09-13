// src/components/widgets/WidgetWrapper.tsx
import React from "react";

type WidgetWrapperProps = {
  title?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  bgColor?: string;   // basis widgetkleur
  textColor?: string; // tekst/iconkleur (default wit)
  children: React.ReactNode;
};

// ---- helpers ---------------------------------------------------
function clamp(n: number, min = 0, max = 255) { return Math.min(max, Math.max(min, n)); }
function toRgbString(r: number, g: number, b: number) {
  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
}
function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '').trim();
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return [r, g, b];
  }
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return [r, g, b];
  }
  return null;
}
function rgbStringToRgb(rgb: string): [number, number, number] | null {
  const m = rgb.match(/rgba?\s*\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}
/** Maak kleur X% donkerder (default 16%). Werkt voor #hex en rgb()/rgba(). */
function darken(color: string, amount = 0.16): string {
  if (!color) return color;
  const c = color.trim();
  let rgb: [number, number, number] | null = null;

  if (c.startsWith('#')) rgb = hexToRgb(c);
  else if (c.toLowerCase().startsWith('rgb')) rgb = rgbStringToRgb(c);

  if (!rgb) return color;

  const [r, g, b] = rgb;
  const k = 1 - amount;
  return toRgbString(r * k, g * k, b * k);
}
// ----------------------------------------------------------------

export default function WidgetWrapper({
  title,
  icon,
  bgColor = "#1f4557",
  textColor = "#ffffff",
  children,
}: WidgetWrapperProps) {
  const headerBg = darken(bgColor, 0.16); // iets donkerder voor extra contrast

  return (
    <div
      className="w-full rounded-md shadow-sm text-sm border border-black/10 dark:border-white/10 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {(title || icon) && (
        <div
          className="-mx-0 px-4 py-2 flex items-center gap-2 font-semibold text-base rounded-t-md"
          style={{ backgroundColor: headerBg, color: textColor }}
        >
          {icon ? <span className="shrink-0" style={{ color: textColor }}>{icon}</span> : null}
          <span>{title}</span>
        </div>
      )}

      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
