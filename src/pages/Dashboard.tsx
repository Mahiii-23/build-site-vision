
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { DeviceStatusCard } from "@/components/DeviceStatusCard";
import { AlertsList } from "@/components/AlertsList";
import { DataCard } from "@/components/ui/data-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Cpu,
  Hammer,
  AlertTriangle,
  BarChart3,
  ChevronRight,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  mockDevices,
  mockAlerts,
  mockProjects,
  getDeviceStatistics,
  getAlertStatistics,
  getProjectStatistics,
} from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const deviceStats = getDeviceStatistics();
  const alertStats = getAlertStatistics();
  const projectStats = getProjectStatistics();

  // Get a subset of devices, alerts, and projects for the dashboard
  const recentDevices = [...mockDevices]
    .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
    .slice(0, 3);

  const unreadAlerts = mockAlerts
    .filter(alert => !alert.read)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const activeProjects = mockProjects
    .filter(project => project.status === "active")
    .slice(0, 3);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's what's happening today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/analytics")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button size="sm" onClick={() => navigate("/devices")}>
              <Cpu className="mr-2 h-4 w-4" />
              View All Devices
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="IoT Devices"
            value={deviceStats.totalDevices}
            icon={<Cpu size={18} />}
            description={`${deviceStats.activeDevices} devices active`}
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatsCard
            title="Active Projects"
            value={projectStats.activeProjects}
            icon={<Hammer size={18} />}
            description={`${projectStats.totalProjects} total projects`}
            trend={{ value: 5, isPositive: true }}
          />
          
          <StatsCard
            title="Alerts"
            value={alertStats.unreadAlerts}
            icon={<AlertTriangle size={18} />}
            description={`${alertStats.errorAlerts} critical alerts`}
            trend={{ value: 8, isPositive: false }}
          />
          
          <StatsCard
            title="Avg. Utilization"
            value="76%"
            icon={<BarChart3 size={18} />}
            description="68% last month"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Device Status */}
            <DataCard 
              title="Device Status" 
              action={
                <Button variant="ghost" size="sm" onClick={() => navigate("/devices")}>
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentDevices.map((device) => (
                  <DeviceStatusCard key={device.id} device={device} />
                ))}
              </div>
            </DataCard>

            {/* Project Progress */}
            <DataCard 
              title="Project Progress" 
              action={
                <Button variant="ghost" size="sm" onClick={() => navigate("/projects")}>
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              }
            >
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{project.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Location: {project.location}</span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDistanceToNow(new Date(project.endDate), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => navigate("/projects")}
                >
                  View All Projects
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </DataCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <DataCard 
              title="Recent Alerts" 
              action={
                <Button variant="ghost" size="sm" onClick={() => navigate("/alerts")}>
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              }
            >
              <div className="space-y-4">
                <AlertsList alerts={unreadAlerts} />
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/alerts")}
                >
                  View All Alerts
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </DataCard>

            {/* Status Overview */}
            <DataCard title="Status Overview">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="flex justify-center items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{deviceStats.activeDevices}</div>
                    <div className="text-xs text-muted-foreground">Active Devices</div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="flex justify-center items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{deviceStats.warningDevices}</div>
                    <div className="text-xs text-muted-foreground">Warning State</div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="flex justify-center items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{deviceStats.alertDevices}</div>
                    <div className="text-xs text-muted-foreground">Critical Alerts</div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="flex justify-center items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{deviceStats.inactiveDevices}</div>
                    <div className="text-xs text-muted-foreground">Inactive Devices</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">System Health</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Network Uptime</span>
                        <span>99.8%</span>
                      </div>
                      <Progress value={99.8} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Battery Health</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Data Transmission</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </DataCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
