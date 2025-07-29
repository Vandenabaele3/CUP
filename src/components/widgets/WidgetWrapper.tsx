import React from "react";

type WidgetWrapperProps = {
  title?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

const sizeMap = {
  sm: "min-w-[250px]",
  md: "min-w-[400px]",
  lg: "min-w-[600px]",
};

export default function WidgetWrapper({
  title,
  icon,
  size = "md",
  bgColor = "#1f4557",
  textColor = "#ffffff",
  children,
}: WidgetWrapperProps) {
  return (
    <div
      className={`rounded-xl shadow-md p-4 space-y-4 ${sizeMap[size]}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 font-bold text-lg">
          {icon}
          <span>{title}</span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
