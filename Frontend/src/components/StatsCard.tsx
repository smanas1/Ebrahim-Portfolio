import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  theme: string;
  iconBgClass: string;
  iconColorClass: string;
  children: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  theme,
  iconBgClass,
  iconColorClass,
  children,
  className = ""
}) => {
  return (
    <Card
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-white shadow-gray-700"
          : "bg-white text-gray-900 shadow-md"
      } hover:shadow-lg transition-shadow ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle
          className={`text-sm font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-full ${
            theme === "dark"
              ? `${iconBgClass} ${iconColorClass}`
              : `${iconBgClass} ${iconColorClass}`
          }`}
        >
          {children}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;