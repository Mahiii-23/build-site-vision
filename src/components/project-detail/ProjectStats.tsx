
import { format, addDays, isAfter } from "date-fns";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { DataCard } from "@/components/ui/data-card";
import { Progress } from "@/components/ui/progress";

interface ProjectStatsProps {
  project: {
    progress: number;
    startDate: string;
    endDate: string;
  };
  devices: any[];
  alerts: any[];
}

export const ProjectStats = ({ project, devices, alerts }: ProjectStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <DataCard>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-medium text-muted-foreground">Progress</div>
            <div className="text-lg font-bold">{project.progress}%</div>
          </div>
          <Progress value={project.progress} className="h-2 mb-2" />
          <div className="text-xs text-muted-foreground">
            Target: 85% by {format(addDays(new Date(), 15), "MMM d")}
          </div>
        </div>
      </DataCard>
      
      <DataCard>
        <div className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Timeline</div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-muted-foreground">Start</div>
            <div className="text-xs text-muted-foreground">End</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{format(new Date(project.startDate), "MMM d, yyyy")}</div>
            <div className="text-sm font-medium">{format(new Date(project.endDate), "MMM d, yyyy")}</div>
          </div>
          {isAfter(new Date(), new Date(project.endDate)) && (
            <div className="text-xs text-destructive mt-2">
              Project is overdue by {Math.ceil(Math.abs(new Date().getTime() - new Date(project.endDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </div>
          )}
        </div>
      </DataCard>
      
      <DataCard>
        <div className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Devices</div>
          <div className="text-2xl font-bold mb-1">{devices.length}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="inline-flex items-center text-success">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {devices.filter(d => d.status === "active").length} active
            </span>
            <span className="inline-flex items-center text-warning">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {devices.filter(d => d.status === "warning").length} warnings
            </span>
          </div>
        </div>
      </DataCard>
      
      <DataCard>
        <div className="p-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Alerts</div>
          <div className="text-2xl font-bold mb-1">{alerts.length}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="inline-flex items-center text-destructive">
              <XCircle className="h-3 w-3 mr-1" />
              {alerts.filter(a => a.severity === "critical").length} critical
            </span>
            <span className="inline-flex items-center text-warning">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {alerts.filter(a => a.severity === "warning").length} warnings
            </span>
          </div>
        </div>
      </DataCard>
    </div>
  );
};
