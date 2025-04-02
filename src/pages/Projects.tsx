
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataCard } from "@/components/ui/data-card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Calendar, 
  FolderKanban, 
  MoreHorizontal, 
  PlusCircle, 
  RefreshCw,
  Clock,
  MapPin,
  User,
  Package,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertTriangle,
  PauseCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { mockProjects, Project, getProjectStatistics } from "@/lib/mock-data";

const StatusBadge = ({ status }: { status: Project['status'] }) => {
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

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-card border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-lg line-clamp-1">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{project.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span className="truncate">{project.manager}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(new Date(project.startDate), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDistanceToNow(new Date(project.endDate), { addSuffix: true })}</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
          e.stopPropagation();
          navigate(`/projects/${project.id}`);
        }}>
          View Details
        </Button>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const projectStats = getProjectStatistics();
  
  // Filter projects based on search query and active tab
  const filteredProjects = mockProjects
    .filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(project => {
      if (activeTab === "all") return true;
      return project.status === activeTab;
    });

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage and track all construction projects</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button size="sm" className="h-9 gap-1">
              <PlusCircle className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <DataCard>
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <FolderKanban className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">{projectStats.totalProjects}</div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </div>
          </DataCard>
          
          <DataCard>
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-success/10 p-3 mb-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div className="text-2xl font-bold">{projectStats.activeProjects}</div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </div>
          </DataCard>
          
          <DataCard>
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-warning/10 p-3 mb-3">
                <PauseCircle className="h-6 w-6 text-warning" />
              </div>
              <div className="text-2xl font-bold">{projectStats.pausedProjects}</div>
              <p className="text-sm text-muted-foreground">Paused Projects</p>
            </div>
          </DataCard>
          
          <DataCard>
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">{projectStats.completedProjects}</div>
              <p className="text-sm text-muted-foreground">Completed Projects</p>
            </div>
          </DataCard>
        </div>
        
        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Projects Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {/* Projects Table View */}
        <DataCard title="Projects List" className="mb-6">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map(project => (
                  <TableRow key={project.id} className="cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="h-2 w-24" />
                        <span className="text-xs">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={project.status} /></TableCell>
                    <TableCell>{project.manager}</TableCell>
                    <TableCell>{format(new Date(project.endDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${project.id}`);
                          }}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>Assign Devices</DropdownMenuItem>
                          <DropdownMenuItem>Generate Report</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DataCard>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
