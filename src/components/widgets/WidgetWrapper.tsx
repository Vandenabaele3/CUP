import React from "react";

type WidgetWrapperProps = {
  title?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export default function WidgetWrapper({
  title,
  icon,
  bgColor = "#1f4557",
  textColor = "#ffffff",
  children,
}: WidgetWrapperProps) {
  return (
    <div
      className="w-full rounded-md shadow-sm p-4 space-y-4 text-sm"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 font-semibold text-base">
          {icon}
          <span>{title}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
