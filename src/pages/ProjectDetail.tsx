
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/ui/data-card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  BarChart, 
  Edit2, 
  Trash2,
  CheckCircle2,
  PauseCircle,
  Package,
  FolderKanban,
  Cpu,
  Activity
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { format, differenceInDays } from "date-fns";
import { mockProjects, mockDevices } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: string }) => {
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

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the project by ID from mock data
  const project = mockProjects.find(p => p.id === id);
  
  // If project not found, return to projects page
  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/projects")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
            <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  // Calculate project timeline (days elapsed and remaining)
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const today = new Date();
  const totalDays = differenceInDays(endDate, startDate);
  const daysElapsed = differenceInDays(today, startDate);
  const daysRemaining = differenceInDays(endDate, today);
  const timelinePercentage = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
  
  // Get devices associated with this project (mock data)
  const projectDevices = mockDevices
    .slice(0, 5) // Just take a few devices for demo purposes
    .map(device => ({
      ...device,
      assignedDate: new Date(new Date().getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));
  
  // Mock progress data by week
  const progressByWeek = [
    { week: "Week 1", planned: 10, actual: 8 },
    { week: "Week 2", planned: 20, actual: 15 },
    { week: "Week 3", planned: 30, actual: 28 },
    { week: "Week 4", planned: 40, actual: 35 },
    { week: "Week 5", planned: 50, actual: 45 },
    { week: "Week 6", planned: 60, actual: 58 },
    { week: "Week 7", planned: 70, actual: 67 },
    { week: "Week 8", planned: 80, actual: 75 },
    { week: "Week 9", planned: 90, actual: project.progress },
  ];
  
  // Mock resource utilization data
  const resourceUtilization = [
    { name: "Labor", planned: 65, actual: 72 },
    { name: "Equipment", planned: 80, actual: 75 },
    { name: "Materials", planned: 90, actual: 88 },
    { name: "Logistics", planned: 60, actual: 65 },
  ];

  // Chart configs for different chart types
  const chartConfig = {
    progressTracking: {
      planned: { label: "Planned Progress", theme: { light: "#8884d8", dark: "#8884d8" } },
      actual: { label: "Actual Progress", theme: { light: "#82ca9d", dark: "#82ca9d" } },
    },
    progressByWeek: {
      planned: { label: "Planned Progress", theme: { light: "#8884d8", dark: "#8884d8" } },
      actual: { label: "Actual Progress", theme: { light: "#82ca9d", dark: "#82ca9d" } },
    },
    resourceUtilization: {
      planned: { label: "Planned %", theme: { light: "#8884d8", dark: "#8884d8" } },
      actual: { label: "Actual %", theme: { light: "#82ca9d", dark: "#82ca9d" } },
    },
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate("/projects")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <BarChart className="h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Edit2 className="h-4 w-4" />
              Edit Project
            </Button>
            <Button variant="destructive" size="sm" className="h-9 gap-1">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
        
        {/* Project Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DataCard>
            <div className="flex items-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="text-lg font-semibold">{project.location}</p>
              </div>
            </div>
          </DataCard>
          
          <DataCard>
            <div className="flex items-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Project Manager</h3>
                <p className="text-lg font-semibold">{project.manager}</p>
              </div>
            </div>
          </DataCard>
          
          <DataCard>
            <div className="flex items-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                <p className="text-sm">
                  {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </DataCard>
          
          <DataCard>
            <div className="flex items-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mr-4">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Remaining</h3>
                <p className="text-lg font-semibold">
                  {daysRemaining > 0 ? `${daysRemaining} days` : "Overdue"}
                </p>
              </div>
            </div>
          </DataCard>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">IoT Devices</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Card */}
              <DataCard title="Project Progress" className="lg:col-span-2">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Overall Progress</h3>
                    <span className="text-2xl font-bold">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2 mb-6" />
                  
                  <h3 className="text-sm font-medium mb-2">Timeline Progress</h3>
                  <Progress value={timelinePercentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{format(startDate, "MMM d")}</span>
                    <span>Today ({Math.round(timelinePercentage)}%)</span>
                    <span>{format(endDate, "MMM d")}</span>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Days</h4>
                      <p className="text-xl font-bold">{totalDays}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Days Elapsed</h4>
                      <p className="text-xl font-bold">{daysElapsed}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Days Remaining</h4>
                      <p className="text-xl font-bold">{daysRemaining > 0 ? daysRemaining : "Overdue"}</p>
                    </div>
                  </div>
                </div>
              </DataCard>
              
              {/* Project Stats */}
              <DataCard title="Project Stats">
                <div className="p-4">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Assigned Devices</span>
                        <span className="font-medium">{projectDevices.length}</span>
                      </div>
                      <Progress value={(projectDevices.length / 10) * 100} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Active Devices</span>
                        <span className="font-medium">
                          {projectDevices.filter(d => d.status === 'active').length}
                        </span>
                      </div>
                      <Progress 
                        value={(projectDevices.filter(d => d.status === 'active').length / projectDevices.length) * 100} 
                        className="h-1.5" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Resource Utilization</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Budget Consumed</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Milestone Completion</span>
                        <span className="font-medium">4/7</span>
                      </div>
                      <Progress value={(4/7) * 100} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </DataCard>
              
              {/* Project Chart */}
              <DataCard title="Progress Tracking" className="lg:col-span-3">
                <div className="h-80 p-4">
                  <ChartContainer config={chartConfig.progressTracking}>
                    <LineChart data={progressByWeek}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="planned" stroke="#8884d8" name="Planned Progress" />
                      <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual Progress" />
                    </LineChart>
                  </ChartContainer>
                </div>
              </DataCard>
            </div>
          </TabsContent>
          
          {/* IoT Devices Tab */}
          <TabsContent value="devices">
            <DataCard title="Assigned IoT Devices">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Project Devices</h3>
                    <p className="text-sm text-muted-foreground">
                      {projectDevices.length} devices assigned to this project
                    </p>
                  </div>
                  <Button size="sm">Assign Devices</Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Battery</TableHead>
                      <TableHead>Assigned Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectDevices.map(device => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.id}</TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>{device.type}</TableCell>
                        <TableCell>
                          <div 
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              device.status === "active" && "bg-success/20 text-success",
                              device.status === "warning" && "bg-warning/20 text-warning",
                              device.status === "alert" && "bg-destructive/20 text-destructive",
                              device.status === "inactive" && "bg-muted text-muted-foreground"
                            )}
                          >
                            {device.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={device.batteryLevel} 
                              className={cn(
                                "h-1.5 w-16",
                                device.batteryLevel <= 20 && "text-destructive",
                                device.batteryLevel > 20 && device.batteryLevel <= 50 && "text-warning",
                                device.batteryLevel > 50 && "text-success"
                              )} 
                            />
                            <span className="text-xs">{device.batteryLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{format(new Date(device.assignedDate), "MMM d, yyyy")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DataCard>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DataCard>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">
                      <FolderKanban className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{project.progress}%</div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                  </div>
                </DataCard>
                
                <DataCard>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-sm text-muted-foreground">Task Completion</p>
                  </div>
                </DataCard>
                
                <DataCard>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">4/7</div>
                    <p className="text-sm text-muted-foreground">Milestones Completed</p>
                  </div>
                </DataCard>
              </div>
              
              <DataCard title="Progress by Week">
                <div className="h-80 p-4">
                  <ChartContainer config={chartConfig.progressByWeek}>
                    <BarChart data={progressByWeek}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="planned" fill="#8884d8" name="Planned Progress" />
                      <Bar dataKey="actual" fill="#82ca9d" name="Actual Progress" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </DataCard>
              
              <DataCard title="Milestones">
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Milestone</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Project Initiation</TableCell>
                        <TableCell>{format(new Date(project.startDate), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </div>
                        </TableCell>
                        <TableCell><Progress value={100} className="h-1.5 w-20" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Foundation Work</TableCell>
                        <TableCell>{format(new Date(new Date(project.startDate).getTime() + 30 * 24 * 60 * 60 * 1000), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </div>
                        </TableCell>
                        <TableCell><Progress value={100} className="h-1.5 w-20" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Structural Framework</TableCell>
                        <TableCell>{format(new Date(new Date(project.startDate).getTime() + 60 * 24 * 60 * 60 * 1000), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </div>
                        </TableCell>
                        <TableCell><Progress value={100} className="h-1.5 w-20" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Exterior Construction</TableCell>
                        <TableCell>{format(new Date(new Date(project.startDate).getTime() + 90 * 24 * 60 * 60 * 1000), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </div>
                        </TableCell>
                        <TableCell><Progress value={100} className="h-1.5 w-20" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Interior Work</TableCell>
                        <TableCell>{format(new Date(new Date(project.startDate).getTime() + 120 * 24 * 60 * 60 * 1000), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="bg-warning/20 text-warning px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                            <Activity className="w-3 h-3 mr-1" />
                            In Progress
                          </div>
                        </TableCell>
                        <TableCell><Progress value={68} className="h-1.5 w-20" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MEP Systems</TableCell>
                        <TableCell>{format(new Date(new Date(project.startDate).getTime() + 150 * 24 * 60 * 60 * 1000), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                            Pending
                          </div>
                        </TableCell>
                        <TableCell><Progress value={15} className="h-1.5 w-20" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Final Inspection & Handover</TableCell>
                        <TableCell>{format(new Date(project.endDate), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                            Not Started
                          </div>
                        </TableCell>
                        <TableCell><Progress value={0} className="h-1.5 w-20" /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </DataCard>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DataCard>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">
                      <Cpu className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{projectDevices.length}</div>
                    <p className="text-sm text-muted-foreground">Equipment Units</p>
                  </div>
                </DataCard>
                
                <DataCard>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                  </div>
                </DataCard>
                
                <DataCard>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="rounded-full bg-primary/10 p-3 mb-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-sm text-muted-foreground">Materials Delivered</p>
                  </div>
                </DataCard>
              </div>
              
              <DataCard title="Resource Utilization">
                <div className="h-80 p-4">
                  <ChartContainer config={chartConfig.resourceUtilization}>
                    <BarChart data={resourceUtilization} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="planned" fill="#8884d8" name="Planned %" />
                      <Bar dataKey="actual" fill="#82ca9d" name="Actual %" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </DataCard>
              
              <DataCard title="Equipment Utilization">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment Type</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Excavators</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="h-1.5 w-20 text-success" />
                          <span className="text-xs">85%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                          Active
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cranes</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={72} className="h-1.5 w-20 text-success" />
                          <span className="text-xs">72%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                          Active
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cement Mixers</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={65} className="h-1.5 w-20" />
                          <span className="text-xs">65%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                          Active
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Forklifts</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={78} className="h-1.5 w-20 text-success" />
                          <span className="text-xs">78%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                          Active
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Safety Equipment</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={92} className="h-1.5 w-20 text-success" />
                          <span className="text-xs">92%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="bg-success/20 text-success px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center">
                          Active
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DataCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
