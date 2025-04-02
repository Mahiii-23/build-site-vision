
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusFilterProps {
  statuses: { label: string; value: string; count?: number; color?: string }[];
  selectedStatus: string | null;
  onChange: (status: string | null) => void;
}

export function StatusFilter({ statuses, selectedStatus, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "rounded-full",
          selectedStatus === null && "bg-primary text-primary-foreground"
        )}
        onClick={() => onChange(null)}
      >
        All
      </Button>
      
      {statuses.map((status) => (
        <Button
          key={status.value}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full",
            selectedStatus === status.value && "bg-primary text-primary-foreground"
          )}
          onClick={() => onChange(status.value)}
        >
          {status.label}
          {status.count !== undefined && (
            <span className="ml-1 text-xs bg-muted rounded-full px-1.5 py-0.5">
              {status.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
