
import { cn } from "@/lib/utils";
import { 
  CheckCircle2, 
  PauseCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Clock, 
  Loader2 
} from "lucide-react";

// Project status badge
export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "active" && "bg-success/20 text-success",
        status === "paused" && "bg-warning/20 text-warning",
        status === "completed" && "bg-primary/20 text-primary"
      )}
    >
      {status === "active" && (
        <CheckCircle2 className="w-3 h-3 mr-1" />
      )}
      {status === "paused" && (
        <PauseCircle className="w-3 h-3 mr-1" />
      )}
      {status === "completed" && (
        <CheckCircle2 className="w-3 h-3 mr-1" />
      )}
      {status === "active" ? "Active" : 
       status === "paused" ? "Paused" : 
       status === "completed" ? "Completed" : status}
    </div>
  );
};

// Milestone status badge
export const MilestoneStatusBadge = ({ status }: { status: string }) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "completed" && "bg-success/20 text-success",
        status === "in-progress" && "bg-primary/20 text-primary",
        status === "upcoming" && "bg-muted/20 text-muted-foreground"
      )}
    >
      {status === "completed" && (
        <CheckCircle2 className="w-3 h-3 mr-1" />
      )}
      {status === "in-progress" && (
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
      )}
      {status === "upcoming" && (
        <Clock className="w-3 h-3 mr-1" />
      )}
      {status === "completed" ? "Completed" : 
       status === "in-progress" ? "In Progress" : 
       status === "upcoming" ? "Upcoming" : status}
    </div>
  );
};

// Alert severity badge
export const AlertSeverityBadge = ({ severity }: { severity: string }) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        severity === "critical" && "bg-destructive/20 text-destructive",
        severity === "warning" && "bg-warning/20 text-warning",
        severity === "info" && "bg-info/20 text-info"
      )}
    >
      {severity === "critical" && (
        <XCircle className="w-3 h-3 mr-1" />
      )}
      {severity === "warning" && (
        <AlertTriangle className="w-3 h-3 mr-1" />
      )}
      {severity === "info" && (
        <Info className="w-3 h-3 mr-1" />
      )}
      {severity === "critical" ? "Critical" : 
       severity === "warning" ? "Warning" : 
       severity === "info" ? "Info" : severity}
    </div>
  );
};
