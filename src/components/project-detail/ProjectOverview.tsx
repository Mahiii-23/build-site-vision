
import { format } from "date-fns";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { DataCard } from "@/components/ui/data-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { MilestoneStatusBadge, AlertSeverityBadge } from "./StatusBadges";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ProjectOverviewProps {
  project: any;
  milestones: any[];
  alerts: any[];
  weeklyProgressData: any[];
  resourceAllocationData: any[];
  setActiveTab: (tab: string) => void;
}

export const ProjectOverview = ({ 
  project, 
  milestones, 
  alerts, 
  weeklyProgressData, 
  resourceAllocationData, 
  setActiveTab 
}: ProjectOverviewProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DataCard title="Project Description">
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              {project.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Project Manager</div>
                <div className="text-sm text-muted-foreground">{project.manager}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Client</div>
                <div className="text-sm text-muted-foreground">Acme Corporation</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Budget</div>
                <div className="text-sm text-muted-foreground">$2,500,000</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Priority</div>
                <div className="text-sm text-muted-foreground">High</div>
              </div>
            </div>
          </div>
        </DataCard>
        
        <DataCard title="Weekly Progress">
          <div className="p-4 h-64">
            <ChartContainer config={{
              planned: { label: "Planned", theme: { light: "#3b82f6", dark: "#3b82f6" } },
              actual: { label: "Actual", theme: { light: "#22c55e", dark: "#22c55e" } },
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyProgressData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="planned" fill="#3b82f6" />
                  <Bar dataKey="actual" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </DataCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DataCard title="Project Milestones">
          <div className="p-4">
            <ul className="space-y-4">
              {milestones.map((milestone) => (
                <li key={milestone.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{milestone.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{milestone.description}</div>
                      <div className="text-xs text-muted-foreground mt-2">
                        <Calendar className="inline-block h-3 w-3 mr-1" />
                        {format(new Date(milestone.date), "MMM d, yyyy")}
                      </div>
                    </div>
                    <MilestoneStatusBadge status={milestone.status} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DataCard>
        
        <DataCard title="Resource Allocation">
          <div className="p-4 h-64">
            <ChartContainer config={{
              planned: { label: "Planned", theme: { light: "#3b82f6", dark: "#3b82f6" } },
              actual: { label: "Actual", theme: { light: "#22c55e", dark: "#22c55e" } },
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={resourceAllocationData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="planned" fill="#3b82f6" />
                  <Bar dataKey="actual" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </DataCard>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <DataCard title="Recent Alerts">
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.slice(0, 5).map(alert => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.deviceId}</TableCell>
                    <TableCell>{alert.message}</TableCell>
                    <TableCell>
                      <AlertSeverityBadge severity={alert.severity} />
                    </TableCell>
                    <TableCell>{format(new Date(alert.timestamp), "MMM d, HH:mm")}</TableCell>
                    <TableCell>
                      <Badge variant={alert.resolved ? "outline" : "default"}>
                        {alert.resolved ? "Resolved" : "Active"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {alerts.length > 5 && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("alerts")}>
                  View All Alerts
                </Button>
              </div>
            )}
          </div>
        </DataCard>
      </div>
    </>
  );
};
