
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function DataCard({ title, children, className, action }: DataCardProps) {
  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {children}
      </CardContent>
    </Card>
  );
}
