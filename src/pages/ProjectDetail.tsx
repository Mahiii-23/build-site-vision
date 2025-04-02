
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/ui/data-card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Package, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  File,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Play,
  PauseCircle,
  Search
} from "lucide-react";
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
import { format, addDays, isAfter } from "date-fns";
import { mockProjects, getProjectDevices, getProjectAlerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the project by id
  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button className="mt-4">Back to Projects</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  
  // Project devices
  const devices = getProjectDevices(project.id);
  
  // Project alerts
  const alerts = getProjectAlerts(project.id);
  
  // Mock project documents
  const documents = [
    { id: "doc1", name: "Project Specifications", type: "pdf", size: "2.4 MB", date: "2023-10-15" },
    { id: "doc2", name: "Site Survey Report", type: "docx", size: "1.8 MB", date: "2023-10-18" },
    { id: "doc3", name: "Environmental Assessment", type: "pdf", size: "4.1 MB", date: "2023-10-20" },
    { id: "doc4", name: "Budget Proposal", type: "xlsx", size: "945 KB", date: "2023-10-25" },
    { id: "doc5", name: "Team Assignments", type: "pdf", size: "1.2 MB", date: "2023-11-01" },
    { id: "doc6", name: "Client Requirements", type: "docx", size: "822 KB", date: "2023-11-05" },
  ];
  
  // Mock project milestones
  const milestones = [
    { 
      id: "ms1", 
      name: "Planning Phase Completion", 
      status: "completed", 
      date: "2023-10-20",
      description: "Complete all planning documents and get client approval."
    },
    { 
      id: "ms2", 
      name: "Foundation Work", 
      status: "completed", 
      date: "2023-11-15",
      description: "Complete the foundation laying and structural support."
    },
    { 
      id: "ms3", 
      name: "Structural Framework", 
      status: "in-progress", 
      date: "2023-12-10",
      description: "Erect the structural framework and complete initial inspections."
    },
    { 
      id: "ms4", 
      name: "Electrical and Plumbing", 
      status: "upcoming", 
      date: "2024-01-20",
      description: "Install all electrical wiring, plumbing, and related infrastructure."
    },
    { 
      id: "ms5", 
      name: "Interior Work", 
      status: "upcoming", 
      date: "2024-02-15",
      description: "Complete all interior finishing work including walls, floors, and ceilings."
    },
    { 
      id: "ms6", 
      name: "Final Inspection", 
      status: "upcoming", 
      date: "2024-03-10",
      description: "Conduct final inspections and obtain necessary certificates."
    },
  ];
  
  // Mock project team members
  const team = [
    { id: "tm1", name: "Alex Johnson", role: "Project Manager", avatar: "/avatar-1.jpg" },
    { id: "tm2", name: "Sarah Chen", role: "Lead Engineer", avatar: "/avatar-2.jpg" },
    { id: "tm3", name: "Mohammed Al-Fahim", role: "Structural Engineer", avatar: "/avatar-3.jpg" },
    { id: "tm4", name: "Elena Rodriguez", role: "Electrical Engineer", avatar: "/avatar-4.jpg" },
    { id: "tm5", name: "Thomas Williams", role: "Safety Inspector", avatar: "/avatar-5.jpg" },
    { id: "tm6", name: "Priya Sharma", role: "Quality Assurance", avatar: "/avatar-6.jpg" },
  ];
  
  // Mock project comments/activity
  const activities = [
    { 
      id: "act1", 
      type: "comment", 
      user: "Alex Johnson", 
      content: "Updated the project timeline to account for the weather delays.", 
      date: "2023-11-20T14:35:00",
      avatar: "/avatar-1.jpg"
    },
    { 
      id: "act2", 
      type: "upload", 
      user: "Sarah Chen", 
      content: "Uploaded the revised structural drawings.", 
      date: "2023-11-19T10:22:00",
      avatar: "/avatar-2.jpg",
      files: ["Structural_Rev2.pdf"]
    },
    { 
      id: "act3", 
      type: "milestone", 
      user: "System", 
      content: "Milestone completed: Planning Phase Completion", 
      date: "2023-11-18T16:45:00"
    },
    { 
      id: "act4", 
      type: "comment", 
      user: "Elena Rodriguez", 
      content: "The electrical plan needs to be revised to accommodate the new equipment specifications.", 
      date: "2023-11-17T09:15:00",
      avatar: "/avatar-4.jpg"
    },
    { 
      id: "act5", 
      type: "alert", 
      user: "System", 
      content: "Alert: Temperature sensor SD-103 reported high temperature.", 
      date: "2023-11-16T11:30:00"
    },
  ];
  
  // Weekly progress data
  const weeklyProgressData = [
    { week: "Week 1", planned: 5, actual: 4 },
    { week: "Week 2", planned: 10, actual: 9 },
    { week: "Week 3", planned: 15, actual: 12 },
    { week: "Week 4", planned: 25, actual: 20 },
    { week: "Week 5", planned: 40, actual: 32 },
    { week: "Week 6", planned: 55, actual: 48 },
    { week: "Week 7", planned: 70, actual: 65 },
    { week: "Week 8", planned: 80, actual: 78 },
  ];
  
  // Resource allocation data
  const resourceAllocationData = [
    { name: "Labor", planned: 45, actual: 48 },
    { name: "Materials", planned: 30, actual: 32 },
    { name: "Equipment", planned: 15, actual: 12 },
    { name: "Services", planned: 10, actual: 8 },
  ];
  
  // Project status badge
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
  
  // Milestone status badge
  const MilestoneStatusBadge = ({ status }: { status: string }) => {
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
  const AlertSeverityBadge = ({ severity }: { severity: string }) => {
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
  
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header / Back Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/projects">
              <Button variant="ghost" size="icon" className="h-8 w-8 mr-1">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{format(new Date(project.startDate), "MMM d, yyyy")}</span>
                </div>
                <StatusBadge status={project.status} />
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <FileText className="h-4 w-4 mr-1" />
              Generate Report
            </Button>
            
            <Button variant="outline" size="sm" className="h-8">
              <Users className="h-4 w-4 mr-1" />
              Manage Team
            </Button>
            
            <Button size="sm" className="h-8">
              <Edit className="h-4 w-4 mr-1" />
              Edit Project
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Play className="h-4 w-4 mr-2" />
                  Resume Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PauseCircle className="h-4 w-4 mr-2" />
                  Pause Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Project overview stats */}
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
        
        {/* Tabs for different project views */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
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
          </TabsContent>
          
          {/* Devices Tab */}
          <TabsContent value="devices">
            <DataCard title="Project Devices">
              <div className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search devices..."
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      Add Device
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>All Devices</DropdownMenuItem>
                        <DropdownMenuItem>Active Devices</DropdownMenuItem>
                        <DropdownMenuItem>Warning Status</DropdownMenuItem>
                        <DropdownMenuItem>Error Status</DropdownMenuItem>
                        <DropdownMenuItem>Inactive Devices</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Battery</TableHead>
                      <TableHead>Last Reading</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devices.map(device => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.id}</TableCell>
                        <TableCell>{device.type}</TableCell>
                        <TableCell>
                          <div className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            device.status === "active" && "bg-success/20 text-success",
                            device.status === "warning" && "bg-warning/20 text-warning",
                            device.status === "error" && "bg-destructive/20 text-destructive",
                            device.status === "inactive" && "bg-muted/20 text-muted-foreground"
                          )}>
                            {device.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={device.batteryLevel} className="h-1.5 w-16" />
                            <span className="text-xs">{device.batteryLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{format(new Date(device.lastReading), "MMM d, HH:mm")}</TableCell>
                        <TableCell>{device.location}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Device</DropdownMenuItem>
                              <DropdownMenuItem>Recalibrate</DropdownMenuItem>
                              <DropdownMenuItem>View History</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Remove from Project</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DataCard>
          </TabsContent>
          
          {/* Team Tab */}
          <TabsContent value="team">
            <DataCard title="Project Team">
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {team.map(member => (
                    <div key={member.id} className="border rounded-lg p-4 flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.role}</div>
                        <div className="flex gap-2 mt-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DataCard>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents">
            <DataCard title="Project Documents">
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <Button variant="outline" size="sm">
                    <File className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="uppercase">
                            {doc.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{format(new Date(doc.date), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DataCard>
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity">
            <DataCard title="Project Activity">
              <div className="p-4">
                <div className="space-y-8">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex gap-4">
                      {activity.type === "system" || activity.type === "milestone" || activity.type === "alert" ? (
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {activity.type === "milestone" && <CheckCircle2 className="h-5 w-5 text-success" />}
                          {activity.type === "alert" && <AlertTriangle className="h-5 w-5 text-warning" />}
                          {activity.type === "system" && <Info className="h-5 w-5 text-info" />}
                        </div>
                      ) : (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={activity.avatar} alt={activity.user} />
                          <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                          <div>
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-muted-foreground ml-2 text-sm">
                              {activity.type === "comment" ? "commented" : 
                               activity.type === "upload" ? "uploaded files" : 
                               activity.type === "milestone" ? "updated milestone" : 
                               activity.type === "alert" ? "system alert" : "updated"}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(activity.date), "MMM d, HH:mm")}
                          </div>
                        </div>
                        
                        <div className="mt-2">{activity.content}</div>
                        
                        {activity.type === "upload" && activity.files && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {activity.files.map((file, idx) => (
                              <Badge key={idx} variant="outline" className="flex items-center gap-1">
                                <File className="h-3 w-3" />
                                {file}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DataCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
