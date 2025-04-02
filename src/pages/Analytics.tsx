
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/ui/data-card";
import { StatusFilter } from "@/components/StatusFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Calendar, 
  CalendarIcon, 
  DownloadIcon, 
  RefreshCw, 
  Filter, 
  FileBarChart
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  getDeviceStatistics, 
  getProjectStatistics, 
  getAlertStatistics, 
  mockDevices 
} from "@/lib/mock-data";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("devices");
  const [activeFilter, setActiveFilter] = useState("30d");
  const [date, setDate] = useState<Date>();

  // Mock analytics data
  const deviceStats = getDeviceStatistics();
  const projectStats = getProjectStatistics();
  const alertStats = getAlertStatistics();

  // Device utilization over time (mock data)
  const deviceUtilizationData = [
    { name: "Week 1", utilization: 65 },
    { name: "Week 2", utilization: 68 },
    { name: "Week 3", utilization: 72 },
    { name: "Week 4", utilization: 75 },
    { name: "Week 5", utilization: 73 },
    { name: "Week 6", utilization: 80 },
    { name: "Week 7", utilization: 78 },
    { name: "Week 8", utilization: 82 },
  ];

  // Device types distribution
  const deviceTypesData = Object.entries(deviceStats.devicesByType).map(([name, value]) => ({
    name,
    value
  }));

  // Alert distribution by severity
  const alertTypesData = [
    { name: "Error", value: alertStats.errorAlerts, color: "#ef4444" },
    { name: "Warning", value: alertStats.warningAlerts, color: "#f59e0b" },
    { name: "Info", value: alertStats.infoAlerts, color: "#3b82f6" },
  ];

  // Project progress over time (mock data)
  const projectProgressData = [
    { name: "Jan", progress: 15 },
    { name: "Feb", progress: 28 },
    { name: "Mar", progress: 40 },
    { name: "Apr", progress: 52 },
    { name: "May", progress: 67 },
    { name: "Jun", progress: 75 },
    { name: "Jul", progress: 85 },
    { name: "Aug", progress: 92 },
  ];

  // Device status counts for filter
  const statusCounts = {
    all: deviceStats.totalDevices,
    active: deviceStats.activeDevices,
    warning: deviceStats.warningDevices,
    error: deviceStats.alertDevices,
    inactive: deviceStats.inactiveDevices
  };

  // Battery level distribution (mock data)
  const batteryLevelData = [
    { name: "0-20%", count: mockDevices.filter(d => d.batteryLevel <= 20).length },
    { name: "21-40%", count: mockDevices.filter(d => d.batteryLevel > 20 && d.batteryLevel <= 40).length },
    { name: "41-60%", count: mockDevices.filter(d => d.batteryLevel > 40 && d.batteryLevel <= 60).length },
    { name: "61-80%", count: mockDevices.filter(d => d.batteryLevel > 60 && d.batteryLevel <= 80).length },
    { name: "81-100%", count: mockDevices.filter(d => d.batteryLevel > 80).length },
  ];

  // Chart configs for different chart types
  const chartConfig = {
    deviceStatus: {
      active: { label: "Active", theme: { light: "#22c55e", dark: "#22c55e" } },
      warning: { label: "Warning", theme: { light: "#f59e0b", dark: "#f59e0b" } },
      error: { label: "Error", theme: { light: "#ef4444", dark: "#ef4444" } },
      inactive: { label: "Inactive", theme: { light: "#94a3b8", dark: "#94a3b8" } },
    },
    deviceTypes: {
      value: { label: "Count", theme: { light: "#3b82f6", dark: "#3b82f6" } },
    },
    utilization: {
      utilization: { label: "Utilization", theme: { light: "#3b82f6", dark: "#3b82f6" } },
    },
    batteryLevels: {
      count: { label: "Devices", theme: { light: "#8884d8", dark: "#8884d8" } },
    },
    alertTypes: {
      Error: { label: "Error", theme: { light: "#ef4444", dark: "#ef4444" } },
      Warning: { label: "Warning", theme: { light: "#f59e0b", dark: "#f59e0b" } },
      Info: { label: "Info", theme: { light: "#3b82f6", dark: "#3b82f6" } },
    },
    projectStatus: {
      Active: { label: "Active", theme: { light: "#22c55e", dark: "#22c55e" } },
      Paused: { label: "Paused", theme: { light: "#f59e0b", dark: "#f59e0b" } },
      Completed: { label: "Completed", theme: { light: "#3b82f6", dark: "#3b82f6" } },
    },
    projectProgress: {
      progress: { label: "Progress", theme: { light: "#22c55e", dark: "#22c55e" } },
    },
    alertsOverTime: {
      error: { label: "Error", theme: { light: "#ef4444", dark: "#ef4444" } },
      warning: { label: "Warning", theme: { light: "#f59e0b", dark: "#f59e0b" } },
      info: { label: "Info", theme: { light: "#3b82f6", dark: "#3b82f6" } },
    },
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor key metrics and performance indicators</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <div className="flex items-center border rounded-md p-1">
              <Button 
                variant={activeFilter === "7d" ? "secondary" : "ghost"} 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setActiveFilter("7d")}
              >
                7D
              </Button>
              <Button 
                variant={activeFilter === "30d" ? "secondary" : "ghost"} 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setActiveFilter("30d")}
              >
                30D
              </Button>
              <Button 
                variant={activeFilter === "90d" ? "secondary" : "ghost"} 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => setActiveFilter("90d")}
              >
                90D
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
            
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="devices" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="devices">IoT Devices</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Incidents</TabsTrigger>
          </TabsList>
          
          {/* Devices Analytics */}
          <TabsContent value="devices">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <DataCard title="Device Status Distribution">
                <div className="h-64">
                  <ChartContainer config={chartConfig.deviceStatus}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'active', value: deviceStats.activeDevices, color: '#22c55e' },
                          { name: 'warning', value: deviceStats.warningDevices, color: '#f59e0b' },
                          { name: 'error', value: deviceStats.alertDevices, color: '#ef4444' },
                          { name: 'inactive', value: deviceStats.inactiveDevices, color: '#94a3b8' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'active', value: deviceStats.activeDevices, color: '#22c55e' },
                          { name: 'warning', value: deviceStats.warningDevices, color: '#f59e0b' },
                          { name: 'error', value: deviceStats.alertDevices, color: '#ef4444' },
                          { name: 'inactive', value: deviceStats.inactiveDevices, color: '#94a3b8' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
              </DataCard>
              
              <DataCard title="Device Types Distribution">
                <div className="h-64">
                  <ChartContainer config={chartConfig.deviceTypes}>
                    <BarChart data={deviceTypesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </DataCard>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <DataCard title="Device Utilization Over Time">
                <div className="h-72">
                  <ChartContainer config={chartConfig.utilization}>
                    <LineChart data={deviceUtilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="utilization"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </DataCard>
              
              <DataCard title="Battery Level Distribution">
                <div className="h-64">
                  <ChartContainer config={chartConfig.batteryLevels}>
                    <BarChart data={batteryLevelData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </DataCard>
            </div>
          </TabsContent>
          
          {/* Projects Analytics */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <DataCard title="Project Status Distribution">
                <div className="h-64">
                  <ChartContainer config={chartConfig.projectStatus}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Active', value: projectStats.activeProjects, color: '#22c55e' },
                          { name: 'Paused', value: projectStats.pausedProjects, color: '#f59e0b' },
                          { name: 'Completed', value: projectStats.completedProjects, color: '#3b82f6' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Active', value: projectStats.activeProjects, color: '#22c55e' },
                          { name: 'Paused', value: projectStats.pausedProjects, color: '#f59e0b' },
                          { name: 'Completed', value: projectStats.completedProjects, color: '#3b82f6' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
              </DataCard>
              
              <DataCard title="Average Project Progress">
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-4">{projectStats.averageProgress.toFixed(1)}%</div>
                    <p className="text-muted-foreground">Average Progress Across All Projects</p>
                  </div>
                </div>
              </DataCard>
            </div>
            
            <DataCard title="Project Progress Over Time">
              <div className="h-72">
                <ChartContainer config={chartConfig.projectProgress}>
                  <LineChart data={projectProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#22c55e"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </DataCard>
          </TabsContent>
          
          {/* Alerts Analytics */}
          <TabsContent value="alerts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <DataCard title="Alert Type Distribution">
                <div className="h-64">
                  <ChartContainer config={chartConfig.alertTypes}>
                    <PieChart>
                      <Pie
                        data={alertTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {alertTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
              </DataCard>
              
              <DataCard title="Alerts Summary">
                <div className="h-64 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-destructive mb-2">{alertStats.errorAlerts}</div>
                      <p className="text-muted-foreground">Critical Alerts</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-warning mb-2">{alertStats.warningAlerts}</div>
                      <p className="text-muted-foreground">Warning Alerts</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{alertStats.infoAlerts}</div>
                      <p className="text-muted-foreground">Info Alerts</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-muted-foreground mb-2">{alertStats.unreadAlerts}</div>
                      <p className="text-muted-foreground">Unread Alerts</p>
                    </div>
                  </div>
                </div>
              </DataCard>
            </div>
            
            <DataCard title="Alerts Over Time">
              <div className="h-72">
                <ChartContainer config={chartConfig.alertsOverTime}>
                  <LineChart data={[
                    { month: "Jan", error: 5, warning: 8, info: 12 },
                    { month: "Feb", error: 8, warning: 10, info: 15 },
                    { month: "Mar", error: 12, warning: 18, info: 20 },
                    { month: "Apr", error: 9, warning: 15, info: 17 },
                    { month: "May", error: 7, warning: 12, info: 19 },
                    { month: "Jun", error: 10, warning: 14, info: 22 },
                    { month: "Jul", error: 8, warning: 9, info: 18 },
                    { month: "Aug", error: 6, warning: 11, info: 15 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="error" stroke="#ef4444" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="warning" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="info" stroke="#3b82f6" />
                  </LineChart>
                </ChartContainer>
              </div>
            </DataCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
