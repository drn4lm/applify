import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "warning" | "success" | "destructive";
  delay?: number;
}

const variantStyles = {
  default: "border-border",
  primary: "border-primary/30 bg-primary/5",
  warning: "border-warning/30 bg-warning/5",
  success: "border-success/30 bg-success/5",
  destructive: "border-destructive/30 bg-destructive/5",
};

const iconVariants = {
  default: "text-muted-foreground",
  primary: "text-primary",
  warning: "text-warning",
  success: "text-success",
  destructive: "text-destructive",
};

export const StatCard = ({
  label,
  value,
  icon: Icon,
  variant = "default",
  delay = 0,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02] animate-fade-in",
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center bg-secondary",
            iconVariants[variant]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
