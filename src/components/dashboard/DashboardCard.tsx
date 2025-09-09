import React from "react";

type DashboardCardProps = {
  size?: "lg" | "sm";
  children: React.ReactNode;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ size = "lg", children }) => {
  const baseClass =
    size === "sm"
      ? "rounded-2xl p-3 flex flex-col items-center justify-between text-white text-center min-h-[160px]"
      : "w-full rounded-md shadow-sm p-4 space-y-4 text-sm";

  return <div className={baseClass}>{children}</div>;
};

export default DashboardCard;
