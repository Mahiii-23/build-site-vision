
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusFilterProps {
  statusCounts: { [key: string]: number };
  activeStatus: string;
  onStatusChange: (status: string) => void;
}

export function StatusFilter({ statusCounts, activeStatus, onStatusChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(statusCounts).map(([status, count]) => (
        <Button
          key={status}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full",
            activeStatus === status && "bg-primary text-primary-foreground"
          )}
          onClick={() => onStatusChange(status)}
        >
          {status === 'all' ? 'All' : 
           status === 'active' ? 'Active' : 
           status === 'warning' ? 'Warning' : 
           status === 'error' ? 'Error' : 
           status === 'inactive' ? 'Inactive' : 
           status}
          {count !== undefined && (
            <span className="ml-1 text-xs bg-muted rounded-full px-1.5 py-0.5">
              {count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
